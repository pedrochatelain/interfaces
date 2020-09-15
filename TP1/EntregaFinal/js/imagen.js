function imagen(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage) {

    let boton_seleccionar_imagen = document.querySelector(".js-btn-select-image");
    let input_select_image = document.querySelector(".js-input-select-image");
    let boton_descartar_imagen = document.querySelector(".js-delete-img");
    let imageFile;
    let btn_download_image = document.querySelector('.btn-descargar-imagen');
    let btn_download_canvas = document.querySelector('.btn-descargar-canvas');

    btn_download_canvas.addEventListener("click", function() {
        descargarCanvas(canvas);
    })

    btn_download_image.addEventListener("click", function() {
        if (imageFile) {
            descargarCanvas(canvas_invisible);
        } else {
            alert("No se seleccionó ninguna imagen");
        }
    })

    boton_descartar_imagen.addEventListener("click", function() {
        clearCanvas(canvas);
        clearCanvas(canvas_invisible);
        imageFile = null;
    });
    
    boton_seleccionar_imagen.addEventListener("click", function() {
        input_select_image.click();
    })

    input_select_image.addEventListener("change", function() {
        if (event.target.files[0] != null) { // si se seleccionó una imagen
            clearCanvas(canvas);
            imagenActual = event.target.files[0];
            let reader = getReader(event);
            reader.onload = readerEvent => {
                image = getImage(readerEvent);
                image.onload = function () {
                    redimensionarCanvas(canvas_invisible);
                    drawImage(image, context_canvas_invisible);
                    isImageBig(image, canvas) ? drawScaledImage(image, context) : drawImage(image, context);
                    filtro(canvas, context, canvas_invisible, context_canvas_invisible, isImageBig, drawScaledImage, drawImage);
                }
            }
            // Por si se clickea en "Descartar imagen" e inmediatamente se elige la misma imagen
            input_select_image.value = null;
    
            // Se permiten los filtros
            document.querySelector(".js-filtros").classList.remove("oculto");    
        }
    })

    function clearCanvas(canvas) {
        context = canvas.getContext('2d');
        context.fillStyle = "#ffffff"; // canvas background color
        context.fillRect(0, 0, canvas.width, canvas.height);
        document.querySelector(".js-filtros").classList.add("oculto");
    }
    
    function getReader(e) {
        // getting a hold of the file reference
        imageFile = e.target.files[0];
    
        // setting up the reader
        let reader = new FileReader();
        reader.readAsDataURL(imageFile); // this is reading as data url
    
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

    function descargarCanvas(canvas) {
        // IE/Edge Support (PNG only)
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob())
        } else {
            let a = document.createElement("a");
            a.href = canvas.toDataURL();
            if (imageFile != null) {
                a.download = "myCanvas." + getExtensionName(imageFile.name);
            } else {
                a.download = "myCanvas.jpg";
            }
            a.click();
        }
    }

    function getExtensionName(filename) {
        return filename.split('.').pop();
    }
    
}