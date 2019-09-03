export class UIButton extends PIXI.Graphics{

    public buttonWidth:number;
    public buttonHeight:number;
    
    constructor(width:number, height:number, position:number[]){
        super()
        this.buttonWidth = width;
        this.buttonHeight = height;

        this.position.x = position[0];
        this.position.y = position[1];

        this.interactive=true;
        this.buttonMode=true;
    
        this.clear();
        this.beginFill(0x1e606e);
        this.drawRect(0, 0, this.buttonWidth, this.buttonHeight);
        this.endFill();

        //setting own position
        this.position.set(position[0],position[1]);
    }
}