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

        let R:number = 1-newValue/this.maxValue
        let G:number = newValue/this.maxValue
        let B:number = 1

        let FRcolor = PIXI.utils.rgb2hex([
            R*.9,
            G*.9,
            B*.1
        ]);

        let BGcolor = PIXI.utils.rgb2hex([
            R*.45,
            G*.45,
            B*.05
        ]);

        this.clear();
        this.beginFill(BGcolor);
        this.drawRect(0, 0, this.maxWidth, 40);
        this.beginFill(FRcolor);
        this.drawRect(0, 0, this.segmentSize*newValue, 40);
        this.endFill();
    }
}