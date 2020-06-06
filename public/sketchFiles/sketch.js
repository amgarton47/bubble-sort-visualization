const WIDTH = 615;
const HEIGHT = 600;

const NUM_BARS = 35;
const BAR_MARGIN = WIDTH / NUM_BARS / 5;
const BAR_WIDTH = (WIDTH - (NUM_BARS + 1) * BAR_MARGIN) / NUM_BARS;

BAR_MAX_HEIGHT = (HEIGHT / 4) * 3;

let looping = true;

let heights = [];

let i = 0;
let j = 0;

let speedSlider;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let i = 0; i < NUM_BARS; i++) {
    let h = Math.floor(random(BAR_MARGIN, BAR_MAX_HEIGHT));
    heights.push(h);
  }

  let btn = createButton("toggle pause");
  btn.position(19, 19);
  btn.mousePressed(() => {
    if (looping) {
      looping = false;
      noLoop();
    } else {
      looping = true;
      loop();
    }
  });

  speedSlider = createSlider(1, 100, 20);
  speedSlider.position(80, 60);
}

function draw() {
  background(220);
  frameRate(speedSlider.value());

  fill(0);
  text("Speed:", 20, 65);

  for (let i = 0; i < heights.length; i++) {
    let a = new Bar(
      i * (BAR_WIDTH + BAR_MARGIN) + BAR_MARGIN,
      HEIGHT,
      BAR_WIDTH,
      heights[i]
    );
    a.show();
  }

  if (heights[j] > heights[j + 1]) {
    let temp = heights[j];
    heights[j] = heights[j + 1];
    heights[j + 1] = temp;
  }

  if (i < heights.length) {
    j++;
    if (j >= heights.length - i - 1) {
      j = 0;
      i++;
    }
  } else {
    console.log("DONEZO");
    noLoop();
  }
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

class Bar {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  getHeight() {
    return this.h;
  }

  setX(x) {
    this.x = x;
  }

  show() {
    let relColor =
      ((this.h - BAR_MARGIN) / (BAR_MAX_HEIGHT - BAR_MARGIN)) * 255;

    fill(0, 255, relColor);
    // fill(relColor)
    rect(this.x, this.y - this.h, this.w, this.h);
  }
}
