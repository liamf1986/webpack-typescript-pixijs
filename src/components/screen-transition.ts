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

    public start(): Promise<void> {
        const me = this;
        const completionTime: number = (720 / SIZE) * 0.01 + (1280 / SIZE) * 0.02;
        let endTransitionAnimations: Promise<void>[] = [];
        let initialTransitionAnimations: Promise<void>[] = [];

        me.renderable = true;

        for (let y = 0; y < (720 / SIZE); ++y) {
            for( let x = 0; x < (1280 / SIZE); ++x) {                
                initialTransitionAnimations.push(new Promise((resolve: any) => {
                    TweenLite.to(me.blocks[y][x].scale, 0.33, {
                        delay: x * 0.01 + y * 0.02,
                        x: 1,
                        y: 1,
                        onComplete: resolve
                    });
                }));

                endTransitionAnimations.push(new Promise((resolve: any) => {
                    TweenLite.to(me.blocks[y][x].scale, 0.33, {
                        delay: completionTime + x * 0.01 + y * 0.02,
                        x: 0,
                        y: 0,
                        onComplete: resolve
                    });
                }));
            }
        }

        Promise.all(initialTransitionAnimations).then(() => {
            me.emit(events.GAME.TRANSITION);
            stateMachine.party.setPartyPosition(-400, 0);
            initialTransitionAnimations = [];
        });

        return Promise.all(endTransitionAnimations).then(() => {
            me.renderable = false;
            stateMachine.party.moveParty(0, 0);
            endTransitionAnimations = [];
        });
    }
}

export default new ScreenTransition();
