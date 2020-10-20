const boton_home = document.querySelector(".js-home");
const boton_formulario = document.querySelector(".js-formulario")
const eventos = document.querySelectorAll(".evento");
const cards = document.querySelectorAll(".calendar-image");
console.log(cards)

boton_home.addEventListener("click", function() {
    location.href = "index.html";
})

boton_formulario.addEventListener("click", function() {
  location.href = "formulario.html";
})

for (let i = 0; i < eventos.length; i++) {
    let evento = eventos[i];
    let button = evento.children[0];
    let panel = evento.children[1];
    let image = button.children[0];
    button.addEventListener("click", function() {
      // panel.classList.toggle("none");
      this.classList.toggle("active");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
      if (button.classList.contains("active")) {
        image.src = "images/minus.png"
      } else {
        image.src = "images/plus.png"
      }
    });
  }
  checkHoverCards();


function checkHoverCards() {
  for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      console.log(i)
      card.addEventListener("mousemove", function() { handleMove(event, card) })
      card.addEventListener('mouseout', function() {
          card.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
      })
  }
}




function handleMove(e, el) {

  /* Get the height and width of the element */
  let width = cards[0].clientWidth

  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.

  if (x > width / 2) {
      var yRotation = 10*((x + width / 2) / width)
  } else {
      var yRotation = 20*((x - width / 2) / width)
  }

  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1)  rotateY(' + yRotation + 'deg)'

  /* Apply the calculated transformation */
  el.style.transform = string
}