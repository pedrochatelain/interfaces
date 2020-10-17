const prevBtn = document.querySelector(".js-left-arrow");
const nextBtn = document.querySelector(".js-right-arrow");
const images = document.querySelectorAll(".js-image");
const carouselSlide = document.querySelector(".js-carousel-slide")
const imageWidth = images[0].clientWidth; // Ancho que toma la imagen dentro del carousel
let counter = 1; // Imagen que se está mostrando (1 = la primer imagen, 2 = la segunda imagen, etc...)

prevBtn.addEventListener("mouseover", function() {setOpacity(prevBtn, 1) });
nextBtn.addEventListener("mouseover", function() { setOpacity(nextBtn, 1) });
prevBtn.addEventListener("mouseout", function() { setOpacity(prevBtn, 0.8) });
nextBtn.addEventListener("mouseout", function() { setOpacity(nextBtn, 0.8) });

/* Como la primer imagen que contiene el carousel es un clon de la última,
se la corre hacia la izquierda para que se muestre la primer imagen (rings1.jpg) */
carouselSlide.style.transform = 'translateX(' + (-imageWidth * counter) + 'px)';

// Cambia la propiedad "opacity" de un elemento
function setOpacity(element, n) {
    element.style.opacity = n;
}

nextBtn.addEventListener("click", function() {
    /* Si el botón es clickeado continuamente a una gran velocidad, el contador incrementa muchas veces
    provocando un bug. Para evitarlo se indica que si el contador es mayor igual a la cantidad de imagenes,
    la función corte y no haga nada. */
    if (counter >= images.length - 1)
        return;
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-imageWidth * counter) + 'px)';
});

prevBtn.addEventListener("click", function() {
    /* Si el botón es clickeado continuamente a una gran velocidad, el contador decrementa muchas veces
    provocando un bug. Para evitarlo se indica que si el contador es menor igual a la cantidad de imagenes,
    la función corte y no haga nada. */
    if (counter <= 0)
        return;
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-imageWidth * counter) + 'px)';
});

// Cada vez que una transition termina...
carouselSlide.addEventListener("transitionend", function() {
    // Si la imagen que se está mostrando es el clon de la última...
    if (images[counter].id === "js-last-clone") {
        // Setea el contador para que coincida con la anteúltima imagen (por si se clickea prevBtn)
        counter = images.length - 2;
        // Evita que se note el movimiento al cambiar de imagen
        carouselSlide.style.transition = "none";
        // Para que la anteúltima imagen se posicione al lado
        carouselSlide.style.transform = 'translateX(' + (-imageWidth * counter) + 'px)';
    }
    // Si la imagen que se está mostrando es el clon de la primera...
    if (images[counter].id === "js-first-clone") {
        // Setea el contador para que coincida con la segunda imagen (por si se clickea nextBtn)
        counter = images.length - counter;
        carouselSlide.style.transition = "none";
        carouselSlide.style.transform = 'translateX(' + (-imageWidth * counter) + 'px)';
    }
});