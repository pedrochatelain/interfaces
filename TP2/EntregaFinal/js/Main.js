let canvas = document.querySelector(".js-canvas");
let context = canvas.getContext("2d");

let canvas_tablero = document.querySelector(".js-canvas-tablero");
let context_canvas_tablero = canvas_tablero.getContext("2d");

let tablero = new Tablero(canvas_tablero, context_canvas_tablero, 6, 7)
let juego = new Juego(canvas, context, tablero);

let ficha = new Ficha(context, 38);
let ficha2 = new Ficha(context, 38);
let ficha3 = new Ficha(context, 38);
let ficha4 = new Ficha(context, 38)
let ficha5 = new Ficha(context, 38)


ficha.draw(20, 20);
ficha2.draw(400, 300);
ficha3.draw(440, 340);
ficha4.draw(0, 343);
ficha5.draw(700, 111)
    

juego.addFicha(ficha);
juego.addFicha(ficha2);
juego.addFicha(ficha3);
juego.addFicha(ficha4);
juego.addFicha(ficha5);