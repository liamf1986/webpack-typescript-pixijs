import { State } from "..";
import stateMachine from "../state-machine";
import { TweenMax } from "gsap";

import { PreGameState } from "./preGameState";
import popup from "../../components/popup";
import { PlayGameState } from "./playGameState";
import drawBridge from "../../components/draw-bridge";

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
        popup.show();
        popup.once('continueclicked', () => {
            stateMachine.changeToState(new PlayGameState());
            popup.hide();
        });
        popup.once('leaveclicked', () => {
            stateMachine.changeToState(new PreGameState());
            drawBridge.onGameComplete();
        });
    }

    public dispose():void {
        
    }
}