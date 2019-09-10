import {UIBar} from './uibar'
import {Shop} from './shop'
import {app} from './application'

export class UI extends PIXI.Container{
    private background:PIXI.Graphics;

    private healthText:PIXI.Text;
    private healthBar:UIBar;

    private ammoText:PIXI.Text;
    private ammoBar:UIBar;

    public shop:Shop;


    private fontStyle:PIXI.TextStyle = new PIXI.TextStyle(
        {
            "fill": [
                "#8e243f ",
                "#531f37 "
            ],
            "fontFamily": "Arial, Helvetica, sans-serif",
            "fontSize": 45,
            "fontVariant": "small-caps",
            "fontWeight": "bold",
            "letterSpacing": 4,
            "stroke": "#d9995a ",
            "strokeThickness": 4,
            "miterLimit": 2
        }
        );


    constructor(){
        super()

        this.background = new PIXI.Graphics;
        this.background.beginFill(0x1d2d3a);
        this.background.drawRect(0,0, app.screen.width*.25, app.screen.height);
        this.background.endFill();
        this.x = app.screen.width - this.background.width;

        

        this.healthBar = new UIBar(this.background.width*.9,100,100,this.background.height*.1);
        this.healthBar.x += this.background.width*.05;
        this.healthText = new PIXI.Text("Health",this.fontStyle);
        this.healthText.position.set(
            this.healthBar.x+this.healthBar.width*.5-this.healthText.width*.52,
            this.healthBar.y-this.healthText.height
        );
        
        this.ammoBar = new UIBar(this.background.width*.9,200,200,this.background.height*.25);
        this.ammoBar.x += this.background.width*.05
        this.ammoText = new PIXI.Text("Ammo",this.fontStyle);
        this.ammoText.position.set(
            this.ammoBar.x+this.ammoBar.width*.5-this.ammoText.width*.5,
            this.ammoBar.y-this.ammoText.height
        );

        this.shop = new Shop(this.background.width*.9,this.background.height*.18,[this.background.width*.05,this.background.height*.75]);



        this.addChild(this.background);

        this.addChild(this.healthBar);
        this.addChild(this.healthText);

        this.addChild(this.ammoBar);
        this.addChild(this.ammoText);

        this.addChild(this.shop);
    }

    updateHealth(newValue:number){
        this.healthBar.setValue(newValue);
    }

    updateAmmo(newValue:number){
        this.ammoBar.setValue(newValue);
    }

    reset(){
        this.healthBar.reset();
        this.ammoBar.reset();
        this.shop.reset();
    }
}