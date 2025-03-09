document.querySelectorAll("img").forEach((imageTag) => {
    imageTag.src = "https://static.wikia.nocookie.net/dqw4w9wgxcq/images/0/08/Site-background-dark/revision/latest/scale-to-width-down/1400?cb=20220428173233";
    // Add CSS properties for responsive resizing
    imageTag.style.maxWidth = "auto";
    imageTag.style.height = "auto";
    imageTag.style.objectFit = "contain";
});
