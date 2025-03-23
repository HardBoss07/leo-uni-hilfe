const SIZE_MULTIPLIER = 3; // Fixierter Multiplikator um die Grösse der Blume zu verändern

class Flower {

  // Grundvariablen definieren, Blume "zum leben" bringen
  constructor(x, y, flowerSVG, stemSVG, leafsSVG) {
    this.x = x;
    this.baseY = y;
    this.stemHeight = 0;
    this.maxStem = 40 * SIZE_MULTIPLIER;
    this.flowerSize = 0;
    this.maxFlowerSize = 20 * SIZE_MULTIPLIER;
    this.leafSize = 0;
    this.maxLeafSize = 35 * SIZE_MULTIPLIER;

    this.growthSpeed = 2;

    this.age = 0;
    this.lifespan = 300; // ~5 Sekunden bei 60 FPS
    this.alpha = 255;

    this.phase = 'sprout';  // phases: 'sprout', 'alive', 'die'

    this.flowerSVG = flowerSVG;
    this.stemSVG = stemSVG
    this.leafsSVG = leafsSVG;
  }

  // Altert die Blume und entscheidet übers Verhalten
  update() {
    this.age++;

    if (this.phase === 'sprout') {        // Blume zum wachsen bringen
      this.sprout();
    } else if (this.phase === 'alive') {  // Blume lebt nun, Blume ist ausgewachsen
      this.alive();
    } else if (this.phase === 'die') {    // Blume ist am verderben
      this.die();
    }
  }

  // Wachsen Animation
  sprout() {
    if (this.stemHeight < this.maxStem) {
      this.stemHeight += this.growthSpeed;
    } else if (this.leafSize < this.maxLeafSize) {
      this.leafSize += this.growthSpeed;
    } else if (this.flowerSize < this.maxFlowerSize) {
      this.flowerSize += this.growthSpeed;
    } else {
      this.phase = 'alive';
    }
  }

  // Lebende Blume
  alive() {
    if (this.age > this.lifespan) {
      this.phase = 'die';
    }
  }

  // Verderben Animation
  die() {
    this.alpha -= 5;
    if (this.alpha < 0) {
      this.alpha = 0;
    }
  }

  // Wachstum fertig von Blume
  isDone() {
    return this.alpha <= 0;
  }

  // Stiel
  drawStem() {
    push();
    tint(255, this.alpha);
    translate(0, 0);
    image(this.stemSVG, this.x, this.baseY - this.stemHeight, 10, this.stemHeight);
    noTint();
    pop();
  }

  drawLeafs() {
    push();
    tint(255, this.alpha);
    translate(0, 0);
    image(this.leafsSVG, this.x - 15, this.baseY, 40, -this.leafSize);
    noTint();
    pop();
  }  

  // Blume
  drawFlower() {
    push();
    tint(255, this.alpha);
    translate(0, 0);
    image(this.flowerSVG, this.x - 25, this.baseY - this.stemHeight, 50, -this.flowerSize);
    noTint();
    pop();
  }

  // Visualisierung der Blume
  show() {
    // Stiel anzeigen
    this.drawStem();

    // Blume anzeigen
    if (this.stemHeight >= this.maxStem) {
      this.drawLeafs();
    }

    if (this.leafSize >= this.maxLeafSize) {
      this.drawFlower();
    }
  }
}