addEventListener("DOMContentLoaded", setUpCanvas);

function setUpCanvas() {

    let herramienta = "";
    let goma = document.querySelector(".js-goma");
    let lapiz = document.querySelector(".js-lapiz");
    let isClickDown = false;
    let coordenadasActuales = {};
    let canvas = document.querySelector(".js-my-canvas");
    let context = canvas.getContext("2d");
    let lineWidthRange = document.querySelector( '.js-line-range' );    
    
    // Event will be a click event which can be retrieved as first parameter in the addEventListener(function(event){}); or in jQuery with $("selector").click(function(event){});
    function getPosition(event){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left; // x == the location of the click in the document - the location (relative to the left) of the canvas in the document
        var y = event.clientY - rect.top; // y == the location of the click in the document - the location (relative to the top) of the canvas in the document
        let coordenadas = {
            "x" : x,
            "y" : y
        }
        return coordenadas
    }
    
    function drawDot(e, herramienta) {
        let color;
        if (herramienta == "goma") {
            color = "#ffffff";
        }
        else {
            color = document.querySelector(".js-color-picker").value;
        }
        let coordenadas = getPosition(e);
        let pointSize = document.querySelector(".js-line-range").value;
        let context = canvas.getContext("2d");
    
        context.fillStyle = color;
        context.beginPath(); //Start path
        context.arc(coordenadas.x, coordenadas.y, pointSize/2, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        context.fill(); // Close the path and fill.
    }
    
    function drawLine(event, context, cooordenadasActuales) {
        let color;
        if (herramienta == "goma") {
            color = "#ffffff";
        }
        else {
            color = document.querySelector(".js-color-picker").value;
        }
        let pointSize = document.querySelector(".js-line-range").value;
        let newX = event.offsetX;
        let newY = event.offsetY;
    
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = pointSize;
        context.lineCap = 'round';
        context.moveTo( cooordenadasActuales.x, cooordenadasActuales.y );
        context.lineTo( newX, newY );
        context.stroke();
        cooordenadasActuales.x = newX;
        coordenadasActuales.y = newY; 
    }

    function getHerramientaClickeada() {
        return herramienta;
    }
    
    lineWidthRange.addEventListener( 'input', event => {
        let width = event.target.value;
        document.querySelector("#size-of-tool").querySelector("span").innerHTML = width;
        context.lineWidth = width;
    } );
    
    canvas.addEventListener( 'mousedown', function() { 
        
        isClickDown = true;
        coordenadasActuales = {
            'x' : event.offsetX,
            'y' : event.offsetY
        }
        drawDot(event, getHerramientaClickeada());
    
    });
    
    canvas.addEventListener( 'mousemove', function() {
        if (isClickDown) {
            drawLine(event, context, coordenadasActuales, getHerramientaClickeada()) 
        }
    } );
    
    canvas.addEventListener( 'mouseup', function() { isClickDown = false; });
    
    canvas.addEventListener( 'mouseout', function() { isClickDown = false;} );

    goma.addEventListener("click", function() {
        lapiz.classList.remove("pressed-button");
        goma.classList.toggle("pressed-button");
        herramienta = "goma";
    })

    lapiz.addEventListener("click", function() {
        goma.classList.remove("pressed-button");
        lapiz.classList.toggle("pressed-button");
        herramienta = "lapiz";
    })

    /* ----------------------------------- CARGA DE IMAGEN ----------------------------------- */

    let boton_seleccionar_imagen = document.querySelector(".js-btn-select-image");
    let input_select_image = document.querySelector(".js-input-select-image");

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
        let image = new Image(); // image.crossOrigin = 'Anonymous';
        image.src = content;
        return image;
    }

    function drawScaledImage(image) {
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
            let image = getImage(readerEvent);
            image.onload = function () {
                // condition ? exprIfTrue : exprIfFalse
                isImageBig(image, canvas) ? drawScaledImage(image) : context.drawImage(image, 0, 0)
            }
        }
    })

}

setUpCanvas;