import { Character } from './character';

export class Skeleton extends Character {
    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/skeleton.json');
    }

    draw() {
        var frames = [];

        for (var i = 0; i < 6; i++) {
            frames.push(PIXI.Texture.fromFrame('skeletonidle' + (i + 1) + '.png'));
        }

        this.anim = new PIXI.extras.AnimatedSprite(frames);

        this.anim.anchor.set(0.5);
        this.anim.animationSpeed = 0.15;
        this.anim.scale.set(0.5);
        this.anim.play();

        this.addChild(this.anim);
    }
}