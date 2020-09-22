class Tablero {

    constructor(canvas, context, nro_filas, nro_columnas) {
        this.canvas = canvas;
        this.context = context;
        this.filas = nro_filas;
        this.columnas = nro_columnas;
        this.createEmptyMatrix(this.filas, this.columnas)
        this.celdas;
        this.rampas = [];
    }
    
    definirRampas() {
        let x;
        let y;
        for (let i = 0; i < this.columnas; i++) {
            let celda_actual = this.celdas[0][i];
            x = celda_actual.x + (celda_actual.width / 2);
            y = celda_actual.y - celda_actual.height;
            this.rampas.push({
                "x" : x,
                "y" : y
            })
        }
        console.log(this.rampas)
    }

    createEmptyMatrix(filas, columnas) {
        var matrix = [];
        for(var i=0; i<filas; i++) {
            matrix[i] = new Array(columnas);
        }
        this.celdas = matrix;
    }

    draw() {
        
        let padding_left = canvas.width * 0.22;
        let padding_right = canvas.width * 0.22;
        let padding_top = canvas.height * 0.15;
        let cell_width = (canvas.width - padding_left - padding_right) / this.columnas;
        let cell_height = (canvas.height - padding_top) / this.filas;

        
        for (let x = padding_left, i = 0; x < canvas.width - padding_right; x += cell_width, i++) {
            for (let y = padding_top, j = 0; y < canvas.height; y += cell_height, j++) {
                this.#drawCell(x, y, cell_width, cell_height, this.context);
                this.celdas[j][i] =
                    {
                        'x' : x,
                        'y' : y,
                        'width' : cell_width,
                        'height' : cell_height,
                        "hayFicha" : false
                    }
            }
        }

        this.definirRampas()
        console.log(this.celdas)
    }

    // addFicha(ficha, x, y) {
    //     ficha.draw(x, y)
    // }

    // seQuiereAgregar(ficha) {
    //     for (let i = 0; i < this.rampas.length; i++) {
    //         let rampa_actual = this.rampas[i];
    //         if (ficha.getX() == rampa_actual.x)
    //     }
    // }
    
    #drawCell(x, y, cell_width, cell_height, context) {

        let image = new Image();

        image.src = "cell_img.png";
        image.onload = function() {
            // Dibuja la imagen que representa a una celda en el canvas invisible
            let canvas_img = document.querySelector(".js-img");
            let context_img = canvas_img.getContext("2d");
            canvas_img.width = cell_width;
            canvas_img.height = cell_height;
            context_img.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas_img.width, canvas_img.height);
            // Dibuja el canvas invisible (que es igual a la imagen) en la posicion x, y
            context.drawImage(canvas_img, x, y)
            
        }
    }

    isFichaEnRampa(ficha) {
        let circle = new Path2D();
        circle.arc(ficha.getX(), ficha.getY(), ficha.radio, 0, Math.PI * 2)
        for (let i = 0; i < this.rampas.length; i++) {
            let rampa_actual = this.rampas[i];
            if(this.context.isPointInPath(circle, rampa_actual.x, rampa_actual.y)) {
                return true;
            }
        }
        return false
    }

    getColumna(ficha) {
        let circle = new Path2D();
        circle.arc(ficha.getX(), ficha.getY(), ficha.radio, 0, Math.PI * 2)
        for (let i = 0; i < this.rampas.length; i++) {
            let rampa_actual = this.rampas[i];
            if(this.context.isPointInPath(circle, rampa_actual.x, rampa_actual.y)) {
                return i;
            }
        }
        return false
    }

    drawFicha(ficha) {
        let columna = this.getColumna(ficha);
        let x = this.celdas[this.filas-1][columna].x;
        let y = this.celdas[this.filas-1][columna].y;
        ficha.draw(x, y)
    }

}