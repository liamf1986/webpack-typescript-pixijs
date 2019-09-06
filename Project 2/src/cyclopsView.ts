import { Game } from "./game";
import { knightAnimations } from './moves'
import {TweenLite, Elastic} from "gsap";
import strings from "./strings";

export class cyclopAnimations extends PIXI.Container{
    private app: PIXI.Application;
    //Idle Cyclops Var
    protected idleCyclopsFrames: PIXI.Texture[] = [];
    public idleCyclopsAnim: PIXI.extras.AnimatedSprite;
    //Attack Cyclops Var
    private attackCyclopsFrames: PIXI.Texture[] = [];
    private attackCyclopsAnim: PIXI.extras.AnimatedSprite;
    //Dead Cyclops Var
    private deadCyclopsFrames: PIXI.Texture[] = [];
    public deadCyclopsAnim: PIXI.extras.AnimatedSprite;
    private Game: Game;
    
    constructor(app: PIXI.Application, game: Game){
        super()
        this.app = app;
        this.Game = game;
                    
        for(let i=0; i<5; i++){
            this.deadCyclopsFrames.push(PIXI.Texture.fromFrame('cyclopsdead' + (i + 1) + '.png'));
        }
        this.deadCyclopsAnim = new PIXI.extras.AnimatedSprite(this.deadCyclopsFrames);
        this.deadCyclopsAnim.visible = false;
        this.addChild(this.deadCyclopsAnim);
        
        //Animated Golem Attack
        for(let i=0; i<9; i++){
            this.attackCyclopsFrames.push(PIXI.Texture.fromFrame('cyclopsattack' + (i + 1) + '.png'));
        }
        this.attackCyclopsAnim = new PIXI.extras.AnimatedSprite(this.attackCyclopsFrames);
        this.attackCyclopsAnim.visible = false;
        this.addChild(this.attackCyclopsAnim);

        //Animated Cyclops Idle Sprite
        for(let i=0; i<6; i++){
            this.idleCyclopsFrames.push(PIXI.Texture.fromFrame('cyclopsidle' + (i + 1) + '.png'));
        }
        
        this.idleCyclopsAnim = new PIXI.extras.AnimatedSprite(this.idleCyclopsFrames);
        this.addChild(this.idleCyclopsAnim);
        this.idleCyclopsAnim.loop = true;
        
        this.width = this.app.screen.width * 0.45;
        this.scale.y = this.scale.x
        this.x = 1230;
        this.y = 645 - this.height;
        this.scale.x = -this.scale.x
        this.attackCyclopsAnim.animationSpeed = 0.16;
        this.idleCyclopsAnim.animationSpeed = 0.16;
        
        this.idleCyclopsAnim.play();
        
        this.attackCyclopsAnim.onComplete = () => {
            if(this.Game.levels[this.Game.level].monsterHealth <= 0){
                this.Game.levels[this.Game.level].monster.deadAnimation();
                this.visableAnimationState(this.deadCyclopsAnim)
                this.deadCyclopsAnim.gotoAndPlay(0)
            }
            else{
                this.attackCyclopsAnim.visible = false;
                this.idleCyclopsAnim.visible = true;
            }
        }

        this.deadCyclopsAnim.onComplete = () => {
            this.deadCyclopsAnim.visible = true;
            this.idleCyclopsAnim.visible = false;
        }
    }

    
    attackAnimation(){
        if(this.Game.levels[this.Game.level].monsterHealth <= 0){
            this.Game.levels[this.Game.level].monster.deadAnimation();
            this.visableAnimationState(this.deadCyclopsAnim)
            this.deadCyclopsAnim.gotoAndPlay(0)
        }
        else{
            this.attackCyclopsAnim.loop = false;
            this.attackCyclopsAnim.visible = true;
            this.idleCyclopsAnim.visible = false;
            this.attackCyclopsAnim.gotoAndPlay(0)
        }
    }

    hurtAnimation() {
        this.idleCyclopsAnim.tint = 0xa83232;
        const oldCords:number[] = [this.x, this.y];
        TweenLite.to(this, 1, {x: oldCords[0]+20, y: oldCords[1]+5, ease: Elastic.easeOut.config(2.5, 0.3), onComplete: ()=> {
            this.idleCyclopsAnim.tint = 0xFFFFFF;
            this.x = oldCords[0];
            this.y = oldCords[1];
        }});
    }

    deadAnimation(){
        this.deadCyclopsAnim.loop = false;
        this.deadCyclopsAnim.visible = true;
        this.idleCyclopsAnim.visible = false;
        this.deadCyclopsAnim.gotoAndPlay(0)

    }

    public reset(): void {
        this.deadCyclopsAnim.visible = false;
        this.attackCyclopsAnim.visible = false;
        this.idleCyclopsAnim.visible = true;
    }

    visableAnimationState(animation: PIXI.extras.AnimatedSprite) {
        this.deadCyclopsAnim.visible = false;
        this.idleCyclopsAnim.visible = false;
        this.attackCyclopsAnim.visible = false;
        animation.visible = true;
    }
}