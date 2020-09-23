class Juego {

    constructor(canvas, context, tablero) {
        this.canvas = canvas;
        this.context = context;
        this.tablero = tablero;
        this.fichas = [];
        this.checkFiguras();
        this.tablero.draw();
    }

    checkFiguras() {
        let juego = this;
        let canvas = this.canvas;
        let ficha_clickeada;
        let offset = {}
        let tablero = this.tablero;

        this.canvas.addEventListener("mousedown", (e) => {
            let click_position = getClickPosition(e)
            if (this.isFichaClickeada(click_position.x, click_position.y)) {
                ficha_clickeada = this.getFichaClickeada(click_position.x, click_position.y);
                this.canvas.addEventListener("mousemove", onMouseMove);
                this.canvas.addEventListener("mouseup", onMouseUp);
                // para que no haga drag desde el centro de la ficha defino "offset"
                offset.x = click_position.x - ficha_clickeada.getX(); 
                offset.y = click_position.y - ficha_clickeada.getY();
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
                ficha_clickeada.borrar();
                tablero.drawFicha(ficha_clickeada)
            }
            
        }

    }

    addFicha(ficha) {
        this.fichas.push(ficha);
    }
    
    addTablero(tablero) {
        this.tablero = tablero;
    }

    getFichaClickeada(x, y) {
        for (let i = 0; i < this.fichas.length; i++) {
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