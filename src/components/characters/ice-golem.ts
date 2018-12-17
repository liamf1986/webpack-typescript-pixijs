import { Character } from './character';

export class IceGolem extends Character {
    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        loader.add('assets/monsters/golem-0.json');
        loader.add('assets/monsters/golem-1.json');
        loader.add('assets/monsters/golem-2.json');
        loader.add('assets/monsters/golem-3.json');
    }

    draw() {
        var frames = [];

        for (var i = 0; i < 6; i++) {
            frames.push(PIXI.Texture.fromFrame('GolemIdle' + (i + 1) + '@2x.png'));
        }

        this.anim = new PIXI.extras.AnimatedSprite(frames);

        this.anim.anchor.set(0.5);
        this.anim.animationSpeed = 0.15;
        this.anim.scale.set(0.5);
        this.anim.play();

        this.addChild(this.anim);
    }
}