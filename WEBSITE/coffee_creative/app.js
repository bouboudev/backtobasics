let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  //init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    const slideTl = gsap.timeline({
      //settings gsap
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    //use slide1
    //   slide image left right
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    //   zoom image
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    //   slide text left right
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide",
      // })
      .addTo(controller);
    //New Animation
    const pageTl = gsap.timeline();
    // wait for the end of the slide before animating the next one
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];

    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    //create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "page",
      //   indent: 200,
      // })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

// cursor animation
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  // logo and burger
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }

  //   text
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");

    // fill in the text
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Clique";
  } else {
    mouse.classList.remove("explore-active");
    // fill in the text
    gsap.to(".title-swipe", 1, { y: "100%" });
    mouseTxt.innerText = "";
  }
}
// navigation animation
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    // change burger into a cross
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "var(--color-dark)" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "var(--color-dark)" });
    //   change color logo
    gsap.to("#logo", 1.5, { color: "var(--color-dark)" });
    // circle background
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    //  prevent body scroll when the nav is open
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    // change burger into a cross
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "var(--color-light)" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "var(--color-light)" });
    //   change color logo
    gsap.to("#logo", 1.5, { color: "var(--color-light)" });
    // circle background
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });

    //  prevent body scroll when the nav is open
    document.body.classList.remove("hide");
  }
}

//Barba page transitions

// bug fix click dynamic link
const logo = document.querySelector("#logo");

barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "product",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //an animation
        const tl = gsap.timeline({ defaults: { ease: "power2inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5" /*delai*/
        );
      },

      enter({ current, next }) {
        let done = this.async();
        // scroll to the top
        window.scrollTo(0, 0);
        //an animation
        const tl = gsap.timeline({ defaults: { ease: "power2inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        //  animation navigation
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      },
    },
  ],
});

// detail animation
function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    // image slide right left
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      // colorStart: "white",
      // colorTrigger: "white",
      //  name: "detailScene"
      // })
      .addTo(controller);
  });
}

// event listeners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
