var newResponceCountTo = 0;
var newResponceCounter = 0;

var currentNumber = 0;
var countToNumber = 0;

var currentLetter = 0;
var countToLetter = 0;
var displayWord = ""
var adaptiveFade = false;

var halWorking = false;

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
      console.log(currentNumber, ": ", displayWord);
      currentNumber++;
    } else {
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
  $('.hal').hover(function() {
    if (adaptiveFade){
      $('.row').clearQueue()
      $('.row').animate({opacity: 1.0}, 3000)
    }
    }, function() {
    if (adaptiveFade){
      $('.row').clearQueue()
      $('.row').animate({opacity: 0.2}, 3000);
    }
  });

  $('.add').click(function(event) {
    var newNumber = $('#numberInput').text();
    if (newNumber.length < 16)
      $('#numberInput').text(newNumber += event.target.value);
  });

  $('#remove').click(function(event) {
    $('#halNumberDisplay').fadeOut(1000, function() {
      newResponceCounter = 0;
      currentNumber = 0;
      currentLetter = 0;
      displayWord = ""
      clearInterval(lineFunction);
      $('#halNumberDisplay').text("");
    });
    adaptiveFade = false;
    $('.row').clearQueue()
    $('.row').animate({opacity: 1.0}, 1000);
    $('#numberInput').text("");
    $('#process').addClass("btn-info");
    $('#process').removeClass("btn-dark");
    halWorking = false;
  });




  $('#process').click(function(event) {
    if (!halWorking && parseInt($('#numberInput').text()) >= 0) {
      adaptiveFade = true;
      countToNumber = parseInt($('#numberInput').text());
      lineFunction = setInterval(processLine, 50);
      $('#halNumberDisplay').show();
      $('#process').removeClass("btn-info");
      $('#process').addClass("btn-dark");
      halWorking = true;
    }
  });

});
