// ai-analyst.js
import fs from 'fs';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const REPORT_FILE = 'trivy-report.json';

async function analyze() {
    if (!fs.existsSync(REPORT_FILE)) {
        console.log("No security report found to analyze.");
        return;
    }

    // 1. Read the Trivy JSON report
    const rawData = fs.readFileSync(REPORT_FILE, 'utf8');
    const report = JSON.parse(rawData);

    // 2. Extract only meaningful data (to save tokens)
    let vulnerabilities = [];
    if (report.Results) {
        report.Results.forEach(res => {
            if (res.Vulnerabilities) {
                res.Vulnerabilities.forEach(vuln => {
                    vulnerabilities.push({
                        id: vuln.VulnerabilityID,
                        pkg: vuln.PkgName,
                        severity: vuln.Severity,
                        title: vuln.Title
                    });
                });
            }
        });
    }

    if (vulnerabilities.length === 0) {
        console.log("No vulnerabilities found! AI analysis skipped.");
        return;
    }

    // 3. Construct the Prompt
    const prompt = `
  You are a Senior DevOps Security Expert. 
  I have run a security scan on my Docker image and found the following vulnerabilities:
  ${JSON.stringify(vulnerabilities.slice(0, 10))} 
  (Note: showing top 10 only)

  Please provide a summary in simple, non-technical language:
  1. How dangerous is this?
  2. What should I do to fix it? (Keep it short and actionable)
  `;

    // 4. Call Groq API
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Fast and smart model
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const aiAdvice = data.choices[0].message.content;

        console.log("\n--- 🤖 AI SECURITY ANALYSIS ---\n");
        console.log(aiAdvice);
        console.log("\n-------------------------------\n");

        // Save advice to file so Jenkins can email it
        fs.writeFileSync('ai-advice.txt', aiAdvice);

    } catch (error) {
        console.error("Error calling AI:", error);
    }
}

analyze();