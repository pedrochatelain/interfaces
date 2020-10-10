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
        this.linea_ganadora = 4; // Define cuántas fichas consecutivas tiene que haber para ganar
        tablero.draw();
    }
    
    jugar() {
        let juego = this;
        let canvas = this.canvas;
        let ficha_clickeada;
        let offset = {}
        let tablero = this.tablero;        
        let x_fichaClickeada;
        let y_fichaClickeada;

        juego.dibujarFichas()
        juego.mostrarTurno()

        this.canvas.addEventListener("mousedown", (e) => {
            let click_position = getClickPosition(e);
            let seClickeoFicha = this.isFichaClickeada(click_position.x, click_position.y)
            if (seClickeoFicha) {
                ficha_clickeada = this.getFichaClickeada(click_position.x, click_position.y);
                x_fichaClickeada = ficha_clickeada.getX();
                y_fichaClickeada = ficha_clickeada.getY();
                if (! ficha_clickeada.fueColocadaEnTablero() && ficha_clickeada.getJugador().trim() == this.jugador_actual.trim()) {
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
    
        function onMouseUp() {
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("mouseleave", onMouseLeave);
            if (tablero.isFichaEnRampa(ficha_clickeada)) {
                let columna_ficha = tablero.getColumna(ficha_clickeada)
                if (tablero.hayLugar(columna_ficha)) {
                    // ficha_clickeada.borrar();
                    tablero.drawFicha(ficha_clickeada);
                    juego.reDraw();
                    ficha_clickeada.setColocada();
                    if (tablero.hayEspacio()) {
                        if (tablero.hayLinea(ficha_clickeada, juego.linea_ganadora)) {
                            setTimeout(() => {
                                juego.finalizar();
                                juego.felicitar();
                            }, 150);
                        } else {
                            juego.setTurno()
                            juego.mostrarTurno()
                        }
                    } else {
                        juego.mostrarEmpate();
                    }
                }
            }
            else {
                juego.reposition(ficha_clickeada, x_fichaClickeada, y_fichaClickeada)
            }
        }

        function onMouseMove(e) {
            juego.canvas.addEventListener("mouseleave", onMouseLeave);
            let click_position = getClickPosition(e)
            let ficha_x_position = click_position.x - offset.x;
            let ficha_y_position = click_position.y - offset.y;
            ficha_clickeada.draw(ficha_x_position, ficha_y_position);
            juego.reDraw();
        }

        function onMouseLeave() {
            juego.reposition(ficha_clickeada, x_fichaClickeada, y_fichaClickeada)
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
        }

    }

    reposition(ficha, x, y) {
        ficha.draw(x, y);
        this.reDraw();
    }

    isPointerOut(e) {
        return e.target !== this.canvas;
    }

    mostrarEmpate() {
        let parrafo = document.querySelector(".js-parrafo-turno");
        parrafo.innerHTML = "¡EMPATE!";
    }

    felicitar() {
        let parrafo = document.querySelector(".js-parrafo-turno");
        if (this.jugador_actual == this.jugador1) {
            parrafo.style = "color : red";
        } else {
            parrafo.style = "color: blue";
        }
        parrafo.innerHTML = "¡" + this.jugador_actual + " HA GANADO!";

    }

    finalizar() {
        this.fichas.forEach(ficha => {
            ficha.setColocada()
        });
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

    mostrarTurno() {
        let span = document.querySelector(".js-turno");
        let parrafo = document.querySelector(".js-parrafo-turno");
        if (this.jugador_actual == this.jugador1) {
            span.innerHTML = this.jugador1 + " (fichas rojas)";
        } else {
            span.innerHTML = this.jugador2 + " (fichas azules)";
        }
        parrafo.classList.remove("hidden");
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

    
    reDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // for (let i = this.fichas.length - 1; i > -1; i--) {
        //     let ficha = this.fichas[i];
        //     let x = ficha.getX();
        //     let y = ficha.getY();
        //     ficha.draw(x, y);
        // }

        this.fichas.forEach(ficha => {
            let x = ficha.getX();
            let y = ficha.getY();
            ficha.draw(x, y);
        });
    }

}