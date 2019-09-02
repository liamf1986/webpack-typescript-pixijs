import { Game } from "./game";

export class uiBar extends PIXI.Graphics{
    
    public maxWidth:number;
    public maxValue:number;
    public maxSegments:number;
    public segmentSize:number;

    constructor(maxWidth:number, maxValue:number, maxSegments:number, horisontalPos:number ,verticalPos:number){
        super()
        this.maxWidth=maxWidth;
        this.maxSegments=maxSegments;
        this.segmentSize=maxWidth/maxSegments;
        this.maxValue=maxValue;
        this.y=verticalPos;
        this.x=horisontalPos;

        this.setValue(maxValue);
    }

    setValue(newValue:number){
        this.clear();
        this.beginFill(0x881111);
        this.drawRect(0, 0, this.maxWidth, 20);
        this.beginFill(0xff2222);
        this.drawRect(0, 0, this.segmentSize*newValue, 20);
        this.endFill();
    }
}
