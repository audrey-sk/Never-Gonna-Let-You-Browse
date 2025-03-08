async function getCurrentTab(){
    // This querry has options for audible
    let querryOptions = { active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(querryOptions)
    console.log(tab)
    return tab
}


chrome.tabs.onCreated.addListener((tab) => {
    // Listen for updates to this new tab
    chrome.tabs.onUpdated.addListener(function updateListener(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === "loading") {
            if (changeInfo.url !== "https://www.youtube.com/watch?v=dQw4w9WgXcQ") {
                chrome.tabs.update(tabId, { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
                open = true;
            }
            chrome.tabs.onUpdated.removeListener(updateListener); // Remove listener to prevent the above happen again.
        }
    });
});
    