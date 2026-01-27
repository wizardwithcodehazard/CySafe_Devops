/* eslint-disable no-undef */
import fs from 'fs';

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const BUILD_URL = process.env.BUILD_URL;
const JOB_NAME = process.env.JOB_NAME;
const BUILD_NUMBER = process.env.BUILD_NUMBER;
const STATUS = process.env.BUILD_STATUS;

async function sendNotification() {
    if (!WEBHOOK_URL) {
        console.log("No Discord Webhook URL found. Skipping.");
        return;
    }

    // 1. Read AI Advice
    let aiSummary = "No AI analysis available.";
    if (fs.existsSync('ai-advice.txt')) {
        let rawHtml = fs.readFileSync('ai-advice.txt', 'utf8');

        // --- CLEANING LOGIC START ---

        // A. Remove the entire <style>...</style> block (The CSS Code)
        rawHtml = rawHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

        // B. Replace HTML structure with Discord-friendly newlines
        rawHtml = rawHtml.replace(/<\/h[1-6]>/gi, '\n**'); // Bold headers
        rawHtml = rawHtml.replace(/<h[1-6]>/gi, '**');
        rawHtml = rawHtml.replace(/<\/tr>/gi, '\n');       // New line for table rows
        rawHtml = rawHtml.replace(/<\/p>/gi, '\n\n');      // Double line for paragraphs
        rawHtml = rawHtml.replace(/<br\s*\/?>/gi, '\n');   // Line breaks

        // C. Strip all remaining HTML tags
        aiSummary = rawHtml.replace(/<[^>]+>/g, '');

        // D. Clean up extra white space caused by stripping tags
        aiSummary = aiSummary.replace(/\n\s+\n/g, '\n\n').trim();

        // --- CLEANING LOGIC END ---

        // Truncate to 1000 chars to fit Discord's limit
        if (aiSummary.length > 1000) {
            aiSummary = aiSummary.substring(0, 997) + "...";
        }
    }

    const color = STATUS === 'SUCCESS' ? 5763719 : 15548997; // Green : Red

    const payload = {
        embeds: [{
            title: `🚀 Build ${STATUS}: ${JOB_NAME} #${BUILD_NUMBER}`,
            url: BUILD_URL,
            color: color,
            fields: [
                {
                    name: "🔍 AI Security Summary",
                    value: aiSummary || "No summary available."
                }
            ],
            footer: {
                text: "Jenkins CI/CD • CyberSafe Pipeline"
            },
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