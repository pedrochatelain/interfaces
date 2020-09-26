class Tablero {

    constructor(canvas, context, nro_filas, nro_columnas) {
        this.canvas = canvas;
        this.context = context;
        this.cantidad_filas = nro_filas;
        this.cantidad_columnas = nro_columnas;
        this.celdas = [];
        this.rampas = [];
        this.fichas_colocadas = 0;
        this.ancho_del_tablero;
        this.alto_del_tablero;
    }

    getCantFichas() {
        return this.fichas_colocadas;
    }

    hayEspacio() {
        return this.fichas_colocadas < this.cantidad_columnas * this.cantidad_filas;
    }

    draw() {
        this.setCeldas();
        this.borrarFondo();
        this.dibujarCeldas();
        this.definirRampas();
    }
    
    definirRampas() {
        let x;
        let y;
        for (let i = 0; i < this.cantidad_columnas; i++) {
            let celda_actual = this.celdas[0][i];
            let centro = celda_actual.getCentro();
            x = centro.x;
            y = centro.y - celda_actual.height - 23;
            this.rampas.push({
                "x" : x,
                "y" : y
            })
        }
    }

    setCeldas() {

        let padding = this.canvas.width / 5;
        let padding_top = this.canvas.height / 6;
        this.ancho_del_tablero = this.canvas.width - padding - padding;
        this.alto_del_tablero = this.canvas.height - padding_top
        let cell_width = this.ancho_del_tablero / this.cantidad_columnas;
        let cell_height = this.alto_del_tablero / this.cantidad_filas;
        let celdas = [];
        let i = 0;

        // Define las propiedades de cada celda y las agrupa en un arreglo
        for (let x = padding; i < this.cantidad_columnas; x += cell_width) {
            for (let y = padding_top; y < this.canvas.height; y += cell_height) {
                let celda = new Celda(x, y, cell_width, cell_height, this.context)
                celdas.push(celda)
            }
            i++;
        }

        
        // Coloca las celdas dentro de una matriz (para poder acceder por fila y columna) 
        this.celdas = this.toMatrix(celdas)
    }

    borrar() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);

    }

    toMatrix(celdas) {
        var matrix = [];
        for(var i=0; i<this.cantidad_filas; i++) {
            // matrix[i] = new Array(this.cantidad_columnas);
            matrix[i] = [];
        }

        let iteraciones = 0;
        for (let i = 0; i < celdas.length; i++) {
            matrix[iteraciones].push(celdas[i]);
            if (iteraciones == this.cantidad_filas - 1) {
                iteraciones = 0;
            } else {
                iteraciones++;
            }
        }
        return matrix;
    }

    dibujarCeldas() {
        for (let i = 0; i < this.cantidad_filas; i++) {
            for (let j = 0; j < this.cantidad_columnas; j++) {
                let celda_actual = this.celdas[i][j];
                celda_actual.setFila(i);
                celda_actual.setColumna(j);
                celda_actual.draw();
            }
        }
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
            celda_libre.setFicha(ficha);
            let centro_celda = celda_libre.getCentro();
            ficha.draw(centro_celda.x, centro_celda.y);
            this.fichas_colocadas++;
        }
    }

    getCeldaLibre(columna) {
        for (let i = this.cantidad_filas - 1; i > -1; i--) {
            let celda_actual = this.celdas[i][columna];
            if ( ! celda_actual.isFull()) {
                celda_actual.setFull();
                return celda_actual
            }
        }
        return null;
    }

    hayLugar(columna) {
        for (let i = 0; i < this.cantidad_filas; i++) {
            let celda_actual = this.celdas[i][columna];
            if ( ! celda_actual.isFull() ) {
                return true;
            }
        }
        return false;

    }

    hayLinea(ficha, linea_ganadora) {
        // Calculo cuántos turnos tienen que pasar para que pueda haber un ganador
        let turnos_para_ganar = linea_ganadora * 2 - 1;
        if (this.getCantFichas() >= turnos_para_ganar) {
            let celda_ficha = this.getCelda(ficha);
            let jugador = celda_ficha.getFicha().getJugador();
            if (this.checkFichas("Izquierda", celda_ficha, linea_ganadora, jugador, this.cantCeldas, this)) {
                return true;
            }
            if (this.checkFichas("Derecha", celda_ficha, linea_ganadora, jugador, this.cantCeldas, this)) {
                return true;
            }
            if (this.checkFichas("Abajo", celda_ficha, linea_ganadora, jugador, this.cantCeldas, this)) {
                return true;
            }
            if (this.checkFichas("Izquierda abajo", celda_ficha, linea_ganadora, jugador, this.cantCeldas, this)) {
                return true;
            }
            if (this.checkFichas("Izquierda arriba", celda_ficha, linea_ganadora, jugador, this.cantCeldas, this)) {
                return true;
            }
            if (this.checkFichas("Derecha abajo", celda_ficha, linea_ganadora, jugador, this.cantCeldas, this)) {
                return true;
            }
            if (this.checkFichas("Derecha arriba", celda_ficha, linea_ganadora, jugador, this.cantCeldas, this)) {
                return true;
            }
        } else {
            return false;
        }
    }

    /* Checkea si existe una linea de fichas que termine el juego. Por parámetro recibe,
    entre otras cosas, la celda donde empieza y la dirección de la línea buscada */
    checkFichas(orientacion, celda_ficha, linea_ganadora, jugador, cantCeldas, self) {
        if (cantCeldas(orientacion, celda_ficha, self) >= linea_ganadora - 1) {
            let i;
            let j;
            let fila_celda = celda_ficha.getFila();
            let columna_celda = celda_ficha.getColumna();
            let racha = 0;
            let condicion = false;
            let celda_actual;

            if (orientacion === "Izquierda") {
                j = columna_celda - 1
                condicion = j >= 0;
            }
            if (orientacion === "Derecha") {
                j = columna_celda + 1;
                condicion = j < this.cantidad_columnas;
            }
            if (orientacion === "Abajo") {
                i = fila_celda + 1;
                condicion = i < this.cantidad_filas;
            }
            if (orientacion === "Izquierda abajo") {
                i = fila_celda + 1;
                j = columna_celda - 1;
                condicion = i < this.cantidad_filas;
            }
            if (orientacion === "Izquierda arriba") {
                i = fila_celda - 1;
                j = columna_celda - 1;
                condicion = i < this.cantidad_filas;                
            }
            if (orientacion === "Derecha abajo") {
                i = fila_celda + 1;
                j = columna_celda + 1;
                condicion = i < this.cantidad_filas;               
            }
            if (orientacion === "Derecha arriba") {
                i = fila_celda - 1;
                j = columna_celda + 1;
                condicion = i < this.cantidad_filas;               
            }

            while (condicion && racha != linea_ganadora - 1) {

                if (orientacion === "Izquierda") { celda_actual = this.celdas[fila_celda][j]; }
                if (orientacion === "Derecha") { celda_actual = this.celdas[fila_celda][j]; }
                if (orientacion === "Abajo") { celda_actual = this.celdas[i][columna_celda]; }
                if (orientacion === "Izquierda abajo") { celda_actual = this.celdas[i][j]; }
                if (orientacion === "Izquierda arriba") { celda_actual = this.celdas[i][j]; }
                if (orientacion === "Derecha abajo") { celda_actual = this.celdas[i][j]; }
                if (orientacion === "Derecha arriba") { celda_actual = this.celdas[i][j]; }

                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                if (orientacion === "Izquierda") { j--; }
                if (orientacion === "Derecha") { j++; }
                if (orientacion === "Abajo") { i++; }
                if (orientacion === "Izquierda abajo") { i++; j--; }
                if (orientacion === "Izquierda arriba") { i--; j--; }
                if (orientacion === "Derecha abajo") { i++; j++; }
                if (orientacion === "Derecha arriba") { i--; j++; }
            }
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }
        }
    }

    borrarFondo() {
        this.context.fillStyle = "#C19A6B";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Devuelve la cantidad de celdas que hay en una dirección dada (la búsqueda parte desde otra celda)
    cantCeldas(orientacion, celda, self) {
        let tablero = self;
        if (orientacion === "Izquierda") {
            return celda.getColumna(); }
        if (orientacion === "Derecha") {
            return (tablero.celdas[0].length - 1) - celda.getColumna();
        }
        if (orientacion === "Abajo") {
            return (tablero.celdas.length - 1) - celda.getFila()
        }
        if (orientacion === "Izquierda abajo") { 
            return tablero.checkDiagonal(celda, 0, tablero.cantidad_filas - 1, "Incrementar", "Decrementar");
        }
        if (orientacion === "Izquierda arriba") {
            return tablero.checkDiagonal(celda, 0, 0, "Decrementar", "Decrementar");
        }
        if (orientacion === "Derecha abajo") {
            return tablero.checkDiagonal(celda, tablero.cantidad_columnas - 1, tablero.cantidad_filas - 1, "Incrementar", "Incrementar");
        }
        if (orientacion === "Derecha arriba") {
            return tablero.checkDiagonal(celda, tablero.cantidad_columnas - 1, 0, "Decrementar", "Incrementar");
        }
    }

    // Devuelve la cantidad de celdas que hay en una diagonal (la búsqueda parte desde otra celda)
    checkDiagonal(celda, extremo_vertical, extremo_horizontal, operacion_para_i, operacion_para_j) {
        let i = celda.getFila();
        let j = celda.getColumna();
        let cant = 0;

        if (operacion_para_i === "Incrementar" && operacion_para_j === "Decrementar") {
            while (i < extremo_horizontal && j > extremo_vertical) {
                i++;
                j--;
                cant++;
            }
        }
        if (operacion_para_i === "Incrementar" && operacion_para_j === "Incrementar") {
            while (i < extremo_horizontal && j < extremo_vertical) {
                i++;
                j++;
                cant++;
            }
        }
        if (operacion_para_i === "Decrementar" && operacion_para_j === "Decrementar") {
            while (i > extremo_horizontal && j > extremo_vertical) {
                i--;
                j--;
                cant++;
            }
        }
        if (operacion_para_i === "Decrementar" && operacion_para_j === "Incrementar") {
            while (i > extremo_horizontal && j < extremo_vertical) {
                i--;
                j++;
                cant++;
            }
        }
        return cant;
    }

    getCelda(ficha) {
        for (let i = 0; i < this.cantidad_filas; i++) {
            for (let j = 0; j < this.cantidad_columnas; j++) {
                let celda_actual = this.celdas[i][j];
                if (celda_actual.getFicha() === ficha) {
                    return celda_actual;
                }
            }
        }
        return null;
    }

}