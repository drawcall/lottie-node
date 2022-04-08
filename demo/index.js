const path = require('path');
const fs = require('fs-extra');
const lottie = require('../build/lottie_canvas.js');
const { Canvas, Image } = require('canvas');

const i = 2;
const j = 9;
const num = 50;
const delta = 33 * 4;

let id = 0;
let index = 0;
let canvas, ani, now;

const saveType = 'image/png';
const file = i == 4 ? `test/data${i}/d${j}/data.json` : `test/data${i}/d${j}.json`;

const removeFiles = () => {
  fs.remove(path.join(__dirname, './__output'));
};

const intLottie = () => {
  canvas = new Canvas(500, 500);
  lottie.setCanvas({
    Canvas,
    Image,
  });
  ani = lottie.loadAnimation({
    container: canvas, // the dom element that will contain the animation
    renderer: 'canvas',
    loop: false,
    path: path.join(__dirname, file), // the path to the animation json
  });

  const dir = path.join(__dirname, '__output');
  fs.ensureDir(dir);

  ani.goToAndStop(1, true);
  id = setInterval(renderFrame, 1000 / 15, dir);
};

const renderFrame = (dir) => {
  if (index >= num) {
    clearInterval(id);
    index = 0;
    return;
  }

  ani.render(delta);
  now = Date.now();
  const buffer = canvas.toBuffer(saveType);
  const file = path.join(dir, `${index++}.png`);
  console.log(`${index} save success `, file, Date.now() - now);
  fs.outputFile(file, buffer);
};

removeFiles();
intLottie();
