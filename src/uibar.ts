export class UIBar extends PIXI.Graphics{
    
    public maxWidth:number;
    public maxValue:number;
    public maxSegments:number;
    public segmentSize:number;

    constructor(maxWidth:number, maxValue:number, maxSegments:number, verticalPos:number){
        super()
        this.maxWidth=maxWidth;
        this.maxSegments=maxSegments;
        this.segmentSize=maxWidth/maxSegments;
        this.maxValue=maxValue;
        this.y=verticalPos;

        this.setValue(maxValue);
    }

    setValue(newValue:number){
        this.clear();
        this.beginFill(0x881111);
        this.drawRect(0, 0, this.maxWidth, 40);
        this.beginFill(0xff2222);
        this.drawRect(0, 0, this.segmentSize*newValue, 40);
        this.endFill();
    }
}