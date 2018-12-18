import { PlayerCharacter } from './player-character';

export class Rogue extends PlayerCharacter {
    constructor() {
        super();

        this.characterType = 'player';
        this.soundAlias = 'attackDagger';
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`idle${i + 1}@3x.png`));
        }

        for (let i = 0; i < 6; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`dead${i + 1}@3x.png`));
        }

        for (let i = 0; i < 6; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`attack${i + 1}@3x.png`));
        }

        super.draw();
    }
}