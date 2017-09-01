function clearField() {
  $(".field").text("");
}

function showResult(message) {
  $("#message").text(message);
  $("#message").addClass("alert-info");
  $("#message").show();
  $("#message").fadeOut(3000);
}

function isWinner(field, symbol) {
  var combi = "";
  var class_string = field.attr("class");
  var winner_combis = ["left","right","middle","dia1","dia2"];  

  function getCombi(selector) {
    var combi = field.parent().siblings().find(selector).text();
    return combi;
  }

  function checkCombi(combi, symbol) {
    return combi == symbol + symbol;
  }

  // winner_combis.forEach(function(elem) {
  //   if (class_string.includes(elem)) {
  //     combi = getCombi("."+elem);
  //     if (checkCombi(combi,symbol)) {
  //       return true; 
  //     }
  //   }
  // });

  // check horizontal for winner
  combi = field.siblings().text();
  if (checkCombi(combi, symbol)) { return true; }

  // check vertical for winner
  if (class_string.includes("left")) {
    combi = getCombi(".left");
    if (checkCombi(combi, symbol)) { return true; }
  } 
  if (class_string.includes("middle")) {
    combi = getCombi(".middle");
    if (checkCombi(combi, symbol)) { return true; }
  } 
  if (class_string.includes("right")) {
    combi = getCombi(".right");
    if (checkCombi(combi, symbol)) { return true; }
  }

  // check diagonal for winner
  if (class_string.includes("dia1")) {
    combi = getCombi(".dia1");
    if (checkCombi(combi, symbol)) { return true; }
  }
  if (class_string.includes("dia2")) {
    combi = getCombi(".dia2");
    if (checkCombi(combi, symbol)) { return true; }
  }
  return false;
}



$("#playing-field").hide();
$("#message").hide();

$(document).ready(function() {
  var player;
  var current_turn;
  var count = 0;
  var opposite = {"X":"O","O":"X"};

  $(".field").click(function() {
    
    // mark an unused field
    if ($(this).text() == "") {
      count++;
      $(this).text(current_turn);

      // check for winning combination for player
      if (isWinner($(this), current_turn)) {
        showResult(current_turn + " won!");
        clearField();
        count = 0;
        return;
      } 
      current_turn = opposite[current_turn];
    }
    
    // all fields marked
    if (count >= 9) {
      showResult("It's a draw!");
      clearField();
      count = 0;
    }
  });

  // choose symbol
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    var values = $(this).serializeArray();

    if (values.length == 1) {
      $("form").hide();
      $("#playing-field").show();
      player = values["0"].value;
      current_turn = player;
    }
  });

});