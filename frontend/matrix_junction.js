// MATRIX JUNCTION (Background Service)

chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Relay Logic
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.signal === 'UPLINK_DATA') {
        const { payload, userIntent } = request;

        // Talk to Localhost Backend
        fetch('http://localhost:3001/ask_daemon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fluxData: payload,
                userSignal: userIntent
            })
        })
            .then(r => r.json())
            .then(data => sendResponse({ success: true, uplink: data }))
            .catch(err => sendResponse({ success: false, error: err.message }));

        return true; // Async wait
    }
});
