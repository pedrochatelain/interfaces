class Tablero {

    constructor(canvas, context, nro_filas, nro_columnas) {
        this.canvas = canvas;
        this.context = context;
        this.filas = nro_filas;
        this.columnas = nro_columnas;
        this.celdas = [];
        this.rampas = [];
    }

    draw() {
        this.setCeldas();
        this.dibujarCeldas();
        this.definirRampas();
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
    }

    setCeldas() {

        let padding_left = this.canvas.width * 0.22;
        let padding_right = this.canvas.width * 0.22;
        let padding_top = this.canvas.height * 0.15;
        let cell_width = (this.canvas.width - padding_left - padding_right) / this.columnas;
        let cell_height = (this.canvas.height - padding_top) / this.filas;
        let celdas = [];

        // Define las propiedades de cada celda y las agrupa en un arreglo
        for (let columna = padding_top; columna < canvas.height; columna += cell_height) {
            for (let fila = padding_left; fila < canvas.width - padding_right; fila += cell_width) {
                let celda = new Celda(fila, columna, cell_width, cell_height, this.context)
                    celdas.push(celda);
                }
        }

        // Coloca las celdas dentro de una matriz (para poder acceder por fila y columna) 
        this.celdas = this.listToMatrix(celdas, this.columnas)

    }

    dibujarCeldas() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {

                this.celdas[i][j].draw();
            }
        }
    }

    listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;
    
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
    
            matrix[k].push(list[i]);
        }
    
        return matrix;
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
        let celda_libre = this.getCeldaLibre(columna);
        if (celda_libre) {
            let centro_celda = celda_libre.getCentro();
            ficha.draw(centro_celda.x, centro_celda.y)
        }
    }

    getCeldaLibre(columna) {
        for (let i = this.filas - 1; i > -1; i--) {
            let celda_actual = this.celdas[i][columna];
            if ( ! celda_actual.tieneFicha) {
                celda_actual.tieneFicha = true;
                return celda_actual

            }
        }
        return null;
    }

    



}