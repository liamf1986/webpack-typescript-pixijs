import { Character } from './character';

export class Knight extends Character {
    constructor() {
        super();
    }

    draw() {
        for (let i = 0; i < 10; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame('Idle' + i + '.png'));
        }

        super.draw();
    }
}