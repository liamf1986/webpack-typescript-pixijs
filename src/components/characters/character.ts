export class Character extends PIXI.Container {
    protected anim: PIXI.extras.AnimatedSprite;

    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader, filename: string) {
        loader.add(filename);
    }

    draw() {
        var frames = [];

        for (var i = 0; i < 6; i++) {
            frames.push(PIXI.Texture.fromFrame('idle' + (i + 1) + '@3x.png'));
        }

        this.anim = new PIXI.extras.AnimatedSprite(frames);

        this.anim.anchor.set(0.5);
        this.anim.animationSpeed = 0.25;
        this.anim.scale.set(0.5);
        this.anim.play();

        this.addChild(this.anim);
    }
}