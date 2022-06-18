const Jimp = require('jimp')
const colorPalette = require('./ColorPalette')

module.exports = class BaseDither {

    /**
     * @param {Jimp} img
     * @param {colorPalette} colorPalette
     */
    constructor(img, colorPalette) {
        this.img = img
        this.colorPalette = colorPalette

    }
    /**
     * @param {any} path
     */
    dither(path, write = true) {
        // this.cpImg = this.img.clone()

        for (let y = 0; y < this.img.bitmap.height; y++) {
            for (let x = 0; x < this.img.bitmap.width; x++) {
                this.onPixel(x, y)
            }
        }

        if (write) this.img.write(path)
        return this.img
    }
    /**
     * @param {number} x
     * @param {number} y
     */
    onPixel(x, y) { }


}
