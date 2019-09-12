import { IItem } from 'types';

export function getUpgrades() {
    const upgrades = {
        shield: {
            texture: 'shield',
            price: 210
        },
        sword: {
            texture: 'sword',
            price: 180
        },
        heal: {
            texture: 'health',
            price: 150
        }
    }

    return upgrades;
}