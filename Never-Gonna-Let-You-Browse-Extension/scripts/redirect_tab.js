// Initialize extension state on installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        isActive: false,
        rickroll: false,
        random: false
    });
});

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getState") {
        // Return current state to content scripts
        chrome.storage.local.get(['isActive', 'rickroll', 'random'], function(result) {
            sendResponse({
                isActive: result.isActive,
                rickroll: result.rickroll,
                random: result.random
            });
        });
        return true; // Indicates we'll respond asynchronously
    } 
    else if (request.action === "setState") {
        // Update state based on popup or options page
        chrome.storage.local.set({
            isActive: request.isActive,
            rickroll: request.rickroll || request.isActive,
            random: request.random || false
        }, function() {
            sendResponse({success: true});
        });
        return true; // Indicates we'll respond asynchronously
    }
});

// Optional: Listen for tab updates to ensure content scripts are injected
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.storage.local.get(['isActive'], function(result) {
            if (result.isActive) {
                // Tab has completed loading and extension is active
                // Additional logic if needed
            }
        });
    }
});

// Check if extension is active before redirecting new tabs
chrome.tabs.onCreated.addListener((tab) => {
    // First check if extension is active
    chrome.storage.local.get(['isActive', "random"], function(result) {
        if (!result.isActive) return; // Exit if extension is not active

        const newState = result.random;
        const mode = newState ? (Math.random() < 0.4) : true;
        if (mode) {
        // Listen for updates to this new tab
        chrome.tabs.onUpdated.addListener(function updateListener(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status === "loading") {
                // Check again if extension is still active
                chrome.storage.local.get(['isActive'], function(result) {
                    if (result.isActive) {
                        if (changeInfo.url !== "https://www.youtube.com/watch?v=dQw4w9WgXcQ") {
                            chrome.tabs.update(tabId, { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
                        }
                    }
                    // Remove listener in any case to prevent multiple redirects
                    chrome.tabs.onUpdated.removeListener(updateListener);
                });
            }
        });
    }
    });
});