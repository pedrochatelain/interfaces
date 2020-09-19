class Tablero {

    constructor(canvas, nro_filas, nro_columnas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.filas = nro_filas;
        this.columnas = nro_columnas;
    }

    draw() {

        let padding_left = canvas.width * 0.22;
        let padding_right = canvas.width * 0.22;
        let padding_top = canvas.height * 0.15;
        let cell_width = (canvas.width - padding_left - padding_right) / this.columnas;
        let cell_height = (canvas.height - padding_top) / this.filas;

        
        for (let x = padding_left; x < canvas.width - padding_right; x += cell_width) {
            for (let y = padding_top; y < canvas.height; y += cell_height) {
                this.#drawCell(x, y, cell_width, cell_height);
            }
        }

        
    }
    
    #drawCell(x, y, cell_width, cell_height) {

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

}

let canvas = document.querySelector(".js-canvas");
let context = canvas.getContext("2d");
myTablero = new Tablero(canvas, 6, 7);