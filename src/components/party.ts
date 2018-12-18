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

    public load(loader: PIXI.loaders.Loader) {
        this.witch = new Witch();
        this.witch.load(loader, "assets/heroes/witch.json");

        this.rogue = new Rogue();
        this.rogue.load(loader, "assets/heroes/rogue.json");

        this.knight = new Knight();
        this.knight.load(loader, "assets/heroes/knight.json");
    }

    public draw() {
        this.knight.draw();
        this.knight.position.set(-400 + 150, 0);
        this.addChild(this.knight);

        this.rogue.draw();
        this.rogue.position.set(-400 + 100, 50);
        this.addChild(this.rogue);

        this.witch.draw();
        this.witch.position.set(-400, 75);
        this.addChild(this.witch);
    }

    public idle() {
        this.knight.idle();
        this.rogue.idle();
        this.witch.idle();
    }

    public die() {
        this.knight.die();
        this.rogue.die();
        this.witch.die();
    }

    public attack(attackType: ResultType): Promise<void> {
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

    public setPartyPosition(x: number, y: number): void {
        this.knight.position.set(x + 150, y);
        this.rogue.position.set(x + 100, y + 50);
        this.witch.position.set(x, y + 75);
    }

    public moveParty(x: number, y: number): Promise<void[]> {
        let enterAnimations = [];

        enterAnimations.push(this.knight.move(x + 150, y));
        enterAnimations.push(this.rogue.move(x + 100, y + 50));
        enterAnimations.push(this.witch.move(x, y + 75));

        return Promise.all(enterAnimations);
    }
}