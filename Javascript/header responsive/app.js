const nav = document.querySelector('.navbar');
const navbis = document.querySelector('ul');

window.addEventListener('scroll', ()=> {
    if(window.scrollY >= 60){
        nav.classList.add('scroll');
        
    }else{
        nav.classList.remove('scroll');
    }
    
});

function deroule(){
    navbis.classList.toggle("menu");
}