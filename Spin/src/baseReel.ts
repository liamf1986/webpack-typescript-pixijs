import { app } from "./application";
import { bottomMenu } from './bottomMenu'
import { TweenLite, Ease, Elastic } from 'gsap';
import { symbolView } from "./symbolView";

export class baseReel extends PIXI.Container {
    private _reelId: number;
    private bottomMenu: bottomMenu;
    private _iconSize: number = 175;
    private _spriteReel: symbolView[] = [];
    public icon: symbolView;
    public spinning: boolean = false;
    private _spawnPosition: number;
    private _offScreenPoint: number;
    private _reelSpeed: number;
    private _spinSeconds: number;
    private _readyToStop: boolean;
    private _reelData: number[] = [];
    private _reelPosition: number = 0;
    protected _result: number = 0;
    private test: any;
    //
    public _targetStop: number = 0;

    private _topOffset: number = 1
    constructor(id: number, x: number, y: number, reelData: number[]) {
        super()

        this._reelId = id;
        this._reelData = reelData;
        this._spawnPosition = y;
        this._offScreenPoint = (0.5 * this._iconSize);
        this.test = reelData;
        for (let i = 0; i < 5; i++) {
            this.icon = new symbolView(reelData[i])
            this.icon.id = i;
            this.icon.y = y + (i * this._iconSize)
            this.icon.width = this.icon.height = this._iconSize;
            this.icon.x = x + Math.round((this._iconSize - this.icon.width) / 2);
            this._spriteReel.push(this.icon);
            this.addChild(this.icon);
        }

        const max = 100;
        const min = 60;
        this._reelSpeed = Math.floor(Math.random() * (max - min + 1) + min);
    }

    public get result(): number {
        return this._result;
    }

    startSpin() {
        this.spinning = true;
        this._readyToStop = false;
        this._spinSeconds = 0;
        this._result = Math.floor(Math.random() * 8) + 1;
        
        // switch (this._reelId) {
        //     case 0:
        //         this._result = 1;
        //         break;
        //     case 1:
        //         this._result = 0;
        //         break;
        //     case 2:
        //         this._result = 4;
        //         break;
        // }
        // console.log(this._result)
    }

    private reelPosHelper(pos: number, reelLength: number): number {
        //loop this._reelMap
        if ((this._reelPosition + pos - this._topOffset) >= (reelLength)) {
            return (this._reelPosition + pos - this._topOffset) - reelLength;
        }
        else {
            if ((this._reelPosition + pos - this._topOffset) < 0) {
                return reelLength + (this._reelPosition + pos - this._topOffset);
            }
            else {
                return (this._reelPosition + pos - this._topOffset);
            }
        }
    }


    update(delta: number): void {
        if (this.spinning) {
            this._spinSeconds += delta;
            if (this._spinSeconds > 200) {
                this._readyToStop = true;
                this._reelPosition = this._result;
                
            }
            this.y += this._reelSpeed * delta;
            let diff = 0;
            if (this.y >= this._offScreenPoint) {
                this.y -=  this._offScreenPoint*2;
                this._reelPosition--

                for (let $i = 0; $i < this._spriteReel.length; $i++) {
                    this._spriteReel[$i].setSkin(this._reelData[this.reelPosHelper($i,this._reelData.length)]);
                }

                if (this._readyToStop) {
                    this.spinning = false;
                    this.endSpin();
                }
            }

            if (this._reelPosition >= this._reelData.length) {
                this._reelPosition = 0;
            }

            if (this._reelPosition  <=  0) {
                this._reelPosition = this._reelData.length;
            }
        }

    }

    protected endSpin(): void {
        this.y = 0;
        
    }

    public getVisibleGridAt(grid: number){
        return this._reelPosition + this._topOffset + grid;
    }

    public checkWin(reelId: number): void {
        
    }
}