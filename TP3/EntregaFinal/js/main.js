// Cuando se refresca la página sube el scroll al tope
// window.onbeforeunload = function () {
//     window.scrollTo(0, 0);
// }

let hero_section = document.querySelector(".js-hero");
let clouds = document.querySelector(".js-clouds");
let movie_title = document.querySelector(".js-movie-title");
let characters = document.querySelector(".js-movie-characters");
let cards_section = document.querySelector(".js-cards-section");
let cards = document.querySelectorAll(".js-card");
let countdown_section = document.querySelector(".js-countdown");
let carousel = document.querySelector(".js-carousel");

window.addEventListener("scroll", function() {
    if (isOnScreen(hero_section)) {
        showHero();
        checkOpacity(characters);
        checkOpacity(movie_title);
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
    removeOpacityAnimation(characters);
    removeOpacityAnimation(movie_title);
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




/*
  * Add a listener for mousemove event
  * Which will trigger function 'handleMove'
  * On mousemove
  */

/* Define function a */
function handleMove(e, el) {

    /* Get the height and width of the element */
    let height = cards[0].clientHeight
    let width = cards[0].clientWidth
/*
* Get position of mouse cursor
    * With respect to the element
    * On mouseover
    */
   /* Store the x position */
   const xVal = e.layerX
   /* Store the y position */
   const yVal = e.layerY

   var rect = e.target.getBoundingClientRect();
   var x = e.clientX - rect.left; //x position within the element.
   var y = e.clientY - rect.top;  //y position within the element.


//    let xAxis = (width / 2 - x) / 5;
//    let yAxis = (height / 2 - y) / 5;
   /*
   * Calculate rotation valuee along the Y-axis
   * Here the multiplier 20 is to
   * Control the rotation
   * You can change the value and see the results
   */
  if (x > width / 2) {
      var yRotation = 10*((x + width / 2) / width)
  } else {
    var yRotation = 20*((x - width / 2) / width)
  }

  /* Calculate the rotation along the X-axis */
  const xRotation = -10 * ((y - height / 2) / height)
    // xRotation = yAxis
    // yRotation = xAxis
  
  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1)  rotateY(' + yRotation + 'deg)'
  
  /* Apply the calculated transformation */
  el.style.transform = string
}


