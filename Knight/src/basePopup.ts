import { TweenLite, Power1 } from 'gsap';

import { app } from './application';

export class Popup extends PIXI.Container {
    protected background: PIXI.Graphics;
    protected closeButton: PIXI.Sprite;

    private offScreenPosition: number = -600;
    private onScreenPosition = 50;

    constructor(bgColour: number, width: number, height: number, borderThick: number) {
        super();

        this.y = this.offScreenPosition;
        this.x = 130;
        this.background = new PIXI.Graphics();
        this.background.lineStyle(borderThick, 0x000000, 1);
        this.background.beginFill(bgColour);
        this.background.drawRect(0, 0, width, height);
        this.background.endFill();

        this.closeButton = new PIXI.Sprite(app.loader.resources.exitButton.texture);
        this.closeButton.buttonMode = true;
        this.closeButton.interactive = true;
        this.closeButton.visible = true;
        this.closeButton.width = this.background.width * 0.05;
        this.closeButton.scale.y = this.closeButton.scale.x;
        this.closeButton.x = this.background.width * 0.9;
        this.closeButton.y = this.background.height * 0.05;
        this.closeButton.on('pointerdown', () => {
            this.hide();
            this.emit('popupclosed');
        });

        this.addChild(this.background);
        this.addChild(this.closeButton);
    }

    public show(): void {
        TweenLite.to(this, 0.8, {ease: Power1.easeOut, y: this.onScreenPosition, onComplete: ()=> {
            this.closeButton.interactive = true;
        }});
    }

    public hide(): void {
        TweenLite.to(this, 0.8, {ease: Power1.easeOut, y: this.offScreenPosition, onComplete: ()=> {
            this.closeButton.interactive = false;
        }})
    }
}