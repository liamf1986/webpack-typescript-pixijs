import {UIBar} from './uibar'
import {UIButton} from './uibutton'

export class UI extends PIXI.Container{
    private background:PIXI.Graphics;

    private healthText:PIXI.Text;
    private healthBar:UIBar;

    private ammoText:PIXI.Text;
    private ammoBar:UIBar;

    private btnPistol:UIButton;
    private btnShotgun:UIButton;
    private btnMachineGun:UIButton;

    private fontStyle:PIXI.TextStyle = new PIXI.TextStyle(
        {
            "fill": [
                "#cecfcd",
                "0x5ab9a8"
            ],
            "fontFamily": "Arial, Helvetica, sans-serif",
            "fontSize": 40,
            "fontVariant": "small-caps",
            "fontWeight": "bold",
            "letterSpacing": 4,
            "lineJoin": "round",
            "stroke": "#2c1b00",
            "strokeThickness": 7
        }
        );


    constructor(app:PIXI.Application){
        super()

        this.background = new PIXI.Graphics;
        this.background.beginFill(0x5ab9a8);
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

        this.btnPistol = new UIButton(this.background.width*.9,this.background.height*.18,[this.background.width*.05,this.background.height*.42])
        this.btnShotgun = new UIButton(this.background.width*.9,this.background.height*.18,[this.background.width*.05,this.background.height*.61])
        this.btnMachineGun = new UIButton(this.background.width*.9,this.background.height*.18,[this.background.width*.05,this.background.height*.8])


        this.addChild(this.background);

        this.addChild(this.healthBar)
        this.addChild(this.healthText);

        this.addChild(this.ammoBar);
        this.addChild(this.ammoText);

        this.addChild(this.btnPistol);
        this.addChild(this.btnShotgun);
        this.addChild(this.btnMachineGun);
    }

    updateHealth(newValue:number){
        this.healthBar.setValue(newValue);
    }

    updateAmmo(newValue:number){
        this.ammoBar.setValue(newValue);
    }
}