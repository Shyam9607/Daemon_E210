// Simple in-memory state store for the agent
// In a real production app, this would be in a database (Redis/Postgres)

const MAX_STEPS = 15;

// Domain-level memory (Shared across tasks for the same site)
// Map<domain, { semanticMap: {}, knownPaths: [] }>
let domainMemory = {};

let sessionState = {
    sessionId: "default",
    goal: null,
    status: "idle", // idle | in_progress | completed | failed
    stepCount: 0,
    history: [],
    visitedUrls: []
};

function getDomain(url) {
    try {
        const u = new URL(url);
        return u.hostname;
    } catch (e) {
        return "unknown";
    }
}

function getState() {
    return sessionState;
}

function initNewTask(goal) {
    sessionState = {
        sessionId: "default",
        goal: goal,
        status: "in_progress",
        stepCount: 0,
        history: [],
        visitedUrls: []
    };
    console.log(`[Agent State] New Task Initialized: "${goal}"`);
    return sessionState;
}

function updateState(actionResult) {
    sessionState.stepCount++;

    // Track visited URLs
    if (actionResult.url) {
        sessionState.visitedUrls.push(actionResult.url);

        // --- Phase D: Update Domain Memory ---
        const domain = getDomain(actionResult.url);
        if (!domainMemory[domain]) {
            domainMemory[domain] = { semanticMap: {}, knownPaths: [] };
        }
        if (!domainMemory[domain].knownPaths.includes(actionResult.url)) {
            domainMemory[domain].knownPaths.push(actionResult.url);
        }

        // If the AI learned something new (sent in actionResult via server logic)
        if (actionResult.learning) {
            // learning: { selector: "#nav", label: "Main Menu" }
            const { selector, label } = actionResult.learning;
            domainMemory[domain].semanticMap[selector] = label;
            console.log(`[Memory] Learned that '${selector}' is '${label}' on ${domain}`);
        }
    }

    // Append to history (keep it concise for prompt context)
    sessionState.history.push({
        step: sessionState.stepCount,
        action: actionResult.lastAction,
        observation: actionResult.observation
    });

    // Slice history if too long to save tokens
    if (sessionState.history.length > 10) {
        sessionState.history = sessionState.history.slice(-10);
    }

    return sessionState;
}

function checkSafety() {
    // 1. Max Steps
    if (sessionState.stepCount >= MAX_STEPS) {
        return { safe: false, reason: "Maximum step limit reached (15). stopping to save resources." };
    }

    // 2. Loop / Stuck Detection
    // Check if the last 3 URLs are the same (and valid)
    const len = sessionState.visitedUrls.length;
    if (len >= 3) {
        const last3 = sessionState.visitedUrls.slice(-3);
        if (last3[0] === last3[1] && last3[1] === last3[2]) {
            return { safe: false, reason: "I seem to be stuck on the same page. Aborting." };
        }
    }

    return { safe: true };
}

function abortTask() {
    sessionState.status = "failed";
    console.log("[Agent State] Task Aborted manually or by safety guard.");
    return sessionState;
}

function setStatus(status) {
    sessionState.status = status;
}

function getMemory(url) {
    const domain = getDomain(url);
    return domainMemory[domain] || { semanticMap: {}, knownPaths: [] };
}

module.exports = { getState, initNewTask, updateState, setStatus, checkSafety, abortTask, getMemory };
