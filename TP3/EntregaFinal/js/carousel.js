let left_arrow = document.querySelector(".js-left-arrow");
let right_arrow = document.querySelector(".js-right-arrow");

left_arrow.addEventListener("mouseover", function() {setOpacity(left_arrow, 1) });
right_arrow.addEventListener("mouseover", function() { setOpacity(right_arrow, 1) });
left_arrow.addEventListener("mouseout", function() { setOpacity(left_arrow, 0.8) });
right_arrow.addEventListener("mouseout", function() { setOpacity(right_arrow, 0.8) });

function setOpacity(element, n) {
    element.style.opacity = n;
}