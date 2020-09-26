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

  let cant_celdas = juego.tablero.cantidad_filas * juego.tablero.cantidad_columnas;
  let fichas = [];

  for (let i = 0; i < Math.ceil(cant_celdas / 2); i++) {
    let ficha_roja = new Ficha(context, radio_ficha, "Jugador 1", "img/red.jpg");
    fichas.push(ficha_roja)
  }

  for (let i = Math.floor(cant_celdas / 2); i < cant_celdas; i++) {
    let ficha_azul = new Ficha(context, radio_ficha, "Jugador 2", "img/blue_disc.jpg");
    fichas.push(ficha_azul)
  }

  fichas.forEach(ficha => {
    juego.addFicha(ficha)
  });

}