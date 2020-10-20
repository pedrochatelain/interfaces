const boton_home = document.querySelector(".js-home");
const eventos = document.querySelectorAll(".evento");
const cards = document.querySelectorAll(".calendar-image");
console.log(cards)

boton_home.addEventListener("click", function() {
    location.href = "index.html";
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




/*
* Add a listener for mousemove event
* Which will trigger function 'handleMove'
* On mousemove
*/

/* Define function a */
function handleMove(e, el) {
  /* Get the height and width of the element */
  let height = cards[0].clientHeight
  let width = cards[0].width;
/*
* Get position of mouse cursor
  * With respect to the element
  * On mouseover
  */
 /* Store the x position */
 const xVal = e.layerX
 /* Store the y position */
 const yVal = e.layerY

 var rect = e.target.getBoundingClientRect();
 var x = e.clientX - rect.left; //x position within the element.
 var y = e.clientY - rect.top;  //y position within the element.


//    let xAxis = (width / 2 - x) / 5;
//    let yAxis = (height / 2 - y) / 5;
 /*
 * Calculate rotation valuee along the Y-axis
 * Here the multiplier 20 is to
 * Control the rotation
 * You can change the value and see the results
 */
if (x > width / 2) {
    var yRotation = 10*((x + width / 2) / width)
} else {
  var yRotation = 20*((x - width / 2) / width)
}

/* Calculate the rotation along the X-axis */
const xRotation = -10 * ((y - height / 2) / height)
  // xRotation = yAxis
  // yRotation = xAxis

/* Generate string for CSS transform property */
const string = 'perspective(500px) scale(1.1)  rotateY(' + yRotation + 'deg)'

/* Apply the calculated transformation */
el.style.transform = string
console.log(width)
}