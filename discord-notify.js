/* eslint-disable no-undef */
import fs from 'fs';

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const BUILD_URL = process.env.BUILD_URL;
const JOB_NAME = process.env.JOB_NAME;
const BUILD_NUMBER = process.env.BUILD_NUMBER;
const STATUS = process.env.BUILD_STATUS; // We will pass this from Jenkins

async function sendNotification() {
    if (!WEBHOOK_URL) {
        console.log("No Discord Webhook URL found. Skipping.");
        return;
    }

    // 1. Read AI Advice (if it exists)
    let aiSummary = "No AI analysis available.";
    if (fs.existsSync('ai-advice.txt')) {
        // Read only the first 1000 chars to fit Discord limits
        aiSummary = fs.readFileSync('ai-advice.txt', 'utf8').substring(0, 1000) + "...";
        // Strip HTML tags for Discord (simple regex)
        aiSummary = aiSummary.replace(/<[^>]*>?/gm, '');
    }

    // 2. Set Color (Green for Success, Red for Failure)
    const color = STATUS === 'SUCCESS' ? 5763719 : 15548997; // Green : Red

    // 3. Construct Payload
    const payload = {
        embeds: [{
            title: `🚀 Build ${STATUS}: ${JOB_NAME} #${BUILD_NUMBER}`,
            url: BUILD_URL,
            color: color,
            fields: [
                {
                    name: "🔍 AI Security Summary",
                    value: aiSummary
                }
            ],
            footer: {
                text: "Jenkins CI/CD • CyberSafe Pipeline"
            },
            timestamp: new Date().toISOString()
        }]
    };

    // 4. Send to Discord
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