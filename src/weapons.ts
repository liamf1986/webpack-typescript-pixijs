interface weaponType{
    [key: string]: IWeapon;
}

export interface IWeapon{
    bullets:number;
    fireDelay:number;
    damage:number;
    ammoUse:number;
    inaccuracy:number;
    price:number;
}

export let weaponsList:weaponType = {
    pistol : {
        bullets: 1,
        fireDelay: 10,
        damage: .8,
        ammoUse: 1,
        inaccuracy: .05,
        price: 100
    },

    shotgun : {
        bullets: 6,
        fireDelay: 20,
        damage: 1,
        ammoUse: 3,
        inaccuracy: .2,
        price: 30
    },

    machinegun : {
        bullets: 1,
        fireDelay: 5,
        damage: 1,
        ammoUse: 1,
        inaccuracy: .01,
        price: 200
    },

    sniper : {
        bullets: 1,
        fireDelay: 30,
        damage: 15,
        ammoUse: 2,
        inaccuracy: 0.1,
        price : 200
    }
}