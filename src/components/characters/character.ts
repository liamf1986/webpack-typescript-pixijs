export class Character extends PIXI.Container {
    protected idleFrames: PIXI.Texture[] = [];
    protected attackFrames: PIXI.Texture[] = [];
    protected deadFrames: PIXI.Texture[] = [];

    protected idleAnim: PIXI.extras.AnimatedSprite;
    protected attackAnim: PIXI.extras.AnimatedSprite;
    protected deadAnim: PIXI.extras.AnimatedSprite;

    constructor() {
        super();
    }

    public load(loader: PIXI.loaders.Loader, filename: string): void {
        loader.add(filename);
    }

    public draw(): void {
        this.idleAnim = new PIXI.extras.AnimatedSprite(this.idleFrames);

        if (this.attackFrames.length > 0) {
            this.attackAnim = new PIXI.extras.AnimatedSprite(this.attackFrames);
            this.attackAnim.anchor.set(0.5);
            this.attackAnim.animationSpeed = 0.15;
            this.attackAnim.scale.set(0.5);
        }

        if (this.deadFrames.length > 0) {
            this.deadAnim = new PIXI.extras.AnimatedSprite(this.deadFrames);
            this.deadAnim.anchor.set(0.5);
            this.deadAnim.animationSpeed = 0.15;
            this.deadAnim.scale.set(0.5);
        }

        this.idleAnim.anchor.set(0.5);
        this.idleAnim.animationSpeed = 0.15;
        this.idleAnim.scale.set(0.5);
        this.idleAnim.play();

        this.addChild(this.idleAnim);
    }

    public idle(): void {
        this.removeChildren();
        this.stopAnimations();

        this.idleAnim.loop = true;
        this.idleAnim.play();

        this.addChild(this.idleAnim);
    }

    public attack(): void {
        this.removeChildren();
        this.stopAnimations();

        this.attackAnim.loop = false;
        this.attackAnim.play();

        this.addChild(this.attackAnim);
    }

    public die(): void {
        this.removeChildren();
        this.stopAnimations();

        this.deadAnim.loop = false;
        this.deadAnim.play();

        this.addChild(this.deadAnim);
    }

    private stopAnimations(): void {
        this.idleAnim.gotoAndStop(0);
        this.attackAnim.gotoAndStop(0);
        this.deadAnim.gotoAndStop(0);
    }
}