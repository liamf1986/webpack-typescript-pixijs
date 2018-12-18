import { IceGolem } from './characters/ice-golem';

export class EnemyParty extends PIXI.Container {
    private golem: IceGolem;

    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) {
        this.golem = new IceGolem();
        this.golem.load(loader);
    }

    draw() {
        this.golem.draw();
        this.golem.scale.x = -1;
        // this.golem.position.set(0, 75);
        this.addChild(this.golem);
    }
}