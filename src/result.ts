import { PlayGameState } from "./state-machine/states/playGameState";

export enum ResultType {
    Sword = 0,
    Magic,
    Shield,

    Rogue = 0,
    Mage,
    Knight,
};

export interface IResultData {
    playerResult?: ResultType;
    enemyResult?: ResultType;
    health?: number;
    enemyHealth?: number;
};

export class Result implements IResultData {
    public playerResult: ResultType;
    public enemyResult: ResultType;
    public health: number = 0;
    public enemyHealth: number = 0;

    public setData(data: IResultData): void {
        if (data.playerResult !== undefined) { this.playerResult = data.playerResult; }
        if (data.enemyResult !== undefined) { this.enemyResult = data.enemyResult; }
        if (data.health !== undefined) { this.health = data.health; }
        if (data.enemyHealth !== undefined) { this.enemyHealth = data.enemyHealth; }
}

    public isDraw(): boolean { 
        return this.playerResult === this.enemyResult;
    }

    public isWin(): boolean {
        return (this.playerResult === ResultType.Rogue && this.enemyResult === ResultType.Magic) ||
               (this.playerResult === ResultType.Mage && this.enemyResult === ResultType.Shield) ||
               (this.playerResult === ResultType.Knight && this.enemyResult === ResultType.Sword);
    }

    public isLoss(): boolean {
        return (this.enemyResult === ResultType.Sword && this.playerResult === ResultType.Mage) ||
               (this.enemyResult === ResultType.Magic && this.playerResult === ResultType.Knight) ||
               (this.enemyResult === ResultType.Shield && this.playerResult === ResultType.Rogue);
    }
}

export default new Result();