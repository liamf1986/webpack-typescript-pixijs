import { baseReel } from './baseReel'
import { app } from './application'


export class reelTwo extends baseReel{
    
    constructor(){
        super(1, app.screen.width * 0.44, app.stage.height * -0.2)
    }
}