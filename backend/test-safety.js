const agentState = require('./agentState');
const assert = require('assert');

console.log("🧪 Starting OmniNav Backend Safety Tests...\n");

// 1. Test Initialization
console.log("1. Testing Task Initialization...");
const state = agentState.initNewTask("Test Goal");
assert.strictEqual(state.goal, "Test Goal");
assert.strictEqual(state.stepCount, 0);
assert.strictEqual(state.status, "in_progress");
console.log("✅ Initialization Passed.\n");

// 2. Test Step Counting
console.log("2. Testing Step Counting...");
agentState.updateState({ url: "http://test.com/1", lastAction: "click", observation: "none" });
assert.strictEqual(agentState.getState().stepCount, 1);
console.log("✅ Step Count Passed.\n");

// 3. Test Stuck Detection
console.log("3. Testing Loop/Stuck Detection...");
// Visit same URL 3 times
agentState.updateState({ url: "http://stuck.com", lastAction: "wait" });
agentState.updateState({ url: "http://stuck.com", lastAction: "wait" });
agentState.updateState({ url: "http://stuck.com", lastAction: "wait" });

const safetyCheck = agentState.checkSafety();
console.log("Safety Check Result:", safetyCheck);

if (safetyCheck.safe === false && safetyCheck.reason.includes("stuck")) {
    console.log("✅ Stuck Detection Passed.\n");
} else {
    console.error("❌ Stuck Detection FAILED.");
    process.exit(1);
}

// 4. Test Max Steps
console.log("4. Testing Max Steps...");
// Reset
agentState.initNewTask("Max Step Test");
// Simulate 16 steps
for (let i = 0; i < 16; i++) {
    agentState.updateState({ url: `http://site.com/${i}`, lastAction: "step" });
}

const maxStepCheck = agentState.checkSafety();
console.log("Max Step Check Result:", maxStepCheck);

if (maxStepCheck.safe === false && maxStepCheck.reason.includes("Maximum step")) {
    console.log("✅ Max Steps Limit Passed.\n");
} else {
    console.error("❌ Max Steps Limit FAILED.");
    process.exit(1);
}

// 5. Test Memory
console.log("5. Testing Domain Memory...");
// Simulate learning
agentState.updateState({
    url: "https://example.com/home",
    lastAction: "inspect",
    learning: { selector: "#nav", label: "MainMenu" }
});

const mem = agentState.getMemory("https://example.com/about"); // Same domain
console.log("Retrieved Memory:", mem);

if (mem.semanticMap["#nav"] === "MainMenu") {
    console.log("✅ Memory Retrieval Passed.\n");
} else {
    console.error("❌ Memory Retrieval FAILED.");
    process.exit(1);
}

console.log("🎉 ALL TESTS PASSED!");
