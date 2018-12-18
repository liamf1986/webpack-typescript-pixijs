import { Character } from './character';

export class Witch extends Character {
    protected idleFrames: PIXI.Texture[] = [];
    protected attackFrames: PIXI.Texture[] = [];
    protected deadFrames: PIXI.Texture[] = [];

    constructor() {
        super();
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame('Idle' + (i + 1) + '@2x.png'));
        }

        super.draw();
    }
}