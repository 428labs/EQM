let focusActive = false;
let resetActive = false;
let resetSeconds = 0;
let fadeAlpha = 0;
let lastResetVal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('JetBrains Mono');
  // Устанавливаем жирность, так как в index.html подгружен вес 700
  textStyle(BOLD);
}

function draw() {
  background(0);
  let w = width, h = height;

  // 1. Геометрия (скругление от ШИРИНЫ w)
  // Верхний правый: 1/4 w, Нижний левый: 1/2 w
  fill(15);
  noStroke();
  rect(0, 0, w, h, 0, w/4, 0, w/2); 

  // 2. FOCUS (Верх)
  fill(focusActive ? 255 : 100);
  textSize(w * 0.1);
  textAlign(CENTER, CENTER);
  text("FOCUS", w/2, h * 0.2);

  // 3. RESET (Центр)
  if (resetActive) {
    resetSeconds += 1/60;
  }

  // Отрисовка круга
  fill(211);
  let circleSize = w * 0.5; // Размер круга тоже от ширины для универсальности
  if (circleSize > h * 0.3) circleSize = h * 0.3; // Но не больше 30% высоты
  
  circle(w/2, h/2, circleSize);
  
  // Надпись или секунды внутри круга
  fill(0);
  if (fadeAlpha > 0) {
    textSize(circleSize * 0.25);
    fill(0, 0, 0, fadeAlpha);
    text(nf(lastResetVal, 1, 1) + "s", w/2, h/2);
    fadeAlpha -= 255 / (3 * 60); // затухание 3 сек
  } else {
    textSize(circleSize * 0.2);
    text("RESET", w/2, h/2);
  }

  // 4. EXPERIENCES (Низ)
  fill(211);
  textSize(w * 0.05);
  text("EXPERIENCES", w/2, h * 0.85);
}

function mousePressed() {
  let w = width;
  let h = height;
  let circleSize = w * 0.5;
  if (circleSize > h * 0.3) circleSize = h * 0.3;

  // Клик по FOCUS (верхняя треть)
  if (mouseY < h * 0.3 && !focusActive) {
    focusActive = true;
  }
  
  // Зажим RESET (внутри круга)
  let d = dist(mouseX, mouseY, w/2, h/2);
  if (d < circleSize / 2) {
    resetActive = true;
    resetSeconds = 0;
    fadeAlpha = 0;
  }
}

function mouseReleased() {
  if (resetActive) {
    lastResetVal = resetSeconds;