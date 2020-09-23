class Celda {

    constructor(x, y, width, height, context) {
        this.x = x; // punto en el eje horizontal desde donde se comienza a dibujar el rectangulo
        this.y = y; // punto en el eje vertical desde donde se comienza a dibujar el rectangulo
        this.width = width;
        this.height = height;
        this.context = context;
        this.tieneFicha = false;
        this.image = new Image();
        this.image.src = "img/cell_img.png"
    }

    // Devuelve las coordenadas (x, y) del centro del rectángulo
    getCentro() {
        let centro = {};
        centro.x = this.x + this.width / 2;
        centro.y = this.y + this.height / 2;
        return centro;
    }

    draw() {

        let canvas_img = document.createElement("canvas");
        let context_img = canvas_img.getContext("2d");
        canvas_img.width = this.width;
        canvas_img.height = this.height;
        let context = this.context;
        let x = this.x;
        let y = this.y;
        this.image.onload = function() {
            context_img.drawImage(this, 0, 0, this.width, this.height,
                                  0, 0, canvas_img.width, canvas_img.height);
            
            context.drawImage(canvas_img, x, y)
        }

    }

}