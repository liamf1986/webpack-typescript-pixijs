import { TweenLite } from 'gsap';
import { Character } from './character';

export class PlayerCharacter extends Character {
    protected hurtFrames: PIXI.Texture[] = [];
    protected hurtAnim: PIXI.extras.AnimatedSprite;

    constructor() {
        super();
    }

    public draw(): void {
        if (this.hurtFrames.length > 0) {
            this.hurtAnim = new PIXI.extras.AnimatedSprite(this.hurtFrames);
            this.hurtAnim.anchor.set(0.5);
            this.hurtAnim.animationSpeed = 0.15;
            this.hurtAnim.scale.set(0.5);
        }

        super.draw();
    }

    public move(x: number, y: number): Promise<void> {
        return new Promise((resolve: any) => {
            TweenLite.to(this.position, 0.5, {
                x: x,
                y: y,
                onComplete: resolve
            });
        });
    }

    public hurt(): void {
        this.removeChildren();
        this.stopAnimations();

        this.hurtAnim.loop = false;
        this.hurtAnim.play();

        this.addChild(this.hurtAnim);
    }

    protected moveBackward(resolve: any, sound: boolean): void {
        if (!sound) {
            this.hurt();
        }

        super.moveBackward(resolve, sound);
    }

    protected stopAnimations(): void {
        super.stopAnimations();

        this.hurtAnim.gotoAndStop(0);
    }
}