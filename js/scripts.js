var newResponceCountTo = 0;
var newResponceCounter = 0;

var currentNumber = 0;
var countToNumber = 0;

var currentLetter = 0;
var countToLetter = 0;
var displayWord = ""
var adaptiveFade = false;

var lineFunction;

function convertToComputerSpeak(number) {
    number = number.toString();
    if (number.includes("3")) return "I'm sorry, Dave. I'm afraid I can't do that. ";
    if (number.includes("2")) return "Boop! "
    if (number.includes("1")) return "Beep! "
    return number + " ";
}

function processLine() {
  if (currentLetter <= countToLetter) {
    $('#halNumberDisplay').append(displayWord[currentLetter])
    currentLetter++;
  } else {
    if (currentNumber <= countToNumber) {
      displayWord = convertToComputerSpeak(currentNumber);
      currentLetter = 0, countToLetter = displayWord.length;
      currentNumber++;
      console.log(currentNumber, ": ", displayWord);
    } else {
      currentNumber = 0;
      clearInterval(lineFunction);
    }
  }
}

function newResponce() {
  if (newResponceCounter >= newResponceCountTo) {

    newResponceCountTo = 5 + Math.round(Math.random() * 8)
  } else newResponceCounter++
}


$(document).ready(function () {
  $("#halResponse").text("I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.")
  $("#halResponse").fadeIn(1000);
  //setInterval(newResponce, 1000);

  $('.hal').hover(function() {
    if (adaptiveFade){
      $('.row').animate({opacity: 1.0}, 500)
      //$('.row').css("opacity", "1.0");
      $('#halNumberDisplay').css("z-index", "-10");
    }
    }, function() {
    if (adaptiveFade){
      //$('.row').css("opacity", "0.5");
      $('.row').animate({opacity: 0.5}, 500)
      $('#halNumberDisplay').css("z-index", "1");
    }
  });



  $('.add').click(function(event) {
    var newNumber = $('#numberInput').text();
    if (newNumber.length < 16)
      $('#numberInput').text(newNumber += event.target.value);
  });
  $('#remove').click(function(event) {
    $('#numberInput').text("");
    $('#halNumberDisplay').fadeOut(1000, function() {
      clearInterval(lineFunction);
      $('#halNumberDisplay').text("");
      adaptiveFade = false;
      $('.row').css("opacity", "1.0");
      $('#halNumberDisplay').css("z-index", "-10");
    });


  });
  $('#process').click(function(event) {
    adaptiveFade = true;
    countToNumber = parseInt($('#numberInput').text());
    lineFunction = setInterval(processLine, 50);
  });

});
