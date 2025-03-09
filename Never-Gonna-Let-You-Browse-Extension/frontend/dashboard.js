const activateRickRoll = () => {
    chrome.storage.local.get(['rickroll'], function(result) {
        const newState = !result.rickroll;
        
        // Update the UI based on the new state
        if (newState) { 
            document.getElementById("rickrolltext").innerHTML = "Let the<br>Rickrolling<br>begin!"; 
            document.getElementsByTagName("h2")[0].innerHTML = "<p>Let the<br>Rickrolling<br>begin!</p>"; 
        } else { 
            document.getElementById("rickrolltext").innerHTML = "You're safe<br>... For now"; 
            document.getElementsByTagName("h3")[0].innerHTML = "<p>You're safe<br>... For now</p>"; 
        }
        
        // Update storage state
        chrome.runtime.sendMessage({
            action: "setState",
            isActive: newState,
            rickroll: newState
        });
    });
};

const activateRandom = () => {
    chrome.storage.local.get(['random'], function(result) {
        const newState = !result.random;
        
        // Update the UI based on the new state
        if (newState) { 
            document.getElementById("randomtext").innerHTML = "<p>Random madness</p>"; 
        } else { 
            document.getElementById("randomtext").innerHTML = "<p>Constant chaos</p>"; 
        }
        
        // Update storage state
        chrome.runtime.sendMessage({
            action: "setState",
            isActive: newState,
            random: newState
        });
    });
};

const restoreOptions = () => {
    chrome.storage.local.get(['rickroll', 'random'], function(result) {
        // Update rickroll UI
        if (result.rickroll) { 
            document.getElementById("rickrolltext").innerHTML = "<p>Let the<br>Rickrolling<br>begin!</p>"; 
        } else { 
            document.getElementById("rickrolltext").innerHTML = "<p>You're safe<br>... For now</p>"; 
        }
        
        // Update random UI
        if (result.random) { 
            document.getElementById("randomtext").innerHTML = "<p>Random madness</p>"; 
        } else { 
            document.getElementById("randomtext").innerHTML = "<p>Constant chaos</p>"; 
        }
    });
};

document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    
    // Make sure elements exist before adding listeners
    const rickrollBtn = document.getElementById("rickrollbtn");
    const randomBtn = document.getElementById("randombtn");
    
    if (rickrollBtn) {
        rickrollBtn.addEventListener('click', activateRickRoll);
    }
    
    if (randomBtn) {
        randomBtn.addEventListener('click', activateRandom);
    }
});