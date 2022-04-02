let CanvasClass;
let createCanvasFunc;

function createTag(type) {
  console.log(type,createCanvasFunc);
  if (type === "canvas") {
    if (createCanvasFunc) {
      return createCanvasFunc(1, 1);
    } else if (CanvasClass) {
      return new CanvasClass(1, 1);
    } else {
      console.log("please pass createCanvas param");
    }
  }

  return null;
}

function setCanvasClass(canvasClass) {
  CanvasClass = canvasClass;
}

function setCreateCanvas(createCanvas) {
  createCanvasFunc = createCanvas;
}

export { createTag, setCanvasClass, setCreateCanvas };
