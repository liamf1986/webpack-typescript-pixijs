import {IEnemy} from './enemies';

let defaultEnemy: IEnemy = {
    name: 'generic-boi',
    health: 1,
    tier: 1,
    attacks: [
        {
            type: 'mage',
            piePercentage: 100 / 3
        },
        {
            type: 'rogue',
            piePercentage: 100 / 3
        },
        {
            type: 'knight',
            piePercentage: 100 / 3
        }
    ]
};

export default class enemyState {
    private enemy: IEnemy;

    constructor() {
        this.enemy = defaultEnemy;
    }

    get Enemy(): IEnemy {
        return this.enemy;
    }

    set Enemy(enemyState: IEnemy) {
        this.enemy = enemyState;
    }

    takeDamage(): void {
        this.enemy.health -= 1;

        if (this.enemy.health <= 0) {
            this.die();
        }
    }

    die(): void {
        // TODO: Kill the enemy and progress
    }
}