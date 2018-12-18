import { TweenLite } from 'gsap';
import { Character } from './character';

interface IPosition {
    x: number
    y: number
}

export class PlayerCharacter extends Character {
    protected inPlayPosition: IPosition = {x: 0, y: 0};

    constructor(x: number, y: number) {
        super();

        this.inPlayPosition.x = x;
        this.inPlayPosition.y = y;
    }

    public enterStage(): Promise<void> {
        return new Promise((resolve: any) => {
            TweenLite.to(this.position, 0.5, {
                x: this.inPlayPosition.x,
                y: this.inPlayPosition.y,
                onComplete: resolve
            });
        });
    }
}