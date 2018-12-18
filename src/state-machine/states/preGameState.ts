import { State } from "..";
import stateMachine from "../state-machine";
import user from '../../User';
import { PlayGameState } from "./playGameState";
import result from "../../result";
import eventEmitter from "../../event-emitter";
import events from "../../events";
import popup from "../../components/popup";
import drawBridge from "../../components/draw-bridge";
import { playerHealthBar, enemyHealthBar } from "../../components/health-bar";

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

        popup.hide();
    }

    public dispose():void {
        result.setData({health: 4});
        result.setData({enemyHealth: 2});
        playerHealthBar.maxHealth = playerHealthBar.health = result.health;
        enemyHealthBar.maxHealth = enemyHealthBar.health = result.enemyHealth;
        eventEmitter.emit(events.GAME.DAMAGE_PLAYER);
        eventEmitter.emit(events.GAME.DAMAGE_ENEMY);
    }

    private onActionClicked() : void {
        if (user.balancePennies >= stateMachine.cabinet.currentStake) {
            stateMachine.cabinet.off("actionclicked", this.onActionClicked);
            user.balancePennies -= stateMachine.cabinet.currentStake;
            stateMachine.cabinet.balanceMsg = 'balance\n' + user.balanceString;
            stateMachine.changeToState(new PlayGameState());
            stateMachine.enemyParty.idle();
            stateMachine.party.idle();
            drawBridge.onEnterGame();
        }
        else {
            console.log("Insufficient Funds");
        }
    }
}