var newResponceCountTo = 0;
var newResponceCounter = 0;
var inputRegEx = /\D/



function getRepeatedString (string, amount) {
  var repeatedString = "";
  for (var x = 0; x < amount; x++) {
    repeatedString += string
  }
  return repeatedString;
}

function convertToComputerSpeak(numbers) {
  for (var i = 0; i < numbers.length; i++)
    if (numbers[i] === "3") return "I'm sorry, Dave. I'm afraid I can't do that.";

  for (var i = 0; i < numbers.length; i++)
    if (numbers[i] === "2") return getRepeatedString("Boop! ", numbers.length);

  for (var i = 0; i < numbers.length; i++)
    if (numbers[i] === "1") return getRepeatedString("Beep! ", numbers.length);
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


  $('#userInput').on('input',function(e){
    var text = $('#userInput').val();
    if (inputRegEx.test(text) || text.length > 36)
    $('#userInput').val(text.substring(0, text.length - 1));
    $('#halResponse').text(convertToComputerSpeak(text));

  });
});
