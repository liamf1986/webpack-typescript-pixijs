import * as PIXI from 'pixi.js';

let MAX_SCREEN_WIDTH = 1280; // 1280 x 720 = 16:9 ratio
let MAX_SCREEN_HEIGHT = 720;

export default class background extends PIXI.Sprite {
    constructor(texture: PIXI.Texture) {
        super(texture);

        this.width = MAX_SCREEN_WIDTH;
        this.height = MAX_SCREEN_HEIGHT;
    }
}