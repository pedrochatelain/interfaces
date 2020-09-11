function dibujo(canvas, context) {
    
    let lapiz = document.querySelector(".js-lapiz");
    let goma = document.querySelector(".js-goma");
    let isClickDown = false;
    let coordenadasActuales = {};
    let grosor_herramienta = document.querySelector( '.js-line-range' );    
    let color_herramienta = document.querySelector(".js-color-picker").value;
    let herramienta_seleccionada = '';
    
    goma.addEventListener("click", function() {
        lapiz.classList.remove("pressed-button");
        goma.classList.add("pressed-button");
        color_herramienta = "#ffffff";
        herramienta_seleccionada = "goma";
    })
    
    lapiz.addEventListener("click", function() {
        goma.classList.remove("pressed-button");
        lapiz.classList.add("pressed-button");
        herramienta_seleccionada = "lapiz";
        color_herramienta = document.querySelector(".js-color-picker").value
    })
    
    /* Muestra en la página el tamaño en pixeles que tiene la herramienta seleccionada.
       Además modifica el valor de esta acorde a lo que el usuario indique */
    grosor_herramienta.addEventListener( 'input', event => {
        let width = event.target.value;
        context.lineWidth = width;
        document.querySelector("#size-of-tool").querySelector("span").innerHTML = width;
    });

    // Si se presiona el click en el canvas se modifican las coordenadas actuales y se dibuja un punto
    canvas.addEventListener( 'mousedown', function() {
        if (herramienta_seleccionada != '') {
            isClickDown = true;
            coordenadasActuales = {
                'x' : event.offsetX,
                'y' : event.offsetY
            }
            drawDot(event);
        }     
    });

    // Si dentro del canvas se está moviendo el puntero y se está presionando el click a la vez --> se dibuja una linea
    canvas.addEventListener( 'mousemove', function() {
        if (isClickDown && herramienta_seleccionada != '') {
            drawLine(event) 
        }
    });

    canvas.addEventListener( 'mouseup', function() { isClickDown = false; });

    canvas.addEventListener( 'mouseout', function() { isClickDown = false;} );

    
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
    
    function drawDot(e) {
        let coordenadas = getPosition(e);
        let pointSize = document.querySelector(".js-line-range").value;
        let context = canvas.getContext("2d");
    
        context.fillStyle = color_herramienta;
        context.beginPath(); //Start path
        context.arc(coordenadas.x, coordenadas.y, pointSize/2, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        context.fill(); // Close the path and fill.
    }
    
    function drawLine(event) {
        let pointSize = document.querySelector(".js-line-range").value;
        let newX = event.offsetX;
        let newY = event.offsetY;
    
        context.beginPath();
        context.strokeStyle = color_herramienta;
        context.lineWidth = pointSize;
        context.lineCap = 'round';
        context.moveTo( coordenadasActuales.x, coordenadasActuales.y );
        context.lineTo( newX, newY );
        context.stroke();
        coordenadasActuales.x = newX;
        coordenadasActuales.y = newY; 
    }
    
}