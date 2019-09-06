import { uiBar } from './healthBar';
import { buttons } from './button';
import { knightAnimations } from './moves';
import { golemAnimations } from './golemMoves';
import { skeletonAnimations } from './skeletonView';
import { getUpgrades } from './upgrade';
import strings from './strings';
import { Shop, ShopItem } from './shopItem';
import { TweenLite, Power2, Power1 } from 'gsap';
import { playerInstance } from './player';
import { orcAnimations } from './orcView';
import { cyclopAnimations } from './cyclopsView';

interface ILevel {
    monster: golemAnimations | skeletonAnimations | orcAnimations | cyclopAnimations;
    monsterHealth: number;
    maxHealth: number;
    scoreOnKill: number;
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
    private cyclopAnimations: cyclopAnimations;
    private shop: Shop;
    private uiBar: uiBar;
    private knightDamageCount: number = 0;
    private attackPCT: number = 60;
    private playerHealth: number = 4;
    private swordDamage: number = 1;
    private graphics: PIXI.Graphics;
    private Icon: PIXI.Sprite;
    private HTPtext: PIXI.Text;
    private welcomeText: PIXI.Text;
    private currencyText: PIXI.Text;
    private scoreText: PIXI.Text;
    private scoreWord: PIXI.Text;
    private currencyWord: PIXI.Text
    private container: PIXI.Container;
    private isMonsterDead: boolean = false;
    private isPlayerDead: boolean = false;
    private youWin: PIXI.Sprite

    private HTPstyle = new PIXI.TextStyle({
        fill: "#ffffff",
        fillGradientStops: [100],
        fontFamily: "Arial, Helvetica, san-serif",
        fontSize: 24,
        stroke: "#ffffff"
    });

    private scoreStyle = new PIXI.TextStyle({
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: "Arial, Helvetica, sans-serif",
        fill : '#F7EDCA',
        stroke : '#4a1850',
        strokeThickness : 5,
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 6,
        wordWrap : true,
        wordWrapWidth : 440
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
        loader.add('cyclopsJson', 'assets/cyclops-0.json');
        loader.add('cyclopsJson1', 'assets/cyclops-1.json');
        loader.add('background', 'assets/background2.jpg');
        loader.add('icon', 'assets/icon.png');
        loader.add('coin', 'assets/goldenCoin.png');
        loader.add('winLogo', 'assets/youWin.png');
        //Upgrades
        loader.add('sword','assets/swordUpgrade.png');
        loader.add('health','assets/pixelHeart.png');
        loader.add('shield','assets/shieldUpgrade.png');
        //Buttons
        loader.add('upgradeButton', 'assets/upgradeButton.png');
        loader.add('playButton', 'assets/playButton1.png');
        loader.add('resetButton', 'assets/resetButton.png');
        loader.add('continueButton', 'assets/continueBtn.png');
        loader.add('helpButton', 'assets/helpButton.png');
        loader.add('exitButton', 'assets/exit.png');
        loader.add('buyButton', 'assets/buyButton.png');
        loader.add('restartButton', 'assets/restartButton.png');
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
        this.Buttons.on('restartClicked', () => {this.restartGame()})
        this.app.stage.addChild(this.Buttons);
        
        this.knightAnimations = new knightAnimations(this.app);
        this.golemAnimations = new golemAnimations(this);
        this.skeletonAnimations = new skeletonAnimations(this.app, this);
        this.orcAnimations = new orcAnimations(this.app, this);
        this.cyclopAnimations = new cyclopAnimations(this.app, this);
        
        //Currency Text
        this.currencyWord = new PIXI.Text('Coins: ', this.scoreStyle);
        this.currencyWord.x = this.app.screen.width * 0.06;
        this.currencyWord.y = this.app.screen.height * 0.18;
        this.app.stage.addChild(this.currencyWord);
        
        //Currency
        this.currencyText = new PIXI.Text(playerInstance.currency.toString(), this.scoreStyle);
        this.currencyText.x = this.app.screen.width * 0.17;
        this.currencyText.y = this.app.screen.height * 0.18;
        this.app.stage.addChild(this.currencyText);

        //Score Text
        this.scoreWord = new PIXI.Text('Score: ', this.scoreStyle);
        this.scoreWord.x = this.app.screen.width * 0.06;
        this.scoreWord.y = this.app.screen.height * 0.24;
        this.app.stage.addChild(this.scoreWord);
        
        //Score
        this.scoreText = new PIXI.Text(playerInstance.score.toString(), this.scoreStyle);
        this.scoreText.x = this.app.screen.width * 0.17;
        this.scoreText.y = this.app.screen.height * 0.24;
        this.app.stage.addChild(this.scoreText);

        this.app.stage.addChild(this.knightAnimations);
        this.app.stage.addChild(this.golemAnimations);
        this.app.stage.addChild(this.skeletonAnimations);
        this.app.stage.addChild(this.orcAnimations);
        this.app.stage.addChild(this.cyclopAnimations);
        this.skeletonAnimations.visible = false;
        this.orcAnimations.visible = false;
        this.cyclopAnimations.visible = false;

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
            scoreOnKill: 50
        });
        this.levels.push({
            monster: this.skeletonAnimations,
            monsterHealth: 5,
            maxHealth: 5,
            scoreOnKill: 100
        }); 
        this.levels.push({
            monster: this.orcAnimations,
            monsterHealth: 6,
            maxHealth: 6,
            scoreOnKill: 200
        });      
        this.levels.push({
            monster: this.cyclopAnimations,
            monsterHealth: 8,
            maxHealth: 8,
            scoreOnKill: 500
        });   
        this.welcomeText = new PIXI.Text('', this.HTPstyle);
        this.welcomeText.x = this.app.screen.width * 0.3;
        this.welcomeText.y = this.app.screen.height * 0.1;

        this.HTPtext = new PIXI.Text('', this.HTPstyle);
        this.HTPtext.x = this.app.screen.width * 0.3;
        this.HTPtext.y = this.app.screen.height * 0.35;

        this.uiBar = new uiBar(200, this.levels[this.level].maxHealth, this.levels[this.level].maxHealth, this.levels[this.level].monster.x * 0.9, (this.levels[this.level].monster.y  * 0.5 ) + 50 );
        this.app.stage.addChild(this.uiBar);

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
        this.container.addChild(this.shop);
        this.help();

        this.youWin = new PIXI.Sprite(this.app.loader.resources.winLogo.texture);
        this.youWin.width = this.app.screen.width * 0.5;
        this.youWin.height = this.app.screen.height * 0.2;
    }
    
    public pickMove(): void {
        let rand = Math.random() * 100;
        if (rand < this.attackPCT) {
            // Attack
            this.knightAnimations.attackAnimation();
            this.levels[this.level].monsterHealth = this.levels[this.level].monsterHealth - this.swordDamage;
            this.levels[this.level].monster.hurtAnimation();
            this.uiBar.setValue(this.levels[this.level].monsterHealth);
            if(this.levels[this.level].monsterHealth <= 0){
                this.isMonsterDead = true;
                this.levels[this.level].monster.deadAnimation();
                this.Buttons.resetButton.x = this.app.screen.width * 0.37;
                this.knightAnimations.testText.text = 'You Win!';
                this.app.stage.addChild(this.Buttons.goldenCoin);
                this.Buttons.goldenCoin.visible = true;
                this.Buttons.playGameButton.interactive = false;
                this.Buttons.playGameButton.buttonMode = false;
                this.Buttons.playGameButton.visible = false;
                this.Buttons.continueButton.visible = true;
                this.Buttons.resetButton.visible = true;
                if(this.level >= 3){
                    this.win()
                }
            }
        }
        else {
            this.knightAnimations.missAnimation();
        }

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
                this.Buttons.playGameButton.visible = false;
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
        playerInstance.score -= 70;
        this.levels[this.level].scoreOnKill * 0.5;
        this.scoreText.text = playerInstance.score.toString();
        this.container.visible = false;
        this.Buttons.playGameButton.interactive = true;

        this.scoreText.text = playerInstance.score.toString()
        this.Buttons.playGameButton.visible = true;
        this.Buttons.goldenCoin.interactive = true;
        this.Buttons.goldenCoin.x = this.Buttons.oldCords[0];
        this.Buttons.goldenCoin.y = this.Buttons.oldCords[1]
        this.isPlayerDead = false;
        this.isMonsterDead = false;
        this.attackPCT = 70;
        this.knightDamageCount = 0;
        this.golemAnimations.reset();
        this.skeletonAnimations.reset();
        this.orcAnimations.reset();
        this.cyclopAnimations.reset();
        this.knightAnimations.reset();
        this.hideScoreBoard();
        this.levels[this.level].monster.visible = false;
        this.level = 0;
        this.levels[this.level].monster.visible = true;
        this.uiBar.maxValue = this.levels[this.level].monsterHealth;
        this.uiBar.newMax(this.levels[this.level].monsterHealth);
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
        this.showStats()
        this.Buttons.upgradeButton.interactive = false;
        this.Buttons.helpButton.interactive = false;
        this.Buttons.resetButton.interactive = false;
        this.Buttons.continueButton.interactive = false;
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
        this.hideStats()
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
                this.currencyText.text = playerInstance.currency.toString();
                break;
            case 'health':
                this.playerHealth += 2;
                playerInstance.currency -= price;
                this.currencyText.text = this.currency.toString();
                break;
            default:
                break;
        }
    }
    
    public addCoin(): void{
        this.Buttons.goldenCoin;
        this.Buttons.resetButton.interactive = false;
        this.Buttons.continueButton.interactive = false;
        TweenLite.to(this.Buttons.goldenCoin, 1.8, {ease: Power2.easeIn, x: 150, y: 50, onComplete: ()=> {
            this.Buttons.goldenCoin.visible = false;
            this.Buttons.goldenCoin.x = this.Buttons.oldCords[0];
            this.Buttons.goldenCoin.y = this.Buttons.oldCords[1];
            this.Buttons.resetButton.interactive = true;
            this.Buttons.continueButton.interactive = true;
        }});
        playerInstance.currency += 100;
        this.currencyText.text = playerInstance.currency.toString();
        this.Buttons.goldenCoin.interactive = false;
    }

    public hideStats(): void{
        this.scoreText.visible = false;
        this.scoreWord.visible = false;
        this.currencyText.visible = false;
        this.currencyWord.visible = false;
    }

    public showStats(): void{
        this.scoreText.visible = true;
        this.scoreWord.visible = true;
        this.currencyText.visible = true;
        this.currencyWord.visible = true;
    }

    public continueGame(): void{
        this.isMonsterDead = false;
        this.Buttons.playGameButton.visible = true;
        this.Buttons.goldenCoin.x = this.Buttons.oldCords[0];
        this.Buttons.goldenCoin.y = this.Buttons.oldCords[1];
        this.Buttons.goldenCoin.interactive = true;
        this.knightDamageCount = 0;
        playerInstance.score = playerInstance.score + this.levels[this.level].scoreOnKill;
        this.scoreText.text = playerInstance.score.toString()
        this.levels[this.level].monster.visible = false;
        this.level++;

        this.uiBar.newMax(this.levels[this.level].monsterHealth);
        this.levels[this.level].monster.visible = true;
        this.uiBar.setValue(this.levels[this.level].monsterHealth);
        this.hideScoreBoard();
        this.increaseDifficulty();
    }

    public increaseDifficulty(): void{
        this.attackPCT =- 15;
        if (this.attackPCT < 40) {
            this.attackPCT = 40;
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

    public win(): void{
        playerInstance.score = playerInstance.score + this.levels[this.level].scoreOnKill;
        this.scoreText.text = playerInstance.score.toString()
        this.Buttons.helpButton.interactive = false;
        this.Buttons.exitButton.visible = false;
        this.shop.visible = false;
        this.container.visible = true;
        this.youWin.visible = true;
        this.Buttons.restartButton.visible = true;
        this.scoreText;

        this.graphics.lineStyle(20, 0xffffff, 1);
        this.graphics.beginFill(0x1586d1);
        this.graphics.drawRect(130, 50, 940, 500);
        this.graphics.endFill();
        this.youWin.x = this.app.screen.width * 0.215;
        this.youWin.y = this.app.screen.height * 0.12;
        this.scoreWord.x = this.app.screen.width * 0.36;
        this.scoreWord.y = this.app.screen.height * 0.32;
        this.scoreText.x = this.app.screen.width * 0.48;
        this.scoreText.y = this.app.screen.height * 0.32;
        this.currencyWord.x = this.app.screen.width * 0.36;
        this.currencyWord.y = this.app.screen.height * 0.38;
        this.currencyText.x = this.app.screen.width * 0.48;
        this.currencyText.y = this.app.screen.height * 0.38;
        this.Buttons.restartButton.x = this.app.screen.width * 0.47;
        this.Buttons.restartButton.y = this.app.screen.height * 0.67;
        this.Buttons.restartButton.width = 280;
        this.Buttons.restartButton.scale.y = this.Buttons.restartButton.scale.x;
        
        this.Buttons.playGameButton.interactive = false;

        this.container.addChild(this.Buttons.restartButton)
        this.container.addChild(this.youWin)
        this.container.addChild(this.scoreText)
        this.container.addChild(this.scoreWord)
        this.container.addChild(this.currencyText)
        this.container.addChild(this.currencyWord)
    }

    public restartGame(): void{
        playerInstance.score = 0;
        this.scoreText.text = playerInstance.score.toString()
        this.container.visible = false;
        this.youWin.visible = false;
        this.resetScorePosition();
        this.shop.visible = false;
    }

    public repositionButton(): void{
        this.Buttons.resetButton.x = this.app.screen.width * 0.43;
        this.Buttons.resetButton.y = this.app.screen.height * 0.05;
    }

    update(delta: number) : void {
        this.knightAnimations.update();
    }

    resetScorePosition(){
        this.currencyWord.x = this.app.screen.width * 0.06;
        this.currencyWord.y = this.app.screen.height * 0.18;
        this.currencyText.x = this.app.screen.width * 0.17;
        this.currencyText.y = this.app.screen.height * 0.18;
        this.scoreWord.x = this.app.screen.width * 0.06;
        this.scoreWord.y = this.app.screen.height * 0.24;
        this.scoreText.x = this.app.screen.width * 0.17;
        this.scoreText.y = this.app.screen.height * 0.24;

        this.app.stage.addChild(this.currencyText)
        this.app.stage.addChild(this.currencyWord)
        this.app.stage.addChild(this.scoreText)
        this.app.stage.addChild(this.scoreWord)

        this.currencyText.visible = true;
        this.currencyWord.visible = true;
        this.scoreText.visible = true;
        this.scoreWord.visible = true;

        this.container.visible = false;
        this.youWin.visible = false;
        this.resetGame()
    }
}