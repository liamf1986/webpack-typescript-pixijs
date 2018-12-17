export interface IState {
    dispose():void;
}

export abstract class State implements IState {
    abstract dispose():void;
}