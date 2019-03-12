let title = document.querySelector('.content__title') // Select the title 
let subtitle = document.querySelector('.content__subtitle') // Select the subtitle

let xhttp = new XMLHttpRequest() // Create the http request

document.querySelector('.langFR').addEventListener('click', function() {

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            title.innerHTML = data.content.title
            subtitle.innerHTML = data.content.subtitle
        }
    }
    xhttp.open("GET", '/data/langFR.json', true)
    xhttp.send()
})

document.querySelector('.langEN').addEventListener('click', function() {

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.responseText)
                title.innerText = data.content.title
                subtitle.innerHTML = data.content.subtitle
            }
        }
        xhttp.open("GET", '/data/langEN.json', true)
        xhttp.send()
    })
    // regarder si xhttp peut être local ou si il faut l'intégrer à chaque fois, apres le event listener, donner l'url en argument et faire une fonction global pour le event listener
let updateContent = function() {

}