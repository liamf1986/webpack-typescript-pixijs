import { RENDERER_TYPE } from "pixi.js";

export class Arena extends PIXI.Container{

    private background: PIXI.Graphics;
    private app: PIXI.Application;
    public mousePos: number[];
    public size:number[];


    constructor(app: PIXI.Application, position: number []){
        super();
        this.app = app;

        this.interactive=true;
        this.buttonMode=true;

        this.mousePos = [1,1];

        this.background = new PIXI.Graphics;
        this.background.beginFill(0x2a5866);
        this.background.drawRect(position[0], position[1], this.app.screen.width*.75, this.app.screen.height);
        this.background.endFill();

        this.addChild(this.background);

        this.size=[this.width,this.height];

        this.on("mousemove", this.updateMousePos);

        this.on("pointerdown", () => {
            this.emit("ClickDown");
        });

        this.on("pointerup", () => {
            this.emit("ClickUp");
        });
    }

    updateMousePos(event:any){
        this.mousePos = [event.data.global.x, event.data.global.y];
    }
}