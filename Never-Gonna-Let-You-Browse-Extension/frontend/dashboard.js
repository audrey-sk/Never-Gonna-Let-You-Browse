const activateRickRoll = () => {
    var cur = chrome.storage.sync.get( { rickroll: true } );

    if (cur == true) { document.getElementById("rickrolltext").innerHTML = "Let the<br>Rickrolling<br>begin!"; }
    else { document.getElementById("rickrolltext").innerHTML = "You're safe<br>... For now"; }

    chrome.storage.sync.set( { rickroll: !cur } );
};

const activateRandom = () => {
    var cur = chrome.storage.sync.get( { random: true } );

    if (cur == true) { document.getElementById("randomtext").innerHTML = "Random madness"; }
    else { document.getElementById("randomtext").innerHTML = "Constant chaos"; }

    chrome.storage.sync.set( { rickroll: !cur } );
};

const restoreOptions = () => {
    var curRickroll, curRandom = chrome.storage.sync.get( { rickroll: true, random: true } );

    if (curRickroll == true) { document.getElementById("rickrolltext").innerHTML = "Let the<br>Rickrolling<br>begin!"; }
    else { document.getElementById("rickrolltext").innerHTML = "You're safe<br>... For now"; }

    if (curRandom == true) { document.getElementById("randomtext").innerHTML = "Random madness"; }
    else { document.getElementById("randomtext").innerHTML = "Constant chaos"; }
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById("rickrollbtn").addEventListener('click', activateRickRoll);
document.getElementById("randombtn").addEventListener('click', activateRandom);