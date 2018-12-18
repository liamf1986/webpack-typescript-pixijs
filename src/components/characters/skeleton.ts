import { EnemyCharacter } from './enemy-character';

export class Skeleton extends EnemyCharacter {
    constructor() {
        super();

        this.characterType = 'enemy';
        this.soundAlias = 'attackMonster';
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/skeleton.json');
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`skeletonidle${i + 1}.png`));
        }

        for (let i = 0; i < 5; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`skeletondead${i + 1}.png`));
        }

        for (let i = 0; i < 5; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`skeletonattack${i + 1}.png`));
        }

        super.draw();
    }
}