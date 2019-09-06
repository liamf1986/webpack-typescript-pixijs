import { Game } from "./game";
import { knightAnimations } from './moves'
import {TweenLite, Elastic} from "gsap";
import strings from "./strings";

export class orcAnimations extends PIXI.Container{
    private app: PIXI.Application;
    //Idle Skeleton Var
    protected idleOrcFrames: PIXI.Texture[] = [];
    public idleOrcAnim: PIXI.extras.AnimatedSprite;
    //Attack Skeleton Var
    private attackOrcFrames: PIXI.Texture[] = [];
    private attackOrcAnim: PIXI.extras.AnimatedSprite;
    //Dead Skeleton Var
    private deadOrcFrames: PIXI.Texture[] = [];
    public deadOrcAnim: PIXI.extras.AnimatedSprite;

    private Game: Game
    
        constructor(app: PIXI.Application, game: Game){
            super()
            this.app = app;
            this.Game = game;
                        
            for(let i=0; i<6; i++){
            this.deadOrcFrames.push(PIXI.Texture.fromFrame('orcdead' + (i + 1) + '.png'));
            }
            this.deadOrcAnim = new PIXI.extras.AnimatedSprite(this.deadOrcFrames);
            this.deadOrcAnim.visible = false;
            this.addChild(this.deadOrcAnim);
            
            //Animated orc Attack
            for(let i=0; i<8; i++){
                this.attackOrcFrames.push(PIXI.Texture.fromFrame('orcattack' + (i + 1) + '.png'));
            }
            this.attackOrcAnim = new PIXI.extras.AnimatedSprite(this.attackOrcFrames);
            this.attackOrcAnim.visible = false;
            this.addChild(this.attackOrcAnim);
    
            //Animated orc Idle Sprite
            for(let i=0; i<6; i++){
                this.idleOrcFrames.push(PIXI.Texture.fromFrame('orcidle' + (i + 1) + '.png'));
            }
            
            this.idleOrcAnim = new PIXI.extras.AnimatedSprite(this.idleOrcFrames);
            this.addChild(this.idleOrcAnim);
            this.idleOrcAnim.loop = true;
            
            this.width = this.app.screen.width * 0.35;
            this.scale.y = this.scale.x
            this.x = 1230;
            this.y = 657 - this.height;
            this.scale.x = -this.scale.x
            this.attackOrcAnim.animationSpeed = 0.16;
            this.idleOrcAnim.animationSpeed = 0.16;
            
            this.idleOrcAnim.play();
            
            this.attackOrcAnim.onComplete = () => {
                if(this.Game.levels[this.Game.level].monsterHealth <= 0){
                    this.Game.levels[this.Game.level].monster.deadAnimation();
                    this.visableAnimationState(this.deadOrcAnim)
                    this.deadOrcAnim.gotoAndPlay(0)
                }
                else{
                    this.attackOrcAnim.visible = false;
                    this.idleOrcAnim.visible = true;
                }
            }
    
            this.deadOrcAnim.onComplete = () => {
                this.deadOrcAnim.visible = true;
                this.idleOrcAnim.visible = false;
                }
            }

    
    attackAnimation(){
        this.attackOrcAnim.loop = false;
        this.attackOrcAnim.visible = true;
        this.idleOrcAnim.visible = false;
        this.attackOrcAnim.gotoAndPlay(0)
        if(this.Game.levels[this.Game.level].monsterHealth <= 0){
            this.Game.levels[this.Game.level].monster.deadAnimation();
            this.visableAnimationState(this.deadOrcAnim)
            this.deadOrcAnim.gotoAndPlay(0)
        }

    }

    hurtAnimation() {
        this.idleOrcAnim.tint = 0xa83232;
        const oldCords:number[] = [this.x, this.y];
        TweenLite.to(this, 1, {x: oldCords[0]+20, y: oldCords[1]+5, ease: Elastic.easeOut.config(2.5, 0.3), onComplete: ()=> {
            this.idleOrcAnim.tint = 0xFFFFFF;
            this.x = oldCords[0];
            this.y = oldCords[1];
        }});
    }

    deadAnimation(){
        this.deadOrcAnim.loop = false;
        this.deadOrcAnim.visible = true;
        this.idleOrcAnim.visible = false;
        this.deadOrcAnim.gotoAndPlay(0)

    }

    public reset(): void {
        this.deadOrcAnim.visible = false;
        this.attackOrcAnim.visible = false;
        this.idleOrcAnim.visible = true;
    }

    visableAnimationState( animation: PIXI.extras.AnimatedSprite) {
        this.deadOrcAnim.visible = false;
        this.idleOrcAnim.visible = false;
        this.attackOrcAnim.visible = false;
        animation.visible = true;
    }
    
}