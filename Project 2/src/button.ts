import { Game } from './game';
import { knightAnimations } from './moves'

export class buttons extends PIXI.Container{
    
    public restartButton: PIXI.Sprite
    public playGameButton: PIXI.Sprite;
    public resetButton: PIXI.Sprite;
    public continueButton: PIXI.Sprite;
    public helpButton: PIXI.Sprite;
    public exitButton: PIXI.Sprite;
    public upgradeButton: PIXI.Sprite;
    public goldenCoin: PIXI.Sprite;
    public goldenCoinUpgrade: PIXI.Sprite;
    public buyButton: PIXI.Sprite;
    public buyButtonHealth: PIXI.Sprite;
    public buyButtonSword: PIXI.Sprite;
    public oldCords: number[] = [this.x, this.y];
    private app: PIXI.Application;

    constructor(app: PIXI.Application){
        super()
        this.restartButton = new PIXI.Sprite(app.loader.resources.restartButton.texture);
        this.upgradeButton = new PIXI.Sprite(app.loader.resources.upgradeButton.texture);
        this.playGameButton = new PIXI.Sprite(app.loader.resources.playButton.texture);
        this.resetButton = new PIXI.Sprite(app.loader.resources.resetButton.texture);
        this.continueButton = new PIXI.Sprite(app.loader.resources.continueButton.texture);
        this.helpButton = new PIXI.Sprite(app.loader.resources.helpButton.texture);
        this.exitButton = new PIXI.Sprite(app.loader.resources.exitButton.texture);
        this.goldenCoin = new PIXI.Sprite(app.loader.resources.coin.texture);
        this.goldenCoinUpgrade = new PIXI.Sprite(app.loader.resources.coin.texture);
        this.buyButton = new PIXI.Sprite(app.loader.resources.buyButton.texture);
        this.buyButtonSword = new PIXI.Sprite(app.loader.resources.buyButton.texture);
        this.buyButtonHealth = new PIXI.Sprite(app.loader.resources.buyButton.texture);
        this.app = app;

        this.buyButton.interactive = true;
        this.buyButton.buttonMode = true;
        this.buyButton.width = 230;
        this.buyButton.height = 100;
        this.buyButton.x = this.app.screen.width * 0.2;
        this.buyButton.y = this.app.screen.height * 0.45;
        this.buyButton.anchor.set(0.5)
    
        this.buyButton.on('pointerdown', () =>{
            this.emit('buyArmourClicked')
        })

        this.buyButtonSword.interactive = true;
        this.buyButtonSword.buttonMode = true;
        this.buyButtonSword.width = 230;
        this.buyButtonSword.height = 100;
        this.buyButtonSword.x = this.app.screen.width * 0.45;
        this.buyButtonSword.y = this.app.screen.height * 0.45;
        this.buyButtonSword.anchor.set(0.5)
    
        this.buyButtonSword.on('pointerdown', () =>{
            this.emit('buySwordClicked')
        })

        this.buyButtonHealth.interactive = true;
        this.buyButtonHealth.buttonMode = true;
        this.buyButtonHealth.width = 230;
        this.buyButtonHealth.height = 100;
        this.buyButtonHealth.x = this.app.screen.width * 0.7;
        this.buyButtonHealth.y = this.app.screen.height * 0.45;
        this.buyButtonHealth.anchor.set(0.5)
    
        this.buyButtonHealth.on('pointerdown', () =>{
            this.emit('buyHealthClicked')
        })

        this.upgradeButton.interactive = true;
        this.upgradeButton.buttonMode = true;
        this.upgradeButton.width = 230;
        this.upgradeButton.height = 50;
        this.upgradeButton.x = this.app.screen.width * 0.15;
        this.upgradeButton.y = this.app.screen.height * 0.13;
        this.upgradeButton.anchor.set(0.5)
        this.addChild(this.upgradeButton);
    
        this.upgradeButton.on('pointerdown', () =>{
            this.emit('upgradeClicked')
        })

        this.goldenCoin.interactive = true;
        this.goldenCoin.buttonMode = true;
        this.goldenCoin.width = 60
        this.goldenCoin.height = 60
        this.goldenCoin.x = this.app.stage.width * 0.58;
        this.goldenCoin.y = this.app.stage.height * 0.85;
        this.oldCords = [this.goldenCoin.x, this.goldenCoin.y]
        this.goldenCoin.anchor.set(0.5)
        this.addChild(this.goldenCoin);
        this.goldenCoin.visible = false;
    
        this.goldenCoin.on('pointerdown', () =>{
            this.emit('coinClicked')
        })

        this.helpButton.interactive = true;
        this.helpButton.buttonMode = true;
        this.helpButton.width = 170;
        this.helpButton.height = 70;
        this.helpButton.x = this.app.screen.width * 0.85;
        this.helpButton.y = this.app.screen.height * 0.13;
        this.helpButton.anchor.set(0.5)
        this.addChild(this.helpButton);
    
        this.helpButton.on('pointerdown', () =>{
            this.emit('helpClicked')
        })

        this.exitButton.visible = false;
        this.exitButton.interactive = true;
        this.exitButton.buttonMode = true;
        this.exitButton.width = 50;
        this.exitButton.height = 50;
        this.exitButton.x = this.app.screen.width * 0.78;
        this.exitButton.y = this.app.screen.height * 0.13;
        this.exitButton.anchor.set(0.5)
    
        this.exitButton.on('pointerdown', () =>{
            this.emit('exitClicked')
        })

        this.playGameButton.interactive = true;
        this.playGameButton.buttonMode = true;
        this.playGameButton.width = 170;
        this.playGameButton.height = 70;
        this.playGameButton.x = this.app.screen.width * 0.5;
        this.playGameButton.y = this.app.screen.height * 0.93;
        this.playGameButton.anchor.set(0.5)
        this.addChild(this.playGameButton);
    
        this.playGameButton.on('pointerdown', () =>{
            this.emit('playButtonClick')
        })

        //Restart
        this.restartButton.interactive = true;
        this.restartButton.buttonMode = true;
        this.restartButton.width = 230;
        this.restartButton.height = 100;
        this.restartButton.x = this.app.screen.width * 0.2;
        this.restartButton.y = this.app.screen.height * 0.45;
        this.restartButton.anchor.set(0.5)
    
        this.restartButton.on('pointerdown', () =>{
            this.emit('restartClicked')
        })

        //Reset
        this.resetButton.visible = false;
        this.resetButton.interactive = true;
        this.resetButton.buttonMode = true;
        this.resetButton.width = 170;
        this.resetButton.height = 170;
        this.resetButton.x = this.app.screen.width * 0.37;
        this.resetButton.y = this.app.screen.height * 0.05;
        this.addChild(this.resetButton);
        
        this.resetButton.on('pointerdown', () =>{
            this.emit('resetClicked')
        })

        //Continue
        this.continueButton.visible = false;
        this.continueButton.interactive = true;
        this.continueButton.buttonMode = true;
        this.continueButton.width = 170;
        this.continueButton.height = 73;
        this.continueButton.x = this.app.screen.width * 0.52;
        this.continueButton.y = this.app.screen.height * 0.12;
        this.addChild(this.continueButton);

        this.continueButton.on('pointerdown', () =>{
            this.emit('continueGame')
        })
        
        this.goldenCoinUpgrade.visible = true;
        this.goldenCoinUpgrade.width = 45;
        this.goldenCoinUpgrade.height = 45;
        this.goldenCoinUpgrade.x = this.app.screen.width * 0.155;
        this.goldenCoinUpgrade.y = this.app.screen.height * 0.52;
    }

}