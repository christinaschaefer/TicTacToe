// ToDo Doppel Klick vermeiden 
// ToDo Gewinner ermittel 
// ToDo Punktestand angeben 
//ToDo Name ermittel


bord();
addSpielname();

var spieler = {
  spieler_1: {
    name: "1",
    turn: true,
    winnArray: []
  },
  spieler_2: {
    name: "2",
    turn: false,
    winnArray: []
  }
}
var winnerArray = []
winArray(spieler.spieler_1, spieler.spieler_2)

// Erstellt das Bord 
function bord() {
  var bordContainer = document.getElementById("playerBord")

  for (let i = 0; i < 9; i++) {
    var playerButton = document.createElement("button")
    playerButton.innerHTML = i + 1
    playerButton.id = i
    playerButton.className = "gameFieldButton"
    bordContainer.appendChild(playerButton)

  }
}
// Erstellt ein Array mit den klicks 
function winArray(spieler1, spieler2) {
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleClick);

    //Speichert den angeklickten wert in ein Array 
    function handleClick(event) {
      var id = event.target.id
      if (spieler1.turn == true && spieler2.turn == false) {
        spieler1.winnArray.push(id)
        console.log(spieler1);
        spieler1.turn = false
        spieler2.turn = true
      } else if (spieler2.turn == true && spieler1.turn == false) {
        spieler2.winnArray.push(id)
        console.log(spieler2);
        spieler2.turn = false
        spieler1.turn = true
      }
    }
  }
}

console.log(spieler1);
// Liest den Spielernamen aus 
function addSpielname() {
  document.addEventListener("DOMContentLoaded", function () {
    var spieler1 = document.getElementById("spieler1");
    spieler1.addEventListener("input", function () {
      console.log(spieler1.value);
    });
  });
}