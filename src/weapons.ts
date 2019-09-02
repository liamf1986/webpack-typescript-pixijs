export interface IWeapon{
    bullets:number
    fireDelay:number
    damage:number
}

export let weaponsList = {
    shotgun: {
      bullets: 6,
      fireDelay: 20,
      damage: 0.3
    } as IWeapon,
}