import TextureResource from './TextureResource';

/**
 * Base for all the image/canvas resources
 */
export default class ImageLikeResource extends TextureResource
{
    constructor(source)
    {
        super();
        this.baseTexture = null;
        this.source = source;
        this.loaded = true;
        this.destroyed = false;
    }

    onTextureNew(baseTexture)
    {
        if (!this.baseTexture)
        {
            this.baseTexture = baseTexture;
        }

        if (this.loaded)
        {
            this._validate();
        }
    }

    /**
     * called when both BaseTexture and Resource are ready for work
     *
     * @protected
     */
    _validate()
    {
        this.baseTexture.setRealSize(this.width, this.height);
    }

    onTextureUpload(renderer, baseTexture, glTexture)
    {
        const gl = renderer.gl;

        gl.texImage2D(baseTexture.target,
            0,
            baseTexture.format,
            baseTexture.format,
            baseTexture.type,
            this.source);

        return true;
    }

    destroy()
    {
        this.source = null;
        this.baseTexture = null;
        this.destroyed = true;
    }

    onTextureDestroy(baseTexture)
    {
        if (this.baseTexture === baseTexture && !this.destroyed)
        {
            this.destroy();
        }

        return true;
    }

    load()
    {
        return Promise.resolve();
    }

    get width()
    {
        return this.source.width;
    }

    get height()
    {
        return this.source.height;
    }
}
