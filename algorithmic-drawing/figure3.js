function setup() {
  createCanvas(640, 400);
}

function draw() {
  background(220);
  let data = [
    [0, 0],
    [0, 2],
    [2, -1]
  ];
  let X = [];
  let Y = [];
  for (let i = 0; i < data.length; i++) {
    X[i] = data[i][0] * width / 15;
    Y[i] = data[i][1] * width / 15; 
  }
  for (let i = 0; i < X.length - 1; i++) {
    line(X[i], Y[i], X[i + 1], Y[i + 1]);
  }
  for (let x = 1; x <= 1100; x += 4) {
    let x1 = x / 2;
    let y1 = x / 10 * sin(x / 20) + x / 20 + height / 5;
    let x2 = 50 * sin(width / x / 70) + width / 2;
    let y2 = x / 4 * sin(x / 120) + width / 5;

    line(x1, y1, x2, y2);
  }

}
