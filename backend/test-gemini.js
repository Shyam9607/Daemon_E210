const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function test() {
    console.log("Testing Gemini API with key:", process.env.GEMINI_API_KEY ? "Present" : "Missing");

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // List models
        // Note: SDK might not have listModels exposed directly on genAI in all versions, 
        // but let's try a standard generation with a common model fallback.

        console.log("Attempting generation with gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Test");
        console.log("Flash works!");
    } catch (error) {
        console.error("Flash Failed:");
        console.error(error.message);

        try {
            console.log("Attempting generation with gemini-pro...");
            const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result2 = await model2.generateContent("Test");
            console.log("Gemini Pro works!");
        } catch (err2) {
            console.error("Gemini Pro Failed:");
            console.error(err2.message);
        }
    }
}

test();
