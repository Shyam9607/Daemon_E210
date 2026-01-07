// Background service worker
chrome.runtime.onInstalled.addListener(() => {
    console.log('OmniNav Extension Installed');
});

// Listener for messages from content script if needed later
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PING') {
        sendResponse({ status: 'PONG' });
    }
});
