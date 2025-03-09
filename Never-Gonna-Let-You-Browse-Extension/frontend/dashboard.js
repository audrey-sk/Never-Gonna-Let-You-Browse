const activateRickRoll = () => {
    var cur = chrome.storage.sync.get( { rickroll: true } );

    //if (cur == true) { document.getElementById("rickrolltext").innerHTML = "Let the<br>Rickrolling<br>begin!"; }
    //else { document.getElementById("rickrolltext").innerHTML = "You're safe<br>... For now"; }
    if (cur == true) { document.getElementsByTagName("h2").innerHTML = "<p>Let the<br>Rickrolling<br>begin!</p>"; }
    else { document.getElementsByTagName("h3").innerHTML = "<p>You're safe<br>... For now</p>"; }

    chrome.storage.sync.set( { rickroll: !cur } );
};

const activateRandom = () => {
    var cur = chrome.storage.sync.get( { random: true } );

    if (cur == true) { document.getElementById("randomtext").innerHTML = "<p>Random madness</p>"; }
    else { document.getElementById("randomtext").innerHTML = "<p>Constant chaos</p>"; }

    chrome.storage.sync.set( { rickroll: !cur } );
};

const restoreOptions = () => {
    var curRickroll, curRandom = chrome.storage.sync.get( { rickroll: true, random: true } );

    if (curRickroll == true) { document.getElementById("rickrolltext").innerHTML = "<p>Let the<br>Rickrolling<br>begin!</p>"; }
    else { document.getElementById("rickrolltext").innerHTML = "<p>You're safe<br>... For now</p>"; }

    if (curRandom == true) { document.getElementById("randomtext").innerHTML = "<p>Random madness</p>"; }
    else { document.getElementById("randomtext").innerHTML = "<p>Constant chaos</p>"; }
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("rickrollbtn").addEventListener('click', activateRickRoll);
document.getElementById("randombtn").addEventListener('click', activateRandom);