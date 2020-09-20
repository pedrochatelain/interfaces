let canvas = document.querySelector(".js-canvas");
let context = canvas.getContext("2d");
let juego = new Juego(canvas, context);

let ficha = new Ficha(context, 96, 85);
let ficha2 = new Ficha(context, 96, 85)
let ficha3 = new Ficha(context, 96, 85)


ficha.draw(0, 0);
ficha2.draw(400, 300);
ficha3.draw(0, 343);

juego.addFicha(ficha);
juego.addFicha(ficha2);
juego.addFicha(ficha3)

juego.listenToMouseDown();

