# This is a simple dither that you can extend with your own algorithms.

### Installation

```bash
npm i multidither
```

### Example

```js
const { ColorPalette, FloydSteinbergDither } = require("multidither");
const Jimp = require("jimp");

Jimp.read("./file.png", (err, img) => {
  if (err) throw err;

  let dither = new FloydSteinbergDither(
    img,
    new ColorPalette([
      "#000000",
      "#ffffff",
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ])
  );

  dither.dither("./out.png");
});
```

### Docs

```js
new FloydSteinbergDither(Jimp image, ColorPalette palette)


Dither.dither(string outputPath, bool shouldSave)

new ColorPalette(string[]| {r:number, g:number,b:number,a:number}[] colors) // hex array or grb / grba array

//Palette.nc = https://www.npmjs.com/package/nearest-rgba
```

### making own dither algorithms

```js
const { BaseDither } = require("multidither");
class MyDither extends BaseDither {
  constructor(image, palette) {
    super(image, palette);
  }

  dither(path, write = true) {
    // gets called when a dither process is started. this also calls onPixel
  }
  onPixel(x, y) {
    // gets called for every pixel at position x, y
  }
}
```

### Additional info

- I made that package intirely by myself exept the [jimp package](https://www.npmjs.com/package/jimp)
