import { PRECISION } from "pixi.js";
import {app} from './application'
import {IWeapon, weaponsList} from './weapons'

export class Shop extends PIXI.Container{

    public buttonWidth:number;
    public buttonHeight:number;

    public leftButton:PIXI.Graphics;
    public rightButton:PIXI.Graphics;

    public background:PIXI.Graphics;
    public btnBuyAmmo:PIXI.Graphics;
    public btnBuyHealth:PIXI.Graphics;

    public displayedItem:number = 0;
    public weaponTextures:PIXI.Texture[];
    public display:PIXI.Sprite;

    public selectButton:PIXI.Graphics;
    public selectButttonText:PIXI.Text;

    private fontStyle:PIXI.TextStyle = new PIXI.TextStyle(
        {
            "fill": [
                "#d9995a ",
            ],
            "fontFamily": "Arial, Helvetica, sans-serif",
            "fontSize": 30,
            "fontVariant": "small-caps",
            "fontWeight": "bold",
            "letterSpacing": 4,
        }
        );
    
    constructor(width:number, height:number, position:number[]){
        super()
        this.buttonWidth = width*.15;
        this.buttonHeight = height;
        this.position.x = position[0];
        this.position.y = position[1];

        //load textures based IWeapon name
        this.weaponTextures = [];
        for (var weapon in weaponsList){
            let temp = app.loader.resources[weapon].texture
            this.weaponTextures.push(temp)
        }
        
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x483861);
        this.background.drawRect(0, 0, width, height);
        this.background.endFill();

        this.btnBuyAmmo = new PIXI.Graphics();
        this.btnBuyAmmo.beginFill(0x483861);
        this.btnBuyAmmo.lineStyle(5,0x6a6893);
        this.btnBuyAmmo.drawRect(width-width*.6-width*.25, -this.buttonHeight*.7, width*.25, width*.25);
        this.btnBuyAmmo.endFill();
        this.btnBuyAmmo.interactive=true;
        this.btnBuyAmmo.buttonMode=true;
        this.btnBuyAmmo.on("pointerdown", () => {
            this.emit("buyammo");
        });

        this.btnBuyHealth = new PIXI.Graphics();
        this.btnBuyHealth.beginFill(0x483861);
        this.btnBuyHealth.lineStyle(5,0x6a6893);
        this.btnBuyHealth.drawRect(width-width*.4, -this.buttonHeight*.7, width*.25, width*.25);
        this.btnBuyHealth.endFill();
        this.btnBuyHealth.interactive=true;
        this.btnBuyHealth.buttonMode=true;
        this.btnBuyHealth.on("pointerdown", () => {
            this.emit("buyhealth");
        });

        this.selectButton = new PIXI.Graphics()
        this.selectButton.beginFill(0x2d1b29 );
        this.selectButton.drawRect(this.buttonWidth,height*.7, width-(this.buttonWidth*2), height*.3);
        this.selectButton.endFill();
        this.selectButton.buttonMode = true;
        this.selectButton.interactive = true;
        this.selectButton.on("pointerdown", () => {
            this.selectButton.emit("pressed");
        });

        this.selectButttonText = new PIXI.Text("USE",this.fontStyle);
        this.selectButttonText.x = (this.selectButton.x + this.buttonWidth) + (this.selectButton.width/2 - this.selectButttonText.width/2)
        this.selectButttonText.y = (this.selectButton.y + this.buttonHeight) - this.selectButttonText.height

        this.leftButton = new PIXI.Graphics()
        this.leftButton.beginFill(0x6a6893);
        this.leftButton.drawRect(0, 0, this.buttonWidth, this.buttonHeight);
        this.leftButton.endFill();
        this.leftButton.buttonMode = true;
        this.leftButton.interactive = true;
        this.leftButton.on("pointerdown", () => {
            this.leftButton.emit("pressed");
        });

        this.rightButton = new PIXI.Graphics()
        this.rightButton.beginFill(0x6a6893 );
        //this.rightButton.lineStyle(4,0xf1bf59)
        this.rightButton.drawRect(width-this.buttonWidth, 0, this.buttonWidth, this.buttonHeight);
        this.rightButton.endFill();
        this.rightButton.buttonMode = true;
        this.rightButton.interactive = true;
        this.rightButton.on("pointerdown", () => {
            this.rightButton.emit("pressed");
        });

        this.display = new PIXI.Sprite()
        this.showItem()

        this.addChild(this.background)
        this.addChild(this.btnBuyAmmo)
        this.addChild(this.btnBuyHealth)

        this.addChild(this.selectButton)
        this.addChild(this.selectButttonText)


        this.addChild(this.rightButton);
        this.addChild(this.leftButton)
        this.addChild(this.display)
        


        //setting own position
        this.position.set(position[0],position[1]);

        this.rightButton.on("pressed", () => {
            this.changeItem(1);}
        )

        this.leftButton.on("pressed", () => {
            this.changeItem(-1);}
        )
        this.selectButton.on("pressed", () => {
            this.selectEvent();}
        )
    }

    showItem(){
        this.display.texture = this.weaponTextures[this.displayedItem];
        this.display.height = this.background.height - this.selectButton.height;
        this.display.scale.x = this.display.scale.y;
        if (this.display.width > this.background.width - (this.buttonWidth * 2)) {
            this.display.width = this.background.width - (this.buttonWidth * 2);
            this.display.scale.y = this.display.scale.x;
        }
        this.display.x = this.buttonWidth;
    }

    changeItem(direction:1|-1){
        this.displayedItem += direction

        if (this.displayedItem > this.weaponTextures.length-1){
            this.displayedItem=0;
        }
        if(this.displayedItem < 0){
            this.displayedItem=this.weaponTextures.length-1;
        }
        // console.log(
        //     "dir:" , direction,
        //     "\ndisplayed: " , this.displayedItem
        // )
        this.showItem();
    }

    selectEvent(){

        //to do add select button handling, update button data on click and hancle pruchasing of items outisde of the shop interface.


        this.emit("boob")
    }

    markbought(){
        
    }
}