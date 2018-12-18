import { Knight } from './characters/knight';
import { Marauder } from './characters/marauder';
import { Witch } from './characters/witch';
import { Mage } from './characters/mage';
import { Rogue } from './characters/rogue';
import { Archer } from './characters/archer';
import { ResultType } from '../result';

export class Party extends PIXI.Container {
    private mage: Witch | Mage;
    private rogue: Rogue | Archer;
    private knight: Knight | Marauder;

    constructor() {
        super();
    }

    public load(loader: PIXI.loaders.Loader) {
        let randMage = Math.round(Math.random());
        if (randMage === 0) {
            this.mage = new Witch();
            this.mage.load(loader, "assets/heroes/witch.json");
        }
        else {
            this.mage = new Mage();
            this.mage.load(loader, "assets/heroes/white-mage.json");
        }

        let randRogue = Math.round(Math.random());
        if (randRogue === 0) {
            this.rogue = new Rogue();
            this.rogue.load(loader, "assets/heroes/rogue.json");
        }
        else {
            this.rogue = new Archer();
            this.rogue.load(loader, "assets/heroes/archer.json");
        }
        
        let randKnight = Math.round(Math.random());
        if (randKnight === 0) {
            this.knight = new Knight();
            this.knight.load(loader, "assets/heroes/knight.json");
        }
        else {
            this.knight = new Marauder();
            this.knight.load(loader, "assets/heroes/marauder.json");
        }
    }

    public draw() {
        this.knight.draw();
        this.knight.position.set(-400 + 170, 0);
        this.addChild(this.knight);

        this.rogue.draw();
        this.rogue.position.set(-400 + 90, 50);
        this.addChild(this.rogue);

        this.mage.draw();
        this.mage.position.set(-400, 75);
        this.addChild(this.mage);
    }

    public idle() {
        this.knight.idle();
        this.rogue.idle();
        this.mage.idle();
    }

    public die() {
        this.knight.die();
        this.rogue.die();
        this.mage.die();
    }

    attack(attackType: ResultType, sound: boolean): Promise<void> {
        return new Promise((resolve: any, reject: any) => {
            if (attackType === ResultType.Shield) {
                this.knight.attack(resolve, sound);
                return;
            }

            if (attackType === ResultType.Sword) {
                this.rogue.attack(resolve, sound);
                return;
            }

            if (attackType === ResultType.Magic) {
                this.mage.attack(resolve, sound);
                return;
            }

            reject('Invalid attack type');
        });
    }

    public setPartyPosition(x: number, y: number): void {
        this.knight.position.set(x + 170, y);
        this.rogue.position.set(x + 90, y + 50);
        this.mage.position.set(x, y + 75);
    }

    public moveParty(x: number, y: number): Promise<void[]> {
        let enterAnimations = [];

        enterAnimations.push(this.knight.move(x + 170, y));
        enterAnimations.push(this.rogue.move(x + 90, y + 50));
        enterAnimations.push(this.mage.move(x, y + 75));

        return Promise.all(enterAnimations);
    }
}