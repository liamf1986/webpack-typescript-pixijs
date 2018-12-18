import { Character } from './character';

export class Cyclops extends Character {
    constructor() {
        super();

        this.characterType = 'enemy';
        this.soundAlias = 'attackMonster';
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/cyclops-0.json');
        loader.add('assets/monsters/cyclops-1.json');
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`cyclopsidle${i + 1}.png`));
        }

        for (let i = 0; i < 5; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`cyclopsdead${i + 1}.png`));
        }

        for (let i = 0; i < 9; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`cyclopsattack${i + 1}.png`));
        }

        super.draw();
    }
}