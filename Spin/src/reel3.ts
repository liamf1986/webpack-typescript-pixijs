import { baseReel } from './baseReel'
import { app } from './application'


export class reelThree extends baseReel{
    
    constructor(reelData: number[]){
        super(2, app.screen.width * 0.6, app.stage.height * -0.2, reelData)
    }

    protected endSpin(): void {
        super.endSpin();
        this.emit('gameEnded')
        console.log('reel 3 spin ended')
    }

}