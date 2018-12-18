import { Character } from './character';

export class Skeleton extends Character {
    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/skeleton.json');
    }

    draw() {
        for (var i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame('skeletonidle' + (i + 1) + '.png'));
        }

        super.draw();
    }
}