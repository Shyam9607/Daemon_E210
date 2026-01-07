const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const aiService = require('./aiService');

const app = express();
const PORT = 3000;

// Enable CORS for all origins (or specifically the extension)
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Main Query Endpoint
const { generateResponse, getStats } = require('./aiService');
const agentState = require('./agentState');

app.post('/query', async (req, res) => {
    try {
        const { message, context } = req.body;
        console.log(`[Server] Received: "${message}" from ${context?.url}`);

        // 1. Analyze Intent / State Management
        let currentState = agentState.getState();

        // Handle Manual Stop
        if (message === "FORCE_STOP") {
            currentState = agentState.abortTask();
            return res.json({
                status: 'success',
                response: "🚫 Task stopped by user.",
                data: { status: "failed", plan: [] },
                state: currentState
            });
        }

        // Simple heuristic: If idle or completed, treat as new task
        if (currentState.status === 'completed' || currentState.status === 'idle' || currentState.status === 'failed') {
            currentState = agentState.initNewTask(message);
        }

        // --- SAFETY GUARD ---
        const safety = agentState.checkSafety();
        if (!safety.safe) {
            agentState.abortTask();
            return res.json({
                status: 'success',
                response: `⚠️ ${safety.reason}`,
                data: { status: "failed", plan: [] },
                state: currentState
            });
        }
        // --------------------

        // 2. AI Reasoning
        // We pass the FULL state AND Domain Memory to the AI
        const domainMemory = context ? agentState.getMemory(context.url) : {};
        const aiResponse = await generateResponse(message, context, currentState, domainMemory);

        // 3. Update State based on AI decision
        const actionSummary = aiResponse.plan ? aiResponse.plan.map(a => a.type).join(', ') : "thought";

        agentState.updateState({
            url: context.url,
            lastAction: actionSummary,
            observation: `User asked: ${message}`,
            learning: aiResponse.learning // NEW: Pass back what AI learned
        });

        // Update status if provided by AI
        if (aiResponse.status) {
            agentState.setStatus(aiResponse.status);
        }

        // 4. Send back to Frontend
        res.json({
            status: 'success',
            response: aiResponse.answer || aiResponse.thought, // fallback
            data: aiResponse,
            state: currentState
        });

    } catch (e) {
        console.error("[Server] Error processing query:", e);
        res.status(500).json({ status: 'error', message: e.message });
    }
});


// Health check
app.get('/', (req, res) => {
    res.send('OmniNav Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
