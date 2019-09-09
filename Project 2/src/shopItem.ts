import { IItem } from 'types';
import { app } from './application'
import { TweenLite, Ease, Elastic } from 'gsap';
import {playerInstance} from './player'
import { Upgrades } from './upgrades'
import { Game } from './game';

export class ShopItem extends PIXI.Container implements IItem {
    public image: PIXI.Sprite;
    public price: number;
    public name: string;
    public priceLabel :PIXI.Text;
    public shopCoin: PIXI.Sprite;
    public buyButton: PIXI.Sprite;
    private playerInstance = playerInstance;

    constructor(itemDesc: { texture: string, price: number }) {
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
    private exitErrorButton: PIXI.Sprite;
    
    private style = new PIXI.TextStyle({
        fill: "#000000",
        fillGradientStops: [100],
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 24,
        stroke: "#ffffff"
    });
    
    constructor(app: PIXI.Application, items: ShopItem[]){
        super();
        
        this.exitErrorButton = new PIXI.Sprite(app.loader.resources.exitButton.texture);
        this.exitErrorButton.on('pointerdown', () => {
            //this.closeErrorBox();
        })
        
        this.items = [];
        items.forEach((item, index) => {
            this.items.push(item);
            this.addChild(item);
            item.x = 210 * (index + 1);
            item.y = app.screen.height * 0.25;
            item.on('itemBought', () => {
                if(playerInstance.currency >= item.price){
                    this.emit('itemBought', item.name, item.price);
                
                }
                else{
                    const oldCords:number = item.buyButton.x;
                    this.emit('notEnough', item.name, item.price)
                    TweenLite.to(item.buyButton, 0.1, { x: oldCords+15, Ease: Elastic.easeInOut.config(1.2,0.1), onComplete: ()=> {
                        item.buyButton.interactive = false;
                        TweenLite.to(item.buyButton, 0.1, { x: oldCords-15, Ease: Elastic.easeInOut.config(1.2,0.1), onComplete: ()=> {
                            item.buyButton.x = oldCords;
                            item.buyButton.interactive = true;
                        }});
                    }});
                };
            });
        });
    }
}