const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // Note: older SDK versions might not support responseMimeType in generationConfig immediately without specialized setup.
    // If this fails, we will remove generationConfig and prompt for JSON textually.
    generationConfig: {
        responseMimeType: "application/json"
    }
});

const SYSTEM_INSTRUCTION = `
You are OmniNav, an intelligent browser assistant.
Your goal is to help the user navigate the website they are currently on.

INPUT:
1. User Query: A natural language question.
2. Page Context: A JSON object containing the current URL, Title, Headings, Links, and Interactables.

OUTPUT:
You must return a JSON object with the following structure:
{
  "intent": "navigation" | "informational" | "help",
  "answer": "A short, helpful natural language response to the user.",
  "steps": ["Step 1 description", "Step 2 description"],
  "actions": [
     { "type": "highlight", "selector": "unique_css_selector" },
     { "type": "click", "selector": "unique_css_selector" }
  ]
}

RULES:
1. IF the user asks to go somewhere (e.g., "Go to settings"), find the most relevant link in the 'Page Context' and create a "navigation" response. Add a "highlight" action for that link.
2. IF the user asks for information (e.g., "What is this page?"), use the 'Headings' and 'Title' to summarize.
3. IF the user asks purely general knowledge unrelated to the site, answer briefly but remind them you are a navigation agent.
4. "actions" array should contain the selectors found in the Page Context. Do not hallucinates selectors.
`;

async function generateResponse(userQuery, pageContext) {
    try {
        console.log("[AI Service] Sending request to Gemini...");
        const contextString = JSON.stringify(pageContext, null, 2);
        const prompt = `
        CONTEXT:
        ${contextString}

        USER QUERY:
        "${userQuery}"
        `;

        const result = await model.generateContent([
            { text: SYSTEM_INSTRUCTION },
            { text: prompt }
        ]);

        const responseText = result.response.text();
        console.log("Raw AI Response:", responseText);

        return JSON.parse(responseText);

    } catch (error) {
        console.error("AI Generation Error Details:");
        console.error("- Name:", error.name);
        console.error("- Message:", error.message);
        if (error.response) {
            console.error("- Status:", error.response.status);
            console.error("- Body:", JSON.stringify(error.response, null, 2));
        }

        return {
            intent: "help",
            answer: "I'm having trouble connecting to my brain right now. " + error.message,
            steps: [],
            actions: []
        };
    }
}

module.exports = { generateResponse };
