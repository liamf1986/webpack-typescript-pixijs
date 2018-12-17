import * as PIXI from 'pixi.js';

export default class background extends PIXI.Sprite {
    constructor(texture: PIXI.Texture) {
        super(texture);

        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
}