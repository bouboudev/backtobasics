const nav = document.querySelector('.navbar');
const navOffSetTop = nav.offsetTop;

window.addEventListener('scroll', ()=> {
    if(window.scrollY >= navOffSetTop){
        nav.style.position = 'fixed';
        nav.style.top=0;
        nav.style.width="100%";
    }
    else{
        nav.style.position = 'static';
    }
})