import { baseReel } from './baseReel'
import { app } from './application'


export class reelThree extends baseReel{
    
    constructor(){
        super(2, app.screen.width * 0.6, app.stage.height * -0.2)
    }
}