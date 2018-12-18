import { spine } from "pixi.js";
import { TweenLite } from "gsap";
import stateMachine from "../state-machine/state-machine";

const BASE_HEIGHT = 845;
const BASE_WIDTH = 900;

class Drawbridge {
    public animation: spine.Spine;
    public zoom: number = 0.0;
    private zoomMin: number = 1.2;
    private zoomMax: number = 2.1;
    
    public init(data: spine.core.SkeletonData): void {
        this.animation = new spine.Spine(data);
        this.animation.state.setAnimationByName(0, 'intro', false);
        this.animation.state.timeScale = 0;
        this.zoom = 0.0;

        // this.resize(window.innerWidth, window.innerHeight);
    }

    public resize(stageWidth: number, stageHeight: number): void {
        if (this.animation === undefined) { return; }

        // const xScale: number = stageWidth / BASE_WIDTH;
        // const yScale: number = stageHeight / BASE_HEIGHT;
        // const scale: number = 1.0;//Math.max(xScale, yScale);
        // this.zoomMin = scale;
        // this.zoomMax = scale * 1.5;
        this.animation.position.x = 636;
        this.animation.position.y = 380;
        this.animation.scale.set(this.zoomMin + this.zoom * (this.zoomMax - this.zoomMin));
    }

    public onEnterGame(): void {
        this.animation.state.setAnimationByName(0, 'bonusOutro', false);
        this.animation.state.timeScale = 1;
        this.animation.state.tracks[0].listener = {
            complete: () => {
                stateMachine.party.enterStage();
                const tween: TweenLite = TweenLite.to(this, 1.5, {
                    zoom: 1.0,
                    onUpdate: () => this.animation.scale.set(this.zoomMin + this.zoom * (this.zoomMax - this.zoomMin)),
                });
            }
        };
    }

    public onGameComplete(): void {
        const tween: TweenLite = TweenLite.to(this, 1.5, {
            zoom: 0.0,
            onUpdate: () => this.animation.scale.set(this.zoomMin + this.zoom * (this.zoomMax - this.zoomMin)),
            onComplete: () => {
                this.animation.state.setAnimationByName(0, 'bonusIntro', false);
                this.animation.state.timeScale = 1;
            },
        });        
    }
}

export default new Drawbridge();