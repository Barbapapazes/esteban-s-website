document.querySelector('.btn-show').addEventListener('click', () => {
    document.querySelector('.menu').style.left = '0'
    document.querySelector('.btn-show').style.display = 'none'
    document.querySelector('.container').style.display = 'none'
    document.querySelector('header').style.justifyContent = 'center'
})

document.querySelector('.btn-close').addEventListener('click', () => {
    document.querySelector('.menu').style.left = '-123%'
    document.querySelector('.btn-show').style.display = 'block'
    document.querySelector('.container').style.display = 'block'
    document.querySelector('header').style.justifyContent = 'space-between'
})