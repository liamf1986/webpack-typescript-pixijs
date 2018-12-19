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
import enemyParty from "../../components/enemyParty";

let firstPlay = true;

export class PreGameState extends State {
    constructor() {
        super();

        console.log("PRE STATE");
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            stateMachine.cabinet.setCabinetMessage(`Select stake and buy`);
            stateMachine.cabinet.changeActionTexture(0);
            stateMachine.cabinet.displayStakeText();
            stateMachine.cabinet.enableActionButton();
            stateMachine.cabinet.enableStakeButtons();
            stateMachine.cabinet.on("actionclicked", this.onActionClicked);
        }

        if (firstPlay) {
            popup.showHTP();
            popup.once('continueclicked', () => {
                popup.hide();
                stateMachine.cabinet.enableActionButton();
                firstPlay = false;
                drawBridge.on('complete', () => stateMachine.cabinet.enableActionButton());
            })
        }
        else
            popup.hide();

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
        eventEmitter.emit(events.GAME.DAMAGE_PLAYER);
        eventEmitter.emit(events.GAME.DAMAGE_ENEMY);
    }

    private onActionClicked() : void {
        if (user.balancePennies >= stateMachine.cabinet.currentStake) {
            stateMachine.cabinet.off("actionclicked", this.onActionClicked);
            user.balancePennies -= stateMachine.cabinet.currentStake;
            stateMachine.cabinet.balanceMsg = 'balance\n' + user.balanceString;
            stateMachine.changeToState(new PlayGameState());
            enemyParty.idle();
            stateMachine.party.idle();
            stateMachine.cabinet.disableActionButton();
            drawBridge.onEnterGame();
            if (!firstPlay)
                drawBridge.on('complete', () => stateMachine.cabinet.enableActionButton());

            stateMachine.cabinet.setCabinetMessage(`Good luck`);
            enemyParty.setAlpha(1);
        }
        else {
            console.log("Insufficient Funds");
        }
    }
}