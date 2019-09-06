import { IItem } from 'types';
import { TweenLite, Ease, Elastic } from 'gsap';
import { Game } from './game';
import {playerInstance} from './player'
import { buttons } from './button';

import { TextStyle } from 'pixi.js';

export class ShopItem extends PIXI.Container implements IItem {
    public image: PIXI.Sprite;
    public price: number;
    public name: string;
    public priceLabel :PIXI.Text;
    public shopCoin: PIXI.Sprite;
    public buyButton: PIXI.Sprite;
    private Shop: Shop
    private playerInstance = playerInstance;

    constructor(app: PIXI.Application, itemDesc: { texture: string, price: number }) {
        super();
        this.price = itemDesc.price;
        this.name = itemDesc.texture;
        this.image = new PIXI.Sprite(app.loader.resources[itemDesc.texture].texture);
        this.buyButton = new PIXI.Sprite(app.loader.resources.buyButton.texture);
        this.shopCoin = new PIXI.Sprite(app.loader.resources.coin.texture);

        const textStyle = new PIXI.TextStyle({
            fill: "#555555",
            fillGradientStops: [100],
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 24,
            stroke: "#ffffff"
        });
        this.priceLabel = new PIXI.Text(this.price.toString(), textStyle)

        this.image.width = this.image.height = 100;

        this.priceLabel.y = this.image.y + this.image.height;
        this.priceLabel.x = this.image.x + (this.image.width * 0.5) - (this.priceLabel.width * 0.5);

        this.shopCoin.width = 25;
        this.shopCoin.scale.y = this.shopCoin.scale.x;
        this.shopCoin.x = this.priceLabel.x - (this.shopCoin.width);
        this.shopCoin.y = this.priceLabel.y + (this.priceLabel.height * 0.5) - (this.shopCoin.height * 0.5);

        this.buyButton.width = 120;
        this.buyButton.scale.y = this.buyButton.scale.x;
        this.buyButton.x = this.priceLabel.x + (this.priceLabel.width * 0.5) - (this.buyButton.width * 0.5);
        this.buyButton.y = this.priceLabel.y + this.priceLabel.height;
        this.buyButton.interactive = true;
        this.buyButton.buttonMode = true;
        this.buyButton.on('pointerdown', () => {
            this.emit('itemBought', this.name, this.price);
        })

        this.addChild(this.image);
        this.addChild(this.priceLabel);
        this.addChild(this.buyButton);
        this.addChild(this.shopCoin);
    }
}

export class Shop extends PIXI.Container{
    public items: ShopItem[];
    public price: number;
    private Game: Game;
    private Buttons: buttons;
    private exitErrorButton: PIXI.Sprite;
    private errorContainer = new PIXI.Container;
    private confirmContainer = new PIXI.Container;
    private shopItem = ShopItem

    
    private style = new PIXI.TextStyle({
        fill: "#000000",
        fillGradientStops: [100],
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 24,
        stroke: "#ffffff"
    });
    //private playerInstance = playerInstance;
    
    constructor(app: PIXI.Application, items: ShopItem[]){
        super();
        
        this.Game = new Game(app)
        this.Buttons = new buttons(app);
        
        this.exitErrorButton = new PIXI.Sprite(app.loader.resources.exitButton.texture);
        this.exitErrorButton.interactive = true;
        this.exitErrorButton.buttonMode = true;
        this.exitErrorButton.on('pointerdown', () => {
            this.closeErrorBox();
            //this.errorContainer.visible = true;
        })
        
        this.items = [];
        items.forEach((item, index) => {
            this.items.push(item);
            this.addChild(item);
            item.x = 270 * (index + 1);
            item.y = app.screen.height * 0.25;
            item.on('itemBought', () => {
                if(playerInstance.currency >= item.price){
                    this.itemConfirmation()
                    this.emit('itemBought', item.name, item.price);
                }
                else{
                    const oldCords:number = item.buyButton.x;
                    TweenLite.to(item.buyButton, 0.1, { x: oldCords+15, Ease: Elastic.easeInOut.config(1.2,0.1), onComplete: ()=> {
                        item.buyButton.x = -15;
                        item.buyButton.x = oldCords;
                        this.notEnoughCredits();
                    }})
                }
            });
        });
    }
        public itemConfirmation():void{
            const graphics = new PIXI.Graphics
            let confirmText = new PIXI.Text
            this.confirmContainer.visible = true; 
            this.addChild(this.confirmContainer)
            confirmText = new PIXI.Text('', this.style);
            confirmText.text = 'Item Upgraded!!';
            confirmText.x = 425;
            confirmText.y = 185;
            graphics.lineStyle(2, 0x000000, 1);
            graphics.beginFill(0xeaeaea);
            graphics.drawRect(370, 150, 470, 100);
            graphics.endFill();
            this.exitErrorButton.x = 810;
            this.exitErrorButton.y = 155;
            this.exitErrorButton.width = this.exitErrorButton.height = 25;
            this.exitErrorButton.visible = true;
            this.confirmContainer.addChild(graphics);
            this.confirmContainer.addChild(confirmText);
            this.confirmContainer.addChild(this.exitErrorButton);
            this.Buttons.exitButton.interactive = false;
        }

        public notEnoughCredits():void{
            const graphics = new PIXI.Graphics;
            this.errorContainer.visible = true;
            let ErrorText = new PIXI.Text;
            this.addChild(this.errorContainer);
            ErrorText = new PIXI.Text('', this.style);
            ErrorText.text = 'You do not have enough credits!';
            ErrorText.x = 425;
            ErrorText.y = 185;
            graphics.lineStyle(2, 0x000000, 1);
            graphics.beginFill(0xeaeaea);
            graphics.drawRect(370, 150, 470, 100);
            graphics.endFill();
            this.exitErrorButton.x = 810;
            this.exitErrorButton.y = 155;
            this.exitErrorButton.width = this.exitErrorButton.height = 25;
            this.exitErrorButton.visible = true;
            this.errorContainer.addChild(graphics);
            this.errorContainer.addChild(ErrorText);
            this.errorContainer.addChild(this.exitErrorButton);
            this.Buttons.exitButton.interactive = false;
        }

        public closeErrorBox(): void{
            this.errorContainer.visible = false;
            this.Buttons.exitButton.interactive = true;
            this.confirmContainer.visible = false;
        }

}