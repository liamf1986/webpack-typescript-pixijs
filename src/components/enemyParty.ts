import { IceGolem } from './characters/ice-golem';
import { Cyclops } from './characters/cyclops';
import { Orc } from './characters/orc';
import { Skeleton } from './characters/skeleton';
import {ResultType} from "../result";

export class EnemyParty extends PIXI.Container {
    private golem: IceGolem;
    private cyclops: Cyclops;
    private orc: Orc;
    private skeleton: Skeleton;

    private _health: number;

    constructor() {
        super();
    }

    get health() : number {
        return this._health;
    }

    load(loader: PIXI.loaders.Loader) {
        this.golem = new IceGolem();
        this.golem.load(loader);

        this.cyclops = new Cyclops();
        this.cyclops.load(loader);

        this.orc = new Orc();
        this.orc.load(loader);

        this.skeleton = new Skeleton();
        this.skeleton.load(loader);
    }

    draw() {
        this.golem.draw();
        this.golem.scale.x = -1;
        this.addChild(this.golem);
        this.golem.visible = false;

        this.cyclops.draw();
        this.cyclops.scale.x = -1;
        this.cyclops.position.set(-100, 25);
        this.addChild(this.cyclops);
        this.cyclops.visible = false;

        this.orc.draw();
        this.orc.scale.x = -1;
        this.orc.position.set(0, 130);
        this.addChild(this.orc);
        this.orc.visible = false;

        this.skeleton.draw();
        this.skeleton.scale.x = -1;
        this.skeleton.position.set(70, 190);
        this.addChild(this.skeleton);
        this.skeleton.visible = false;
    }

    setupGolem() {
        this._health = 4;
        this.golem.visible = true;
        this.cyclops.visible = false;
        this.orc.visible = false;
        this.skeleton.visible = false;
    }

    setupGroup() {
        this._health = 2;
        this.golem.visible = false;
        this.cyclops.visible = true;
        this.orc.visible = true;
        this.skeleton.visible = true;
    }

    idle() {
        if (this.golem.visible) {
            this.golem.idle();
        } else {
            this.skeleton.idle();
            this.cyclops.idle();
            this.orc.idle();
        }
    }

    die() {
        if (this.golem.visible) {
            this.golem.die();
        } else {
            this.skeleton.die();
            this.cyclops.die();
            this.orc.die();
        }
    }

    attack(attackType: ResultType): Promise<void> {
        if (this.golem.visible) {
            return new Promise((resolve: any, reject: any) => {
                this.golem.attack(resolve);
            });
        } else {
            return new Promise((resolve: any, reject: any) => {
                if (attackType === ResultType.Shield) {
                    this.cyclops.attack(resolve);
                    return;
                }

                if (attackType === ResultType.Sword) {
                    this.orc.attack(resolve);
                    return;
                }

                if (attackType === ResultType.Magic) {
                    this.skeleton.attack(resolve);
                    return;
                }

                reject('Invalid attack type');
            });
        }
    }
}