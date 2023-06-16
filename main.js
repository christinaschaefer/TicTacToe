//ToDo style den button klick 
// To Do Neustart Button 

var spieler = {
  spieler_1: {
    name: "Spieler 1",
    turn: true,
    winArray: [],
    gewonnen: false,
    spielpunkte: 0
  },
  spieler_2: {
    name: "Spieler 2",
    turn: false,
    winArray: [],
    gewonnen: false,
    spielpunkte: 0
  }
};

let spielrunde = 0;

// Gewinnmöglichkeiten
const winnerOption = [
  // Waagerecht
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Senkrecht
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6]
];

// Erstellt das Spielbrett
function bord() {
  var bordContainer = document.getElementById("playerBord");

  for (let i = 0; i < 9; i++) {
    var playerButton = document.createElement("button");
    playerButton.innerHTML = i + 1;
    playerButton.id = i;
    playerButton.className = "gameFieldButton";
    bordContainer.appendChild(playerButton);
  }
}

// Fügt die Klick-Handler und das Ändern der Klassen hinzu
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

        event.target.classList.add("spieler1");
        setTimeout(() => {
          checkWin(spieler1);
          neuesSpiel(spieler1, spieler2);
        }, 100);
      } else if (spieler2.turn == true && spieler1.turn == false) {
        spieler2.winArray.push(id);
        console.log(spieler2);
        spieler2.turn = false;
        spieler1.turn = true;

        event.target.classList.add("spieler2");
        setTimeout(() => {
          checkWin(spieler2);
          neuesSpiel(spieler1, spieler2);
        }, 100);
      }
    } else {
      alert("Dieser Button wurde bereits ausgewählt. Bitte wähle einen anderen Button aus!");
    }
  }
}

function checkWin(spieler) {
  const win = spieler.winArray.map(Number);

  if (win.length >= 3) {
    for (const option of winnerOption) {
      const [a, b, c] = option;
      if (win.includes(a) && win.includes(b) && win.includes(c)) {
        console.log(`${spieler.name} hat gewonnen!`);
        spieler.gewonnen = true;
        spielrunde += 1;
        console.log(spielrunde);
        spieler.spielpunkte += 1;
        break;
      }
    }
  }
}

function neuesSpiel(spieler1, spieler2) {
  const buttons = document.querySelectorAll("button");

  if (spieler1.gewonnen === true || spieler2.gewonnen === true) {
    const frage = confirm("Soll die Runde weitergeführt werden?");
    if (frage === true) {
      buttons.forEach(button => {
        button.removeAttribute("data-clicked");
        button.classList.remove("spieler1", "spieler2");
      });
      zurucksetzen(spieler1, spieler2);
    } else {
      setTimeout(() => {
        location.reload();
      }, 500);
      return; // Hinzugefügter Rückgabewert, um den Code abzubrechen
    }
    spielrundeAnzeigen(spielrunde, spieler1, spieler2);
  }
}

function zurucksetzen(spieler1, spieler2) {
  if (spieler1.gewonnen != false || spieler2.gewonnen != false) {
    spieler1.winArray = [];
    spieler2.winArray = [];
    spieler1.gewonnen = false;
    spieler2.gewonnen = false;
  }
}

// Anzeige der Spielrunden und Spielstand in Html 
function spielrundeAnzeigen(spielrunde, spieler1, spieler2) {
  let tabele = document.getElementById("spielstandInfo");
  let zeilenAnzahl = tabele.rows.length;

  if (zeilenAnzahl > 0) {
    // Es sind bereits Zeilen vorhanden, aktualisieren Sie die Zelleninhalte
    let letzteZeile = tabele.rows[zeilenAnzahl - 1];
    letzteZeile.cells[0].textContent = `Spielrunde: ${spielrunde}`;
    letzteZeile.cells[1].textContent = `${spieler1.name}: ${spieler1.spielpunkte}`;
    letzteZeile.cells[2].textContent = `${spieler2.name}: ${spieler2.spielpunkte}`;
  } else {
    // Es sind keine Zeilen vorhanden, fügen Sie neue Zeilen hinzu
    let newRow = tabele.insertRow(-1);
    let newCellSpielrunde = newRow.insertCell(0);
    let spielrundeText = document.createTextNode(`Spielrunde: ${spielrunde}`);
    newCellSpielrunde.appendChild(spielrundeText);

    let newCellSpieler1 = newRow.insertCell(1);
    let spielstandSpieler1 = document.createTextNode(`${spieler1.name}: ${spieler1.spielpunkte}`);
    newCellSpieler1.appendChild(spielstandSpieler1);

    let newCellSpieler2 = newRow.insertCell(2);
    let spielstandSpieler2 = document.createTextNode(`${spieler2.name}: ${spieler2.spielpunkte}`);
    newCellSpieler2.appendChild(spielstandSpieler2);
  }
}
//Input einfügen von den Namen 
function addSpielname(spieler1, spieler2) {
  document.addEventListener("DOMContentLoaded", function () {
    var inputSpieler1 = document.getElementById("spieler1");
    var inputSpieler2 = document.getElementById("spieler2");
    inputSpieler1.addEventListener("input", function () {
    nameSpieler1= inputSpieler1.value
    spieler1.name = nameSpieler1
    inputSpieler2.addEventListener("input", function () {
    nameSpieler2= inputSpieler2.value
    spieler2.name = nameSpieler2
    });
  });
});
}

bord();
addSpielname(spieler.spieler_1, spieler.spieler_2);
winArray(spieler.spieler_1, spieler.spieler_2);

