function init() {
  let select = document.querySelector(".js-dimensiones");
  let btn_jugar = document.querySelector(".js-btn-jugar");
  let juego = null;
  let canvas = document.querySelector(".js-canvas");
  let context = canvas.getContext("2d");
  let canvas_tablero = document.querySelector(".js-canvas-tablero");
  let context_canvas_tablero = canvas_tablero.getContext("2d");
  let dimensiones = getDimensiones();
  let tablero = new Tablero(canvas_tablero, context_canvas_tablero, dimensiones[0], dimensiones[1])

  select.addEventListener("change", function() {
    dimensiones = getDimensiones();
    tablero = new Tablero(canvas_tablero, context_canvas_tablero, dimensiones[0], dimensiones[1])
  });

  btn_jugar.addEventListener("click", function() {
    let tablero = new Tablero(canvas_tablero, context_canvas_tablero, dimensiones[0], dimensiones[1]);
    let jugadorUno = getJugador1().trim();
    let jugadorDos = getJugador2().trim();  
    if (checkJugadores(jugadorUno, jugadorDos)) {
      juego = new Juego(canvas, context, tablero, jugadorUno, jugadorDos);
      let radio_ficha = tablero.celdas[0][0].width / 2.75;
      agregarFichas(juego, radio_ficha, context);
      mostrarJuego(juego);
      ocultarIntro();
      juego.jugar();
    }
    else {
      setTimeout(function(){
        document.querySelector(".js-jugador1").classList.remove("error-name");
        document.querySelector(".js-jugador2").classList.remove("error-name")
      }
      , 1000);
    }  
  })
}

document.addEventListener("DOMContentLoaded", init);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkJugadores(player1, player2) {
  if (isEmptyOrSpaces(player1) && isEmptyOrSpaces(player2)) {
    document.querySelector(".js-jugador1").classList.add("error-name");
    document.querySelector(".js-jugador1").value = "";
    document.querySelector(".js-jugador2").classList.add("error-name");
    document.querySelector(".js-jugador2").value = "";
    return false;
  }
  if (isEmptyOrSpaces(player1)) {
    document.querySelector(".js-jugador1").classList.add("error-name");
    document.querySelector(".js-jugador1").value = "";
    return false;
  }
  if (isEmptyOrSpaces(player2)) {
    document.querySelector(".js-jugador2").classList.add("error-name");
    document.querySelector(".js-jugador2").value = "";
    return false;
  }
  if (player1 === player2) {
    document.querySelector(".js-jugador1").classList.add("error-name");
    document.querySelector(".js-jugador2").classList.add("error-name");
    return false;
  }
  return true;
}

function isEmptyOrSpaces(str){
  return str === null || str.match(/^\s*$/) !== null;
}

function mostrarJuego(juego) {
  let canvas = document.querySelector(".js-canvas-holder");
  canvas.classList.remove("hidden");
  let turno = document.querySelector(".js-parrafo-turno");
  turno.classList.remove("hidden");
  let restart_button = document.querySelector(".js-restart");
  restart_button.classList.remove("hidden");
  restart_button.addEventListener("click", function() { reiniciar(juego) });
}

function reiniciar(juego) {
  let canvas = juego.canvas;
  juego.borrarFichas()
  juego.tablero.borrarFondo()
  juego.context.clearRect(0, 0, canvas.width, canvas.height)
  ocultarJuego();
  mostrarIntro();
}

function ocultarJuego() {
  let canvas = document.querySelector(".js-canvas-holder");
  canvas.classList.add("hidden");
  let turno = document.querySelector(".js-parrafo-turno");
  turno.classList.add("hidden");
  let restart_button = document.querySelector(".js-restart");
  restart_button.classList.add("hidden");
  let winner_paragraph = document.querySelector(".js-ganador");
  winner_paragraph.classList.add("hidden");
}

function ocultarIntro() {
  let intro = document.querySelector(".js-intro");
  intro.style = "display: none";
}

function mostrarIntro() {
  let intro = document.querySelector(".js-intro");
  intro.style = "display: grid";
}

function getJugador1() {
  let jugador1 = document.querySelector(".js-jugador1").value;
  return jugador1;
}

function getJugador2() {
  let jugador2 = document.querySelector(".js-jugador2").value;
  return jugador2;
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
    let ficha_roja = new Ficha(context, radio_ficha, getJugador1(), "img/red_disc.png");
    fichas.push(ficha_roja)
  }

  for (let i = Math.floor(cant_celdas / 2); i < cant_celdas; i++) {
    let ficha_azul = new Ficha(context, radio_ficha, getJugador2(), "img/blue_disc.jpg");
    fichas.push(ficha_azul)
  }

  fichas.forEach(ficha => {
    juego.addFicha(ficha)
  });

}