import { PlayerCharacter } from './player-character';

export class Knight extends PlayerCharacter {
    constructor() {
        super();

        this.characterType = 'player';
        this.soundAlias = 'attackShield';
    }

    draw() {
        for (let i = 0; i < 10; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`Idle${i}.png`));
        }

        for (let i = 0; i < 10; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`Die${i}.png`));
        }

        for (let i = 0; i < 10; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`Attack${i}.png`));
        }

        super.draw();
    }
}