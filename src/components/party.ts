import { Character } from './characters/character';
import { Knight } from './characters/knight';
import { Witch } from './characters/witch';

export class Party extends PIXI.Container {
    private witch: Witch;
    private rogue: Character;
    private knight: Knight;

    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        this.witch = new Witch();
        this.witch.load(loader, "assets/heroes/witch.json");

        this.rogue = new Character();
        this.rogue.load(loader, "assets/heroes/rogue.json");

        this.knight = new Knight();
        this.knight.load(loader, "assets/heroes/knight.json");
    }

    draw() {
        this.rogue.draw();
        this.rogue.position.set(100, 0);
        this.addChild(this.rogue);

        this.knight.draw();
        this.knight.position.set(150, 50);
        this.addChild(this.knight);

        this.witch.draw();
        this.witch.position.set(0, 75);
        this.addChild(this.witch);
    }
}