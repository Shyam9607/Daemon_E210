const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;

console.log("--- Gemini API Debug Tool ---");
console.log("Key length:", API_KEY ? API_KEY.length : "MISSING");

async function runTests() {
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Test 1: Gemini 1.5 Flash (Standard)
    try {
        console.log("\n[Test 1] Testing gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Say 'Flash OK'");
        console.log("SUCCESS:", result.response.text());
    } catch (e) {
        console.log("FAILED [Test 1]");
        console.log("Error:", e.message);
        // Specifically check for 404 (Model not found) or 403 (Auth)
    }

    // Test 2: Gemini Pro (Fallback)
    try {
        console.log("\n[Test 2] Testing gemini-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Say 'Pro OK'");
        console.log("SUCCESS:", result.response.text());
    } catch (e) {
        console.log("FAILED [Test 2]");
        console.log("Error:", e.message);
    }

    // Test 3: List Models (if verifiable via some other means, mostly checking connection here)
    // Since listModels isn't on the standard client instance in this version, we skip.
}

runTests();
