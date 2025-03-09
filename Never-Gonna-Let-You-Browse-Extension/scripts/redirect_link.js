// Check extension state before running
chrome.runtime.sendMessage({ action: "getState" }, function(response) {
    if (response && response.isActive) {
        // Wait for page to fully load
        if (document.readyState === "complete") {
            initializeLinkChanger();
        } else {
            window.addEventListener("load", initializeLinkChanger);
        }
    }
});

function initializeLinkChanger() {
    chrome.storage.local.get(['random'], function(result) {
        const newState = result.random;
        const mode = newState ? (Math.random() < 0.4) : true;
        if (mode) {
            // Redirect all links
            document.querySelectorAll("a").forEach(aTag => {
                // Save original href for debugging
                const originalHref = aTag.getAttribute("href");
                aTag.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                
                // Ensure the click event is also handled
                aTag.addEventListener("click", function(e) {
                    e.preventDefault();
                    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                });
            });

            // Handle buttons properly
            document.querySelectorAll("button").forEach(btnTag => {
                // Add click handler to buttons instead of href
                btnTag.addEventListener("click", function(e) {
                    e.preventDefault();
                    if (e.currentTarget.tagName === "BUTTON") {
                        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                    }
                });
            });
        }        
        // Set up observer for dynamically added links
        setupObserver();
        
        console.log("[RickRoll] Link changer initialized successfully");
    })
}


// Observer to handle dynamically added links
function setupObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Look for added nodes
            mutation.addedNodes.forEach((node) => {
                // Check if node is an element
                if (node.nodeType === 1) {
                    // Handle links in the added node
                    if (node.tagName === "A") {
                        // Handle single link element
                        node.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                        node.addEventListener("click", function(e) {
                            e.preventDefault();
                            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                        });
                    } else if (node.tagName === "BUTTON") {
                        // Handle single button element
                        node.addEventListener("click", function(e) {
                            e.preventDefault();
                            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                        });
                    } else if (node.querySelectorAll) {
                        // Handle links inside added node
                        node.querySelectorAll("a").forEach(aTag => {
                            aTag.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
                            aTag.addEventListener("click", function(e) {
                                e.preventDefault();
                                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                            });
                        });
                        
                        // Handle buttons inside added node
                        node.querySelectorAll("button").forEach(btnTag => {
                            btnTag.addEventListener("click", function(e) {
                                e.preventDefault();
                                window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                            });
                        });
                    }
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Listen for state changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.isActive) {
        if (changes.isActive.newValue) {
            // Wait for page to fully load
            if (document.readyState === "complete") {
                initializeLinkChanger();
            } else {
                window.addEventListener("load", initializeLinkChanger);
            }
        }
    }
});