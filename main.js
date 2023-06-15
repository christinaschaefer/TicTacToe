
// ToDo Punktestand angeben 
//ToDo Name ermittel

var spieler = {
  spieler_1: {
    name: "1",
    turn: true,
    winArray: [],
    gewonnen: false
  },
  spieler_2: {
    name: "2",
    turn: false,
    winArray: [],
    gewonnen: false
  }
}

var spielrunde=0;
const winnerOption = [
  //waagerecht
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //senkrecht
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal 
  [0, 4, 8],
  [2, 4, 6],
];


// ToDo Funktionen in eine funtktion reinschmeischen 
bord();
addSpielname();
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
// Erstellt ein Array mit den klicks und ändert die Klasse, um die Frabe dann oder das Aussehen zu ändern 
function winArray(spieler1, spieler2) {
  var buttons = document.getElementsByTagName("button");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleClick);
  }

  function handleClick(event) {
    if (!event.target.hasAttribute("data-clicked")) {
      event.target.setAttribute("data-clicked", "true");

      var id = event.target.id;

      if (spieler1.turn == true && spieler2.turn == false) {
        spieler1.winArray.push(id);
        console.log(spieler1);
        spieler1.turn = false;
        spieler2.turn = true;

        // ändert den Classennamen der aktuellen klasse 
        event.target.classList.add("spieler1");
        setTimeout(() => {
          checkWin(spieler1);
          neuesSpiel(spieler1,spieler2);
        }, 100);
      } else if (spieler2.turn == true && spieler1.turn == false) {
        spieler2.winArray.push(id);
        console.log(spieler2);
        spieler2.turn = false;
        spieler1.turn = true;
        // ändert den Classennamen der aktuellen klasse 
        event.target.classList.add("spieler2");
        setTimeout(() => {
          checkWin(spieler2)
          neuesSpiel(spieler1,spieler2)
        }, 100);
      }
    } else {
      alert("Dieser Button wurde schon mal ausgewählt. Bitte such dir ein anderen Button aus!");
    }
  }
}

function checkWin(spieler) {
  const win = spieler.winArray.map(Number); // Konvertiere die Elemente des Arrays in numerische Werte

  // prüft ob 3 eingeben gemacht wurden, erst dann vergelicht er die Arrays 
  if (win.length >= 3) {
    // iteration über winnerOption 
    for (const option of winnerOption) {
      const [a, b, c] = option;
      if (win.includes(a) && win.includes(b) && win.includes(c)) {
        console.log(`${spieler.name} hat gewonnen!`);
        spieler.gewonnen = true;
        spielrunde +=1
        console.log(spielrunde);
        break;
      }
    }
  }
}

// fragt ob ein neues spiel gemacht werden soll 
function neuesSpiel(spieler1,spieler2) {
  const buttons = document.querySelectorAll("button");
  if (spieler1.gewonnen === true || spieler2.gewonnen === true) {
    const frage = confirm("Soll die Runde weiter geführt werden?")
    if (frage === true) {
      buttons.forEach(button => {
        button.removeAttribute("data-clicked");
        button.classList.remove("spieler1", "spieler2")
        zurucksetzen(spieler1,spieler2)
      })
    } else {
      location.reload();
    }
  }
}

// setzt alle Daten zurück 
function zurucksetzen(spieler1,spieler2){
if (spieler1.gewonnen != false || spieler2.gewonnen != false){
  spieler1.winArray =[];
  spieler2.winArray = [];
  spieler1.gewonnen = false;
  spieler2.gewonnen = false;
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

