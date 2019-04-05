var newResponceCountTo = 0;
var newResponceCounter = 0;

var currentNumber = 0;
var countToNumber = 0;

function convertToComputerSpeak(number) {
    if (number.includes("3")) return "I'm sorry, Dave. I'm afraid I can't do that.";
    if (number.includes("2")) return "Boop!"
    if (number.includes("1")) return "Beep!"
}

function processLine() {
  if (newResponceCounter >= newResponceCountTo) {
    
    newResponceCountTo = 5 + Math.round(Math.random() * 8)
  } else newResponceCounter++
}

function newResponce() {
  if (newResponceCounter >= newResponceCountTo) {

    newResponceCountTo = 5 + Math.round(Math.random() * 8)
  } else newResponceCounter++
}


$(document).ready(function () {
  $("#halResponse").text("I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.")
  $("#halResponse").fadeIn(1000);
  //setTimeout(newResponce, 1000);

  $('.add').click(function(event) {
    var newNumber = $('#numberInput').text();
    if (newNumber.length < 16)
      $('#numberInput').text(newNumber += event.target.value);
  });
  $('#remove').click(function(event) {
    $('#numberInput').text("");
  });
  $('#submit').click(function(event) {

  });

});
