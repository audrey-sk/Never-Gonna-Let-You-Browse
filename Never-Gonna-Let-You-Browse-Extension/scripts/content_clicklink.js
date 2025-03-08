document.addEventListener('click', function(e){
    //alert(e.target);
    if (e.target.matches('a')) {
        //alert("a found");
        e.target.setAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }
});