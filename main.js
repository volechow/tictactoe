function clearField() {
  $(".field").text("");
  $(".field").removeClass("marked");
  $(".field").removeClass("X");
  $(".field").removeClass("O");
}

function showResult(message) {
  $("#message").text(message);
  $("#message").addClass("alert-info");
  $("#message").show();
  $("#message").fadeOut(3000);
}

function markField(field, symbol) {
  field.text(symbol);
  field.addClass("marked");
  field.addClass(symbol);
}

function computerMove() {
  $(".field").forEach(function(elem) {
    console.log(elem);
  });
}

function initGame() {
  $("#playing-field").hide();
  $("#message").hide();
  $("form").show();
  clearField();
}

function win(field, symbol) {
  var winner = checkCombis(field,symbol);
  if (winner !== undefined) {
    showResult("Computer won!");
    clearField();
  }
  return winner !== undefined;
}

function computerMove(symbol) {
  var opposite = {"X":"O","O":"X"};
  var field = null;
  
  // Win: If you have two in a row, play the third to get three in a row.
  field = $(".field").not(".marked").sort(function() {
    return Math.round(Math.random())-0.5;
  }).first();
  markField(field, symbol);

  // Block: If the opponent has two in a row, play the third to block them.
  // Fork: Create an opportunity where you can win in two ways.
  // Block Opponent's Fork:
  // Option 1: Create two in a row to force the opponent into 
  //           defending, as long as it doesn't result in them 
  //           creating a fork or winning. For example, if "X" 
  //           has a corner, "O" has the center, and "X" has 
  //           the opposite corner as well, "O" must not play a 
  //           corner in order to win. (Playing a corner in this 
  //           scenario creates a fork for "X" to win.)
  // Option 2: If there is a configuration where the opponent can 
  //           fork, block that fork.

  // Center: Play the center.
  // Opposite Corner: If the opponent is in the corner, play the opposite corner.
  // Empty Corner: Play an empty corner.
  // Empty Side: Play an empty side.

  // check for winning combination for player
    if (isWinner(field, symbol)) {
      showResult("Computer won!");
      clearField();
      return;
    }

}

function checkCombis(field, symbol) {
  var combis = ["top","center","bottom",
                "left","right","middle",
                "dia1","dia2"];
  
  var winner = combis.find(function(elem) {
    if (field.hasClass(elem)) {
      var selection = $(".field").filter("."+elem);
      var combi = selection.filter("."+symbol);
      return combi.length == 3;
    }
    return false;
  });

  return winner;
}

function isWinner(field, symbol) {
  var winner = checkCombis(field, symbol);
  return winner !== undefined;
}

initGame();
$(document).ready(function() {
  var player;
  var count = 0;
  var opposite = {"X":"O","O":"X"};

  $(".field").click(function() {
    var field = $(this)

    // mark an unused field
    if (field.not(".marked")) {
      markField(field,player);
    }

    // check for winning combination for player
    if (isWinner(field, player)) {
      showResult("Player won!");
      clearField();
      return;
    } 

    // all fields marked
    if ($(".marked").length == 9) {
      showResult("It's a draw!");
      clearField();
      return;
    }

    computerMove(opposite[player]);
  });

  // choose symbol
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    var values = $(this).serializeArray();

    if (values.length == 1) {
      $("form").hide();
      $("#playing-field").show();
      player = values["0"].value;
    }
  });

});