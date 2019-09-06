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

    setValue(newValue: number){
        if(newValue < 0){
            newValue = 0;
        }
        let R:number = 1 - (newValue / this.maxValue)
        let G:number = newValue / this.maxValue
        let B:number = 1
        
        let FRcolor = PIXI.utils.rgb2hex([
            R * 0.99,
            G * 0.9,
            B * 0
        ]);
        
        let BGcolor = PIXI.utils.rgb2hex([
            R*.45,
            G*.45,
            B*.05
        ]);
        
        this.clear();
        this.beginFill(BGcolor);
        this.drawRect(0, 0, this.maxWidth, 20);
        this.beginFill(FRcolor);
        this.drawRect(0, 0, this.segmentSize*newValue, 20);
        this.endFill();

    }

    newMax(newValue: number){
        this.maxValue=newValue;
        this.segmentSize=(this.maxWidth/newValue);
    }
}
