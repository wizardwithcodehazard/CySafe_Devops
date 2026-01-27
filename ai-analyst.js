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

  Please generate a Detailed Security Assessment with this exact structure:

  ### 🚨 EXECUTIVE SUMMARY
  (1 sentence on overall risk level: Low/Medium/Critical)

  ### 🔍 TOP THREATS ANALYSIS
  (Select the 3 most dangerous issues. For each one, explain:)
  * **[CVE-ID] Package Name**
    * *Issue:* (Brief technical explanation)
    * *Impact:* (What can an attacker do? e.g., RCE, DoS)
    * *Fix:* Upgrade from ${vulnerabilities[0]?.installed || 'x'} to ${vulnerabilities[0]?.fixed || 'patched version'}.

  ### 🛠 REMEDIATION COMMANDS
  (Provide exact commands I can put in my Dockerfile or terminal to fix these, e.g., 'apt-get install...')
  
  Be precise, technical, and actionable.
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