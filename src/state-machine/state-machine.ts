import { IState } from '.';
import { Cabinet } from '../components/cabinet';
import Spinner from '../components/spinner';
import { EnemyParty } from '../components/enemyParty';
import { Party } from '../components/party';

class StateMachine {

    private _currentState?: IState;
    public cabinet?: Cabinet;
    public playerSpinner?: Spinner;
    public enemySpinner?: Spinner;
    public enemyParty?: EnemyParty;
    public party?: Party;

    constructor() {
    }

    public changeToState(newState:IState):void {
        if(this._currentState != undefined){
            this._currentState.dispose();
        }
        
        this._currentState = newState;
    }

    public dispose():void {
        if(this._currentState !== undefined){
            this._currentState.dispose();
            this._currentState = undefined;
        }

        this.cabinet = undefined;
        this.playerSpinner = undefined;
        this.enemySpinner = undefined;
        this.enemyParty = undefined;
        this.party = undefined;
    }
}

const stateMachine:StateMachine = new StateMachine();
export default stateMachine;