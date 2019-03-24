let title = document.querySelector('.content__title') // Select the title 
let subtitle = document.querySelector('.content__subtitle') // Select the subtitle

let xhttp = new XMLHttpRequest() // Create the http request

// Listener for change the language of the site
document.querySelector('.lang__fr').addEventListener('click', function() {
    updateContent('/data/langFR.json')
})

// Listener for change the language of the site
document.querySelector('.lang__en').addEventListener('click', function() {
    updateContent('/data/langEN.json')
})

// Function to send the http request and insert the file in the page
let updateContent = function(url) {
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            title.innerText = data.content.title
            subtitle.innerHTML = data.content.subtitle
        }
    }
    xhttp.open("GET", url, true)
    xhttp.send()
}