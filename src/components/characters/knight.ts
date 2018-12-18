import { Character } from './character';

export class Knight extends Character {
    protected idleFrames: PIXI.Texture[] = [];
    protected attackFrames: PIXI.Texture[] = [];
    protected deadFrames: PIXI.Texture[] = [];

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