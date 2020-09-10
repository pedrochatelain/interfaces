function init() {
    let canvas = document.querySelector(".js-my-canvas");
    let context = canvas.getContext("2d");
    let canvas_invisible = document.querySelector(".js-canvas-invisible"); // donde se coloca la imagen con tamaño original
    let context_canvas_invisible = canvas_invisible.getContext("2d");

    dibujo(canvas, context);

    imagen(canvas, context, canvas_invisible, context_canvas_invisible);

}

addEventListener("DOMContentLoaded", init);

let boton_filtro_negativo = document.querySelector(".js-filtro-negativo");
let boton_filtro_brillo = document.querySelector(".js-filtro-brillo");
let boton_filtro_grayscale = document.querySelector(".js-filtro-grayscale");
let boton_filtro_sepia = document.querySelector(".js-filtro-sepia");

// ---- Comportamiento ---- //






/* ----------------------------------- CARGA DE IMAGEN ----------------------------------- */


/* ----------------------------------- FILTROS ----------------------------------- */


boton_filtro_negativo.addEventListener("click", function() { setNegativo(canvas, canvas_invisible) });
boton_filtro_brillo.addEventListener("click", function() { setBrillo(canvas, canvas_invisible) });
boton_filtro_grayscale.addEventListener("click", function() { setGrayscale(canvas, canvas_invisible) });
boton_filtro_sepia.addEventListener("click", function() { setSepia(canvas, canvas_invisible) });