import { Popup } from './basePopup';
import { app } from './application';
import { Shop, ShopItem } from './shopItem';
import { getUpgrades } from './upgrade';
import { Graphics } from 'pixi.js';
import { Game } from './game';
import { playerInstance } from './player';
import { TweenLite, Elastic } from 'gsap';
import { InfoPopup } from './infoPopup';

export class Upgrades extends Popup{
    
    private shop: Shop;
    protected infoPopup: InfoPopup;
    public errorContainer = new PIXI.Container;
    public confirmContainer = new PIXI.Container;;
    public healthCounter: number = 0;

    private style = new PIXI.TextStyle({
        fill: "#000000",
        fillGradientStops: [100],
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 24,
        stroke: "#ffffff"
    });
    
    constructor(){
        super(0xfffde0, 940, 500, 20);

        const upgrades = getUpgrades();
        let shopItems: ShopItem[] = [
            new ShopItem(upgrades.sword),
            new ShopItem(upgrades.shield),
            new ShopItem(upgrades.heal)
        ];

        this.shop = new Shop(app, shopItems)
        this.infoPopup = new InfoPopup()

        this.addChild(this.shop);
        this.addChild(this.infoPopup);

        this.shop.on('itemBought', (name: string, price: number) => {
            this.upgradeSomething(name, price);
            this.itemConfirmation();
        });

        this.shop.on('notEnough', (name: string, price: number) => {
            this.notEnoughCredits();
        });
    }

    public itemConfirmation():void{
        this.infoPopup.text.text = 'Upgrade Purschased!'
        this.infoPopup.show()
    }

    public notEnoughCredits():void{
        this.infoPopup.text.text = 'Not enough Credits!'
        this.infoPopup.show()
    }

    // public closeErrorBox(): void{
    // }

    public upgradeSomething(name: string, price: number): void {
        switch(name) {
            case 'sword':
                playerInstance.swordDamage++;
                playerInstance.currency -= price;
                break;
            case 'health':
                playerInstance.playerHealth += 2;
                this.healthCounter++;
                console.log('Health Counter: ', this.healthCounter)
                console.log('health', playerInstance.playerHealth)
                playerInstance.currency -= price;
                break;
            case 'shield':
                playerInstance.attackPCT += 5;
                if(playerInstance.attackPCT >= 85){
                    playerInstance.attackPCT === 85;
                    playerInstance.currency = playerInstance.currency;
                }
                playerInstance.currency -= price;
            default:
                break;
        }
    }
}

