// for left-click:
document.addEventListener('click', function(e){ replaceLink(e); });

// for right-click and wheel click:
document.addEventListener('auxclick', function(e){ replaceLink(e); });

function replaceLink(e) {
    //alert(e.target);
    const bool = Math.random() < 0.25 // 25% chance
    if (bool) {
        if (e.target.matches('a')) {
            e.target.setAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }
    }
}