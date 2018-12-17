import { IState } from '.';
import { Cabinet } from '../components/cabinet';

class StateMachine {

    private _currentState?: IState;
    public cabinet?: Cabinet;

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
    }
}

const stateMachine:StateMachine = new StateMachine();
export default stateMachine;