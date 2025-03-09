// Check extension state before running
chrome.runtime.sendMessage({ action: "getState" }, function(response) {
    if (response && response.isActive) {
        initializeImageChanger();
    }
});

function initializeImageChanger() {
    function replaceImages(image) {
        // Don't replace if already replaced - check using a custom attribute
        if (image.getAttribute('data-rickrolled')) return;
        
        image.src = "https://static.wikia.nocookie.net/dqw4w9wgxcq/images/0/08/Site-background-dark/revision/latest/scale-to-width-down/1400?cb=20220428173233";
        image.style.maxWidth = "100%";  // Ensure it's properly responsive
        image.style.height = "auto";
        image.style.objectFit = "contain";
        image.setAttribute('data-rickrolled', 'true');  // Mark as processed using setAttribute
    }

    document.querySelectorAll("img").forEach((imageTag) => {
        replaceImages(imageTag);
    });
}

// Listen for state changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.isActive) {
        if (changes.isActive.newValue) {
            initializeImageChanger();
        }
    }
});
