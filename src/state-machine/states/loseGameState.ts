import { State } from "..";
import stateMachine from "../state-machine";
import { TweenMax } from "gsap";

import { PreGameState } from "./preGameState";
import popup from "../../components/popup";
import drawBridge from "../../components/draw-bridge";

export class LoseGameState extends State {
    constructor() {
        super();

        console.log("LOSE STATE");
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            // stateMachine.cabinet.setCabinetMessage('LOSE STATE');
            stateMachine.cabinet.setCabinetMessage(`no win`);
            stateMachine.cabinet.disableActionButton();
        }
        
        // TweenMax.delayedCall(2, () =>{
        //     stateMachine.changeToState(new PreGameState())
        // }, undefined, true);
        popup.showDefeat();
        popup.once('leaveclicked', () => {
            PIXI.sound.stop('bgMusic');
            stateMachine.changeToState(new PreGameState());
            drawBridge.onGameComplete();
        });
    }

    public dispose():void {
        
    }
}