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
import { formatCurrency, CURRENCY_DEFAULTS } from "../../format-currency";
import prizeStructure from "../../prize-structure";
import testUser from "../../User";

export class WinGameState extends State {
    constructor() {
        super();

        console.log("WIN STATE");
        
        const formattedPrize = formatCurrency(prizeStructure[result.currentStage] * stateMachine.cabinet.currentStake / 100, CURRENCY_DEFAULTS.GBP);
        
        // Update the cabinet
        if(stateMachine.cabinet !== undefined) {
            // stateMachine.cabinet.setCabinetMessage('WIN STATE');
            stateMachine.cabinet.setCabinetMessage(`Won ${formattedPrize} so far`);
            stateMachine.cabinet.disableActionButton();
        }
        
        if (result.currentStage === 1) {
            popup.showFinalVictory(formattedPrize);
            popup.once('continueclicked', () => {
                PIXI.sound.stop('bgMusic');
                stateMachine.party.moveParty(-400, 0);
                stateMachine.changeToState(new PreGameState());
                stateMachine.cabinet.disableActionButton();
                drawBridge.onGameComplete();
                testUser.balancePennies += prizeStructure[result.currentStage] * stateMachine.cabinet.currentStake / 100;
                stateMachine.cabinet.balanceMsg = 'balance\n' + formatCurrency(testUser.balancePennies, CURRENCY_DEFAULTS.GBP);
            });
        } else {
            popup.showVictory(formattedPrize);
            popup.once('continueclicked', () => {
                enemyParty.setAlpha(0);
                stateMachine.party.moveParty(window.innerWidth + 400, 0);
                stateMachine.changeToState(new PlayGameState());
                popup.hide();

                screenTransition.start();
                screenTransition.once(events.GAME.TRANSITION, () => {
                    const nextStage: number = result.currentStage + 1;

                    enemyParty.init(nextStage);
                    enemyParty.setAlpha(1);
                    result.setData({
                        currentStage: nextStage,
                        enemyHealth: enemyParty.health
                    });
                    enemyHealthBar.maxHealth = enemyParty.health;
                    stateMachine.cabinet.enableActionButton();
                });

                popup.off('continueclicked');
                popup.off('leaveclicked');
            });
            popup.once('leaveclicked', () => {
                PIXI.sound.stop('bgMusic');
                stateMachine.party.moveParty(-400, 0);
                stateMachine.changeToState(new PreGameState());
                stateMachine.cabinet.disableActionButton();
                drawBridge.onGameComplete();                

                testUser.balancePennies += prizeStructure[result.currentStage] * stateMachine.cabinet.currentStake / 100;
                stateMachine.cabinet.balanceMsg = 'balance\n' + formatCurrency(testUser.balancePennies, CURRENCY_DEFAULTS.GBP);

                popup.off('continueclicked');
                popup.off('leaveclicked');
            });
        }

        
    }

    public dispose():void {
        
    }
}