// Cuando se refresca la página sube el scroll al tope
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

// let body = document.querySelector("body");
// body.style.overflow = "hidden"
// console.log(body)

let hero_section = document.querySelector(".js-hero");
let clouds = document.querySelector(".js-clouds");
let movie_title = document.querySelector(".js-movie-title");
let characters = document.querySelector(".js-movie-characters");
let cards_section = document.querySelector(".js-cards-section");
let cards = document.querySelectorAll(".js-card");
let countdown_section = document.querySelector(".js-countdown");
let carousel = document.querySelector(".js-carousel");
let nav = document.querySelector(".js-nav");
let boton_calendario = document.querySelector(".js-calendario");
const boton_formulario = document.querySelector(".js-formulario")

window.addEventListener("scroll", function() {
    if (isOnScreen(hero_section)) {
        showHero();
        checkOpacity(characters);
        checkOpacity(movie_title);
        checkOpacity(nav);
        hideCards();
    } else {
        hideHero();
        if (isOnScreen(cards_section)) {
            showCards();
            checkHoverCards();
        }
        else hideCards();

        if (isOnScreen(countdown_section))
            showCountdown();
        else
            hideCountdown();

        if (isOnScreen(carousel))
            showCarousel();
        else
            hideCarousel();
    }
});

boton_calendario.addEventListener("click", function() {
    hideHero();
    hideCards();
    hideCountdown();
    hideCarousel();
    location.href = "calendario.html";
})

boton_formulario.addEventListener("click", function() {
    location.href = "formulario.html";
})

function showCarousel() {
    carousel.classList.add("opacity-countdown");
    carousel.classList.remove("no-opacity");
    carousel.style.opacity = 1;
}

function hideCarousel() {
    carousel.classList.remove("opacity-countdown");
    carousel.classList.add("no-opacity");
    carousel.style.opacity = 0;
}

function hideCountdown() {
    countdown_section.classList.remove("opacity-countdown");
    countdown_section.classList.add("no-opacity");
    countdown_section.style.opacity = 0;
}

function showCountdown() {
    countdown_section.classList.add("opacity-countdown");
    countdown_section.classList.remove("no-opacity");
    countdown_section.style.opacity = 1;
}

// Devuelve true si el elemento se está mostrando en la pantalla
function isOnScreen(element) {
    var rect = element.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function showHero() {
    show(movie_title);
    show(characters);
    show(clouds);
    show(nav);
}

function show(element) {
    element.classList.remove("hide");
}

function hide(element) {
    element.classList.add("hide");
}

function hideHero() {
    hide(movie_title);
    hide(characters);
    hide(clouds);
    hide(nav);
    removeOpacityAnimation(characters);
    removeOpacityAnimation(movie_title);
    removeOpacityAnimation(nav);
}

function removeOpacityAnimation(element) {
    element.classList.remove("opacity-animation");
}

function checkOpacity(element) {
    element.style.opacity = 1 - window.scrollY / window.innerHeight;
}

function hideCards() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.classList.remove("expandir");
        card.style.width = "0";
    }
}

function showCards() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.classList.add("expandir");
        card.style.width = "calc(80vw / 3)";
    }
}

function removeClouds() {
    let clouds = document.querySelector(".clouds");
    clouds.classList.add("hide");
    clouds.classList.remove("add-clouds");
}

function addClouds() {
    let clouds = document.querySelector(".clouds");
    clouds.classList.remove("hide");
    clouds.classList.add("add-clouds");
}

function checkHoverCards() {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        card.addEventListener("mousemove", function() { handleMove(event, card) })
        card.addEventListener('mouseout', function() {
            card.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
        })
    }
}

function handleMove(e, el) {

    /* Get the height and width of the element */
    let width = cards[0].clientWidth

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.

    if (x > width / 2) {
        var yRotation = 10*((x + width / 2) / width)
    } else {
        var yRotation = 20*((x - width / 2) / width)
    }

    /* Generate string for CSS transform property */
    const string = 'perspective(500px) scale(1.1)  rotateY(' + yRotation + 'deg)'

    /* Apply the calculated transformation */
    el.style.transform = string
}


