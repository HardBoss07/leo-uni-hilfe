let flowers = [];
let flower;
let stem;
let leafs;

function preload() {
  flower = loadImage('/assets/flower.svg');
  stem = loadImage('/assets/stem.svg');
  leafs = loadImage('/assets/leafs.svg');
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);

  for (let i = flowers.length - 1; i >= 0; i--) {
    let f = flowers[i];
    f.update();
    f.show();
    if (f.isDone()) {
      flowers.splice(i, 1);
    }
  }
}

function mousePressed() {
  flowers.push(new Flower(mouseX, mouseY, flower, stem, leafs));
}
