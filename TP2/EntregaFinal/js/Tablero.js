class Tablero {

    constructor(canvas, context, nro_filas, nro_columnas) {
        this.canvas = canvas;
        this.context = context;
        this.cantidad_filas = nro_filas;
        this.cantidad_columnas = nro_columnas;
        this.celdas = [];
        this.rampas = [];
        this.fichas_colocadas = 0;
    }

    getCantFichas() {
        return this.fichas_colocadas;
    }

    draw() {
        this.setCeldas();
        this.dibujarCeldas();
        this.definirRampas();
    }
    
    definirRampas() {
        let x;
        let y;
        for (let i = 0; i < this.cantidad_columnas; i++) {
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
        let cell_width = (this.canvas.width - padding_left - padding_right) / this.cantidad_columnas;
        let cell_height = (this.canvas.height - padding_top) / this.cantidad_filas;
        let celdas = [];

        // Define las propiedades de cada celda y las agrupa en un arreglo
        for (let columna = padding_top; columna < canvas.height; columna += cell_height) {
            for (let fila = padding_left; fila < canvas.width - padding_right; fila += cell_width) {
                let celda = new Celda(fila, columna, cell_width, cell_height, this.context)
                    celdas.push(celda);
                }
        }

        // Coloca las celdas dentro de una matriz (para poder acceder por fila y columna) 
        this.celdas = this.listToMatrix(celdas, this.cantidad_columnas)

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

    seGano(ficha, linea_ganadora) {
        // Calculo cuántos turnos tienen que pasar para que pueda haber un ganador
        let turnos_para_ganar = linea_ganadora * 2 - 1;
        if (this.getCantFichas() >= turnos_para_ganar) {
            let celda_ficha = this.getCelda(ficha);
            let jugador = celda_ficha.getFicha().getJugador();
            if (this.checkLeft(celda_ficha, linea_ganadora, jugador)) {
                return true;
            }
            if (this.checkRight(celda_ficha, linea_ganadora, jugador)) {
                return true;
            }
            if (this.checkDown(celda_ficha, linea_ganadora, jugador)) {
                return true;
            }
            if (this.checkIzquierdaAbajo(celda_ficha, linea_ganadora, jugador)) {
                return true;
            }
            if (this.checkDerechaAbajo(celda_ficha, linea_ganadora, jugador)) {
                return true;
            }
            if (this.checkIzquierdaArriba(celda_ficha, linea_ganadora, jugador)) {
                return true;
            }
            if (this.checkDerechaArriba(celda_ficha, linea_ganadora, jugador)) {
                return true;
            }
        } else {
            return false;
        }
    }


    // Dada una celda checkea si hay una x cantidad de fichas a la izquierda que pertenezcan a un mismo jugador
    checkLeft(celda, linea_ganadora, jugador) {
        if (this.cantCeldasIzquierda(celda) >= linea_ganadora - 1) {

            let racha = 0;
            let j = celda.getColumna() - 1;

            while (j >= 0 && racha != linea_ganadora - 1) {
                let celda_actual = this.celdas[celda.getFila()][j];
                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                j--;
            }
            
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }


        } else {
            return false
        }

    }

    checkRight(celda, linea_ganadora, jugador) {
        if (this.cantCeldasDerecha(celda) >= linea_ganadora - 1) {

            let racha = 0;
            let j = celda.getColumna() + 1;

            while (j < this.cantidad_columnas && racha != linea_ganadora - 1) {
                let celda_actual = this.celdas[celda.getFila()][j];
                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                j++;
            }
            
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }


        } else {
            return false
        }
    }

    checkDown(celda, linea_ganadora, jugador) {
        if (this.cantCeldasAbajo(celda) >= linea_ganadora - 1) {

            let racha = 0;
            let i = celda.getFila() + 1;

            while (i < this.cantidad_filas && racha != linea_ganadora - 1) {
                let celda_actual = this.celdas[i][celda.getColumna()];
                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                i++;
            }
            
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }


        } else {
            return false
        }
    }

    checkIzquierdaAbajo(celda, linea_ganadora, jugador) {

        if (this.espaciosIzquierdaAbajo(celda) >= linea_ganadora - 1) {

            let racha = 0;
            let i = celda.getFila() + 1;
            let j = celda.getColumna() - 1;

            while (i < this.cantidad_filas && racha != linea_ganadora - 1) {
                let celda_actual = this.celdas[i][j];
                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                i++;
                j--;
            }
            
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

    }

    cantCeldasIzquierda(celda) {        
        return celda.getColumna();
    }

    cantCeldasDerecha(celda) {
        return (this.celdas[0].length - 1) - celda.getColumna();
    }

    cantCeldasAbajo(celda) {
        return (this.celdas.length - 1) - celda.getFila();
    }

    espaciosIzquierdaAbajo(celda) {

        let extremo_vertical = 0;
        let extremo_horizontal = this.cantidad_filas - 1;
        let i = celda.getFila();
        let j = celda.getColumna();
        let cant = 0;

        while (i < extremo_horizontal && j > extremo_vertical) {
            i++;
            j--;
            cant++;
        }
        
        return cant;

    }

    espaciosDerechaAbajo(celda) {

        let extremo_vertical = this.cantidad_columnas - 1;
        let extremo_horizontal = this.cantidad_filas - 1;
        let i = celda.getFila();
        let j = celda.getColumna();
        let cant = 0;

        while (i < extremo_horizontal && j < extremo_vertical) {
            i++;
            j++;
            cant++;
        }
        
        return cant;

    }

    checkDerechaAbajo(celda, linea_ganadora, jugador) {
        if (this.espaciosDerechaAbajo(celda) >= linea_ganadora - 1) {
            let racha = 0;
            let i = celda.getFila() + 1;
            let j = celda.getColumna() + 1;
            while (i < this.cantidad_filas && racha != linea_ganadora - 1) {
                let celda_actual = this.celdas[i][j];
                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                i++;
                j++;
            }
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    espaciosIzquierdaArriba(celda) {
        let extremo_vertical = 0;
        let extremo_horizontal = 0;
        let i = celda.getFila();
        let j = celda.getColumna();
        let cant = 0;
        while (i > extremo_horizontal && j > extremo_vertical) {
            i--;
            j--;
            cant++;
        }
        return cant;
    }

    checkIzquierdaArriba(celda, linea_ganadora, jugador) {
        if (this.espaciosIzquierdaArriba(celda) >= linea_ganadora - 1) {
            let racha = 0;
            let i = celda.getFila() - 1;
            let j = celda.getColumna() - 1;
            while (i < this.cantidad_filas && racha != linea_ganadora - 1) {
                let celda_actual = this.celdas[i][j];
                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                i--;
                j--;
            }
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    espaciosDerechaArriba(celda) {
        let extremo_vertical = this.cantidad_columnas - 1;
        let extremo_horizontal = 0;
        let i = celda.getFila();
        let j = celda.getColumna();
        let cant = 0;
        while (i > extremo_horizontal && j < extremo_vertical) {
            i--;
            j++;
            cant++;
        }
        return cant;
    }

    checkDerechaArriba(celda, linea_ganadora, jugador) {
        if (this.espaciosDerechaArriba(celda) >= linea_ganadora - 1) {
            let racha = 0;
            let i = celda.getFila() - 1;
            let j = celda.getColumna() + 1;
            while (i < this.cantidad_filas && racha != linea_ganadora - 1) {
                let celda_actual = this.celdas[i][j];
                if (celda_actual.getFicha() == null) {
                    return false;
                }
                let jugador_celda_actual = celda_actual.getFicha().getJugador();
                if (jugador !== jugador_celda_actual) {
                    return false;
                } else {
                    racha++;
                }
                i--;
                j++;
            }
            if (racha == linea_ganadora - 1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
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