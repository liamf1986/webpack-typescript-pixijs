import { Knight } from './characters/knight';
import { Witch } from './characters/witch';
import { Rogue } from './characters/rogue';
import { ResultType } from '../result';

export class Party extends PIXI.Container {
    private witch: Witch;
    private rogue: Rogue;
    private knight: Knight;

    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        this.witch = new Witch(0, 75);
        this.witch.load(loader, "assets/heroes/witch.json");

        this.rogue = new Rogue(100, 50);
        this.rogue.load(loader, "assets/heroes/rogue.json");

        this.knight = new Knight(150, 0);
        this.knight.load(loader, "assets/heroes/knight.json");
    }

    draw() {
        this.knight.draw();
        this.knight.position.x = -400;
        this.addChild(this.knight);

        this.rogue.draw();
        this.rogue.position.x = -400;
        this.addChild(this.rogue);

        this.witch.draw();
        this.witch.position.x = -400;
        this.addChild(this.witch);
    }

    idle() {
        this.knight.idle();
        this.rogue.idle();
        this.witch.idle();
    }

    die() {
        this.knight.die();
        this.rogue.die();
        this.witch.die();
    }

    attack(attackType: ResultType): Promise<void> {
        return new Promise((resolve: any, reject: any) => {
            if (attackType === ResultType.Shield) {
                this.knight.attack(resolve);
                return;
            }

            if (attackType === ResultType.Sword) {
                this.rogue.attack(resolve);
                return;
            }

            if (attackType === ResultType.Magic) {
                this.witch.attack(resolve);
                return;
            }

            reject('Invalid attack type');
        });
    }

    public enterStage(): Promise<void[]> {
        let enterAnimations = [];

        enterAnimations.push(this.knight.enterStage());
        enterAnimations.push(this.rogue.enterStage());
        enterAnimations.push(this.witch.enterStage());

        return Promise.all(enterAnimations);
    }
}