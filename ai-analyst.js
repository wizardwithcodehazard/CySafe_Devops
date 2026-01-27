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

    // 1. Extract Data
    let vulnerabilities = [];
    let severityCounts = { HIGH: 0, CRITICAL: 0, MEDIUM: 0, LOW: 0, UNKNOWN: 0 };

    if (report.Results) {
        report.Results.forEach(res => {
            if (res.Vulnerabilities) {
                res.Vulnerabilities.forEach(vuln => {
                    // Count severities for the summary table
                    if (severityCounts[vuln.Severity] !== undefined) {
                        severityCounts[vuln.Severity]++;
                    }

                    vulnerabilities.push({
                        id: vuln.VulnerabilityID,
                        pkg: vuln.PkgName,
                        installed: vuln.InstalledVersion,
                        fixed: vuln.FixedVersion || 'None',
                        severity: vuln.Severity,
                        title: vuln.Title,
                        desc: vuln.Description // We send the description now for better context
                    });
                });
            }
        });
    }

    if (vulnerabilities.length === 0) {
        fs.writeFileSync('ai-advice.txt', "<h2 style='color:green'>✅ System Secure: No Vulnerabilities Found</h2>");
        return;
    }

    // 2. The "Deep Dive" Prompt
    const prompt = `
  You are a Senior Security Researcher conducting a Deep-Dive Forensic Audit on a Docker container.
  
  VULNERABILITY STATS: ${JSON.stringify(severityCounts)}
  RAW THREAT DATA (Top 10): ${JSON.stringify(vulnerabilities.slice(0, 10))}

  Generate a **Comprehensive Security Report** in strict HTML format.
  
  Structure & Style Requirements:
  1. **Executive Summary**: 
     - Create an HTML Table (<table style="border-collapse: collapse; width: 100%;">) showing the count of High, Critical, Medium, and Low issues.
     - Write a detailed paragraph analyzing the overall security posture (e.g., "The image is susceptible to privilege escalation...").
  
  2. **Technical Deep Dive (Top 3 Threats)**:
     - For each major vulnerability, provide:
       - <h3>[Severity Color] CVE-ID: Package Name</h3>
       - <b>Attack Vector:</b> (Explain exactly how a hacker would exploit this. Be technical.)
       - <b>Impact Analysis:</b> (What happens if exploited? RCE? Data Exfiltration? DoS?)
       - <b>Technical Description:</b> (Briefly explain the underlying bug, e.g., buffer overflow in function X).
  
  3. **Mitigation Strategy**:
     - Provide specific <pre> blocks with upgrade commands.
     - Explain *why* the upgrade fixes the issue (e.g., "Version X.X patches the memory leak").

  Style Guide:
  - Use bright colors for severity (Red for Critical, Orange for High).
  - Use professional fonts (Arial/sans-serif).
  - Do NOT use Markdown. Only clean HTML.
  `;

    // 3. Call Groq API (High Intelligence Model)
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
                temperature: 0.2 // Low temp for maximum technical accuracy
            })
        });

        const data = await response.json();
        const aiAdvice = data.choices[0].message.content;

        console.log("AI Deep Analysis Complete.");
        fs.writeFileSync('ai-advice.txt', aiAdvice);

    } catch (error) {
        console.error("Error calling AI:", error);
        fs.writeFileSync('ai-advice.txt', `<h3 style="color:red">AI Analysis Failed</h3><p>${error.message}</p>`);
    }
}

analyze();