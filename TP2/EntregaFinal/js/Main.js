function init() {
  preguntarDimensiones();
  let select = document.querySelector(".js-dimensiones");
  let boton_aceptar = document.querySelector(".js-aceptar");
  let dimensiones = [];
  let juego = null;
  let canvas = document.querySelector(".js-canvas");
  let context = canvas.getContext("2d");
  let canvas_tablero = document.querySelector(".js-canvas-tablero");
  let context_canvas_tablero = canvas_tablero.getContext("2d");
  let tablero = new Tablero(canvas_tablero, context_canvas_tablero, 6, 7);
  tablero.draw();

  select.addEventListener("change", function() {
    dimensiones = getDimensiones();
    tablero = new Tablero(canvas_tablero, context_canvas_tablero, dimensiones[0], dimensiones[1])
    tablero.borrarFondo();
    tablero.draw()
  });
  boton_aceptar.addEventListener("click", function() {
    juego = new Juego(canvas, context, tablero, "Jugador 1", "Jugador 2");
    let radio_ficha = tablero.celdas[0][0].width / 3;
    agregarFichas(juego, radio_ficha, context);
    juego.jugar();
  })
}

document.addEventListener("DOMContentLoaded", init);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function preguntarDimensiones() {
  // Get the modal
  let modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];
  // When the page is loaded, open the modal
  onload = function() {
    modal.style.display = "block";
  }
  // When the user clicks on "Aceptar", close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

function getDimensiones() {
  let select = document.querySelector(".js-dimensiones");
    let dimensiones = [];
    let value = select.value;
    let cant_filas = parseInt(value.charAt(0), 10);
    let cant_col = parseInt(value.charAt(2), 10);
      dimensiones.push(cant_filas);
      dimensiones.push(cant_col);
      return dimensiones;
}

function agregarFichas(juego, radio_ficha, context) {
  let ficha_roja_1 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_2 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_3 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_4 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_5 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_6 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_7 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_8 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_9 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_10 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_11 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_12 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_13 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_14 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_15 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_16 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_17 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_18 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_19 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_20 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  let ficha_roja_21 = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
  
  let ficha_azul_1 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_2 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_3 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_4 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_5 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_6 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_7 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_8 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_9 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_10 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_11 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_12 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_13 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_14 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_15 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_16 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_17 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_18 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_19 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_20 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  let ficha_azul_21 = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
  
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
  
  juego.addFicha(ficha_azul_1);
  juego.addFicha(ficha_azul_2);
  juego.addFicha(ficha_azul_3);
  juego.addFicha(ficha_azul_4);
  juego.addFicha(ficha_azul_5);
  juego.addFicha(ficha_azul_6);
  juego.addFicha(ficha_azul_7);
  juego.addFicha(ficha_azul_8);
  juego.addFicha(ficha_azul_9);
  juego.addFicha(ficha_azul_10);
  juego.addFicha(ficha_azul_11);
  juego.addFicha(ficha_azul_12);
  juego.addFicha(ficha_azul_13);
  juego.addFicha(ficha_azul_14);
  juego.addFicha(ficha_azul_15);
  juego.addFicha(ficha_azul_16);
  juego.addFicha(ficha_azul_17);
  juego.addFicha(ficha_azul_18);
  juego.addFicha(ficha_azul_19);
  juego.addFicha(ficha_azul_20);
  juego.addFicha(ficha_azul_21);  
}