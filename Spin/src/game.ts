import { app } from './application'
import { baseReel } from './baseReel'
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
    private reelIcons: PIXI.Texture[] = [];
    private background: PIXI.Sprite;
    private maskContainer: PIXI.Container;
    private maskGraphics: PIXI.Graphics;


    constructor(){
        super();
        this.maskContainer = new PIXI.Container();
        this.maskContainer.name = 'Mask Container';
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
        this.background = new PIXI.Sprite(app.loader.resources.background.texture);
        this.background.width = app.screen.width;
        this.background.height = app.screen.height;
        app.stage.addChild(this.background);
        this.BottomMenu = new bottomMenu()
        this.maskGraphics = new Graphics();
        this.maskContainer = new Container()
        
        this.reel1 = new reelOne();
        this.reel2 = new reelTwo();
        this.reel3 = new reelThree();
        
        this.maskContainer.x = 0;
        this.maskContainer.y = 0;
        //this.maskContainer.width = 400
        //this.maskContainer.height = 340

        
        
        
        for(let i = 0; i < 5; i++){
            this.reelIcons.push(PIXI.Texture.from('icon' + (i + 1)));
        }
        this.maskContainer.addChild(this.reel1);
        this.maskContainer.addChild(this.reel2);
        this.maskContainer.addChild(this.reel3);

        this.maskGraphics.lineStyle(0);
        this.maskGraphics.beginFill(0xDE3249);
        this.maskGraphics.drawRect(app.screen.width * 0.28, app.stage.height * -0.2 + 175, this.maskContainer.width, 525);
        this.maskGraphics.endFill();
        app.stage.addChild(this.maskContainer);
        this.maskContainer.addChild(this.maskGraphics);
        this.maskContainer.mask = this.maskGraphics
    }


    update(delta: number): void {
        this.reel1.update(delta);
        this.reel2.update(delta);
        this.reel3.update(delta);
    }
}