import { PlayerCharacter } from './player-character';

export class Marauder extends PlayerCharacter {
    constructor() {
        super();

        this.characterType = 'player';
        this.soundAlias = 'attackShield';
    }

    draw() {
        for (let i = 0; i < 5; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`maridle${i + 1}@3x.png`));
        }

        for (let i = 0; i < 5; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`mardead${i + 1}@3x.png`));
        }

        for (let i = 0; i < 4; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`marattack${i + 1}@3x.png`));
        }

        for (let i = 0; i < 3; i++) {
            this.hurtFrames.push(PIXI.Texture.fromFrame(`marhurt${i + 1}@3x.png`));
        }

        super.draw();
    }
}