import { Game } from "./game";
import { knightAnimations } from './moves'
import {TweenLite, Elastic} from "gsap";
import strings from "./strings";

export class skeletonAnimations extends PIXI.Container{
    private app: PIXI.Application;
    //Idle Skeleton Var
    protected idleSkeletonFrames: PIXI.Texture[] = [];
    public idleSkeletonAnim: PIXI.extras.AnimatedSprite;
    //Attack Skeleton Var
    private attackSkeletonFrames: PIXI.Texture[] = [];
    private attackSkeletonAnim: PIXI.extras.AnimatedSprite;
    //Dead Skeleton Var
    private deadSkeletonFrames: PIXI.Texture[] = [];
    public deadSkeletonAnim: PIXI.extras.AnimatedSprite;

    private Game: Game
    
        constructor(app: PIXI.Application, game: Game){
            super()
            this.app = app;
            this.Game = game;
                        
            for(let i=0; i<5; i++){
            this.deadSkeletonFrames.push(PIXI.Texture.fromFrame('skeletondead' + (i + 1) + '.png'));
            }
            this.deadSkeletonAnim = new PIXI.extras.AnimatedSprite(this.deadSkeletonFrames);
            this.deadSkeletonAnim.visible = false;
            this.addChild(this.deadSkeletonAnim);
            
            //Animated Golem Attack
            for(let i=0; i<5; i++){
                this.attackSkeletonFrames.push(PIXI.Texture.fromFrame('skeletonattack' + (i + 1) + '.png'));
            }
            this.attackSkeletonAnim = new PIXI.extras.AnimatedSprite(this.attackSkeletonFrames);
            this.attackSkeletonAnim.visible = false;
            this.addChild(this.attackSkeletonAnim);
    
            //Animated Golem Idle Sprite
            for(let i=0; i<6; i++){
                this.idleSkeletonFrames.push(PIXI.Texture.fromFrame('skeletonidle' + (i + 1) + '.png'));
            }
            
            this.idleSkeletonAnim = new PIXI.extras.AnimatedSprite(this.idleSkeletonFrames);
            this.addChild(this.idleSkeletonAnim);
            this.idleSkeletonAnim.loop = true;
            
            this.width = this.app.screen.width * 0.25;
            this.scale.y = this.scale.x
            this.x = 1130;
            this.y = 640 - this.height;
            this.scale.x = -this.scale.x
            this.attackSkeletonAnim.animationSpeed = 0.16;
            this.idleSkeletonAnim.animationSpeed = 0.16;
            
            this.idleSkeletonAnim.play();
            
            this.attackSkeletonAnim.onComplete = () => {
                if(this.Game.levels[this.Game.level].monsterHealth <= 0){
                    this.Game.levels[this.Game.level].monster.deadAnimation();
                    this.visableAnimationState(this.deadSkeletonAnim)
                    this.deadSkeletonAnim.gotoAndPlay(0)
                }
                else{
                    this.attackSkeletonAnim.visible = false;
                    this.idleSkeletonAnim.visible = true;
                }
            }
    
            this.deadSkeletonAnim.onComplete = () => {
                this.deadSkeletonAnim.visible = true;
                this.idleSkeletonAnim.visible = false;
                }
            }

    
    attackAnimation(){
        if(this.Game.levels[this.Game.level].monsterHealth <= 0){
            this.Game.levels[this.Game.level].monster.deadAnimation();
            this.visableAnimationState(this.deadSkeletonAnim)
            this.deadSkeletonAnim.gotoAndPlay(0)
        }
        else{
            this.attackSkeletonAnim.loop = false;
            this.attackSkeletonAnim.visible = true;
            this.idleSkeletonAnim.visible = false;
            this.attackSkeletonAnim.gotoAndPlay(0)
        }
    }

    hurtAnimation() {
        this.idleSkeletonAnim.tint = 0xa83232;
        const oldCords:number[] = [this.x, this.y];
        TweenLite.to(this, 1, {x: oldCords[0]+20, ease: Elastic.easeOut.config(2.5, 0.3), onComplete: ()=> {
            this.idleSkeletonAnim.tint = 0xFFFFFF;
            this.x = oldCords[0];
            this.y = oldCords[1];
        }});
    }

    deadAnimation(){
        this.deadSkeletonAnim.loop = false;
        this.deadSkeletonAnim.visible = true;
        this.idleSkeletonAnim.visible = false;
        this.deadSkeletonAnim.gotoAndPlay(0)
    }

    public reset(): void {
        this.deadSkeletonAnim.visible = false;
        this.attackSkeletonAnim.visible = false;
        this.idleSkeletonAnim.visible = true;
    }

    visableAnimationState( animation: PIXI.extras.AnimatedSprite) {
        this.deadSkeletonAnim.visible = false;
        this.idleSkeletonAnim.visible = false;
        this.attackSkeletonAnim.visible = false;
        animation.visible = true;
    }
    
}