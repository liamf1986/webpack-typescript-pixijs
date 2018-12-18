import { Character } from './character';

export class Cyclops extends Character {
    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/cyclops-0.json');
        loader.add('assets/monsters/cyclops-1.json');
    }

    draw() {
        for (var i = 0; i < 6; i++) {
            this.idleFrames.push(PIXI.Texture.fromFrame('cyclopsidle' + (i + 1) + '.png'));
        }

        super.draw();
    }
}