import { uiBar } from './healthBar';
import { buttons } from './button';
import { knightAnimations } from './moves';
import { golemAnimations } from './golemMoves';
import { skeletonAnimations } from './skeletonView';
import { getUpgrades } from './upgrade';
import strings from './strings';
import { Shop, ShopItem } from './shopItem';
import { TweenLite, Power2, Power1 } from 'gsap';
import { IItem } from 'types';
import { playerInstance } from './player';
import { orcAnimations } from './orcView';

interface ILevel {
    monster: golemAnimations | skeletonAnimations | orcAnimations;
    monsterHealth: number;
    maxHealth: number;
}

export class Game extends PIXI.Container{
    public levels: ILevel[];
    public level: number = 0; 
    public currency: number = 0;
    protected idleFrames: PIXI.Texture[] = [];
    public chanceArray: string[] = [];
    public app: PIXI.Application;
    private background: PIXI.Sprite;
    private Buttons: buttons;
    private knightAnimations: knightAnimations;
    private golemAnimations: golemAnimations;
    private skeletonAnimations: skeletonAnimations;
    private orcAnimations: orcAnimations;
    //PLAYER INSTANCE 
    private shop: Shop;
    private uiBar: uiBar;
    private knightDamageCount: number = 0;
    private attackPCT: number = 70;
    private playerHealth: number = 4;
    private swordDamage: number = 1;
    private graphics: PIXI.Graphics;
    private Icon: PIXI.Sprite;
    private HTPtext: PIXI.Text;
    private welcomeText: PIXI.Text;
    private currencyText: PIXI.Text;
    private container: PIXI.Container;
    private isMonsterDead: boolean = false;
    private isPlayerDead: boolean = false;

    private HTPstyle = new PIXI.TextStyle({
        fill: "#ffffff",
        fillGradientStops: [100],
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 24,
        stroke: "#ffffff"
    });

    constructor(app: PIXI.Application){
        super();
        this.app = app;
    }
    
    public load(loader: PIXI.loaders.Loader) : void {
        loader.add('golemSheet', 'assets/golem-0.json');
        loader.add('golemSheet1', 'assets/golem-1.json');
        loader.add('golemSheet2', 'assets/golem-2.json');
        loader.add('golemSheet3', 'assets/golem-3.json');
        loader.add('knight', 'assets/knight.json');
        loader.add('skeletonJson', 'assets/skeleton.json');
        loader.add('orcJson', 'assets/orc.json');
        loader.add('background', 'assets/background1.png');
        loader.add('icon', 'assets/icon.png');
        loader.add('coin', 'assets/goldenCoin.png');
        //Upgrades
        loader.add('sword','assets/swordUpgrade.png');
        loader.add('health','assets/pixelHeart.png');
        loader.add('shield','assets/shieldUpgrade.png');
        //Buttons
        loader.add('upgradeButton', 'assets/upgradeButton.png')
        loader.add('playButton', 'assets/playButton1.png');
        loader.add('resetButton', 'assets/resetButton.png');
        loader.add('continueButton', 'assets/continueBtn.png');
        loader.add('helpButton', 'assets/helpButton.png');
        loader.add('exitButton', 'assets/exit.png');
        loader.add('buyButton', 'assets/buyButton.png');
    }
    
    startGame(){
        //Background
        this.background = new PIXI.Sprite(this.app.loader.resources.background.texture);
        this.background.width = this.app.screen.width;
        this.background.height = this.app.screen.height;
        this.app.stage.addChild(this.background);
        
        this.container = new PIXI.Container();
        this.container.visible = false;
        
        //Graphics
        this.graphics = new PIXI.Graphics();

        //Play button
        this.Buttons = new buttons(this.app);
        this.Buttons.on('resetClicked', () => {this.resetButtonClick()});
        this.Buttons.on('playButtonClick', () => {this.playButtonClick()});
        this.Buttons.on('continueGame', () => {this.continueGame()});
        this.Buttons.on('helpClicked', () => {this.helpClick()});
        this.Buttons.on('exitClicked',() => {this.exitUI()});
        this.Buttons.on('coinClicked', () => {this.addCoin()});
        this.Buttons.on('upgradeClicked', () => {this.upgrade()});
        this.app.stage.addChild(this.Buttons);
        
        //UI Bar
        this.uiBar = new uiBar(200, 4, 4, 900,280);
        this.app.stage.addChild(this.uiBar);
        
        this.knightAnimations = new knightAnimations(this.app);
        this.golemAnimations = new golemAnimations(this);
        this.skeletonAnimations = new skeletonAnimations(this.app, this);
        this.orcAnimations = new orcAnimations(this.app, this);
        //this.upgrades = new upgrades(this.app);
        
        //Currency
        this.currencyText = new PIXI.Text('0', this.knightAnimations.style);
        this.currencyText.x = this.app.screen.width * 0.25;
        this.currencyText.y = this.app.screen.height * 0.08;
        this.app.stage.addChild(this.currencyText);

        this.app.stage.addChild(this.knightAnimations);
        this.app.stage.addChild(this.golemAnimations);
        this.app.stage.addChild(this.skeletonAnimations);
        this.app.stage.addChild(this.orcAnimations);
        this.skeletonAnimations.visible = false;
        this.orcAnimations.visible = false;

        this.Icon = new PIXI.Sprite(this.app.loader.resources.icon.texture);
        this.Icon.width = this.app.screen.width * 0.16;
        this.Icon.height = this.app.screen.height * 0.24;
        this.Icon.x = this.app.screen.width * 0.125;
        this.Icon.y = this.app.screen.height * 0.11;
        this.Icon.visible = false;
        
        this.levels = [];
        this.levels.push({
            monster: this.golemAnimations,
            monsterHealth: 4,
            maxHealth: 4,
        });
        this.levels.push({
            monster: this.skeletonAnimations,
            monsterHealth: 5,
            maxHealth: 5
        }); 
        this.levels.push({
            monster: this.orcAnimations,
            monsterHealth: 6,
            maxHealth: 6
        });        
        this.welcomeText = new PIXI.Text('', this.HTPstyle)
        this.welcomeText.x = this.app.screen.width * 0.3;
        this.welcomeText.y = this.app.screen.height * 0.1;

        this.HTPtext = new PIXI.Text('', this.HTPstyle)
        this.HTPtext.x = this.app.screen.width * 0.3;
        this.HTPtext.y = this.app.screen.height * 0.35;

        this.app.stage.addChild(this.container);
        this.container.addChild(this.graphics);
        this.container.addChild(this.Icon);
        this.container.addChild(this.HTPtext)
        this.container.addChild(this.welcomeText);
        this.container.addChild(this.Buttons.exitButton);

        const upgrades = getUpgrades();
        let shopItems: ShopItem[] = [
            new ShopItem(this.app, upgrades.sword),
            new ShopItem(this.app, upgrades.shield),
            new ShopItem(this.app, upgrades.heal)
        ];

        this.shop = new Shop(this.app, shopItems);
        this.shop.on('itemBought', (name: string, price: number) => this.upgradeSomething(name, price))
        /* this.shop.on('itemBought:health', (price: number) => this.upgradeHealth(price))
        this.shop.on('itemBought:sword', () => { this.upgradeDamage(); }); */
        this.container.addChild(this.shop);

        this.help();
    }
    
    public pickMove(): void {
        let rand = Math.random() * 100;
        if (rand < this.attackPCT) {
            // Attack
            this.knightAnimations.attackAnimation();
            console.log(this.levels[this.level].monsterHealth)
            this.levels[this.level].monsterHealth = this.levels[this.level].monsterHealth - this.swordDamage;
            console.log(this.levels[this.level].monsterHealth)
            this.levels[this.level].monster.hurtAnimation();
            this.uiBar.setValue(this.levels[this.level].monsterHealth);
            if(this.levels[this.level].monsterHealth <= 0){
                this.isMonsterDead = true;
                this.levels[this.level].monster.deadAnimation();
                this.Buttons.resetButton.x = this.app.screen.width * 0.37;
                this.knightAnimations.testText.text = 'You Win!'
                this.app.stage.addChild(this.Buttons.goldenCoin)
                this.Buttons.goldenCoin.visible = true;
                this.Buttons.playGameButton.interactive = false;
                this.Buttons.playGameButton.buttonMode = false;
                this.Buttons.continueButton.visible = true;
                this.Buttons.resetButton.visible = true;
            }
        }
        else {
            // Miss
            this.knightAnimations.missAnimation();
        }

        // 50/50 chance of a hit
        let golemRandomNumber = Math.floor(Math.random() * 2);
        if(golemRandomNumber === 0){
            this.knightDamageCount++;
            this.knightAnimations.hurtAnimation();
            this.levels[this.level].monster.attackAnimation();
            if(this.knightDamageCount >= this.playerHealth){
                this.isPlayerDead = true;
                this.repositionButton();
                this.knightAnimations.deadAnimation();
                this.Buttons.playGameButton.interactive = false;
                this.Buttons.playGameButton.buttonMode = false;
                this.knightAnimations.testText.text = 'Defeat!';
                this.Buttons.continueButton.visible = false;
                this.Buttons.resetButton.visible = true;
            }
        }
    }

    public resetGame(): void{
        this.levels.forEach((level) => {
            level.monsterHealth = level.maxHealth;
        });
        this.Buttons.goldenCoin.interactive = true;
        this.Buttons.goldenCoin.x = this.Buttons.oldCords[0];
        this.Buttons.goldenCoin.y = this.Buttons.oldCords[1]
        this.isPlayerDead = false;
        this.isMonsterDead = false;
        this.attackPCT = 70;
        this.knightDamageCount = 0;
        this.golemAnimations.reset();
        this.skeletonAnimations.reset();
        this.knightAnimations.reset();
        this.hideScoreBoard();
        this.levels[this.level].monster.visible = false;
        this.level = 0;
        this.levels[this.level].monster.visible = true;
        this.uiBar.setValue(this.levels[this.level].monsterHealth);
    }

    public exitUI():void{
        TweenLite.to(this.container, 0.8, {ease: Power1.easeOut, y: -550, onComplete: ()=> {
            this.Buttons.exitButton.interactive = false;
            this.container.y += 550;
            this.container.visible = false;
            this.Buttons.upgradeButton.interactive = true;
            this.Buttons.helpButton.interactive = true;
            this.Buttons.resetButton.interactive = true;
            this.Buttons.continueButton.interactive = true;
        }});
        this.Buttons.upgradeButton.interactive = false;
        this.Buttons.helpButton.interactive = false;
        this.Buttons.resetButton.interactive = false;
        this.Buttons.continueButton.interactive = false;
        //this.shop.visible = false;
        if(this.isMonsterDead || this.isPlayerDead){
            this.Buttons.playGameButton.interactive = false;
        }
        else {
            this.Buttons.playGameButton.interactive = true;
        }
    }

    public help():void{
        this.container.y = -600;
        TweenLite.to(this.container, 0.8, {ease: Power1.easeOut, y: +1, onComplete: ()=> {
            this.Buttons.exitButton.interactive = true;
            this.container.y -= 1;
        }});
        this.container.visible = true;
        this.shop.visible = false;
        this.Buttons.resetButton.interactive = false;
        this.Buttons.continueButton.interactive = false;
        this.Buttons.upgradeButton.interactive = false;
        this.Buttons.exitButton.interactive = true;
        this.Buttons.exitButton.visible = true;
        this.graphics.lineStyle(20, 0x000000, 1);
        this.graphics.beginFill(0xf4169e1);
        this.graphics.drawRect(130, 50, 940, 500);
        this.graphics.endFill();

        this.Icon.visible = true;
        this.HTPtext.visible = true;
        this.welcomeText.visible = true;
        
        this.welcomeText.text = strings.welcomeText + '\n';
        this.welcomeText.text += '\n' + strings.info[1] + '\n' + strings.info[2] + '\n' + strings.info[3] + '\n';
        this.HTPtext.text = '\n' + strings.htp.title + '\n' + '\n';
        this.HTPtext.text += strings.htp.info[1] + '\n' + strings.htp.info[2] + '\n' + strings.htp.info[3] + '\n' + strings.htp.info[4];
        this.Buttons.playGameButton.interactive = false;
        this.Buttons.helpButton.interactive = false;
    }
    public upgrade(): void{
        this.container.y = -600;
        TweenLite.to(this.container, 0.8, {ease: Power1.easeOut, y: +1, onComplete: ()=> {
            this.Buttons.exitButton.interactive = true;
            this.container.y -= 1;
        }});
        console.log('upgrade');
        this.shop.visible = true;
        this.container.visible = true;
        this.Buttons.exitButton.interactive = true;
        this.Buttons.resetButton.interactive = false;
        this.Buttons.continueButton.interactive = false
        this.Buttons.upgradeButton.interactive = false;
        this.Buttons.exitButton.visible = true;
        this.graphics.lineStyle(20, 0x000000, 1);
        this.graphics.beginFill(0xf5f2d0);
        this.graphics.drawRect(130, 50, 940, 500);
        this.graphics.endFill();
        this.Buttons.playGameButton.interactive = false;
        this.Buttons.helpButton.interactive = false;
        this.Icon.visible = false;
        this.HTPtext.visible = false;
        this.welcomeText.visible = false;
    }

    public playButtonClick(): void{
        this.pickMove();
    }

    public helpClick(): void{
        this.help();
    }

    public resetButtonClick(): void{
        this.resetGame();
    }

    public upgradeSomething(name: string, price: number): void {
        
        switch(name) {
            case 'sword':
                        this.swordDamage++;
                        playerInstance.currency -= price;
                        this.currencyText.text = playerInstance.currency.toString()
                break;
            case 'health':
                        this.playerHealth += 2;
                        playerInstance.currency -= price;
                        this.currencyText.text = this.currency.toString()
                break;
            default:
                console.log('Upgrade: ' + name + ' Cost: ' + price);
                break;
        }
    }
    
    public addCoin(): void{
        this.Buttons.goldenCoin;
        TweenLite.to(this.Buttons.goldenCoin, 1.8, {ease: Power2.easeIn, x: 150, y: 50, onComplete: ()=> {
            this.Buttons.goldenCoin.visible = false;
            this.Buttons.goldenCoin.x = this.Buttons.oldCords[0];
            this.Buttons.goldenCoin.y = this.Buttons.oldCords[1];
        }});
        playerInstance.currency += 100;
        this.currencyText.text = playerInstance.currency.toString();
        this.Buttons.goldenCoin.interactive = false;
    }


    public continueGame(): void{
        this.isMonsterDead = false
        this.Buttons.goldenCoin.x = this.Buttons.oldCords[0];
        this.Buttons.goldenCoin.y = this.Buttons.oldCords[1]
        this.Buttons.goldenCoin.interactive = true;
        this.knightDamageCount = 0;
        this.levels[this.level].monster.visible = false;
        this.level++;
        this.levels[this.level].monster.visible = true;
        this.uiBar.setValue(this.levels[this.level].monsterHealth);
        this.hideScoreBoard();
        this.increaseDifficulty();
    }

    public increaseDifficulty(): void{
        this.attackPCT =- 10;
        if (this.attackPCT < 60) {
            this.attackPCT = 60;
        }
    }

    public hideScoreBoard(): void{
        this.knightAnimations.testText.text = '';
        this.Buttons.resetButton.visible = false;
        this.Buttons.continueButton.visible = false;
        this.Buttons.playGameButton.interactive = true;
        this.Buttons.playGameButton.buttonMode = true;
        this.Buttons.goldenCoin.visible = false;
    }

    public repositionButton(): void{
        this.Buttons.resetButton.x = this.app.screen.width * 0.43;
        this.Buttons.resetButton.y = this.app.screen.height * 0.05;
    }

    setPositions(width: number, height: number) : void {

    }

    update(delta: number) : void {
        this.knightAnimations.update(delta);
    }

    onResize(app: PIXI.Application) : void {
        this.setPositions(app.screen.width, app.screen.height);
    }
}