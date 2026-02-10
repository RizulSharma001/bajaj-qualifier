require('dotenv').config();
// Native fetch requires Node 18+. If this fails, we know your Node version is old too.
const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function checkModels() {
    console.log("🔍 Checking available models for your key...");
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("❌ API Error:", data.error.message);
            return;
        }

        console.log("✅ Success! Here are the valid model names you can use:");
        const models = data.models || [];
        // Filter for "generateContent" models only
        const chatModels = models.filter(m => m.supportedGenerationMethods.includes("generateContent"));

        chatModels.forEach(m => {
            // We strip 'models/' from the start to show you exactly what to put in your code
            console.log(`   "${m.name.replace('models/', '')}"`);
        });
    } catch (err) {
        console.error("❌ Network Error:", err.message);
    }
}

checkModels();