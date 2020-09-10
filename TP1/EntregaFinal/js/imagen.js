function imagen(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage) {

    let boton_seleccionar_imagen = document.querySelector(".js-btn-select-image");
    let input_select_image = document.querySelector(".js-input-select-image");
    let boton_descartar_imagen = document.querySelector(".js-delete-img");

    boton_descartar_imagen.addEventListener("click", function() {
        clearCanvas(canvas);
        clearCanvas(canvas_invisible);
    });
    
    // Si se clickea en "Seleccionar imagen"...
    boton_seleccionar_imagen.addEventListener("click", function() {
        input_select_image.click();
    })

    input_select_image.addEventListener("change", function() {
        if (event.target.files[0] != null) {
            clearCanvas(canvas);
            imagenActual = event.target.files[0];
        }
        let reader = getReader(event);
        reader.onload = readerEvent => {
            image = getImage(readerEvent);
            image.onload = function () {
                redimensionarCanvas(canvas_invisible);
                drawImage(image, context_canvas_invisible);
                // condition ? exprIfTrue : exprIfFalse
                isImageBig(image, canvas) ? drawScaledImage(image, context) : drawImage(image, context);
            }
        }
        // Por si se clickea en "Descartar imagen" e inmediatamente se elige la misma imagen
        input_select_image.value = null;
    })

    function clearCanvas(canvas) {
        context = canvas.getContext('2d');
        context.fillStyle = "#ffffff"; // canvas background color
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function getReader(e) {
        // getting a hold of the file reference
        let file = e.target.files[0];
    
        // setting up the reader
        let reader = new FileReader();
        reader.readAsDataURL(file); // this is reading as data url
    
        return reader;
    }
    
    function getImage(readerEvent) {
        let content = readerEvent.target.result; // this is the content!
        let image = new Image();
        image.src = content;
        return image;
    }

    function redimensionarCanvas(canvas) {
        canvas.width = image.width;
        canvas.height = image.height;
    }
}

