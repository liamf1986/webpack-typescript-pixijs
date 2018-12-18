import { PlayerCharacter } from './player-character';

export class Archer extends PlayerCharacter {
    constructor() {
        super();

        this.characterType = 'player';
        this.soundAlias = 'attackDagger';
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`arcidle${i + 1}@3x.png`));
        }

        for (let i = 0; i < 6; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`arcdead${i + 1}@3x.png`));
        }

        for (let i = 0; i < 5; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`arcshoot_straight${i + 1}@3x.png`));
        }

        for (let i = 0; i < 3; i++) {
            this.hurtFrames.push(PIXI.Texture.fromFrame(`archurt${i + 1}@3x.png`));
        }

        super.draw();
    }
}