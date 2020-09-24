let canvas = document.querySelector(".js-canvas");
let context = canvas.getContext("2d");

let canvas_tablero = document.querySelector(".js-canvas-tablero");
let context_canvas_tablero = canvas_tablero.getContext("2d");

let tablero = new Tablero(canvas_tablero, context_canvas_tablero, 6, 7)
let juego = new Juego(canvas, context, tablero, "Jugador 1", "Jugador 2");

let ficha_roja_1 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_2 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_3 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_4 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_5 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_6 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_7 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_8 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_9 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_10 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_11 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_12 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_13 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_14 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_15 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_16 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_17 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_18 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_19 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_20 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");
let ficha_roja_21 = new Ficha(context, 38, "Jugador 1", "img/red.jpg");

let ficha_amarilla_1 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_2 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_3 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_4 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_5 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_6 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_7 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_8 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_9 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_10 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_11 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_12 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_13 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_14 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_15 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_16 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_17 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_18 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_19 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_20 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");
let ficha_amarilla_21 = new Ficha(context, 38, "Jugador 2", "img/yellow_disc.jpg");

juego.addFicha(ficha_roja_1);
juego.addFicha(ficha_roja_2);
juego.addFicha(ficha_roja_3);
juego.addFicha(ficha_roja_4);
juego.addFicha(ficha_roja_5);
juego.addFicha(ficha_roja_6);
juego.addFicha(ficha_roja_7);
juego.addFicha(ficha_roja_8);
juego.addFicha(ficha_roja_9);
juego.addFicha(ficha_roja_10);
juego.addFicha(ficha_roja_11);
juego.addFicha(ficha_roja_12);
juego.addFicha(ficha_roja_13);
juego.addFicha(ficha_roja_14);
juego.addFicha(ficha_roja_15);
juego.addFicha(ficha_roja_16);
juego.addFicha(ficha_roja_17);
juego.addFicha(ficha_roja_18);
juego.addFicha(ficha_roja_19);
juego.addFicha(ficha_roja_20);
juego.addFicha(ficha_roja_21);

juego.addFicha(ficha_amarilla_1);
juego.addFicha(ficha_amarilla_2);
juego.addFicha(ficha_amarilla_3);
juego.addFicha(ficha_amarilla_4);
juego.addFicha(ficha_amarilla_5);
juego.addFicha(ficha_amarilla_6);
juego.addFicha(ficha_amarilla_7);
juego.addFicha(ficha_amarilla_8);
juego.addFicha(ficha_amarilla_9);
juego.addFicha(ficha_amarilla_10);
juego.addFicha(ficha_amarilla_11);
juego.addFicha(ficha_amarilla_12);
juego.addFicha(ficha_amarilla_13);
juego.addFicha(ficha_amarilla_14);
juego.addFicha(ficha_amarilla_15);
juego.addFicha(ficha_amarilla_16);
juego.addFicha(ficha_amarilla_17);
juego.addFicha(ficha_amarilla_18);
juego.addFicha(ficha_amarilla_19);
juego.addFicha(ficha_amarilla_20);
juego.addFicha(ficha_amarilla_21);

juego.jugar()