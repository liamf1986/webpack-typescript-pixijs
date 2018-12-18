import { TweenLite } from 'gsap';
import { Character } from './character';

export class PlayerCharacter extends Character {
    constructor() {
        super();
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
}