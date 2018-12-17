import { State } from "..";
import stateMachine from "../state-machine";
import user from '../../User';
import { PlayGameState } from "./playGameState";

export class PreGameState extends State {
    constructor() {
        super();

        console.log("PRE STATE");
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            stateMachine.cabinet.setCabinetMessage('PRE STATE');
            stateMachine.cabinet.changeActionTexture(0);
            stateMachine.cabinet.displayStakeText();
            stateMachine.cabinet.enableActionButton();
            stateMachine.cabinet.enableStakeButtons();
            stateMachine.cabinet.on("actionclicked", this.onActionClicked);
        }
    }

    public dispose():void {
        
    }

    private onActionClicked() : void {
        if (user.balancePennies >= stateMachine.cabinet.currentStake) {
            stateMachine.cabinet.off("actionclicked", this.onActionClicked);
            user.balancePennies -= stateMachine.cabinet.currentStake;
            stateMachine.cabinet.balanceMsg = 'balance\n' + user.balanceString;
            stateMachine.changeToState(new PlayGameState());
        }
        else {
            console.log("Insufficient Funds");
        }
    }
}