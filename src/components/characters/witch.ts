import { Character } from './character';

export class Witch extends Character {
    constructor() {
        super();
    }

    draw() {
        var frames = [];

        for (var i = 0; i < 6; i++) {
            frames.push(PIXI.Texture.fromFrame('Idle' + (i + 1) + '@2x.png'));
        }

        this.anim = new PIXI.extras.AnimatedSprite(frames);

        this.anim.anchor.set(0.5);
        this.anim.animationSpeed = 0.25;
        this.anim.scale.set(0.5);
        this.anim.play();

        this.addChild(this.anim);
    }
}