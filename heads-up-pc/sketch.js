let words = [
  "Business Intelligence",
  "Taylor Swift",
  "Bissantz",
  "Planung",
  "Marketing",
  "Data Mining",
  "Power BI",
  "Fußball!",
  "Kaffee",
  "Frühstück",
  "Urlaub",
  "Abenteuer",
  "Lachen",
  "Musik",
  "Tanz",
  "Kino",
  "Buch",
  "Haustier",
  "Garten",
  "Kunst",
  "Data Warehouse",
  "Data Lake",
  "Big Data",
  "Datenintegration",
  "Self-Service",
  "Datenmodellierung",
  "Datensicherheit",
  "Reporting",
];
let shuffledArray = [];
let rounds = 2; // ------------------------ changable ------------------------ //

let word = 0;
let Regular, Bold, ExtraBold;

let bar = 0;
let roundA = 1;
let roundB = 1;
let time, barTime, sectionTime;
let sectionTimeOut = 30000; //1s (1000 milliseconds)

let playerA = true;
let pointsA = 0;
let pointsB = 0;
let gameStarted = false;
let gameOn = false;
let sectionOn = false;

function preload() {
  Regular = loadFont("OpenSans-Regular.ttf");
  Bold = loadFont("OpenSans-Bold.ttf");
  ExtraBold = loadFont("OpenSans-ExtraBold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  shuffledArray = shuffleArray(words);
  console.log(shuffledArray);
}

function shuffleArray(array) {
  let shuffled = array.slice();
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function startPage() {
  if (gameOn === false) {
    bg("#ffffff");
    textFont(ExtraBold);
    textSize(height / 10);
    fill("#000000");
    textAlign(CENTER, CENTER);
    textWrap(WORD);
    text(
      "Hi,",
      width / 2,
      height / 2,
      width - height / 10,
      height / 2 - height / 20
    );
    if (pointsA <= 0) pointsA = 0;
    textSize(height / 30);
    textFont(Bold);
    text("hier ist für Computer!", width / 2, height / 2 + height / 10);
    textFont(Regular);
    textSize(height / 50);
    textLeading(height / 30);
    text(
      "Drück die Leertaste zum Start.  \n Pfeil Auf: Überspringen, Pfeil Runter: Richtig!",
      width / 2,
      height / 2 + height / 3,
      width - height / 3,
      height / 2 - height / 3
    );

    if (keyIsPressed === true) {
      if (keyCode === 32) {
        gameStarted = true;
        gameOn = true;
        sectionOn = true;
        bg("#ffffff");
        time = millis();
        sectionTime = millis();
      }
    }
  }
}

function draw() {
  frameRate(60);
  bg("#ffffff");
  startPage();

  if (millis() - sectionTime >= sectionTimeOut) {
    sectionOn = false;
  }

  if (roundB >= rounds + 1) gameOn = false;
  if (gameStarted === true && gameOn === false) over();
  if (gameOn === true) {
    if (sectionOn === false) {
      pause();
      if (keyIsPressed === true) {
        if (keyCode === 32) {
          sectionOn = true;
          sectionTime = millis();

          if (playerA === true) {
            roundA += 1;
            playerA = false;
          } else {
            roundB += 1;
            playerA = true;
          }
        }
      }
    }
    if (sectionOn === true) {
      game();
      processBar();
    }
  }

  if (pointsA <= 0) pointsA = 0;
  if (pointsB <= 0) pointsB = 0;

  console.log("roundA: " + roundA + "; roundB: " + roundB);
}

function game() {
  textFont(Bold);
  textSize(height / 10);
  fill("#000000");
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  text(
    shuffledArray[word],
    width / 2,
    height / 2,
    width - height / 10,
    height - height / 10
  );

  if (keyIsPressed === true) {
    if (keyCode === UP_ARROW) {
      bg("#be0019");
      fill("#ffffff");
      textFont(ExtraBold);
      text("Überspringen.", width / 2, height / 2);
      frameRate(3);
      changeWord();
      if (playerA === true) pointsA -= 1;
      else pointsB -= 1;
      console.log("A win: " + pointsA + "; B win: " + pointsB);
      time = millis();
    } else if (keyCode === DOWN_ARROW) {
      bg("#002d71");
      fill("#ffffff");
      textFont(ExtraBold);
      text("Richtig!", width / 2, height / 2);
      frameRate(3);
      changeWord();
      if (playerA === true) pointsA += 1;
      else pointsB += 1;
      console.log("A win: " + pointsA + "; B win: " + pointsB);
      time = millis();
    }
  }
}

function pause() {
  bg("#002d71");
  console.log("one section over.");
  fill("#ffffff");
  textFont(Bold);
  textSize(height / 40);
  text(roundB + ". Runde", width / 2, height / 2 - height / 14);
  textFont(ExtraBold);
  textSize(height / 10);
  if (playerA === true)
    text(
      "Punkte: " + pointsA,
      width / 2,
      height / 2,
      width - height / 10,
      height / 2 - height / 10
    );
  else
    text(
      "Punkte: " + pointsB,
      width / 2,
      height / 2,
      width - height / 10,
      height / 2 - height / 10
    );

  textSize(height / 30);
  textFont(Bold);
  text("Gut gemacht!", width / 2, height / 2 + height / 10);

  textFont(Regular);
  textSize(height / 50);
  textLeading(height / 30);
  text(
    "Tausche aus und drücke die Leertaste.",
    width / 2,
    height / 2 + height / 3,
    width - height / 3,
    height / 2 - height / 3
  );
}

function over() {
  bg("#002d71");
  console.log("game over.");
  fill("#ffffff");
  textFont(ExtraBold);
  textSize(height / 5);
  text(
    pointsA + " : " + pointsB,
    width / 2,
    height / 2 - height / 20,
    width - height / 10,
    height / 2 - height / 10
  );
  textSize(height / 30);
  textFont(Bold);
  text("Gut gespielt!", width / 2, height / 2 + height / 10);
}

function processBar() {
  fill("#c8c8c8");
  rectMode(CORNER);
  barTime = millis() - sectionTime;
  bar = map(barTime, 0, sectionTimeOut, 0, width);
  rect(0, height - 20, bar, 20);
}

function bg(color) {
  background("#f7f7f7");
  fill(color);
  noStroke();
  rectMode(CENTER);
  rect(
    width / 2,
    height / 2,
    width - height / 10,
    height - height / 10,
    height / 20
  );
}

function changeWord() {
  word += 1;
  if (word >= words.length) word = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
