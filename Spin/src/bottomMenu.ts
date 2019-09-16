import {app} from './application';
import {baseReel} from './baseReel';

export class bottomMenu{

    public buyButton: PIXI.Sprite;
    public plusIcon: PIXI.Sprite;    
    public minusIcon: PIXI.Sprite;
    public buyInArray: number[] = []
    public buyInText: PIXI.Text;
    public buyInStake: PIXI.Text;
    public index: number = 0; 
    
    private style = new PIXI.TextStyle({
        fill: "#d7dbd9",
        fillGradientStops: [
            100
        ],
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 54,
        stroke: "#db7dbd9"
    });
    
    constructor(){
        this.buyButton = new PIXI.Sprite(app.loader.resources.buyButton.texture);
        this.minusIcon = new PIXI.Sprite(app.loader.resources.minusIcon.texture);
        this.plusIcon = new PIXI.Sprite(app.loader.resources.plusIcon.texture);
        this.buyInText = new PIXI.Text('', this.style);
        this.buyInStake = new PIXI.Text('Stake: ', this.style);


        for(let i = 0; i < 10; i++){
            this.buyInArray.push( i * 5 )
        }
        
        this.buyButton.width = 125
        this.buyButton.height = 125;
        
        this.buyButton.anchor.set(0.5)
        this.buyButton.x = app.stage.width * 0.5;
        this.buyButton.y = app.stage.height * 0.9
        
        this.buyButton.buttonMode = true;
        this.buyButton.interactive = true;
        this.buyButton.on('pointerdown', () => {
            this.buyButton.emit('spinReels');
        })

        this.buyInText.anchor.set(0.5);
        this.buyInText.x = app.stage.width * 0.22;
        this.buyInText.y = app.stage.height * 0.9;

        this.buyInStake.anchor.set(0.5);
        this.buyInStake.x = app.stage.width * 0.1;
        this.buyInStake.y = app.stage.height * 0.9;
        
        this.plusIcon.width = 80;
        this.plusIcon.height = 80;
        
        this.plusIcon.anchor.set(0.5);
        this.plusIcon.x = app.stage.width * 0.575;
        this.plusIcon.y = app.stage.height * 0.91;
        
        this.plusIcon.buttonMode = true;
        this.plusIcon.interactive = true;
        this.plusIcon.on('pointerdown', () => {
            this.buyInText.text = '£' + this.buyInArray[this.index += 1].toString(), this.style;
        })
        
        this.minusIcon.width = 80;
        this.minusIcon.height = 80;
        
        this.minusIcon.anchor.set(0.5);
        this.minusIcon.x = app.stage.width * 0.42;
        this.minusIcon.y = app.stage.height * 0.9;
        
        this.minusIcon.buttonMode = true;
        this.minusIcon.interactive = true;
        this.minusIcon.on('pointerdown', () => {
            this.buyInText.text = '£' + this.buyInArray[this.index -=1].toString(), this.style
        })
        
        app.stage.addChild(this.buyInText);
        app.stage.addChild(this.buyInStake)
        app.stage.addChild(this.buyButton);
        app.stage.addChild(this.plusIcon);
        app.stage.addChild(this.minusIcon);
    }

    spin(){
    }
}