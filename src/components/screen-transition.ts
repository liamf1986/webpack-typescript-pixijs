import { Container, Graphics } from 'pixi.js';
import { TweenLite } from 'gsap';
import events from '../events';
import stateMachine from '../state-machine/state-machine';

const SIZE: number = 62;

class ScreenTransition extends Container {
    private blocks: Graphics[][] = [];

    constructor() {
        super();

        for (let y = 0; y < (720 / SIZE); ++y) {
            const column: Graphics[] = [];

            for( let x = 0; x < (1280 / SIZE); ++x) {
                const block: Graphics = new Graphics();
                block.x = x * SIZE + SIZE / 2;
                block.y = y * SIZE + SIZE / 2;
                block.beginFill(0x000);
                block.drawRect(-SIZE / 2, -SIZE / 2, SIZE, SIZE);
                block.endFill();

                block.scale.set(0);

                column.push(this.addChild(block));
            }

            this.blocks.push(column);
        }

        this.renderable = false;
    }

    public start(): void {
        const completionTime: number = (720 / SIZE) * 0.01 + (1280 / SIZE) * 0.02;
        this.renderable = true;
        setTimeout(() => {
            this.emit(events.GAME.TRANSITION);
            stateMachine.party.setPartyPosition(-400, 0);
        }, completionTime * 1000);

        setTimeout(() => {
            this.renderable = false;
            stateMachine.party.moveParty(0, 0);
        }, completionTime * 2500);

        for (let y = 0; y < (720 / SIZE); ++y) {
            for( let x = 0; x < (1280 / SIZE); ++x) {                
                TweenLite.to(this.blocks[y][x].scale, 0.33, {
                    delay: x * 0.01 + y * 0.02, 
                    x: 1,
                    y: 1,
                });
                TweenLite.to(this.blocks[y][x].scale, 0.33, {
                    delay: completionTime + x * 0.01 + y * 0.02, 
                    x: 0,
                    y: 0,
                });
            }
        }
    }
}

export default new ScreenTransition();
