export class buttons extends PIXI.Container {
    //private Game = new Game();
    constructor(){
        super();
    }

    resize(): void {
    }


    button(app: PIXI.Application){
        var button = new PIXI.Sprite(app.loader.resources.reset.texture);
        this.addChild(button);
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', () => {
            this.emit('resetEvent');
            //this.Game.resetGame(app);
        })
        button.width = 200;
        button.height = 100;
    }

    htp(app: PIXI.Application){
        var htpButton = new PIXI.Sprite(app.loader.resources.howToPlayButton.texture);
        this.addChild(htpButton);
        htpButton.interactive = true;
        htpButton.buttonMode = true;
        htpButton.anchor.set(0.5);
        htpButton.width = 90;
        htpButton.height = 90;
        htpButton.x = 1180;
        htpButton.y = 72;
        htpButton.on('pointerdown', () =>{
            this.help(app);
        })
    }

    help(app: PIXI.Application): void{
        var container = new PIXI.Container();
        this.addChild(container);
    }
}