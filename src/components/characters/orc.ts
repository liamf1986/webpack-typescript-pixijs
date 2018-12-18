import { Character } from './character';

export class Orc extends Character {
    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/orc.json');
    }

    draw() {
        for (var i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame('orcidle' + (i + 1) + '.png'));
        }

        super.draw();
    }
}