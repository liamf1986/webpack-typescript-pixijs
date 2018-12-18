import { Character } from './character';

export class Orc extends Character {
    constructor() {
        super();

        this.characterType = 'enemy';
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/orc.json');
    }

    draw() {
        for (let i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame(`orcidle${i + 1}.png`));
        }

        for (let i = 0; i < 6; i++) {
            this.deadFrames.push(PIXI.Texture.fromFrame(`orcdead${i + 1}.png`));
        }

        for (let i = 0; i < 8; i++) {
            this.attackFrames.push(PIXI.Texture.fromFrame(`orcattack${i + 1}.png`));
        }

        super.draw();
    }
}