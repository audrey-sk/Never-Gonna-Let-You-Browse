document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const statusEl = document.getElementById('status');
    const randomButton = document.getElementById('randomButton');
    const madnessButton = document.getElementById('madnessButton');

    // Load initial state
    chrome.storage.local.get(['isActive'], function(result) {
        updateUI(result.isActive);
    });

    // Toggle functionality
    toggleButton.addEventListener('click', function() {
        // Disable button during transition
        toggleButton.disabled = true;
        
        const isActive = !toggleButton.classList.contains('active');
        updateUI(isActive);
        
        // Show status message
        statusEl.textContent = isActive ? 'Activating...' : 'Deactivating...';
        statusEl.classList.add('blink');
        
        // Send message to background script
        chrome.runtime.sendMessage({
            action: "setState",
            isActive: isActive
        }, function(response) {
            if (response && response.success) {
                // Update status
                statusEl.textContent = isActive ? 'ACTIVATED! Reloading...' : 'DEACTIVATED! Reloading...';
                
                // Reload current tab to apply changes
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    if (tabs[0]) {
                        chrome.tabs.reload(tabs[0].id);
                    }
                    // Re-enable button after a short delay
                    setTimeout(() => {
                        toggleButton.disabled = false;
                        statusEl.classList.remove('blink');
                        // Clear status after a moment
                        setTimeout(() => {
                            statusEl.textContent = '';
                        }, 1500);
                    }, 500);
                });
            } else {
                // Error case
                statusEl.textContent = 'Error! Try again';
                toggleButton.disabled = false;
                statusEl.classList.remove('blink');
            }
        });
    });

    // Load initial state
    chrome.storage.local.get(['random'], function(result) {
        // Set initial button text based on current state
        randomButton.textContent = result.random ? 'CONSTANT' : 'RANDOM';
        
        randomButton.addEventListener('click', function() {
            // Disable button during transition
            randomButton.disabled = true;
            
            // Toggle the state (opposite of current state)
            const newRandomState = !result.random;
            result.random = newRandomState; // Update our local reference
            
            // Update button text
            randomButton.textContent = newRandomState ? 'CONSTANT' : 'RANDOM';

            // Show status message
            statusEl.textContent = 'Switching...';
            statusEl.classList.add('blink');
            
            // Send message to background script
            chrome.runtime.sendMessage({
                action: "setState",
                random: newRandomState,  // Send the new toggled state
            }, function(response) {
                if (response && response.success) {
                    // Reload current tab to apply changes
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if (tabs[0]) {
                            chrome.tabs.reload(tabs[0].id);
                        }
                        // Re-enable button after a short delay
                        setTimeout(() => {
                            randomButton.disabled = false;
                            statusEl.classList.remove('blink');
                            // Clear status after a moment
                            setTimeout(() => {
                                statusEl.textContent = '';
                            }, 1500);
                        }, 500);
                    });
                } else {
                    // Error case
                    statusEl.textContent = 'Error! Try again';
                    randomButton.disabled = false;
                    statusEl.classList.remove('blink');
                }
            });
        });
    });
    
    // Madness button functionality
    chrome.storage.local.get(['madness'], function(result) {
        madnessButton.textContent = 'START MADNESS';
        
        madnessButton.addEventListener('click', function() {
            madnessButton.disabled = true;
            statusEl.textContent = 'You will regret this...';
            statusEl.classList.add('blink');

            chrome.runtime.sendMessage({
                action: "startMadness"
            }, function(response) {
                setTimeout(() => {
                    madnessButton.disabled = false;
                    statusEl.textContent = 'Madness ended';
                    statusEl.classList.remove('blink');
                }, 15000);
            });
        });
    });
    
    function updateUI(isActive) {
        if (isActive) {
            toggleButton.classList.add('active');
            toggleButton.textContent = 'DEACTIVATE';
        } else {
            toggleButton.classList.remove('active');
            toggleButton.textContent = 'ACTIVATE';
        }
    }
});