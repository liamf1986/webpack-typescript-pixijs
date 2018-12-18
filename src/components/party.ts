import { Knight } from './characters/knight';
import { Witch } from './characters/witch';
import { Rogue } from './characters/rogue';

export class Party extends PIXI.Container {
    private witch: Witch;
    private rogue: Rogue;
    private knight: Knight;

    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        this.witch = new Witch();
        this.witch.load(loader, "assets/heroes/witch.json");

        this.rogue = new Rogue();
        this.rogue.load(loader, "assets/heroes/rogue.json");

        this.knight = new Knight();
        this.knight.load(loader, "assets/heroes/knight.json");
    }

    draw() {
        this.knight.draw();
        this.knight.position.set(150, 0);
        this.addChild(this.knight);

        this.rogue.draw();
        this.rogue.position.set(100, 50);
        this.addChild(this.rogue);

        this.witch.draw();
        this.witch.position.set(0, 75);
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

    attack() {
        this.knight.attack();
        this.rogue.attack();
        this.witch.attack();
    }
}