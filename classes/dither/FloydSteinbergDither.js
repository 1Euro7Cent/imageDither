const Jimp = require("jimp")
const ColorPalette = require("../other/ColorPalette")
const BaseDither = require("./baseDither")

module.exports = class FloydSteinbergDither extends BaseDither {
    /**
     * @param {Jimp} img
     * @param {ColorPalette} colorPalette
     */
    constructor(img, colorPalette) {
        super(img, colorPalette)
    }
    /**
     * @param {number} x
     * @param {number} y
     */
    onPixel(x, y) {
        /* pseudo code
      oldpixel        := pixel[x][y]
      newpixel        := find_closest_palette_color (oldpixel)
      pixel[x][y]     := newpixel
      quant_error     := oldpixel - newpixel
      pixel[x+1][y  ] := pixel[x+1][y  ] + quant_error * 7 / 16
      pixel[x-1][y+1] := pixel[x-1][y+1] + quant_error * 3 / 16
      pixel[x  ][y+1] := pixel[x  ][y+1] + quant_error * 5 / 16
      pixel[x+1][y+1] := pixel[x+1][y+1] + quant_error * 1 / 16
      */

        // color red

        for (let color of ['r', 'g', 'b']) {
            let currCol = Jimp.intToRGBA(this.img.getPixelColor(x, y))
            let oldpixel = currCol[color]
            let newPixel = this.colorPalette.getNearest(currCol)[color]
            let quant_error = (oldpixel - newPixel)



            let nCol

            this.modify(x, y, color, newPixel)


            let nX = x + 1
            let nY = y

            nCol = Jimp.intToRGBA(this.img.getPixelColor(nX, nY))[color]
            this.modify(nX, nY, color, nCol + (quant_error * 7 / 16))

            nX = x - 1
            nY = y + 1
            nCol = Jimp.intToRGBA(this.img.getPixelColor(nX, nY))[color]
            this.modify(nX, nY, color, nCol + (quant_error * 3 / 16))

            nX = x
            nY = y + 1
            nCol = Jimp.intToRGBA(this.img.getPixelColor(nX, nY))[color]
            this.modify(nX, nY, color, nCol + (quant_error * 5 / 16))

            nX = x + 1
            nY = y + 1
            nCol = Jimp.intToRGBA(this.img.getPixelColor(nX, nY))[color]
            this.modify(nX, nY, color, nCol + (quant_error * 1 / 16))


        }


    }
    modify(nX, nY, color, newPixel) {
        if (nX < 0 || nX >= this.img.bitmap.width || nY < 0 || nY >= this.img.bitmap.height) return
        let nCol = Jimp.intToRGBA(this.img.getPixelColor(nX, nY))
        nCol[color] = newPixel
        // try {
        nCol.r = Math.min(255, Math.max(0, nCol.r))
        nCol.g = Math.min(255, Math.max(0, nCol.g))
        nCol.b = Math.min(255, Math.max(0, nCol.b))
        nCol.a = Math.min(255, Math.max(0, nCol.a))
        this.img.setPixelColor(Jimp.rgbaToInt(nCol.r, nCol.g, nCol.b, nCol.a), nX, nY)
        // }
        // catch (e) {
        // }
    }
}
