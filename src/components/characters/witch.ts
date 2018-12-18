import { PlayerCharacter } from './player-character';

export class Witch extends PlayerCharacter {
    constructor() {
        super();

        this.characterType = 'player';
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`Idle${i + 1}@2x.png`));
        }

        for (let i = 0; i < 5; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`Dead${i + 1}@2x.png`));
        }

        for (let i = 0; i < 4; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`CastSpell${i + 1}@2x.png`));
        }

        super.draw();
    }
}