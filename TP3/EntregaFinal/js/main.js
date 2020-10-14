// Cuando se refresca la página sube el scroll al tope
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

let characters = document.querySelector(".js-movie-characters");
let movie_title = document.querySelector(".js-movie-title");
let clouds = document.querySelector(".js-clouds");
let cards = document.querySelectorAll(".js-card");
let hero_section = document.querySelector(".js-hero");
let cards_section = document.querySelector(".js-cards-section");

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
        } else {
            hideCards()
        }
    }
});

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
  console.log(yRotation)

  /* Calculate the rotation along the X-axis */
  const xRotation = -10 * ((y - height / 2) / height)
    // xRotation = yAxis
    // yRotation = xAxis
  
  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1)  rotateY(' + yRotation + 'deg)'
  
  /* Apply the calculated transformation */
  el.style.transform = string
}


