import { State } from "..";
import stateMachine from "../state-machine";

import { WinGameState } from "./winGameState";
import { LoseGameState } from "./loseGameState";

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
            stateMachine.cabinet.on("actionclicked", this.onActionClicked);
        }
    }

    public dispose():void {
        
    }

    private onActionClicked() : void {
        stateMachine.cabinet.off("actionclicked", this.onActionClicked);
        let random = Math.floor(Math.random() * 2);
        if (random % 2)
            stateMachine.changeToState(new WinGameState());
        else
            stateMachine.changeToState(new LoseGameState());
    }
}