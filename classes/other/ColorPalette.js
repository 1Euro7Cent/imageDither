const NearestColor = require("nearest-rgba")
module.exports = class colorPalette {
    /**
     * @param {{r:number, g:number,b:number,a:number}[] | string[]} colors
     */
    constructor(colors) {
        this.nc = new NearestColor()

        // @ts-ignore
        if (typeof colors[0] == 'string') this.nc.fromHEX(colors)
        else this.nc.fromRGBA(colors)

    }

    /**
     * @param {{r:number, g:number,b:number,a:number}} rgba
     * @returns {{r:number, g:number,b:number,a:number}}
     */
    getNearest(rgba) {
        return this.nc.nearest(rgba)
    }


}