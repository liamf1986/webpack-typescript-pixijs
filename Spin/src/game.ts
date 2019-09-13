import { app } from './application'
import { reelOne } from './reel1';
import { reelTwo } from './reel2';
import { reelThree } from './reel3';
import { bottomMenu } from './bottomMenu'
import { Graphics, Container } from 'pixi.js';

export class Game extends PIXI.Container{
    public reel1: reelOne;
    public reel2: reelTwo;
    public reel3: reelThree;
    public BottomMenu: bottomMenu;
    private _background: PIXI.Sprite;
    private _maskContainer: PIXI.Container;
    private _maskGraphics: PIXI.Graphics;

    private _reels: number[][] = [[1,2,3,4,5,6,7,8],[2,4,6,8,1,3,5,7],[7,1,4,3,2,6,5,8]]

    private _winLine = [ 
        [-1,-1,1],[1,1,1],[2,2,2],[1,2,3],[3,2,1]
    ]


    constructor(){
        super();
        this._maskContainer = new PIXI.Container();
        this._maskContainer.name = 'Mask Container';
        console.log(this._winLine)
    }
    
    public load(loader: PIXI.loaders.Loader) : void {
        //Sprites (png)
        loader.add('icon1', 'assets/icons/7Spin.png');
        loader.add('icon2', 'assets/icons/barSpin.png');
        loader.add('icon3', 'assets/icons/cherrySpin.png');
        loader.add('icon4', 'assets/icons/fruitSpin.png');
        loader.add('icon5', 'assets/icons/bannaSpin.png');
        loader.add('icon6', 'assets/icons/orangeSpin.png');
        loader.add('icon7', 'assets/icons/winSpin.png');
        loader.add('icon8', 'assets/icons/lemonSpin.png');
        loader.add('buyButton', 'assets/buyIcon.png');
        loader.add('plusIcon', 'assets/plusIcon.png');
        loader.add('minusIcon', 'assets/minusIcon.png');
        loader.add('background', 'assets/background3.jpg');
    }
    
    startGame(){
        this._background = new PIXI.Sprite(app.loader.resources.background.texture);
        this._background.width = app.screen.width;
        this._background.height = app.screen.height;
        app.stage.addChild(this._background);
        this.BottomMenu = new bottomMenu()
        this._maskGraphics = new Graphics();
        this._maskContainer = new Container()
        
        this.reel1 = new reelOne(this._reels[0]);
        this.reel2 = new reelTwo(this._reels[1]);
        this.reel3 = new reelThree(this._reels[2]);
        this.reel3.on('gameEnded', () => {
            this.checkWin()//this._winLine
        })
        
        this._maskContainer.x = 0;
        this._maskContainer.y = 0;

        this.BottomMenu.buyButton.on('spinReels', () => {
            this.reel1.startSpin();
            this.reel2.startSpin();
            this.reel3.startSpin();
        })
        
        this._maskContainer.addChild(this.reel1);
        this._maskContainer.addChild(this.reel2);
        this._maskContainer.addChild(this.reel3);

        this._maskGraphics.lineStyle(0);
        this._maskGraphics.beginFill(0xDE3249);
        this._maskGraphics.drawRect(app.screen.width * 0.28, app.stage.height * -0.2 + 175, this._maskContainer.width, 525);
        this._maskGraphics.endFill();
        app.stage.addChild(this._maskContainer);
        this._maskContainer.mask = this._maskGraphics
    }

    public checkWin(){
        if(this._reels[0][this.reel1.result] === this._winLine[0][0] &&
            this._reels[1][this.reel2.result] === this._winLine[0][1] &&
            this._reels[2][this.reel3.result] === this._winLine[0][2] ||

            this._reels[0][this.reel1.result] === this._winLine[1][0] &&
            this._reels[1][this.reel2.result] === this._winLine[1][1] &&
            this._reels[2][this.reel3.result] === this._winLine[1][2] ||

            this._reels[0][this.reel1.result] === this._winLine[2][0] &&
            this._reels[1][this.reel2.result] === this._winLine[2][1] &&
            this._reels[2][this.reel3.result] === this._winLine[2][2]){
            
            
            console.log(':)')
        }
    }

    update(delta: number): void {
        this.reel1.update(delta);
        this.reel2.update(delta);
        this.reel3.update(delta);
    }
}