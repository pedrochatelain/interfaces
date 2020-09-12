function init() {

    let canvas = document.querySelector(".js-my-canvas");
    let context = canvas.getContext("2d");
    let canvas_invisible = document.querySelector(".js-canvas-invisible"); // donde se coloca la imagen con tamaño original
    let context_canvas_invisible = canvas_invisible.getContext("2d");

    dibujo(canvas, context);

    imagen(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage);

    filtro(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage);

    // devuelve true si las dimensiones de una imagen superan a las del canvas
    function isImageBig(image, canvas) {
        return canvas.height < image.height || canvas.width < image.width;
    }

    function drawScaledImage(image, context) {
        // get the scale
        var scale = Math.min(canvas.width / image.width, canvas.height / image.height);
        context.drawImage(image, 0, 0, image.width * scale, image.height * scale);
    }
    
    function drawImage(image, context) {
        context.drawImage(image, 0, 0);
    }

}
addEventListener("DOMContentLoaded", init);


