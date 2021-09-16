const body = document.querySelector('body');
const scrollBar = document.querySelector('.scroll');

window.addEventListener('scroll', () => {
    let scroll = window.scrollY / (body.clientHeight - window.innerHeight);
    let scrollPercent = Math.round(scroll*100);
   scrollBar.style.width = scrollPercent + "%";
})