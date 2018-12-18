import { TweenLite } from 'gsap';
import { Character } from './character';

export class EnemyCharacter extends Character {
    constructor() {
        super();
    }

    public setAlpha(alpha: number) {
        this.alpha = alpha;
    }

    public fadeOut(): Promise<void> {
        return new Promise((resolve: any) => {
            TweenLite.to(this, 0.5, {
                delay: 1,
                alpha: 0,
                onComplete: resolve
            });
        });
    }
}