export interface IAttack {
    type: string
    piePercentage: number
}


export interface IEnemy {
    name: string
    health: number
    tier: number
    attacks: IAttack[]
}

export const enemies: IEnemy[] = [
    {
        name: 'bone-wizard',
        health: 3,
        tier: 1,
        attacks: [
            {
                type: 'mage',
                piePercentage: 70
            },
            {
                type: 'rogue',
                piePercentage: 30
            }
        ]
    },
    {
        name: 'ice-golem',
        health: 5,
        tier: 2,
        attacks: [
            {
                type: 'mage',
                piePercentage: 50
            },
            {
                type: 'knight',
                piePercentage: 50
            }
        ]
    },
    {
        name: 'barbarian',
        health: 5,
        tier: 2,
        attacks: [
            {
                type: 'rogue',
                piePercentage: 50
            },
            {
                type: 'knight',
                piePercentage: 50
            }
        ]
    },
];