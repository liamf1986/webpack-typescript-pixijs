import { Character } from './character';

export class IceGolem extends Character {
    constructor() {
        super();

        this.characterType = 'enemy';
        this.soundAlias = 'attackGolem';
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/golem-0.json');
        loader.add('assets/monsters/golem-1.json');
        loader.add('assets/monsters/golem-2.json');
        loader.add('assets/monsters/golem-3.json');
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame('GolemIdle' + (i + 1) + '@2x.png'));
        }

        for (let i = 0; i < 7; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`GolemAttack${i + 1}@2x.png`));
        }

        for (let i = 0; i < 3; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`GolemDead${i + 1}@2x.png`));
        }

        super.draw();
    }
}