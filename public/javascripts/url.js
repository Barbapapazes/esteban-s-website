let href = document.querySelectorAll('.lang a')

href.forEach(element => {
    element.pathname += window.location.pathname
});