
function loadURLs() {
const urlContainer = document.getElementById("urlContainer");
const urls = JSON.parse(localStorage.getItem("urls")) || [];
urlContainer.innerHTML = urls.map((url, index) => `
        <p>
            <a href="${url}" target="_blank">${url}</a>
            <button onclick="removeURL(${index})">Remove</button>
        </p>
    `).join("");
}

function addURL() {
    const input = document.getElementById("urlInput");
    const url = input.value.trim();
    if (url) {
        let urls = JSON.parse(localStorage.getItem("urls")) || [];
        urls.unshift(url); // Add new URL to the beginning of the array
        localStorage.setItem("urls", JSON.stringify(urls));
        input.value = ""; // Clear the input field
        loadURLs(); // Reload the URLs
    }
}

function removeURL(index) {
    let urls = JSON.parse(localStorage.getItem("urls")) || [];
    urls.splice(index, 1); // Remove the URL at the given index
    localStorage.setItem("urls", JSON.stringify(urls)); // Update localStorage
    loadURLs(); // Reload the URLs after removal
}

document.addEventListener("DOMContentLoaded", loadURLs);
document.getElementById("submitbtn").onclick = addURL;