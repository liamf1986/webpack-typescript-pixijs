import { State } from "..";
import stateMachine from "../state-machine";
import { TweenMax } from "gsap";

import { PreGameState } from "./preGameState";
import popup from "../../components/popup";
import { PlayGameState } from "./playGameState";
import drawBridge from "../../components/draw-bridge";
import result from "../../result";
import enemyParty from "../../components/enemyParty";
import { enemyHealthBar } from "../../components/health-bar";
import screenTransition from "../../components/screen-transition";
import events from "../../events";

export class WinGameState extends State {
    constructor() {
        super();

        console.log("WIN STATE");
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            stateMachine.cabinet.setCabinetMessage('WIN STATE');
            stateMachine.cabinet.disableActionButton();
        }
        
        // TweenMax.delayedCall(2, () =>{
        //     stateMachine.changeToState(new PreGameState())
        // }, undefined, true);
        popup.showVictory();
        popup.once('continueclicked', () => {
            stateMachine.party.moveParty(window.innerWidth + 400, 0);
            stateMachine.changeToState(new PlayGameState());
            popup.hide();
            
            screenTransition.start();

            screenTransition.on(events.GAME.TRANSITION, () => {
                const nextStage: number = (result.currentStage + 1) % 2;
                enemyParty.init(nextStage);
                result.setData({
                    currentStage: nextStage, 
                    enemyHealth: enemyParty.health
                });
                enemyHealthBar.maxHealth = enemyParty.health;
                stateMachine.cabinet.enableActionButton();
            });
        });
        popup.once('leaveclicked', () => {
            PIXI.sound.stop('bgMusic');
            stateMachine.party.moveParty(-400, 0);
            stateMachine.changeToState(new PreGameState());
            drawBridge.onGameComplete();
        });
    }

    public dispose():void {
        
    }
}