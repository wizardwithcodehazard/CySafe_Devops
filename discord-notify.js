/* eslint-disable no-undef */
import fs from 'fs';

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const BUILD_URL = process.env.BUILD_URL;
const JOB_NAME = process.env.JOB_NAME;
const BUILD_NUMBER = process.env.BUILD_NUMBER;
const STATUS = process.env.BUILD_STATUS;

async function sendNotification() {
    if (!WEBHOOK_URL) return;

    let aiSummary = "No AI analysis available.";

    if (fs.existsSync('ai-advice.txt')) {
        let rawHtml = fs.readFileSync('ai-advice.txt', 'utf8');

        // 1. Remove CSS
        rawHtml = rawHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

        // 2. INTELLIGENT CUT: Keep ONLY the "Executive Summary"
        // Stop reading when the "Technical Deep Dive" section starts
        let summaryOnly = rawHtml.split(/Technical Deep Dive|Top Threats/i)[0];

        // 3. TABLE FIX: Format the "Severity Count" table nicely
        // Converts "</td><td>" to ": " (e.g., "High: 0")
        summaryOnly = summaryOnly.replace(/<\/td>\s*<td[^>]*>/gi, ': ');
        // Converts "</tr>" to new line
        summaryOnly = summaryOnly.replace(/<\/tr>/gi, '\n');

        // 4. CLEANUP: Handle headers and strip tags
        summaryOnly = summaryOnly.replace(/<h[1-6]>/gi, '\n**'); // Bold headers
        summaryOnly = summaryOnly.replace(/<\/h[1-6]>/gi, '**\n');

        // Strip all remaining HTML tags
        let cleanText = summaryOnly.replace(/<[^>]+>/g, '');

        // 5. POLISH: Remove extra blank lines and add footer
        aiSummary = cleanText.replace(/\n\s*\n/g, '\n').trim();
        aiSummary += "\n\n👉 *See email for full technical report.*";
    }

    const color = STATUS === 'SUCCESS' ? 5763719 : 15548997; // Green : Red

    const payload = {
        embeds: [{
            title: `🚀 Build ${STATUS}: ${JOB_NAME} #${BUILD_NUMBER}`,
            url: BUILD_URL,
            color: color,
            fields: [
                {
                    name: "🔍 AI Security Snapshot",
                    value: aiSummary
                }
            ],
            footer: { text: "Jenkins CI/CD • CyberSafe Pipeline" },
            timestamp: new Date().toISOString()
        }]
    };

    try {
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        console.log("Discord notification sent!");
    } catch (error) {
        console.error("Failed to send Discord alert:", error);
    }
}

sendNotification();