import { uiBar } from './healthBar';
import { buttons } from './button';
import { knightAnimations } from './moves';
import { golemAnimations } from './golemMoves';
import { skeletonAnimations } from './skeletonView';
import { TweenLite, Power2, Power1 } from 'gsap';
import { playerInstance } from './player';
import { orcAnimations } from './orcView';
import { cyclopAnimations } from './cyclopsView';
import { winGame } from './win'
import { HowToPlay } from './howToPlay';
import { Upgrades } from './upgrades';

interface ILevel {
    monster: golemAnimations | skeletonAnimations | orcAnimations | cyclopAnimations;
    monsterHealth: number;
    maxHealth: number;
    scoreOnKill: number;
}

export class Game extends PIXI.Container{
    public levels: ILevel[];
    protected idleFrames: PIXI.Texture[] = [];
    public chanceArray: string[] = [];
    public app: PIXI.Application;
    private Buttons: buttons;
    private knightAnimations: knightAnimations;
    private golemAnimations: golemAnimations;
    private skeletonAnimations: skeletonAnimations;
    private orcAnimations: orcAnimations;
    private cyclopAnimations: cyclopAnimations;
    private uiBar: uiBar;
    private winGame: winGame;
    private background: PIXI.Sprite;
    private knightDamageCount: number = 0;
    //private playerInstance.attackPCT: number = 80;
    public level: number = 0; 
    public currencyText: PIXI.Text;
    private scoreText: PIXI.Text;
    private scoreWord: PIXI.Text;
    private currencyWord: PIXI.Text
    public helpPopup: HowToPlay;
    public upgradePopup: Upgrades;
    public isMonsterDead: boolean = false;
    public isPlayerDead: boolean = false;

    public scoreStyle = new PIXI.TextStyle({
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
        //Animation Files
        loader.add('golemSheet', 'assets/golem-0.json');
        loader.add('golemSheet1', 'assets/golem-1.json');
        loader.add('golemSheet2', 'assets/golem-2.json');
        loader.add('golemSheet3', 'assets/golem-3.json');
        loader.add('knight', 'assets/knight.json');
        loader.add('skeletonJson', 'assets/skeleton.json');
        loader.add('orcJson', 'assets/orc.json');
        loader.add('cyclopsJson', 'assets/cyclops-0.json');
        loader.add('cyclopsJson1', 'assets/cyclops-1.json');
        //Background and Container Images
        loader.add('background', 'assets/background2.jpg');
        loader.add('icon', 'assets/icon.png');
        loader.add('coin', 'assets/goldenCoin.png');
        loader.add('winLogo', 'assets/youWin.png');
        //Upgrades
        loader.add('sword','assets/swordUpgrade.png');
        loader.add('health','assets/pixelHeart.png');
        loader.add('shield','assets/luckSprite.png');
        loader.add('gameAudio', 'assets/gameAudio.mp3')
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

        //Play button
        this.Buttons = new buttons(this.app);
        this.Buttons.on('resetClicked', () => {this.resetGame()});
        this.Buttons.on('playButtonClick', () => {this.pickMove()});
        this.Buttons.on('continueGame', () => {this.continueGame()});
        this.Buttons.on('helpClicked', () => {this.showHelp()});
        this.Buttons.on('coinClicked', () => {this.addCoin()});
        this.Buttons.on('upgradeClicked', () => {this.upgrade()});
        this.app.stage.addChild(this.Buttons);
        
        this.knightAnimations = new knightAnimations(this.app);
        this.golemAnimations = new golemAnimations(this);
        this.orcAnimations = new orcAnimations(this.app, this);
        this.skeletonAnimations = new skeletonAnimations(this.app, this);
        this.cyclopAnimations = new cyclopAnimations(this.app, this);
        this.winGame = new winGame(this.app, this)
        
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
        this.app.stage.addChild(this.winGame);
        this.skeletonAnimations.visible = false;
        this.orcAnimations.visible = false;
        this.cyclopAnimations.visible = false;

        this.helpPopup = new HowToPlay();
        this.upgradePopup = new Upgrades();
        
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

        this.uiBar = new uiBar(200, this.levels[this.level].maxHealth, this.levels[this.level].maxHealth, this.levels[this.level].monster.x * 0.9, (this.levels[this.level].monster.y  * 0.5 ) + 50 );
        this.app.stage.addChild(this.uiBar);
        this.app.stage.addChild(this.helpPopup);
        this.app.stage.addChild(this.upgradePopup);
        this.showHelp();
        this.app.stage.addChild(this.winGame.winContainer)
        this.winGame.winBoardVisibilty()

        this.helpPopup.on('popupclosed',() => {this.exitUI()});
        this.upgradePopup.on('popupclosed',() => {this.exitUI()});

        this.playAudio();
    }

    public playAudio(): void{
        let backgroundMusic = new Audio();
        backgroundMusic.src = 'assets/gameAudio.mp3';
        backgroundMusic.load();
        backgroundMusic.play();
    }
    
    public pickMove(): void {
        let rand = Math.random() * 100;
        if (rand < playerInstance.attackPCT) {
            // Attack
            console.log(playerInstance.playerHealth)
            this.knightAnimations.attackAnimation();
            this.levels[this.level].monsterHealth = this.levels[this.level].monsterHealth - playerInstance.swordDamage;
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
                    this.winGame.winContainer.visible = true;
                    this.winGame.win()
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
            if(this.knightDamageCount >= playerInstance.playerHealth){
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
        playerInstance.attackPCT = 70;
        this.Buttons.playGameButton.interactive = true;
        this.Buttons.playGameButton.visible = true;
        this.Buttons.goldenCoin.interactive = true;
        this.Buttons.goldenCoin.x = this.Buttons.oldCords[0];
        this.Buttons.goldenCoin.y = this.Buttons.oldCords[1]
        this.isPlayerDead = false;
        this.isMonsterDead = false;
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
        this.Buttons.upgradeButton.interactive = true;
        this.Buttons.helpButton.interactive = true;
        this.Buttons.resetButton.interactive = true;
        this.Buttons.continueButton.interactive = true;

        if(this.isMonsterDead || this.isPlayerDead){
            this.Buttons.playGameButton.interactive = false;
        }
        else {
            this.Buttons.playGameButton.interactive = true;
        }
    }

    public showHelp():void{
        this.helpPopup.show();

        this.Buttons.resetButton.interactive = false;
        this.Buttons.continueButton.interactive = false;
        this.Buttons.upgradeButton.interactive = false;
        this.Buttons.playGameButton.interactive = false;
        this.Buttons.helpButton.interactive = false;
    }
    public upgrade(): void{
        this.upgradePopup.show();
        this.Buttons.playGameButton.interactive = false;
        this.Buttons.helpButton.interactive = false;
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
            playerInstance.currency += 100;
        }});
        this.Buttons.goldenCoin.interactive = false;
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
        playerInstance.attackPCT -= 15;
        if (playerInstance.attackPCT < 40) {
            playerInstance.attackPCT = 40;
        }
    }

    public hideButtons(): void{
        this.Buttons.resetButton.interactive = false;
        this.Buttons.continueButton.interactive = false;
        this.Buttons.upgradeButton.interactive = false;
    }

    public hideScoreBoard(): void{
        this.knightAnimations.testText.text = '';
        this.Buttons.resetButton.visible = false;
        this.Buttons.continueButton.visible = false;
        this.Buttons.playGameButton.interactive = true;
        this.Buttons.playGameButton.buttonMode = true;
        this.Buttons.goldenCoin.visible = false;
    }

    public restartGame(): void{
        playerInstance.resetStats()
        this.levels[this.level].maxHealth = this.levels[this.level].monsterHealth;
        playerInstance.attackPCT = 80;
        this.scoreText.text = playerInstance.score.toString()
        this.winGame.winContainer.visible = false;
        this.resetGame();
    }

    public repositionButton(): void{
        this.Buttons.resetButton.x = this.app.screen.width * 0.43;
        this.Buttons.resetButton.y = this.app.screen.height * 0.05;
    }

    update(delta: number) : void {
        this.knightAnimations.update();
        this.currencyText.text = playerInstance.currency.toString();
    }
}