    // Toggle Switch
    let body = document.querySelector('body')
    let switchBtn = document.querySelector('.container__toggle-btn')

    // Web Storage
    if (!localStorage.getItem('theme')) {
        populateStorage()
    } else {
        setStyle()
    }

    /*let url = new URL(window.location)
    let newURL = new URL(url)

    let href = document.querySelectorAll('a[href]')*/

    // Change the stat of the button and the theme of the page
    switchBtn.addEventListener('click', switchTheme)

    function switchTheme() {
        body.classList.toggle('light')
        body.classList.toggle('dark')
        populateStorage()


        /*for (let index = 0; index < href.length; index++) {
            const element = href[index];
            element.href += url.search

    }*/
        /*if (url.searchParams.get('theme') == 'dark') {
            newURL = url.href.replace("theme=dark", "theme=light")
            window.location.href = newURL
        } else {
            newURL = url.href.replace("theme=light", "theme=dark")
            window.location.href = newURL
        }*/
    }

    function populateStorage() {
        localStorage.setItem('theme', body.classList.value)

        setStyle()
    }

    function setStyle() {
        let currentTheme = localStorage.getItem('theme')
        body.classList.value = currentTheme
        if (body.classList.value === 'light')
            switchBtn.classList.add('active')
        else
            switchBtn.classList.remove('active')
    }