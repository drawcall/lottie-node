const path = require('path');
const fs = require('fs-extra');
const lottie = require('../build/lottie_canvas.js');
const { Canvas, Image } = require('canvas');

const i = 1; // floder
const j = 0; // file
const num = 50;
const delta = 33 * 4;

let id = 0;
let index = 0;
let canvas, anim, now;

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

  anim = lottie.loadAnimation(
    {
      container: canvas, // the dom element that will contain the animation
      renderer: 'canvas',
      loop: false,
      path: path.join(__dirname, file), // the path to the animation json
    },
    false
  );

  testReplaceImage();
  anim.loadNow();

  const dir = path.join(__dirname, '__output');
  fs.ensureDir(dir);

  anim.goToAndStop(1, true);
  id = setInterval(renderFrame, 1000 / 15, dir);
};

const testReplaceImage = () => {
  if (i === 4 && j === 4) {
    const img1 = path.join(__dirname, './test/data4/image/img1.png');
    const img2 = path.join(__dirname, './test/data4/image/img2.png');
    anim.replaceAsset('image_1', img1);
    anim.replaceAsset('image_6', img2);
  }
};

const renderFrame = (dir) => {
  if (index >= num) {
    clearInterval(id);
    index = 0;
    return;
  }

  anim.render(delta);
  now = Date.now();
  const buffer = canvas.toBuffer(saveType);
  const file = path.join(dir, `${index++}.png`);
  console.log(`${index} save success `, file, Date.now() - now);
  fs.outputFile(file, buffer);
};

removeFiles();
intLottie();
