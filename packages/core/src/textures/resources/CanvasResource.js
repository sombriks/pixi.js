import TextureResource from './TextureResource';

/**
 * Resource type for HTMLCanvasElement.
 * @class
 * @extends PIXI.TextureResource
 * @memberof PIXI
 * @param {HTMLCanvasElement} source - Canvas element to use
 */
export default class CanvasResource extends TextureResource
{
    constructor(source)
    {
        super(source);

        this.loaded = true;
        this._oldWidth = 0;
        this._oldHeight = 0;
    }

    update()
    {
        if (this.baseTexture)
        {
            this._validate();
        }
    }

    _validate()
    {
        const source = this.source;
        const baseTexture = this.baseTexture;

        if (this._oldWidth !== source.width || this._oldHeight !== source.height)
        {
            this._oldWidth = source.width;
            this._oldHeight = source.height;
            baseTexture.setRealSize(source.width, source.height);
        }
        else
        {
            baseTexture.update();
        }
    }

    static from(canvas)
    {
        return new CanvasResource(canvas);
    }
}
