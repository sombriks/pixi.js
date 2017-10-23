import TextureResource from './TextureResource';

export default class BufferResource extends TextureResource
{
    constructor(source)
    {
        super(source);

        /**
         * Source array
         * Cannot be ClampedUint8Array because it cant be uploaded to WebGL
         *
         * @member {Float32Array|Uint8Array|Uint32Array}
         */
        this.source = source;
    }

    onTextureUpload(renderer, baseTexture, glTexture)
    {

    }

    static from(array)
    {
        return new BufferResource(array);
    }
}
