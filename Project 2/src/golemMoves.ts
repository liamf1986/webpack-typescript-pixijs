import { Game } from "./game";
import { knightAnimations } from './moves'
import {TweenLite, Elastic} from "gsap";

export class golemAnimations extends PIXI.Container{
    private app: PIXI.Application;
//Idle Golem Var
    protected idleFrames: PIXI.Texture[] = [];
    public idleAnim: PIXI.extras.AnimatedSprite;
//Attack Golem Var
    private attackGolemFrames: PIXI.Texture[] = [];
    private attackGolemAnim: PIXI.extras.AnimatedSprite;
//Dead Golem Var
    private deadGolemFrames: PIXI.Texture[] = [];
    public deadGolemAnim: PIXI.extras.AnimatedSprite;

    constructor(app: PIXI.Application){
        super()
        this.app = app

        // //Animated Dead Golem Attack
        for(let i=0; i<5; i++){
            this.deadGolemFrames.push(PIXI.Texture.fromFrame('GolemDead' + (i + 1) + '@2x.png'));
        }
        this.deadGolemAnim = new PIXI.extras.AnimatedSprite(this.deadGolemFrames);
        this.deadGolemAnim.visible = false;
        this.addChild(this.deadGolemAnim);
        
        //Animated Golem Attack
        for(let i=0; i<7; i++){
            this.attackGolemFrames.push(PIXI.Texture.fromFrame('GolemAttack' + (i + 1) + '@2x.png'));
        }
        this.attackGolemAnim = new PIXI.extras.AnimatedSprite(this.attackGolemFrames);
        this.attackGolemAnim.visible = false;
        this.addChild(this.attackGolemAnim);

        //Animated Golem Idle Sprite
        for(let i=0; i<6; i++){
            this.idleFrames.push(PIXI.Texture.fromFrame('GolemIdle' + (i + 1) + '@2x.png'));
        }
        
        this.idleAnim = new PIXI.extras.AnimatedSprite(this.idleFrames);
        this.addChild(this.idleAnim);
        this.idleAnim.loop = true;
        
        this.width = this.app.screen.width * 0.5;
        this.scale.y = this.scale.x
        this.x = 1320 - this.width * 0.5;
        this.y = 700 - this.height * 0.5;
        this.scale.x = -this.scale.x
        this.attackGolemAnim.animationSpeed = 0.16;
        this.idleAnim.animationSpeed = 0.16;
        
        this.idleAnim.anchor.set(0.5);
        
        
        this.idleAnim.play();
        
        this.attackGolemAnim.onComplete = () => {
            this.attackGolemAnim.visible = false;
            this.idleAnim.visible = true;
        }

        this.deadGolemAnim.onComplete = () => {
            this.deadGolemAnim.visible = true;
            this.idleAnim.visible = false;
        }
    }
    
    attackAnimation(){
        console.log('the golem attacked')
        this.attackGolemAnim.position.x = -670;
        this.attackGolemAnim.position.y = -600;
        this.attackGolemAnim.loop = false;
        this.attackGolemAnim.visible = true;
        this.idleAnim.visible = false;
        this.attackGolemAnim.gotoAndPlay(0)
        TweenLite.to(this.attackGolemAnim, 1, {x: -600, y: -600});

    }

    hurtAnimation() {
        this.idleAnim.tint = 0xa83232;
        const oldCords:number[] = [this.x, this.y];
        TweenLite.to(this, 1, {x: oldCords[0]+20, y: oldCords[1]+5, ease: Elastic.easeOut.config(2.5, 0.3), onComplete: ()=> {
            this.idleAnim.tint = 0xFFFFFF;
            this.x = oldCords[0];
            this.y = oldCords[1];
        }});
    }

    missAnimation(){
        this.attackGolemAnim.position.x = -670;
        this.attackGolemAnim.position.y = -600;
        this.attackGolemAnim.loop = false;
        this.attackGolemAnim.visible = true;
        this.idleAnim.visible = false;
        this.attackGolemAnim.gotoAndPlay(0)
    }

    deadAnimation(){
        this.deadGolemAnim.position.x = -670;
        this.deadGolemAnim.position.y = -600;
        this.deadGolemAnim.loop = false;
        this.deadGolemAnim.visible = true;
        this.idleAnim.visible = false;
        this.deadGolemAnim.gotoAndPlay(0)

    }

    public reset(): void {
        this.deadGolemAnim.visible = false;
        this.attackGolemAnim.visible = false;
        this.idleAnim.visible = true;
    }
    
}