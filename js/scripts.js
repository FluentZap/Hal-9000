var newResponceCountTo = 0;
var newResponceCounter = 0;


$(document).ready(function () {
  $("#halResponse").text("I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.")
  $("#halResponse").fadeIn(1000);
  //setTimeout(newResponce, 1000);

});



function newResponce() {
  if (newResponceCounter >= newResponceCountTo) {

    newResponceCountTo = 5 + Math.round(Math.random() * 8)
  } else newResponceCounter++
}
