import { app } from "./application";
import {bottomMenu} from './bottomMenu'
// import { reelOne } from './reel1';
// import { reelTwo } from './reel2';
// import { reelThree } from './reel3';

export class baseReel extends PIXI.Container{
    private reelId: number;
    private bottomMenu: bottomMenu
    private iconSize: number =  175;
    private reelIcons: PIXI.Texture[] = [];
    private spriteReel: PIXI.Sprite[] = [];
    public icon: PIXI.Sprite;
    public spinning: boolean = false;
    private spawnPosition: number;
    private offScreenPoint: number;

    constructor(id: number, x: number, y: number){
        super()

        this.reelId = id;
        

        for(let i = 0; i < 8; i++){
            this.reelIcons.push(app.loader.resources['icon' + (i + 1)].texture);
        }
        
        this.spawnPosition = y;
        this.offScreenPoint = y + 4 * this.iconSize;
        for(let i = 0; i < 4; i++){
            this.icon = new PIXI.Sprite(this.reelIcons[Math.floor(Math.random() * this.reelIcons.length)]);
            this.icon.y = y + (i * this.iconSize);
            this.icon.width = this.icon.height = this.iconSize;
            //this.icon.scale.x = this.icon.scale.y = Math.min(this.iconSize / this.icon.width, this.iconSize / this.icon.height);
            this.icon.x =  x + Math.round((this.iconSize - this.icon.width) / 2);
            this.spriteReel.push(this.icon);
            this.addChild(this.icon);
        }
    }

    update(delta: number): void {
        if (this.spinning = false){
            this.spriteReel.forEach(icon => {
                icon.y += 15 * delta;
                if (icon.y >= this.offScreenPoint) {
                    icon.y -= this.offScreenPoint - (this.spawnPosition);
                }
            });
        }
        else{
        }

    }
}