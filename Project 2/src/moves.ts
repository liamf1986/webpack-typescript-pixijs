import {TweenLite, Elastic, Ease} from "gsap";
import { KeyboardInstance } from './keyboard'

export class knightAnimations extends PIXI.Container{
    
    private app: PIXI.Application;
    protected deadKnightFrames: PIXI.Texture[] = [];
    public deadKnightAnim: PIXI.extras.AnimatedSprite;
    protected hurtKnightFrames: PIXI.Texture[] = [];
    protected attackKnightFrames: PIXI.Texture[] = [];
    private attackKnightAnim: PIXI.extras.AnimatedSprite;
    private missKnightAnim: PIXI.extras.AnimatedSprite;
    protected idleKnightFrames: PIXI.Texture[] = [];
    public idleKnightAnim: PIXI.extras.AnimatedSprite;
    public testText: PIXI.Text;

    //Text Styling
    private style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 60,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
    });

    constructor(app: PIXI.Application){
        super()
        this.app = app

        //Attack Animation
        for(let i=0; i<9; i++){
            this.attackKnightFrames.push(PIXI.Texture.fromFrame('Attack' + (i +1 + '.png')));
        }
        this.attackKnightAnim = new PIXI.extras.AnimatedSprite(this.attackKnightFrames);
        this.attackKnightAnim.visible = false;
        this.addChild(this.attackKnightAnim);

        //Miss Animation
        this.missKnightAnim = new PIXI.extras.AnimatedSprite(this.attackKnightFrames);
        this.missKnightAnim.visible = false;
        this.addChild(this.missKnightAnim);
    

        //Death Animation
        for(let i=0; i<9; i++){
            this.deadKnightFrames.push(PIXI.Texture.fromFrame('Die' + (i +1 + '.png')));
        }
        this.deadKnightAnim = new PIXI.extras.AnimatedSprite(this.deadKnightFrames);
        this.deadKnightAnim.visible = false;
        this.addChild(this.deadKnightAnim);


        //Animated Knight Idle Sprite
        for(let i=0; i<9; i++){
            this.idleKnightFrames.push(PIXI.Texture.fromFrame('Idle' + (i +1 + '.png')));
        }
        this.idleKnightAnim = new PIXI.extras.AnimatedSprite(this.idleKnightFrames);
    
        this.idleKnightAnim.loop = true;
        this.addChild(this.idleKnightAnim);
        
        this.width = this.app.screen.width * 0.3;
        this.scale.y = this.scale.x
        this.x = 120 - this.width * 0.5;
        this.y = 540 - this.height * 0.5;
        this.idleKnightAnim.animationSpeed = 0.16;
        this.attackKnightAnim.animationSpeed = 0.16;

        this.idleKnightAnim.play();

        //Text
        this.testText = new PIXI.Text('', this.style)
        this.testText.x = this.app.screen.width * 0.4;
        this.app.stage.addChild(this.testText);
        
        this.attackKnightAnim.onComplete = () => {
            this.visableAnimationState(this.idleKnightAnim);
        }

        this.missKnightAnim.onComplete = () => { 
            this.visableAnimationState(this.idleKnightAnim);
        }
    }
    
    attackAnimation(){
        this.testText.text = 'You swung your sword and struck the Ice Golem';
        this.attackKnightAnim.loop = false;
        this.visableAnimationState(this.attackKnightAnim);
        this.attackKnightAnim.gotoAndPlay(0)
    }

    hurtAnimation(){
        this.idleKnightAnim.tint = 0xa83232;
        const oldCords:number[] = [this.x, this.y];
        TweenLite.to(this, 1.2, {x: oldCords[0]-20, y: oldCords[1]-5, ease: Elastic.easeOut.config(1.5, 0.4), onComplete: ()=> {
            this.x = oldCords[0];
            this.y = oldCords[1];
            this.idleKnightAnim.tint = 0xffffff;
            }});
        }

    missAnimation(){
        this.attackKnightAnim.loop = false;
        this.testText.text = 'You missed the Ice golem!';
        this.visableAnimationState(this.attackKnightAnim)
        this.attackKnightAnim.gotoAndPlay(0)   
    }

    deadAnimation(){
        this.deadKnightAnim.loop = false;
        this.testText.text = 'Defeat! >:D';
        this.visableAnimationState(this.deadKnightAnim);
        this.deadKnightAnim.gotoAndPlay(0) 
    }

     update(delta: number): void {
        if (KeyboardInstance.isKeyDown('d')) {
            this.x += 2;
        }
        else if (KeyboardInstance.isKeyDown('a')) {
            this.x -= 2;
        }   
     }

     public reset(): void {
        this.deadKnightAnim.visible = false;
        this.missKnightAnim.visible = false;
        this.attackKnightAnim.visible = false;
        this.idleKnightAnim.visible = true;
     }

    visableAnimationState( animation: PIXI.extras.AnimatedSprite) {
        this.deadKnightAnim.visible = false;
        this.idleKnightAnim.visible = false;
        this.missKnightAnim.visible = false;
        this.attackKnightAnim.visible = false;
        animation.visible = true;
    }

}


