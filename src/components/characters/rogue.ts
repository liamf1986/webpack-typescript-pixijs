import { Character } from './character';

export class Rogue extends Character {
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