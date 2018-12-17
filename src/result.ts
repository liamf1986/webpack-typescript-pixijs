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
};

export class Result implements IResultData {
    public playerResult: ResultType;
    public enemyResult: ResultType;

    public setData(data: IResultData): void {
        if (data.playerResult !== undefined) { this.playerResult = data.playerResult; }
        if (data.enemyResult !== undefined) { this.enemyResult = data.enemyResult; }

        console.log(data, this.isWin(), this.isDraw(), this.isLoss());
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