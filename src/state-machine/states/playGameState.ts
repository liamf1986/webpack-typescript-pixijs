import { State } from "..";
import stateMachine from "../state-machine";

import { WinGameState } from "./winGameState";
import { LoseGameState } from "./loseGameState";
import drawBridge from "../../components/draw-bridge";
import result, { ResultType } from "../../result";
import eventEmitter from "../../event-emitter";
import events from "../../events";
import { TweenMax } from "gsap";

function getRandomResult(): ResultType {
    const value: number =  Math.random();
    return value > 0.66 ? ResultType.Sword : 
        value > 0.33 ? ResultType.Magic : ResultType.Shield;
}

export class PlayGameState extends State {
    constructor() {
        super();

        console.log("PLAY STATE");
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            stateMachine.cabinet.setCabinetMessage('PLAY STATE');
            stateMachine.cabinet.hideStakeText();
            stateMachine.cabinet.changeActionTexture(1);
            stateMachine.cabinet.disableStakeButtons();
            stateMachine.cabinet.on("actionclicked", this.onActionClicked.bind(this));
        }

        drawBridge.onEnterGame();
    }

    public dispose():void {
        drawBridge.onGameComplete();
    }

    private onActionClicked() : void {
        if (stateMachine.playerSpinner !== undefined) {
            stateMachine.playerSpinner.spin();
        }
        if (stateMachine.enemySpinner !== undefined) {
            stateMachine.enemySpinner.spin();
        }
        stateMachine.cabinet.disableActionButton();

        TweenMax.delayedCall(1, () =>{
            stateMachine.playerSpinner.stopSpinning();
            stateMachine.enemySpinner.stopSpinning();
            stateMachine.cabinet.enableActionButton();

            result.setData({playerResult: getRandomResult()});
            result.setData({enemyResult: getRandomResult()});

            if (result.isWin()) { 
                result.setData({enemyHealth: result.enemyHealth - 1});
                if (result.enemyHealth === 0) {
                    stateMachine.cabinet.off("actionclicked");
                    stateMachine.changeToState(new WinGameState());
                }
                eventEmitter.emit(events.GAME.DAMAGE_ENEMY);
            } 
            else if (result.isLoss()) { 
                result.setData({health: result.health - 1});
                if (result.health === 0) {
                    stateMachine.cabinet.off("actionclicked");
                    stateMachine.changeToState(new LoseGameState());
                }
                eventEmitter.emit(events.GAME.DAMAGE_PLAYER);
            } else if (result.isDraw()) {
                console.log('DRAW - SPIN AGAIN!');
            }
        }, undefined, true);
        
    }
}