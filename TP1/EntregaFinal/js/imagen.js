function imagen(canvas, context, canvas_invisible, context_canvas_invisible) {

    let boton_seleccionar_imagen = document.querySelector(".js-btn-select-image");
    let input_select_image = document.querySelector(".js-input-select-image");
    let boton_descartar_imagen = document.querySelector(".js-delete-img");
    
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
    
    function drawScaledImage(image, canvas) {
        let context = canvas.getContext("2d");
        // get the scale
        var scale = Math.min(canvas.width / image.width, canvas.height / image.height);
        // get the top left position of the image
        var x = (canvas.width / 2) - (image.width / 2) * scale;
        var y = (canvas.height / 2) - (image.height / 2) * scale;
        context.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
    
    // devuelve true si las dimensiones de una imagen superan a las del canvas
    function isImageBig(image, canvas) {
        return canvas.height < image.height || canvas.width < image.width;
    }
    
    // Si se clickea en "Seleccionar imagen"...
    boton_seleccionar_imagen.addEventListener("click", function() {
        input_select_image.click();
    })
    
    // Si se elige una imagen...
    input_select_image.addEventListener("change", function() {
        clearCanvas(canvas);
        let reader = getReader(event);
        reader.onload = readerEvent => {
            image = getImage(readerEvent);
            image.onload = function () {
                redimensionarCanvas(canvas_invisible);
                drawImage(image, canvas_invisible);
                // condition ? exprIfTrue : exprIfFalse
                isImageBig(image, canvas) ? drawScaledImage(image, canvas) : drawImage(image, canvas);
            }
        }
    })
    
    function redimensionarCanvas(canvas) {
        canvas.width = image.width;
        canvas.height = image.height;
    }
    
    function drawImage(image, canvas) {
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
    }
    
    boton_descartar_imagen.addEventListener("click", function() {
        clearCanvas(canvas);
        clearCanvas(canvas_invisible);
    });
    
}

