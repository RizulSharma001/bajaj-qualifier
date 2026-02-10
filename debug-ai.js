require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAI() {
    console.log("--- STARTING DEBUG ---");

    // 1. Check if Key exists
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("❌ ERROR: GEMINI_API_KEY is missing from .env file!");
        return;
    }
    console.log(`✅ API Key found: ${key.substring(0, 8)}...`);

    const genAI = new GoogleGenerativeAI(key);

    // 2. Test Model: gemini-1.5-flash (Best for Free Tier)
    console.log("\nAttempting to connect with model: 'gemini-1.5-flash'...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Test connection. Reply with one word.");
        console.log("✅ SUCCESS! Response:", result.response.text());
        console.log("👉 ACTION: Update your index.js to use 'gemini-1.5-flash'");
        return;
    } catch (error) {
        console.error("❌ Failed with 'gemini-1.5-flash'. Error:", error.message);
    }

    // 3. Test Model: gemini-pro (Backup)
    console.log("\nAttempting to connect with model: 'gemini-pro'...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Test connection.");
        console.log("✅ SUCCESS! Response:", result.response.text());
        console.log("👉 ACTION: Keep your index.js as 'gemini-pro'");
    } catch (error) {
        console.error("❌ Failed with 'gemini-pro'. Error:", error.message);
    }
}

testAI();