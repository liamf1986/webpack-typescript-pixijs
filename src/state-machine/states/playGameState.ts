import { State } from "..";
import stateMachine from "../state-machine";

import { WinGameState } from "./winGameState";
import { LoseGameState } from "./loseGameState";
import drawBridge from "../../components/draw-bridge";
import result, { ResultType } from "../../result";
import eventEmitter from "../../event-emitter";
import events from "../../events";
import { TweenMax } from "gsap";
import enemyParty from "../../components/enemyParty";
import { playerHealthBar, enemyHealthBar } from "../../components/health-bar";



function getRandomResult(): ResultType {
    const value: number =  Math.random();
    return value > 0.66 ? ResultType.Sword : 
        value > 0.33 ? ResultType.Magic : ResultType.Shield;
}

export class PlayGameState extends State {
    constructor() {
        super();

        console.log("PLAY STATE");
        PIXI.sound.play('bgMusic', {loop: true});
        PIXI.sound.volume('bgMusic', 0.4);
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            stateMachine.cabinet.setCabinetMessage('The battle begins');
            stateMachine.cabinet.hideStakeText();
            stateMachine.cabinet.changeActionTexture(1);
            stateMachine.cabinet.disableStakeButtons();
            stateMachine.cabinet.on("actionclicked", this.onActionClicked.bind(this));
        }

        enemyParty.init();
        result.setData({
            currentStage: 0,
            health: 4,
            enemyHealth: 2
        });
        playerHealthBar.maxHealth = playerHealthBar.health = result.health;
        enemyHealthBar.maxHealth = enemyHealthBar.health = result.enemyHealth;
    }

    public dispose():void {
        
    }

    private onActionClicked() : void {
        const playerResult: ResultType = getRandomResult();
        const enemyResult: ResultType = getRandomResult();
        const duration: number = 1;

        console.log(['Sword', 'Magic', 'Shield'][playerResult], ' vs ', ['Sword', 'Magic', 'Shield'][enemyResult]);

        if (stateMachine.playerSpinner !== undefined) {
            stateMachine.playerSpinner.spin(playerResult, duration);
        }

        if (stateMachine.enemySpinner !== undefined) {
            stateMachine.enemySpinner.spin(enemyResult, duration);
        }
        stateMachine.cabinet.disableActionButton();

        TweenMax.delayedCall(duration, () => {
            let attacks = [];

            result.setData({playerResult: playerResult});
            result.setData({enemyResult: enemyResult});

            attacks.push(enemyParty.attack(enemyResult, result.isLoss()));
            attacks.push(stateMachine.party.attack(playerResult, result.isWin()));

            if (result.isDraw()) {
                PIXI.sound.play('attackDraw');
            }

            Promise.all(attacks).then(() => {
                stateMachine.party.idle();
                enemyParty.idle();
                stateMachine.cabinet.enableActionButton();

                if (result.isWin()) {
                    stateMachine.cabinet.setCabinetMessage(['Sword', 'Magic', 'Shield'][playerResult] + ' beats ' + ['Sword', 'Magic', 'Shield'][enemyResult]);
                    console.log('WIN');
                    result.setData({enemyHealth: result.enemyHealth - 1});
                    PIXI.sound.play('monsterDamage');
                    if (result.enemyHealth === 0) {
                        enemyParty.die();
                        enemyParty.fadeOut();
                        stateMachine.cabinet.off("actionclicked");
                        stateMachine.changeToState(new WinGameState());
                    }
                    eventEmitter.emit(events.GAME.DAMAGE_ENEMY);
                }
                else if (result.isLoss()) {
                    console.log('LOSE');
                    stateMachine.cabinet.setCabinetMessage(['Sword', 'Magic', 'Shield'][playerResult] + ' loses to ' + ['Sword', 'Magic', 'Shield'][enemyResult]);
                    result.setData({health: result.health - 1});
                    PIXI.sound.play('humanDamage');
                    if (result.health === 0) {
                        stateMachine.party.die();
                        stateMachine.cabinet.off("actionclicked");
                        stateMachine.changeToState(new LoseGameState());
                    }
                    eventEmitter.emit(events.GAME.DAMAGE_PLAYER);
                } else if (result.isDraw()) {
                    console.log('DRAW - SPIN AGAIN!');
                    stateMachine.cabinet.setCabinetMessage('DRAW!');
                }
            });
        }, undefined, true);
        
    }
}