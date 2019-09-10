import { PRECISION } from "pixi.js";
import {app} from './application'
import {weaponsList, IWeapon} from './weapons';
import {inventory} from "./inventory";

export class Shop extends PIXI.Container{

    public buttonWidth:number;
    public buttonHeight:number;

    public leftButton:PIXI.Graphics;
    public rightButton:PIXI.Graphics;

    public background:PIXI.Graphics;

    public btnBuyAmmo:PIXI.Graphics;
    public btnBuyAmmoSprite:PIXI.Sprite;

    public btnBuyHealth:PIXI.Graphics;
    public btnBuyHealthSprite:PIXI.Sprite;

    private displayedItem:number = 0;
    private weaponTextures:PIXI.Texture[];
    private weaponOwned:boolean[];
    private weaponNames:string[];

    public display:PIXI.Sprite;

    public selectButton:PIXI.Graphics;
    public selectButttonText:PIXI.Text;

    private moneyText:PIXI.Text;

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
        this.weaponNames = [];
        this.weaponOwned = [];
        for (var weapon in weaponsList){
            let temp = app.loader.resources[weapon].texture
            this.weaponTextures.push(temp)
            this.weaponNames.push(weapon.toString())

            if (inventory.checkFor(weaponsList[weapon])){
                this.weaponOwned.push(true)
            }
            else{
                this.weaponOwned.push(false)
            }
        }

      
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x483861);
        this.background.drawRect(0, 0, width, height);
        this.background.endFill();

        this.btnBuyAmmo = new PIXI.Graphics();
        this.btnBuyAmmo.beginFill(0x483861);
        this.btnBuyAmmo.drawRect(width-width*.6-width*.25, -this.buttonHeight*.7, width*.25, width*.25);
        this.btnBuyAmmo.endFill();
        this.btnBuyAmmo.interactive=true;
        this.btnBuyAmmo.buttonMode=true;
        this.btnBuyAmmo.on("pointerdown", () => {
            this.btnBuyAmmo.emit("pressed");
        });

        this.btnBuyAmmoSprite = new PIXI.Sprite(app.loader.resources.ammopack.texture)
        this.btnBuyAmmoSprite.x = width-width*.6-width*.25
        this.btnBuyAmmoSprite.y = -this.buttonHeight*.7
        this.btnBuyAmmoSprite.width = width*.25
        this.btnBuyAmmoSprite.height = width*.25

        this.btnBuyHealth = new PIXI.Graphics();
        this.btnBuyHealth.beginFill(0x483861);
        this.btnBuyHealth.drawRect(width-width*.4, -this.buttonHeight*.7, width*.25, width*.25);
        this.btnBuyHealth.endFill();
        this.btnBuyHealth.interactive=true;
        this.btnBuyHealth.buttonMode=true;
        this.btnBuyHealth.on("pointerdown", () => {
            this.btnBuyHealth.emit("pressed")
        });

        this.btnBuyHealthSprite = new PIXI.Sprite(app.loader.resources.healthpack.texture)
        this.btnBuyHealthSprite.x = width-width*.4
        this.btnBuyHealthSprite.y = -this.buttonHeight*.7
        this.btnBuyHealthSprite.width = width*.25
        this.btnBuyHealthSprite.height = width*.25

        this.selectButton = new PIXI.Graphics()
        this.selectButton.beginFill(0x2d1b29 );
        this.selectButton.drawRect(this.buttonWidth,height*.7, width-(this.buttonWidth*2), height*.3);
        this.selectButton.endFill();
        this.selectButton.buttonMode = true;
        this.selectButton.interactive = true;
        this.selectButton.on("pointerdown", () => {
            this.selectButton.emit("pressed");
        });

        let displayString:string;
        this.weaponOwned[this.displayedItem] ? displayString="EQUIP" : displayString="BUY";

        this.selectButttonText = new PIXI.Text(displayString,this.fontStyle);
        this.selectButttonText.x = (this.selectButton.x + this.buttonWidth) + (this.selectButton.width*.5 - this.selectButttonText.width*5)
        this.selectButttonText.y = (this.selectButton.y + this.buttonHeight) - this.selectButttonText.height

        this.moneyText = new PIXI.Text("",this.fontStyle);
        this.updateMoney();

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
        this.displayUpdate()
        this.addChild(this.background)
        this.addChild(this.btnBuyAmmo)
        this.addChild(this.btnBuyAmmoSprite)
        this.addChild(this.btnBuyHealth)
        this.addChild(this.btnBuyHealthSprite)
        this.addChild(this.selectButton)
        this.addChild(this.selectButttonText)
        this.addChild(this.rightButton);
        this.addChild(this.leftButton);
        this.addChild(this.display);
        this.addChild(this.moneyText);
        
        //setting own position
        this.position.set(position[0],position[1]);

        this.btnBuyAmmo.on("pressed", () => {
            this.eventKit("ammo");
        })

        this.btnBuyHealth.on("pressed", () => {
            this.eventKit("health");
        })

        this.rightButton.on("pressed", () => {
            this.changeItem(1);}
        )

        this.leftButton.on("pressed", () => {
            this.changeItem(-1);}
        )
        this.selectButton.on("pressed", () => {
            this.eventSelect();}
        )
    }

    updateItem(itemNumber:number){
        if ( inventory.checkFor(weaponsList[this.weaponNames[itemNumber]]) ){
            this.weaponOwned[itemNumber] = true;
        }
        this.moneyText.text = inventory.money.toString();
    }

    updateMoney(){
        this.moneyText.text = "$"+(inventory.money.toString());
        this.moneyText.x = (this.background.x) + this.background.width*.5-this.moneyText.width*.5;
        this.moneyText.y = (this.background.y) + this.buttonHeight*1;
    }

    displayUpdate(){
        this.display.texture = this.weaponTextures[this.displayedItem];
        this.display.height = this.background.height - this.selectButton.height;
        this.display.scale.x = this.display.scale.y;
        if (this.display.width > this.background.width - (this.buttonWidth * 2)) {
            this.display.width = this.background.width - (this.buttonWidth * 2);
            this.display.scale.y = this.display.scale.x;
        }
        this.display.x = this.buttonWidth;

        let displayString:string;
        this.weaponOwned[this.displayedItem] ? displayString="EQUIP" : displayString="BUY"
        this.selectButttonText.text=displayString;
        this.selectButttonText.x = (this.selectButton.x + this.buttonWidth) + (this.selectButton.width/2 - this.selectButttonText.width/2)
        this.selectButttonText.y = (this.selectButton.y + this.buttonHeight) - this.selectButttonText.height
    }

    changeItem(direction:1|-1){
        this.displayedItem += direction
        if (this.displayedItem > this.weaponTextures.length-1){
            this.displayedItem=0;
        }
        if(this.displayedItem < 0){
            this.displayedItem=this.weaponTextures.length-1;
        }
        this.displayUpdate();
    }

    eventSelect(){
        //either buy or equip the shown weapon
        if (this.weaponOwned[this.displayedItem]){
            inventory.selectWeapon(weaponsList[this.weaponNames[this.displayedItem]])
            
        }
        else{
            if (inventory.buyWeapon(weaponsList[this.weaponNames[this.displayedItem]])){
                this.updateItem(this.displayedItem);
                this.updateMoney();
                this.displayUpdate();
            }
        }
    }

    eventKit(kitType:"health"|"ammo"){
        if(kitType==="ammo"){
            this.emit("buykit", "ammo");
        }
        if(kitType==="health"){
            this.emit("buykit", "health");
        }
    }

    reset(){
        this.weaponNames.forEach((weapon,index) => {
            if(inventory.checkFor(weaponsList[weapon])){
                this.weaponOwned[index] = true;
            }
            else{
                this.weaponOwned[index] = false;
            }
        });
        this.displayedItem=0;
        this.displayUpdate();
        this.updateMoney();
    }
}