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

}

setUpCanvas;