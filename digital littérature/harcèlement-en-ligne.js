let motsAggressifs = [
  "Idiote", "Nul", "Inutile", "Honte", "Stupide",
  "Tu ne vaux rien", "Ridicule", "Imbécile", "Moche"
];

let affiches = [];
let vitesse = 1;
let densite = 1;
let paused = false;

// Boutons
let arretBtn = { w: 160, h: 60 };
let ficheBtn = { w: 220, h: 60 };

let afficheBoutons = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  noStroke();

  arretBtn.x = width / 2 - arretBtn.w / 2;
  arretBtn.y = height / 2 - 50;

  ficheBtn.x = width / 2 - ficheBtn.w / 2;
  ficheBtn.y = height / 2 + 40;
}

function draw() {
  background(255);

  if (paused) {
    fill(0);
    textSize(48);
    text("STOP", width / 2, height / 2);
    return;
  }

  // Affichage des mots agressifs
  if (frameCount % max(1, int(60 / vitesse)) === 0) {
    for (let i = 0; i < densite; i++) {
      let pos;
      let essais = 0;

      do {
        pos = {
          x: random(50, width - 50),
          y: random(50, height - 50)
        };
        essais++;
      } while (dansZoneBoutons(pos.x, pos.y) && essais < 50);

      affiches.push({
        text: random(motsAggressifs),
        x: pos.x,
        y: pos.y,
        size: random(24, 48)
      });
    }
  }

  // Affichage des mots
  fill(0);
  for (let mot of affiches) {
    textSize(mot.size);
    text(mot.text, mot.x, mot.y);
  }

  // Apparition des boutons
  if (affiches.length >= 6) {
    afficheBoutons = true;
  }

  if (afficheBoutons) {
    drawButton(arretBtn, "Je répond");
    drawButton(ficheBtn, "Je m'en fiche");
  }
}


function mousePressed() {
  if (!afficheBoutons) return;

  // Clic sur ARRÊT
  if (isInside(mouseX, mouseY, arretBtn)) {
    densite++;
    vitesse += 0.5;

    // Rétrécissement du bouton JE M'EN FICHE
    ficheBtn.w *= 0.85;
    ficheBtn.h *= 0.85;
    ficheBtn.x = width / 2 - ficheBtn.w / 2;
  }

  // Clic sur JE M'EN FICHE
  if (isInside(mouseX, mouseY, ficheBtn)) {
    paused = true;
  }
}

// Affichage des boutons
function drawButton(btn, label) {
  stroke(0);
  noFill();
  rect(btn.x, btn.y, btn.w, btn.h);

  noStroke();
  fill(0);
  textSize(btn.h / 2.5);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function isInside(mx, my, btn) {
  return (
    mx > btn.x &&
    mx < btn.x + btn.w &&
    my > btn.y &&
    my < btn.y + btn.h
  );
}

// Eviter que les boutons soit recouvert
function dansZoneBoutons(x, y) {
  return (
    x > arretBtn.x - 40 &&
    x < arretBtn.x + arretBtn.w + 40 &&
    y > arretBtn.y - 40 &&
    y < ficheBtn.y + ficheBtn.h + 40
  );
}
