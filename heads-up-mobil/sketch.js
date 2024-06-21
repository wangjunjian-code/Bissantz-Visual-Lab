let button;
let permissionGranted = false;

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
let rounds = 2; // ------------------------ changable ------------------------ //

let word = 0;
let Regular, Bold, ExtraBold;

let bar = 0;
let roundA = 1;
let roundB = 1;
let time, barTime, sectionTime;
let timeOut = 60000; //1s (1000 milliseconds)
let sectionTimeOut = 60000;

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
  let shuffledArray = shuffleArray(words);
  console.log(shuffledArray);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //  createCanvas(displayWidth, displayHeight);

  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .catch(() => {
        let button = createButton("Sensor Aktiviren.");
        button.style(
          "transform: translate(-50%, -50%);font-family: 'Open Sans'; font-weight: 600;font-size: 4vw; background-color: #ffffff;color: #be0019; padding: 2vh 2vh;border-radius: 10px;border: none;"
        );
        button.position(width/2, height/2+height /6);
        button.mousePressed(requestAccess);
        throw error;
      })
      .then(() => {
        permissionGranted = true;
      });
  } else computer();

  R = 0;
}

function shuffleArray(array) {
  let shuffled = array.slice();
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

function computer() {
  bg("#be0019");
  textFont(ExtraBold);
  fill("#ffffff");
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  textSize(height / 10);
  text("Hi,", width / 2, height / 2 - height / 20);

  textSize(height / 30);
  textFont(Bold);
  text(
    "bist du am Handy?",
    width / 2,
    height / 2 + height / 20,
    width - height / 4,
    height / 2 - height / 4
  );

  textFont(Regular);
  textSize(height / 50);
  textLeading(height / 30);
  text(
    "Für die mobile Version aktiviere den Sensor und drehe dein Gerät um.",
    width / 2,
    height / 2 + height / 3,
    width - width / 2,
    height / 2
  );
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
    .catch(console.error);
  this.remove();
}

function startPage() {
  if (gameOn === false) {
    bg("#ffffff");
    textFont(ExtraBold);
    textSize(height / 10);
    fill("#000000");

    push();
    translate(width / 2, height / 2);
    rotate(HALF_PI);
    textAlign(CENTER, CENTER);
    textWrap(WORD);
    text("Hi!", 0, 0, width - height / 10, height / 2 - height / 20);

    if (pointsA <= 0) pointsA = 0;
    textSize(height / 30);
    textFont(Bold);
    text("Klicken zum Start. ", 0, 0 + height / 10);

    textFont(Regular);
    textSize(height / 50);
    textLeading(height / 30);
    text(
      "Nach oben klappen: Überspringen, nach unten klappen: richtig.",
      0,
      0 + height / 5,
      height,
      width
    );
    pop();
  }
}

function touchStarted() {
  if (permissionGranted) {
    if (gameOn === false) {
      gameStarted = true;
      gameOn = true;
      sectionOn = true;
      bg("#ffffff");
      time = millis();
      sectionTime = millis();
    }
    if (gameOn === true && sectionOn === false) {
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

function draw() {
  if (!permissionGranted) {
    computer();
    return;
  }

  R = int(rotationY * 100);
  console.log(int(rotationY * 100));

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
    }
    if (sectionOn === true) {
      game();
      processBar();
    }
  }

  if (pointsA <= 0) pointsA = 0;
  if (pointsB <= 0) pointsB = 0;

  //console.log("roundA: " + roundA + "; roundB: " + roundB);
}

function game() {
  push();
  translate(width / 2, height / 2);
  rotate(HALF_PI);
  textFont(Bold);
  textSize(height / 12);
  fill("#000000");
  textAlign(CENTER, CENTER);
  textWrap(WORD);
 // textLeading(15);
  text(words[word], 0, 0, width - height / 10, height - height / 10);
  pop();

  if (R < -10 && R > -100) {
    bg("#be0019");

    push();
    translate(width / 2, height / 2);
    rotate(HALF_PI);
    textAlign(CENTER, CENTER);
    fill("#ffffff");
    textFont(ExtraBold);
    text("Überspringen.", 0, 0);
    pop();
    frameRate(3);
    changeWord();
    if (playerA === true) pointsA -= 1;
    else pointsB -= 1;
    //console.log("A win: " + pointsA + "; B win: " + pointsB);
    time = millis();
  } else if (R < 100 && R > 10) {
    bg("#002d71");
    push();
    translate(width / 2, height / 2);
    rotate(HALF_PI);
    textAlign(CENTER, CENTER);
    fill("#ffffff");
    textFont(ExtraBold);
    text("Richtig!", 0, 0);
    pop();
    frameRate(3);
    changeWord();
    if (playerA === true) pointsA += 1;
    else pointsB += 1;
    //console.log("A win: " + pointsA + "; B win: " + pointsB);
    time = millis();
  }
}

function pause() {
  bg("#002d71");
  //console.log("one section over.");
  push();
  translate(width / 2, height / 2);
  rotate(HALF_PI);
  textAlign(CENTER, CENTER);
  fill("#ffffff");
  textFont(ExtraBold);
  textSize(height / 10);
  if (playerA === true) text("Punkte: " + pointsA, 0, 0, width, height / 2);
  else text("Punkte: " + pointsB, 0, 0, width, height / 2);

  textSize(height / 30);
  textFont(Bold);
  text(roundB + ". Runde", 0, 0 - height / 10);
  text("Tausche aus und klicke weiter.", 0, 0 + height / 8);
  pop();
}

function over() {
  bg("#002d71");
  //console.log("game over.");
  push();
  translate(width / 2, height / 2);
  rotate(HALF_PI);
  textAlign(CENTER, CENTER);
  fill("#ffffff");
  textFont(ExtraBold);
  textSize(height / 5);
  text(pointsA + " : " + pointsB, 0, 0 - height / 20, width, height / 2);
  textSize(height / 30);
  textFont(Bold);
  text("Gut gespielt!", 0, 0 + height / 8);

  textFont(Regular);
  textSize(height / 50);
  textLeading(height / 30);
  text(
    "Aktualisere die Seite, um das Spiel neu zu starten. \n ",
    0,
    0 + height / 5,
    height,
    width
  );
  pop();
}

function processBar() {
  fill("#c8c8c8");
  rectMode(CORNER);
  barTime = millis() - sectionTime;
  bar = map(barTime, 0, timeOut, 0, height);
  rect(0, 0, width / 50, bar);
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
