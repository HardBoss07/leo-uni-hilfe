class Flower {
  constructor(x, y) {
    this.x = x;
    this.baseY = y;
    this.stemHeight = 0;
    this.maxStem = 60;
    this.flowerSize = 0;
    this.maxFlowerSize = 20;

    this.growthSpeed = 2;

    this.age = 0;
    this.lifespan = 300; // ~5 Sekunden bei 60 FPS
    this.alpha = 255;

    this.phase = 'sprout'; // phases: 'sprout', 'alive', 'die'
  }

  update() {
    this.age++;

    if (this.phase === 'sprout') {
      this.sprout();
    } else if (this.phase === 'alive') {
      this.alive();
    } else if (this.phase === 'die') {
      this.die();
    }
  }

  sprout() {
    if (this.stemHeight < this.maxStem) {
      this.stemHeight += this.growthSpeed;
    } else if (this.flowerSize < this.maxFlowerSize) {
      this.flowerSize += this.growthSpeed;
    } else {
      this.phase = 'alive';
    }
  }

  alive() {
    if (this.age > this.lifespan) {
      this.phase = 'die';
    }
  }

  die() {
    this.alpha -= 5;
    if (this.alpha < 0) {
      this.alpha = 0;
    }
  }

  show() {
    // Stiel
    stroke(34, 139, 34, this.alpha);
    strokeWeight(2);
    line(this.x, this.baseY, this.x, this.baseY - this.stemHeight);

    // Blume
    if (this.stemHeight >= this.maxStem) {
      fill(255, 105, 180, this.alpha);
      noStroke();
      ellipse(this.x, this.baseY - this.stemHeight, this.flowerSize, this.flowerSize);
    }
  }

  isDone() {
    return this.alpha <= 0;
  }
}