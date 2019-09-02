import { uiBar } from './healthBar';
import { buttons } from './button';
import { knightAnimations } from './moves';
import { golemAnimations } from './golemMoves';
import { skeletonAnimations } from './skeletonView';

interface ILevel {
    monster: golemAnimations | skeletonAnimations;
    monsterHealth: number;
    maxHealth: number;
}

export class Game extends PIXI.Container{
    private levels: ILevel[];

    public level: number = 0; 
    protected idleFrames: PIXI.Texture[] = [];
    public chanceArray: string[] = [];
    private app: PIXI.Application;
    private background: PIXI.Sprite;
    private Buttons: buttons;
    private knightAnimations: knightAnimations;
    private golemAnimations: golemAnimations;
    private skeletonAnimations: skeletonAnimations;
    private uiBar: uiBar;
    private knightDamageCount: number = 0;
    private attackPCT: number = 70;
    private playerHealth: number = 4;

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
        loader.add('skeleton', 'assets/skeleton.png');
        loader.add('background', 'assets/background.png');

        //Buttons
        loader.add('playButton', 'assets/playButton1.png');
        loader.add('resetButton', 'assets/resetButton.png');
        loader.add('continueButton', 'assets/continueBtn.png')

        //Health Bars
        loader.add('fullBar', 'assets/healthBarFull.png');
        loader.add('mediumBar', 'assets/healthBarAbout.png');
        loader.add('lowBar', 'assets/healthBarAlmost.png');
        loader.add('emptyBar', 'assets/healthBarDead.png');
    }
    
    startGame(){
        //Background
        this.background = new PIXI.Sprite(this.app.loader.resources.background.texture);
        this.background.width = this.app.screen.width;
        this.background.height = this.app.screen.height;
        this.app.stage.addChild(this.background);
        
        //Play button
        this.Buttons = new buttons(this.app);
        this.Buttons.on('resetClicked', () => {this.resetButtonClick()});
        this.Buttons.on('playButtonClick', () => {this.playButtonClick()});
        this.Buttons.on('continueGame', () => {this.continueGame()});
        this.app.stage.addChild(this.Buttons);

        //UI Bar
        this.uiBar = new uiBar(200, 4, 4, 900,280);
        this.app.stage.addChild(this.uiBar);
    
        this.knightAnimations = new knightAnimations(this.app);
        this.golemAnimations = new golemAnimations(this.app);
        this.skeletonAnimations = new skeletonAnimations(this.app);
        
        this.app.stage.addChild(this.knightAnimations);
        this.app.stage.addChild(this.golemAnimations)
        this.app.stage.addChild(this.skeletonAnimations)
        this.skeletonAnimations.visible = false;

        this.levels = [];
        this.levels.push({
            monster: this.golemAnimations,
            monsterHealth: 4,
            maxHealth: 4
        });
        this.levels.push({
            monster: this.skeletonAnimations,
            monsterHealth: 5,
            maxHealth: 5
        });
    }

    pickMove(): void {
        let rand = Math.random() * 100;
        if (rand < this.attackPCT) {
            // Attack
            this.knightAnimations.attackAnimation();
            this.levels[this.level].monsterHealth--;
            this.levels[this.level].monster.hurtAnimation();
            this.uiBar.setValue(this.levels[this.level].monsterHealth);
            if(this.levels[this.level].monsterHealth <= 0){
                this.levels[this.level].monster.deadAnimation();
                this.Buttons.resetButton.x = this.app.screen.width * 0.37;
                this.knightAnimations.testText.text = 'You Win!'
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
                this.repositionButton();
                this.knightAnimations.deadAnimation();
                this.Buttons.playGameButton.interactive = false;
                this.Buttons.playGameButton.buttonMode = false;
                this.knightAnimations.testText.text = 'Defeat!';
                this.Buttons.resetButton.visible = true;
            }
        }
    }
    
    resetGame(){
        this.levels.forEach((level) => {
            level.monsterHealth = level.maxHealth;
        });
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

    playButtonClick() {
        this.pickMove();
    }

    resetButtonClick() {
        this.resetGame();
    }

    continueGame(){
        this.knightDamageCount = 0;
        this.levels[this.level].monster.visible = false;
        this.level++;
        this.levels[this.level].monster.visible = true;
        this.uiBar.setValue(this.levels[this.level].monsterHealth);
        this.hideScoreBoard();
        this.increaseDifficulty();
    }

    increaseDifficulty(){
        this.attackPCT =- 10;
        if (this.attackPCT < 30) {
            this.attackPCT = 30;
        }
    }

    hideScoreBoard(){
        this.knightAnimations.testText.text = '';
        this.Buttons.resetButton.visible = false;
        this.Buttons.continueButton.visible = false;
        this.Buttons.playGameButton.interactive = true;
        this.Buttons.playGameButton.buttonMode = true;
    }

    repositionButton(){
        this.Buttons.resetButton.x = this.app.screen.width * 0.445;
        this.Buttons.resetButton.y = this.app.screen.height * 0.05;
    }

    setPositions(width: number, height: number) : void {
        
    }

    update(delta: number) : void {
        this.knightAnimations.update(delta);
    }
    /**
     * Called when the window detects a resize
     * @param app The Application instance to be used for this game
     * IMPORTANT: This is currently never called, see index.ts
     */
    onResize(app: PIXI.Application) : void {
        this.setPositions(app.screen.width, app.screen.height);
    }
}