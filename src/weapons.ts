import { Texture } from "pixi.js";

export interface IWeapon{
    bullets:number;
    fireDelay:number;
    damage:number;
    ammoUse:number;
    inaccuracy:number;
}

export let weaponsList = {
    pistol: {
        bullets: 1,
        fireDelay: 10,
        damage: .5,
        ammoUse: 1,
        inaccuracy: .1,
    }as IWeapon,

    shotgun: {
        bullets: 6,
        fireDelay: 20,
        damage: 1,
        ammoUse: 4,
        inaccuracy: .1,
      }as IWeapon,

    machinegun: {
        bullets: 1,
        fireDelay: 2,
        damage: 1,
        ammoUse: 1,
        inaccuracy: .01,
    }as IWeapon,

    sniper: {
        bullets: 1,
        fireDelay: 30,
        damage: 15,
        ammoUse: 2,
        inaccuracy: 0.1,
    }as IWeapon
}