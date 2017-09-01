function clearField() {
  $(".field").text("");
}

function getField() {
  var field = [];
  field.push($("#top > .field").toArray());
  field.push($("#center > .field").toArray());
  field.push($("#bottom > .field").toArray());
  field = field.map(function(row) {
    row = row.map(function(field) {
      return field.innerText;
    });
    return row;
  });
  return field;
}

function isWinner() {
  var field = getField();
}

$("#playing-field").hide();

$(document).ready(function() {
  var symbol;
  var current_turn;
  var count = 0;
  var opposite = {"X":"O","O":"X"};

  $(".field").click(function() {
    if ($(this).text() == "") {
      count++;
      $(this).text(current_turn);
      if (isWinner()) {
        console.log("You won!");
        clearField();
        count = 0;
        return;
      }
      current_turn = opposite[current_turn];
    }
    if (count >= 9) {
      console.log("It's a draw!");
      clearField();
      count = 0;
    }
  });

  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    var values = $( this ).serializeArray();

    if (values.length == 1) {
      $("form").hide();
      $("#playing-field").show();
      symbol = values["0"].value;
      current_turn = symbol;
    }

  });
});