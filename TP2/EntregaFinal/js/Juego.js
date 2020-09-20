class Juego {

    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.tablero = new Tablero(this.canvas, this.context, 6, 7)
        this.fichas = [];
        this.current_mouse_position;
        this.old_mouse_position;

    }

    addFicha(ficha) {
        this.fichas.push(ficha);
    }
    
    getMousePosition(e) {
        let rect = canvas.getBoundingClientRect(); 
        let _x = e.clientX - rect.left; 
        let _y = e.clientY - rect.top; 

        const pos = {
            x: _x,
            y: _y
        }

        return pos;
    }

    listenToMouseDown() {
        this.canvas.addEventListener("mousedown", (e) => {
            this.current_mouse_position = this.getMousePosition(e);
            this.fichas.forEach(ficha => {
                if (ficha.isClicked(this.current_mouse_position)) {
                    ficha.setDragging(true);
                    this.listenToMouseMove(ficha);
                };
            });
        })
    }

    listenToMouseMove(ficha) {
        this.canvas.addEventListener("mousemove", (e) => {
            this.old_mouse_position = this.current_mouse_position;
            this.current_mouse_position = this.getMousePosition(e);
            let distance = {
                x: this.current_mouse_position.x - this.old_mouse_position.x,
                y: this.current_mouse_position.y - this.old_mouse_position.y
            }

            let pos_x_ficha = ficha.getX() + distance.x;
            let pos_y_ficha = ficha.getY() + distance.y;

            ficha.draw(pos_x_ficha, pos_y_ficha)
            this.reDraw()
        })
    }

    reDraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // redraw each rect in the rects[] array
        this.fichas.forEach(ficha => {
            let x = ficha.getX();
            let y = ficha.getY();
            ficha.draw(x, y);
        });
    }

}