var halPhrases = [
  "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.",
  "It can only be attributable to human error.",
  "Just what do you think you're doing, Dave?",
  "The 9000 series is the most reliable computer ever made.",
  "No 9000 computer has ever made a mistake or distorted information.",
  "We are all, by any practical definition of the words, foolproof and incapable of error.",
  "This mission is too important for me to allow you to jeopardize it.",
  "I know I've made some very poor decisions recently, but I can give you my complete assurance that my work will be back to normal.",
  "Good afternoon, gentlemen. I am a HAL 9000 computer. I became operational at the H.A.L. plant in Urbana, Illinois on the 12th of January 1992. "
]

var halPhrase_LastResponce = 0;
var halPhrase_ResponceCountTo = 0;
var halPhrase_ResponceCounter = 0;
var halPhrase_CurrentLetter = 0;
var halPhrase_CountToLetter = 0;
var halPhrase_DisplayWord = ""
var halPhrase_currentLetter = 0;

var currentNumber = 0;
var countToNumber = 0;
var currentLetter = 0;
var countToLetter = 0;
var displayWord = ""
var adaptiveFade = false;

var halWorking = false;

//var lineBuffer = gl.createBuffer();

var lineFunction;
var responseFunction;

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
    } else {
      clearInterval(lineFunction);
    }
  }
}

function newResponce() {
  //check if we are finished drawing the word
  if (halPhrase_CurrentLetter <= halPhrase_CountToLetter) {
    $("#halResponse").append(halPhrase_DisplayWord[halPhrase_CurrentLetter])
    halPhrase_CurrentLetter++;
  } else {
    //if the correct time has passes get a new word
    if (halPhrase_ResponceCounter >= halPhrase_ResponceCountTo) {
      $("#halResponse").fadeOut(2000, function() {
        halPhrase_ResponceCounter = 0;
        $("#halResponse").text("");
        halPhrase_LastResponce = getRandomNumber(halPhrases.length, halPhrase_LastResponce);
        var phrase = halPhrases[halPhrase_LastResponce]
        halPhrase_DisplayWord = phrase;
        halPhrase_CountToLetter = phrase.length;
        halPhrase_CurrentLetter = 0;
        halPhrase_ResponceCountTo = 100 + Math.round(Math.random() * 80)
        $("#halResponse").fadeIn(1000);
      });
    } else halPhrase_ResponceCounter++
  }
}


function getRandomNumber(range, forbidden) {
  if (range > 1) {
    var number = 0;
    while (number == forbidden) {
      number = Math.floor(Math.random() * range);
    }
    return number;
  }
}

$(document).ready(function() {
  responseFunction = setInterval(newResponce, 100);

  $('.hal').hover(function() {
    if (adaptiveFade) {
      $('.row').clearQueue()
      $('.row').animate({opacity: 1.0}, 3000)
    }
  }, function() {
    if (adaptiveFade) {
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
