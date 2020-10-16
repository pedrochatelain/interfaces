// Set the date we're counting down to
let countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with class="js-countdown"
  let div_days = document.querySelector(".js-days");
  let div_hours = document.querySelector(".js-hours");
  let div_minutes = document.querySelector(".js-minutes");
  let div_seconds = document.querySelector(".js-seconds");

  div_days.innerHTML = days;
  div_hours.innerHTML = hours;
  div_minutes.innerHTML = minutes;
  div_seconds.innerHTML = seconds;
}, 1000);