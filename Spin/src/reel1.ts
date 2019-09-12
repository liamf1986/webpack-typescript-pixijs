import { baseReel } from './baseReel'
import { app } from './application'


export class reelOne extends baseReel{
    
    private reel1Container = new PIXI.Container;
    
    constructor(){
        super(0, app.screen.width * 0.28, app.stage.height * -0.2)

        app.stage.addChild(this.reel1Container)
    }
}