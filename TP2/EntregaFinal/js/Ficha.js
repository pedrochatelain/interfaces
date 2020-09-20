class Ficha {

    constructor(context, ancho, alto) {
        this.posicionX;
        this.posicionY;
        this.context = context;
        this.image = document.createElement("img");
        this.image.src = "token.png"
        this.ancho = ancho;
        this.alto = alto;
        this.radio = 25;
        this.isDragging = false;
    }

    draw(x, y) {
        // this.image.onload = function() {
            context.beginPath();
            let pat = context.createPattern(this.image,'repeat');
            context.arc(x, y, this.radio, 0, Math.PI * 2);
            context.fillStyle = pat
            context.fill();
            context.closePath();
        // };
        this.posicionX = x;
        this.posicionY = y;
    }

    getX() {
        return this.posicionX;
    }

    getY() {
        return this.posicionY;
    }
    
    isClicked(point) {
        return Math.sqrt((point.x-this.posicionX) ** 2 + (point.y - this.posicionY) ** 2) < this.radio;
    }

    setDragging(bool) {
        this.isDragging = bool;
    }

    setX(x) {
        this.posicionX = x;
    }

    setY(y) {
        this.posicionY = y;
    }
 
}