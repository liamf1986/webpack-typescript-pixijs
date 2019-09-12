import { Game } from "./game";
import { buttons } from './button'
import { playerInstance } from './player'

export class winGame extends PIXI.Container{

    private app: PIXI.Application;
    private Game: Game;
    private Buttons: buttons
    private graphics: PIXI.Graphics
    private winLogo: PIXI.Sprite
    private scoreText: PIXI.Text;
    private scoreNumber: PIXI.Text;
    private currencyText: PIXI.Text;
    private currencyNumber: PIXI.Text;
    public winContainer: PIXI.Container;
    private highscoreText: PIXI.Text;
    private playerHighscore: PIXI.Text;
    private highscore = localStorage.getItem('Score');

    constructor(app: PIXI.Application, game: Game){
        super()
        this.app = app;
        this.Game = game;

        this.winContainer = new PIXI.Container
        this.graphics = new PIXI.Graphics
        this.Buttons = new buttons(this.app);
        
        this.winLogo = new PIXI.Sprite(app.loader.resources.winLogo.texture);
        this.winLogo.width = this.app.screen.width * 0.3;
        this.winLogo.scale.y = this.winLogo.scale.x;
        this.winLogo.x = this.app.screen.width * 0.29;
        this.winLogo.y = this.app.screen.height * 0.12;
        
        this.currencyText = new PIXI.Text('Coins: ', this.Game.scoreStyle) ;
        this.currencyText.x = this.app.screen.width * 0.28;
        this.currencyText.y = this.app.screen.height * 0.46;
        
        this.scoreText = new PIXI.Text('Score: ', this.Game.scoreStyle);
        this.scoreText.x = this.app.screen.width * 0.28;
        this.scoreText.y = this.app.screen.height * 0.40;  
        
        this.highscoreText = new PIXI.Text( 'Highscore: ', this.Game.scoreStyle);
        this.highscoreText.x = this.app.screen.width * 0.28;
        this.highscoreText.y = this.app.screen.height * 0.34; 
        
        this.playerHighscore = new PIXI.Text(this.highscore, this.Game.scoreStyle);
        this.playerHighscore.x = this.app.screen.width * 0.48;
        this.playerHighscore.y = this.app.screen.height * 0.34; 

        this.scoreNumber = new PIXI.Text(playerInstance.score.toString(), this.Game.scoreStyle);
        this.scoreNumber.x = this.app.screen.width * 0.48;
        this.scoreNumber.y = this.app.screen.height * 0.40;
        
        this.currencyNumber = new PIXI.Text(playerInstance.currency.toString(), this.Game.scoreStyle);
        this.currencyNumber.x = this.app.screen.width * 0.48;
        this.currencyNumber.y = this.app.screen.height * 0.46;
        
        this.Buttons.restartButton.x = this.app.screen.width * 0.47;
        this.Buttons.restartButton.y = this.app.screen.height * 0.67;
        this.Buttons.restartButton.width = 280;
        this.Buttons.restartButton.scale.y = this.Buttons.restartButton.scale.x;
        this.Buttons.playGameButton.interactive = false;

        this.Buttons.on('restartClicked', () => {this.Game.restartGame()})
        
        this.app.stage.addChild(this.winContainer);
    }
    
    public win(): void{
        playerInstance.score = playerInstance.score + this.Game.levels[this.Game.level].scoreOnKill;
        this.scoreNumber.text = playerInstance.score.toString()

        this.currencyNumber.text = playerInstance.currency.toString()
        this.Buttons.helpButton.interactive = false;
        this.Buttons.restartButton.visible = true;
        this.winLogo.visible = true;
        this.scoreText;

        this.graphics.lineStyle(20, 0xffffff, 1);
        this.graphics.beginFill(0x1586d1);
        this.graphics.drawRect(130, 50, 940, 500);
        this.graphics.endFill();

        
        this.winContainer.addChild(this.graphics)
        this.winContainer.addChild(this.winLogo);
        this.winContainer.addChild(this.highscoreText)
        this.winContainer.addChild(this.currencyNumber);
        this.winContainer.addChild(this.currencyText);
        this.winContainer.addChild(this.scoreText);
        this.winContainer.addChild(this.scoreNumber);
        this.winContainer.addChild(this.Buttons.restartButton)
        if(playerInstance.score > Number(this.highscore)){
            this.winContainer.addChild(this.playerHighscore)
            localStorage.setItem('Score', playerInstance.score.toString())
        }
        else{
            console.log('Not high enough')
        }
    }
    
    public winBoardVisibilty(){
        this.winContainer.visible = false;
    }
}