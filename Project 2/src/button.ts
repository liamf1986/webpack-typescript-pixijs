import { Game } from './game';
import { knightAnimations } from './moves'

export class buttons extends PIXI.Container{
    
    public playGameButton: PIXI.Sprite;
    public resetButton: PIXI.Sprite;
    public continueButton: PIXI.Sprite;
    private app: PIXI.Application;

    constructor(app: PIXI.Application){
        super()
        this.playGameButton = new PIXI.Sprite(app.loader.resources.playButton.texture)
        this.resetButton = new PIXI.Sprite(app.loader.resources.resetButton.texture)
        this.continueButton = new PIXI.Sprite(app.loader.resources.continueButton.texture);
        this.app = app;


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
        
    }

}