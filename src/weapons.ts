export interface IWeapon{
    bullets:number;
    fireDelay:number;
    damage:number;
    ammoUse:number;
    inaccuracy:number
}

export let weaponsList = {
    shotgun: {
      bullets: 6,
      fireDelay: 20,
      damage: 1,
      ammoUse: 4,
      inaccuracy: .2
    }as IWeapon,

    pistol: {
        bullets: 1,
        fireDelay: 20,
        damage: 2,
        ammoUse: 1,
        inaccuracy: .1
    }as IWeapon,

    machineGun: {
        bullets: 8,
        fireDelay: 2,
        damage: 1,
        ammoUse: 1,
        inaccuracy: 1
    }as IWeapon,

    testGun: {
        bullets: 1,
        fireDelay: 1,
        damage: 1,
        ammoUse: 0,
        inaccuracy: 0
    }as IWeapon
}