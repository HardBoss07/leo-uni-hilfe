let categories, values, valuesGoal, colors;
let centerX, centerY, minRadius, maxRadius;
let angleStep;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);

  // Kategorien
  categories = [
    "Coding\nBasics", "Data\nVisualization", "Connectivity & \nSystem Integration", 
    "Embedded &\nElectronics", "Visual Media", "Mechanical Design",
    "Digital Fabrication", "Audio &\nSound Processing", "Interdisciplinary\nIntegration", 
    "Conceptual & Theoretical\nUnderstanding", "Prototyping &\nIterative Design",
    "Collaboration &\nResource Management"
  ];

  // Aktuelle Werte, Ziel Werte
  values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1];
  valuesGoal = [10, 10, 10, 10, 10, 3, 5, 2, 8, 9, 10, 3];

  // Farben für Kategorien
  colors = [
    '#6A0DAD', '#90EE90', '#228B22', '#DC143C', '#FFD700',
    '#FFA500', '#87CEEB', '#008000', '#FF1493', '#A0522D',
    '#00CED1', '#8A2BE2'
  ];

  // Mittelpunkt und andere Skalierungsfaktoren
  centerX = width / 2;
  centerY = height / 2;
  minRadius = 80;
  maxRadius = 300;
  angleStep = 360 / categories.length;
}

function draw() {
  background(255);
  translate(centerX, centerY);

  drawSectionBackgrounds();   // Eingefärbter Hintergrund
  drawCurrentValues();        // Aktuelle Werte völlig eingefärbt
  drawRadialGrid();           // Kreise
  drawCategoryLines();        // Kategorie Trenner Linien
  drawGoalArea();             // Ziel Werte als Linie
}

// Hintergrund mit semi-transparenter Farbe
function drawSectionBackgrounds() {
  for (let i = 0; i < categories.length; i++) {
    let angleStart = i * angleStep - 90;
    let angleEnd = (i + 1) * angleStep - 90;

    fill(colorAlpha(colors[i], 50)); // Semi-transparente Farbe
    noStroke();
    beginShape();
    vertex(0, 0);
    for (let angle = angleStart; angle <= angleEnd; angle += 1) {
      let x = cos(angle) * maxRadius;
      let y = sin(angle) * maxRadius;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

// Kreise für Hintergrund
function drawRadialGrid() {
  stroke(200);
  noFill();
  for (let i = 1; i <= 10; i++) {
    let r = map(i, 0, 10, minRadius, maxRadius);
    ellipse(0, 0, r * 2, r * 2);
  }
}

// Kategorie Separatoren
function drawCategoryLines() {
  for (let i = 0; i < categories.length; i++) {
    let angleStart = i * angleStep - 90;
    let angleMid = angleStart + angleStep / 2; // Mittelpunkt der aktuellen Kategorie

    let x1 = cos(angleStart) * minRadius;
    let y1 = sin(angleStart) * minRadius;
    let x2 = cos(angleStart) * maxRadius;
    let y2 = sin(angleStart) * maxRadius;

    // Zeichnen der Separatoren
    stroke(150);
    line(x1, y1, x2, y2);

    // Rotierte Kategorie Position
    let labelX = cos(angleMid) * (maxRadius + 40);
    let labelY = sin(angleMid) * (maxRadius + 40);

    push(); // Speichern der transform Variablen
    translate(labelX, labelY);
    rotate(angleMid + 90); // Rotieren des Textes
    noStroke();
    fill(0);
    textSize(12);
    text(categories[i], 0, 0); // Zentrieren
    pop(); // Wiederherstellung der transform Variablen
  }
}

// Ziel Werte als rote Linie
function drawGoalArea() {
  stroke('red');
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i < categories.length; i++) {
    let angleStart = i * angleStep - 90;
    let angleMid = angleStart + angleStep / 2; // Mittelpunkt der Kategorie berechnen

    let goalRadius = map(valuesGoal[i], 0, 10, minRadius, maxRadius);
    let x = cos(angleMid) * goalRadius;
    let y = sin(angleMid) * goalRadius;
    vertex(x, y);
  }
  endShape(CLOSE);
}

// Aktuelle Werte zeichnen mit voll saturierter Farbe
function drawCurrentValues() {
  for (let i = 0; i < categories.length; i++) {
    let angleStart = i * angleStep - 90;
    let angleEnd = (i + 1) * angleStep - 90;

    let valueRadius = map(values[i], 0, 10, minRadius, maxRadius);

    fill(colors[i]); // Nutzen der voll saturierter Farbe
    noStroke();
    beginShape();
    vertex(0, 0);
    for (let angle = angleStart; angle <= angleEnd; angle += 1) {
      let x = cos(angle) * valueRadius;
      let y = sin(angle) * valueRadius;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

// Helfer Funktion zum Alpha Wert Anpassen
function colorAlpha(hex, alpha) {
  let c = color(hex);
  return color(red(c), green(c), blue(c), alpha);
}
