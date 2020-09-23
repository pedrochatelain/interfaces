class Ficha {

    constructor(context, radio) {
        this.posicionX;
        this.posicionY;
        this.context = context;
        this.image = document.createElement("img");
        this.image.src = "img/red.jpg"
        this.radio = radio;
        this.isDragging = false;
        this.fueColocada = false;
    }

    draw(x, y) {
        // this.image.onload = function() {
            this.context.beginPath();
            let pat = context.createPattern(this.image,'repeat');
            this.context.arc(x, y, this.radio, 0, Math.PI * 2);
            this.context.fillStyle = pat
            this.context.fill();
            this.context.closePath();
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
    
    isClicked(x, y) {
        return Math.sqrt((x-this.posicionX) ** 2 + (y - this.posicionY) ** 2) < this.radio;
    }

    setDragging(bool) {
        this.isDragging = bool;
    }

    isDragging() {
        return this.isDragging;
    }

    setX(x) {
        this.posicionX = x;
    }

    setY(y) {
        this.posicionY = y;
    }

    borrar() {
        this.context.beginPath();
        console.log(this.posicionX);
        console.log(this.posicionY)
        this.context.arc(this.posicionX, this.posicionY, this.radio, 0, Math.PI * 2);
        this.context.fillStyle = "#FFFFFF"
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#FFFFFF";
        this.context.stroke();
    
        this.context.closePath();

    }

    setColocada() {
        this.fueColocada = true;
    }
 
    fueColocadaEnTablero() {
        return this.fueColocada;
    }

}