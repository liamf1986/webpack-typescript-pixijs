import { Popup } from "./basePopup";
import { app } from './application';

export  class InfoPopup extends Popup{
    
    public text: PIXI.Text;
    private style = new PIXI.TextStyle({
        fill: "#000000",
        fillGradientStops: [100],
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 24,
        stroke: "#ffffff"
    });
    
    constructor(){
        super(0xf1ffff, 470, 100, 10);
        this.text = new PIXI.Text('hello', this.style);
        this.text.anchor.set(0.5);
        this.text.x = this.background.width * 0.5;
        this.text.y = this.background.height * 0.5;


        this.addChild(this.text);
    }
}