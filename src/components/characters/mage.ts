import { PlayerCharacter } from './player-character';

export class Mage extends PlayerCharacter {
    constructor() {
        super();

        this.characterType = 'player';
        this.soundAlias = 'attackSpell';
    }

    draw() {
        for (let i = 0; i < 5; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`wmidle${i + 1}@3x.png`));
        }

        for (let i = 0; i < 5; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`wmdead${i + 1}@3x.png`));
        }

        for (let i = 0; i < 4; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`wmcast_spell${i + 1}@3x.png`));
        }

        for (let i = 0; i < 3; i++) {
            this.hurtFrames.push(PIXI.Texture.fromFrame(`wmhurt${i + 1}@3x.png`));
        }

        super.draw();
    }
}