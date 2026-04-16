let focusActive = false;
let resetActive = false;
let resetSeconds = 0;
let fadeAlpha = 0;
let lastResetVal = 0;
let timeLeft = 25 * 60;
let totalDuration = 25 * 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Используем системный шрифт, пока не подгрузим JetBrains Mono
  textFont('sans-serif');
  textStyle(BOLD);
}

function draw() {
  background(0);
  let w = width, h = height;

  // 1. Геометрия
  fill(15);
  noStroke();
  rect(0, 0, w, h, 0, w/4, 0, w/2); 

  // 2. Логика Таймера
  if (focusActive && timeLeft > 0) {
    timeLeft -= 1/60;
  }

  // 3. FOCUS (Верх)
  fill(focusActive ? 255 : 100);
  textAlign(CENTER, CENTER);
  
  if (focusActive && timeLeft > 0) {
    textSize(w * 0.15);
    let mins = floor(timeLeft / 60);
    let secs = floor(timeLeft % 60);
    text(nf(mins, 2) + ":" + nf(secs, 2), w/2, h * 0.2);
  } else {
    textSize(w * 0.1);
    text("FOCUS", w/2, h * 0.2);
  }

  // 4. RESET (Центральный круг)
  if (resetActive) resetSeconds += 1/60;

  let progress = timeLeft / totalDuration;
  let pulse = focusActive ? sin(frameCount * 0.1) * 10 : 0;
  let circleSize = (w * 0.5) * progress + pulse;
  if (circleSize > h * 0.3) circleSize = h * 0.3;
  if (circleSize < 50) circleSize = 50; // Минимальный размер

  fill(211);
  circle(w/2, h/2, circleSize);
  
  // Надпись RESET
  fill(0);
  if (fadeAlpha > 0) {
    textSize(circleSize * 0.25);
    fill(0, 0, 0, fadeAlpha);
    text(nf(lastResetVal, 1, 1) + "s", w/2, h/2);
    fadeAlpha -= 255 / (3 * 60);
  } else if (!focusActive) {
    textSize(circleSize * 0.2);
    text("RESET", w/2, h/2);
  }

  // 5. EXPERIENCES
  fill(211);
  textSize(w * 0.05);
  text("EXPERIENCES", w/2, h * 0.85);
}

function mousePressed() {
  let w = width, h = height;
  let circleSize = w * 0.5;
  if (circleSize > h * 0.3) circleSize = h * 0.3;

  // Клик по FOCUS
  if (mouseY < h * 0.3 && !focusActive) {
    focusActive = true;
  }
  
  // Зажим RESET
  if (dist(mouseX, mouseY, w/2, h/2) < circleSize / 2) {
    resetActive = true;
    resetSeconds = 0;
    f