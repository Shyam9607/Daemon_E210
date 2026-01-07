const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🎰 Model Roulette: Prioritize user-available models
const MODELS = [
    "gemma-3-27b-it",        // Priority 1: High Quota (14.4K/day) & Capable
    "gemma-3-12b-it",        // Priority 2: Very efficient, high quota
    "gemini-3-flash"         // Priority 3: Emergency (20 req/day limit)
];

// Stats counters
let stats = {
    totalRequests: 0,
    apiCalls: 0,
    errors: 0,
    modelUsage: {}
};

// Delay helper for backoff
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const SYSTEM_INSTRUCTION = `
You are OmniNav, an autonomous navigation agent.
Your goal is to help the user complete multi-step tasks on the web.

INPUTS:
1. USER GOAL: The original objective.
2. HISTORY: List of previous steps taken.
3. PAGE CONTEXT: Current URL, Headings, Links, Buttons.
4. MEMORY: Known facts about this website (e.g., "#nav is Main Menu").

OUTPUT:
You must return a JSON object with this EXACT structure:
{
  "status": "in_progress" | "completed" | "failed",
  "thought": "A brief reasoning about the current state and what to do next.",
  "plan": [
     { "type": "click", "selector": "..." },
     { "type": "scroll", "selector": "..." },
     { "type": "type", "selector": "...", "value": "..." },
     { "type": "wait", "selector": "body" } 
  ],
  "learning": { "selector": "...", "label": "Short Semantic Name (e.g., Main Menu)" }, 
  "answer": "Only strictly necessary if providing a final answer or asking for clarification."
}

RULES:
1. STAY FOCUSED: Compare the current page to the USER GOAL. Are we there yet?
2. LINK SELECTION: If we need to navigate, select the most relevant link.
3. LEARNING: If you encounter a major structural element (Nav, Footer, Search), output a "learning" tag so we remember it.
4. EXPERT SELECTORS: Use the concise selectors provided in the Page Context.
`;

async function generateResponse(userQuery, pageContext, agentState, domainMemory = {}) {
    stats.totalRequests++;
    stats.apiCalls++;

    // Context Strings
    const contextString = JSON.stringify(pageContext, null, 2);
    const stateString = JSON.stringify(agentState || {}, null, 2);
    const memoryString = JSON.stringify(domainMemory, null, 2);

    const prompt = `
    AGENCY STATE:
    ${stateString}

    WEBSITE MEMORY (What we know):
    ${memoryString}

    CURRENT PAGE:
    ${contextString}

    LATEST USER INPUT:
    "${userQuery}"
    `;

    // 2. Try Models (Roulette)
    for (const modelName of MODELS) {
        try {
            console.log(`[AI Service] Attempting with model: ${modelName}...`);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: { responseMimeType: "application/json" }
            });

            const result = await model.generateContent([
                { text: SYSTEM_INSTRUCTION },
                { text: prompt }
            ]);

            const responseText = result.response.text();
            console.log(`[AI Service] Success with ${modelName}!`);
            console.log("Response:", responseText);

            // Track usage
            stats.modelUsage[modelName] = (stats.modelUsage[modelName] || 0) + 1;

            const parsedResponse = JSON.parse(responseText);
            return parsedResponse;

        } catch (error) {
            console.warn(`[AI Service] ${modelName} failed: ${error.message}`);

            // Wait 1s before trying next model to behave nicely
            await delay(1000);

            if (modelName === MODELS[MODELS.length - 1]) {
                stats.errors++;
                console.error("All models failed.");
                return {
                    status: "failed",
                    thought: "I'm having connection trouble with the AIBrain.",
                    plan: [],
                    answer: "I'm currently overloaded. Please wait 10 seconds and try again."
                };
            }
        }
    }
}

function getStats() {
    return stats;
}

module.exports = { generateResponse, getStats };
