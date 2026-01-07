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
app.post('/query', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const context = req.body.context;

        console.log(`[Received] Message: ${userMessage}`);

        if (context) {
            console.log(`[Context] URL: ${context.url}`);
            console.log(`[Context] Title: ${context.title}`);
        }

        // Generate AI Response
        const aiResponse = await aiService.generateResponse(userMessage, context);
        console.log("[AI Output]", aiResponse);

        res.json({
            response: aiResponse.answer, // For backward compatibility with basic UI
            data: aiResponse // Full structured data for future UI updates
        });
    } catch (error) {
        console.error('Error processing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('OmniNav Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
