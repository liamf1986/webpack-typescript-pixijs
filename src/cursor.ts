export class Cursor extends PIXI.Graphics {
    constructor(position: number []){
        super();
        this.beginFill(0xc4f0c2);
        this.drawRect((20/2), 0, 5, 25);
        this.drawRect(0, (20/2), 25, 5);
        this.endFill();

        //centering rotation around the body
        this.position.set(position[0],position[1]);
        this.pivot.set(this.width*.5)

        this.defaultCursor="wait"
    }

    setPos(mousePos: number[]){
        this.position.x = mousePos[0];
        this.position.y = mousePos[1];
    }
}