/* eslint-disable no-undef */
import fs from 'fs';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const REPORT_FILE = 'trivy-report.json';

async function analyze() {
    if (!fs.existsSync(REPORT_FILE)) {
        console.log("No security report found.");
        return;
    }

    const rawData = fs.readFileSync(REPORT_FILE, 'utf8');
    const report = JSON.parse(rawData);

    // 1. Extract Richer Data (Includes Versions)
    let vulnerabilities = [];
    if (report.Results) {
        report.Results.forEach(res => {
            if (res.Vulnerabilities) {
                res.Vulnerabilities.forEach(vuln => {
                    vulnerabilities.push({
                        id: vuln.VulnerabilityID,
                        pkg: vuln.PkgName,
                        installed: vuln.InstalledVersion,
                        fixed: vuln.FixedVersion, // AI needs this to tell you what to upgrade to
                        severity: vuln.Severity,
                        title: vuln.Title
                    });
                });
            }
        });
    }

    if (vulnerabilities.length === 0) {
        fs.writeFileSync('ai-advice.txt', "✅ No vulnerabilities found. Great job!");
        return;
    }

    // 2. The "Pro" Prompt
    const prompt = `
  You are a Lead DevSecOps Engineer. I have run a Trivy scan on my Docker image and found vulnerabilities.
  
  RAW DATA (Top 10 issues):
  ${JSON.stringify(vulnerabilities.slice(0, 10))}

  Please generate a Detailed Security Assessment in **clean HTML format** suitable for an email. 
  Use inline CSS for styling (e.g., <span style="color:red"> for critical issues).
  
  Structure:
  1. <h2>🚨 Executive Summary</h2> (1 sentence risk assessment)
  2. <h2>🔍 Top Threats Analysis</h2> (Top 3 issues. Use <ul> and <li>. Use <b> for bolding.)
  3. <h2>🛠 Remediation Commands</h2> (Use <pre style="background:#f4f4f4; padding:10px;"><code> for code blocks)
  
  Do NOT use Markdown (no ### or **). Return ONLY the HTML body.
  `;

    // 3. Call Groq API
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3 // Lower temperature = more factual/precise
            })
        });

        const data = await response.json();
        const aiAdvice = data.choices[0].message.content;

        console.log("AI Analysis Complete.");
        fs.writeFileSync('ai-advice.txt', aiAdvice);

    } catch (error) {
        console.error("Error calling AI:", error);
        fs.writeFileSync('ai-advice.txt', "❌ AI Analysis Failed: " + error.message);
    }
}

analyze();