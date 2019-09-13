import { baseReel } from './baseReel'
import { app } from './application'


export class reelOne extends baseReel{
    
    private reel1Container = new PIXI.Container;
    
    constructor(reelData: number[]){
        super(0, app.screen.width * 0.28, app.stage.height * -0.2, reelData)

        app.stage.addChild(this.reel1Container)
    }
}