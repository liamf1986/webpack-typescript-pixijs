import { Character } from './character';

export class Knight extends Character {
    constructor() {
        super();
    }

    draw() {
        var frames = [];

        for (var i = 0; i < 10; i++) {
            frames.push(PIXI.Texture.fromFrame('Idle' + i + '.png'));
        }

        this.anim = new PIXI.extras.AnimatedSprite(frames);

        this.anim.anchor.set(0.5);
        this.anim.animationSpeed = 0.25;
        this.anim.scale.set(0.6);
        this.anim.play();

        this.addChild(this.anim);
    }
}