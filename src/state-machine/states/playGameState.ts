import { State } from "..";
import stateMachine from "../state-machine";

import { WinGameState } from "./winGameState";
import { LoseGameState } from "./loseGameState";
import drawBridge from "../../components/draw-bridge";
import result, { ResultType } from "../../result";

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
        result.setData({playerResult: getRandomResult()});
        result.setData({enemyResult: getRandomResult()});

        if (result.isWin()) { 
            stateMachine.cabinet.off("actionclicked");
            stateMachine.changeToState(new WinGameState());
        } 
        else if (result.isLoss()) { 
            stateMachine.cabinet.off("actionclicked");
            stateMachine.changeToState(new LoseGameState());
        } else if (result.isDraw()) {
            console.log('DRAW - SPIN AGAIN!');
        }
    }
}