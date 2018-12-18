import { Character } from './character';

export class Rogue extends Character {
    protected idleFrames: PIXI.Texture[] = [];
    protected attackFrames: PIXI.Texture[] = [];
    protected deadFrames: PIXI.Texture[] = [];

    constructor() {
        super();
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame('idle' + (i + 1) + '@3x.png'));
        }

        super.draw();
    }
}