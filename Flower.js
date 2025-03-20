const SIZE_MULTIPLIER = 3; // Fixierter Multiplikator um die Grösse der Blume zu verändern

class Flower {

  // Grundvariablen definieren, Blume "zum leben" bringen
  constructor(x, y) {
    this.x = x;
    this.baseY = y;
    this.stemHeight = 0;
    this.maxStem = 40 * SIZE_MULTIPLIER;
    this.flowerSize = 0;
    this.maxFlowerSize = 20 * SIZE_MULTIPLIER;

    this.growthSpeed = 2;

    this.age = 0;
    this.lifespan = 300; // ~5 Sekunden bei 60 FPS
    this.alpha = 255;

    this.phase = 'sprout';  // phases: 'sprout', 'alive', 'die'
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

  // Verdorbene Blume
  isDone() {
    return this.alpha <= 0;
  }

  // Stiel
  drawStem() {
    stroke(34, 139, 34, this.alpha);
    strokeWeight(1.5 * SIZE_MULTIPLIER);
    line(this.x, this.baseY, this.x, this.baseY - this.stemHeight);
  }

  drawLeafs() {
    fill(34, 139, 34, this.alpha); // Green fill for leaves
    noStroke();
  
    // Leaf size based on flowerSize
    let leafWidth = this.flowerSize * 0.6;
    let leafHeight = this.flowerSize * 0.3;
  
    // Offset to move ellipse so its end touches the stem base
    let offset = leafWidth / 2;
  
    // Left leaf
    push();
    translate(this.x, this.baseY);
    rotate(radians(-135)); // Point left
    translate(offset, 0); // Move ellipse so right edge touches stem
    ellipse(0, 0, leafWidth, leafHeight);
    pop();
  
    // Right leaf
    push();
    translate(this.x, this.baseY);
    rotate(radians(135)); // Point right
    translate(-offset, 0); // Move ellipse so left edge touches stem
    ellipse(0, 0, leafWidth, leafHeight);
    pop();
  }  

  // Blume
  drawFlower() {
    fill(255, 105, 180, this.alpha);
    noStroke();
    ellipse(this.x, this.baseY - this.stemHeight, this.flowerSize * 0.5, this.flowerSize * 0.9);
  }

  // Visualisierung der Blume
  show() {
    // Stiel anzeigen
    this.drawStem();
    this.drawLeafs();

    // Blume anzeigen
    if (this.stemHeight >= this.maxStem) {
      this.drawFlower();
    }
  }
}