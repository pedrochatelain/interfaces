class Ficha {

    constructor(context, radio, jugador, image_source) {
        this.posicionX;
        this.posicionY;
        this.context = context;
        this.image = document.createElement("img");
        this.image.src = image_source;
        this.radio = radio;
        this.isDragging = false;
        this.fueColocada = false;
        this.jugador = jugador;
    }

    getJugador() {
        return this.jugador;
    }

    draw(x, y) {
        let pat = this.context.createPattern(this.image,'repeat');
        this.context.beginPath();
        this.context.arc(x, y, this.radio, 0, Math.PI * 2);
        this.context.fillStyle = pat
        this.context.fill();
        this.context.closePath();
        this.context.lineWidth = 3;
        this.context.strokeStyle = "#000000";
        this.context.stroke();
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
        this.context.arc(this.posicionX, this.posicionY, this.radio, 0, Math.PI * 2);
        this.context.fillStyle = "rgba(255, 255, 255, 0.2)"
        this.context.fill();
        this.context.lineWidth = 3;
        this.context.strokeStyle = "rgba(255, 255, 255, 0.2)";
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