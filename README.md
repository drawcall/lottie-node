# Lottie for Node.js

Lottie is a AE render library for Node.js that parses [Adobe After Effects](http://www.adobe.com/products/aftereffects.html) animations exported as json with [Bodymovin](https://github.com/airbnb/lottie-web) and renders them natively on web.

Lottie-node is an API for runnig Lottie with the canvas renderer in Node.js, with the help of node-canvas. This is intended for rendering Lottie animations to images or video.

# documentation

Lottie-node is transplanted from lottie-web, so its api is exactly the same as lottie-web.
View documentation, FAQ, help, examples, and more at [lottie-web](http://airbnb.io/lottie/#/web).

![Example4](./gifs/demo.gif)

# Installation

```bash
# with npm
npm install lottie-nodejs
```

### Install node-canvas

Oh, I don't have a built-in node-canvas library by default, you can import it externally and pass it in. This design is mainly for use in conjunction with FFCreator.

# UseAge

- Import lottie-nodejs and node-canvas libraries.
- Set up Canvas class for lottie-nodejs.
- Create a Canvas instance for rendering.
- Lottie loads the animation file and initializes it.
- Use timer to render lottie framed animation.
- Render and save the image to the local, or other operations.

```javascript
// 1. Import lottie-nodejs and node-canvas libraries
const lottie = require('lottie-nodejs');
const { Canvas, Image } = require('canvas');

// 2. Set up Canvas class for lottie-nodejs
lottie.setCanvas({
  Canvas,
  Image,
});

// 3. Create a Canvas instance for rendering
const canvas = new Canvas(500, 500);

// 4. Lottie loads the animation file and initializes it
const anim = lottie.loadAnimation({
  container: canvas,
  loop: false,
  path: path.join(__dirname, './assets/data.json'),
  // animationData: data
});

// 5. Use timer to render lottie framed animation
setInterval(() => {
  anim.render();

  // 6. Render and save the image to the local, or other operations
  const buffer = canvas.toBuffer('image/png');
  const file = path.join(__dirname, `./output/imgs/${index++}.png`);
  fs.outputFile(file, buffer);
}, 1000 / 30);
```

#### Of course you can use any api of lottie-web.

```javascript
anim.goToAndStop(25, true);
anim.onEnterFrame(...);
```

#### Replace placeholder images and text, etc.

- Modify the Text in the lottie json data.

```javascript
anim.replaceText('_xxx_', 'hello world');
```

- Modify the Image in the lottie json data.

```javascript
// param: id, newpath
anim.replaceAsset(17, path.join(__dirname, 'xx.jpg'));
```

- Use lottie-api for more advanced modifications. [https://github.com/bodymovin/lottie-api](https://github.com/bodymovin/lottie-api)

```javascript
const elements = anim.getApi().getKeyPath('comp1,textnode');
elements.getElements()[0].setText('hahahahah!');

// or
const elements = anim.findElements('comp1,textnode');
elements[0].setText('hahahahah!');
```


# Development

Clone the project and install related dependencies

```shell
git clone https://github.com/drawcall/lottie-node.git
```

#### You can run the demo to try out the project.

1. Modify the demo/index.js file and modify the values of i and j to view the demo.

```javascript
// i from 1 to 4  [1-4]
const i = 2; // floder
// j from 1 to 20 [1-20]
const j = 9; // file
const num = 50;
const delta = 33 * 4;
```

2. Run the demo script.

```shell
npm run demo
```

#### Run the lottie-web effect as a comparison

1. Install the `serve` package globally

```shell
npm i -g serve
```

2. Execute serve and view the corresponding demo html
   > modify the values of i and j to view the demo

http://localhost:xxxx/demo/test/?i=2&j=9

## License

[MIT License](https://opensource.org/licenses/MIT)
