function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  drawBackground();  
  angleMode(RADIANS);
  rectMode(CORNER);
  noStroke();

  // Position du carré de base
  translate(width / 2 - 75, height - 100);
  let baseSize = 100;
  let depth = 9;

  drawPythagoreanTree(baseSize, depth);
}

function drawBackground() {
  // Dégradé du ciel
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color("#87CEFA"), color("#FFFFFF"), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Sol
  noStroke();
  fill("#228B22"); // vert forêt
  rect(0, height - 80, width, 80);
}

function drawPythagoreanTree(size, depth) {
  if (depth <= 0 || size < 2) return;

  // Couleurs de l'arbre 
  let colors = ['#8A2BE2', '#20B2AA', '#1E90FF'];
  fill(colors[depth % colors.length]);

  rect(0, -size, size, size);
  let newSize = size * sqrt(2) / 2;

  // Branche gauche
  push();
  translate(0, -size);
  rotate(-PI / 4);
  drawPythagoreanTree(newSize, depth - 1);
  pop();

  // Branche droite
  push();
  translate(size, -size);
  rotate(PI / 4);
  drawPythagoreanTree(newSize, depth - 1);
  pop();
}
