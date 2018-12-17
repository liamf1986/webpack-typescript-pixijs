import { State } from "..";
import stateMachine from "../state-machine";
import { TweenMax } from "gsap";

import { PreGameState } from "./preGameState";

export class WinGameState extends State {
    constructor() {
        super();

        console.log("WIN STATE");
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            stateMachine.cabinet.setCabinetMessage('WIN STATE');
            stateMachine.cabinet.disableActionButton();
        }
        
        TweenMax.delayedCall(2, () =>{
            stateMachine.changeToState(new PreGameState())
        }, undefined, true);
    }

    public dispose():void {
        
    }
}