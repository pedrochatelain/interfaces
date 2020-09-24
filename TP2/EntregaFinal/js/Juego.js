class Juego {

    constructor(canvas, context, tablero, jugador1, jugador2) {
        this.canvas = canvas;
        this.context = context;
        this.tablero = tablero;
        this.fichas = [];
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.hayGanador = false;
        this.jugador_actual = this.jugador1;
        this.linea_ganadora = 2; // Define cuántas fichas consecutivas tiene que haber para ganar
    }

    jugar() {
        let juego = this;
        let canvas = this.canvas;
        let ficha_clickeada;
        let offset = {}
        let tablero = this.tablero;

        tablero.draw()

        juego.dibujarFichas()

        this.canvas.addEventListener("mousedown", (e) => {
            let click_position = getClickPosition(e);
            let seClickeoFicha = this.isFichaClickeada(click_position.x, click_position.y)
            if (seClickeoFicha) {
                ficha_clickeada = this.getFichaClickeada(click_position.x, click_position.y);
                if (! ficha_clickeada.fueColocadaEnTablero() && ficha_clickeada.getJugador() == this.jugador_actual) {
                    this.canvas.addEventListener("mousemove", onMouseMove);
                    this.canvas.addEventListener("mouseup", onMouseUp);
                    // para que no haga drag desde el centro de la ficha defino "offset"
                    offset.x = click_position.x - ficha_clickeada.getX(); 
                    offset.y = click_position.y - ficha_clickeada.getY();
                }
            }

        })

        function getClickPosition(e) {
            let rect = canvas.getBoundingClientRect();
            let _x = e.clientX - rect.left;
            let _y = e.clientY - rect.top;      
            let position = {
                x: _x,
                y: _y
            }
            return position;
        }

        function onMouseMove(e) {
            let click_position = getClickPosition(e)
            let ficha_x_position = click_position.x - offset.x;
            let ficha_y_position = click_position.y - offset.y;
            ficha_clickeada.draw(ficha_x_position, ficha_y_position);
            juego.reDraw(ficha_clickeada);
        }
    
        function onMouseUp() {
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
            if (tablero.isFichaEnRampa(ficha_clickeada)) {
                let columna_ficha = tablero.getColumna(ficha_clickeada)
                if (tablero.hayLugar(columna_ficha)) {
                    ficha_clickeada.borrar();
                    tablero.drawFicha(ficha_clickeada);
                    ficha_clickeada.setColocada();
                    if (tablero.seGano(ficha_clickeada, juego.linea_ganadora)) {
                        setTimeout(() => {
                            alert("¡" + juego.jugador_actual + " ha ganado!");
                        }, 150);
                    } else {
                        juego.setTurno()
                    }
                }
            }
            
        }

    }

    setTurno() {
        if (this.jugador_actual == this.jugador1) {
            this.jugador_actual = this.jugador2;
        } else {
            this.jugador_actual = this.jugador1;
        }
    }

    dibujarFichas() {

        let randomNumber = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        for (let i = 0; i < this.fichas.length / 2; i++) {
            let ficha = this.fichas[i];
            let x_random = randomNumber(ficha.radio, this.canvas.width / 6)
            let y_random = randomNumber(this.canvas.height / 3, this.canvas.height - ficha.radio)
            ficha.draw(x_random, y_random)
        }

        for (let i = this.fichas.length / 2; i < this.fichas.length; i++) {
            let ficha = this.fichas[i];
            let x_random = randomNumber(this.canvas.width / 1.2, this.canvas.width / 1.05)
            let y_random = randomNumber(this.canvas.height / 3, this.canvas.height - ficha.radio)
            ficha.draw(x_random, y_random)
        }
    }

    addFicha(ficha) {
        this.fichas.push(ficha);
    }
    
    addTablero(tablero) {
        this.tablero = tablero;
    }

    getFichaClickeada(x, y) {
        for (let i = this.fichas.length-1; i > -1; i--) {
            if (this.fichas[i].isClicked(x, y)) {
                return this.fichas[i];
            }
        }
        return null;
    }

    isFichaClickeada(x, y) {

        for (let i = 0; i < this.fichas.length; i++) {
            if (this.fichas[i].isClicked(x, y)) {
                return true;
            }
        }
        return false;
    }

    
    reDraw(ficha) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ficha.draw(ficha.getX(), ficha.getY())
        this.fichas.forEach(ficha => {
            let x = ficha.getX();
            let y = ficha.getY();
            ficha.draw(x, y);
        });
    }


}