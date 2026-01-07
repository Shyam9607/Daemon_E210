const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const OLLAMA_ENDPOINT = 'http://localhost:11434/api/generate';
const MODEL_ID = 'llama3.2';

// OBFUSCATED: System directive
const NEURAL_DIRECTIVE = `
You are the Daemon Controller.
Output strictly valid JSON.

For single actions:
{
  "thought": "Reasoning...",
  "target_id": "N-123",
  "operation": "CLICK" | "TYPE",
  "payload": "text"
}

For multi-step goals (e.g. "Search X and Click result"):
{
  "thought": "I need to type first, then click search.",
  "operation": "SEQUENCE",
  "steps": [
    { "target_id": "element_for_step_1", "operation": "TYPE", "payload": "text" },
    { "target_id": "element_for_step_2", "operation": "CLICK" }
  ]
}

RULES:
1. If user says "search for X", use SEQUENCE: [TYPE "X", CLICK "Search Button"].
2. If "Search Button" is not found, just TYPE "X" and rely on Auto-Enter.
3. Do NOT hallucinate IDs. Only use VISIBLE_NODES.

Context provided is a list of visible elements.
`;

app.post('/ask_daemon', async (req, res) => {
    try {
        // Renamed variable: 'fluxData' instead of 'context'
        const { fluxData, userSignal } = req.body;

        console.log(`[NeuralRelay] Received signal: ${userSignal}`);

        // Construct the prompt
        // We do NOT use chat history (Stability Rule: Clear previous actions on each request)
        const raw_input = `
        ${NEURAL_DIRECTIVE}
        
        VISIBLE_NODES:
        ${JSON.stringify(fluxData)}
        
        USER_INTENT:
        "${userSignal}"
        
        CRITICAL INSTRUCTION:
        If operation is TYPE, the "payload" MUST be the exact specific text the user asked for.
        Do NOT invent new search queries.
        If user says "search for X", payload is "X".
        
        Response:
        `;

        const payload = {
            model: MODEL_ID,
            prompt: raw_input,
            stream: false,
            format: "json" // Force JSON mode if supported by Ollama version
        };

        console.log(`[NeuralRelay] Transmitting to Core (${MODEL_ID})...`);

        const response = await axios.post(OLLAMA_ENDPOINT, payload);

        if (response.data && response.data.response) {
            let rawJson = response.data.response;
            console.log(`[NeuralRelay] Core Response:`, rawJson);

            // Basic parsing attempt
            try {
                const parsed = JSON.parse(rawJson);
                res.json({ success: true, data: parsed });
            } catch (e) {
                // Fallback extraction
                const match = rawJson.match(/\{[\s\S]*\}/);
                if (match) {
                    res.json({ success: true, data: JSON.parse(match[0]) });
                } else {
                    throw new Error("Invalid JSON format from Core");
                }
            }
        } else {
            throw new Error("Empty response from Core");
        }

    } catch (err) {
        console.error(`[NeuralRelay] Error:`, err.message);
        res.status(500).json({
            success: false,
            error: "Neural Link Failed",
            details: err.message
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`[Daemon V2] NeuralRelay Active on port ${PORT}`);
    console.log(`[Daemon V2] Linked to: ${OLLAMA_ENDPOINT} (${MODEL_ID})`);
});
