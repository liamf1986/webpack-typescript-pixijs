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
        var frames = [];

        for (var i = 0; i < 6; i++) {
            frames.push(PIXI.Texture.fromFrame('cyclopsidle' + (i + 1) + '.png'));
        }

        this.anim = new PIXI.extras.AnimatedSprite(frames);

        this.anim.anchor.set(0.5);
        this.anim.animationSpeed = 0.15;
        this.anim.scale.set(0.5);
        this.anim.play();

        this.addChild(this.anim);
    }
}