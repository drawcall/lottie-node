# Lottie for Node.js

Lottie is a AE render library for Node.js that parses [Adobe After Effects](http://www.adobe.com/products/aftereffects.html) animations exported as json with [Bodymovin](https://github.com/airbnb/lottie-web) and renders them natively on web.

Lottie-node is an API for runnig Lottie with the canvas renderer in Node.js, with the help of node-canvas. This is intended for rendering Lottie animations to images or video.

# documentation

Lottie-node is transplanted from lottie-web, so its api is exactly the same as lottie-web.
View documentation, FAQ, help, examples, and more at [lottie-web](http://airbnb.io/lottie/#/web)

![Example4](gifs/demo.gif)

# Installation

```bash
# with npm
npm install lottie-nodejs
```

### About node-canvas

Oh, I don't have a built-in node-canvas library by default, you can import it externally and pass it in. This design is mainly for use in conjunction with FFCreator.

# UseAge

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
const ani = lottie.loadAnimation({
  container: canvas,
  loop: false,
  path: path.join(__dirname, './assets/data.json'), 
});

// 5. Use timer to render lottie framed animation
setInterval(() => {
  ani.render();

  // 6. Render and save the image to the local, or other operations
  const buffer = canvas.toBuffer('image/png');
  const file = path.join(__dirname, `./output/imgs/${index++}.png`);
  fs.outputFile(file, buffer);
}, 1000 / 30);
```

## Preview

You can preview or take an svg snapshot of the animation to use as poster. After you render your animation, you can take a snapshot of any frame in the animation and save it to your disk. I recommend to pass the svg through an svg optimizer like https://jakearchibald.github.io/svgomg/ and play around with their settings.<br/>

## Recommendations

### Files

If you have any images or AI layers that you haven't converted to shapes (I recommend that you convert them, so they get exported as vectors, right click each layer and do: "Create shapes from Vector Layers"), they will be saved to an images folder relative to the destination json folder.
Beware not to overwrite an existing folder on that same location.

### Performance

This is real time rendering. Although it is pretty optimized, it always helps if you keep your AE project to what is necessary<br/>
More optimizations are on their way, but try not to use huge shapes in AE only to mask a small part of it.<br/>
Too many nodes will also affect performance.

## AE Feature Support

- The script supports precomps, shapes, solids, images, null objects, texts
- It supports masks and inverted masks. Maybe other modes will come but it has a huge performance hit.
- It supports time remapping
- The script supports shapes, rectangles, ellipses and stars.
- Expressions. Check the wiki page for [more info.](https://github.com/bodymovin/bodymovin/wiki/Expressions)
- Not supported: image sequences, videos and audio are not supported
- **No negative layer stretching**! No idea why, but stretching a layer messes with all the data.

## Development

`npm install` or `bower install` first
`npm start`

## Notes

- If you want to modify the parser or the player, there are some gulp commands that can simplify the task
- look at the great animations exported on codepen [See examples on codepen.](http://codepen.io/collection/nVYWZR/)
- gzipping the animation jsons and the player have a huge reduction on the filesize. I recommend doing it if you use it for a project.

## License

[MIT License](https://opensource.org/licenses/MIT)
