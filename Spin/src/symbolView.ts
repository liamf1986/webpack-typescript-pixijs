import { app } from "./application";
import { Text } from "pixi.js";

export class symbolView extends PIXI.Container{
    
    private _skin: PIXI.Sprite;
    private _id: number;
    private _debugText: Text;

    constructor(id: number){
        super()
        const skinTexture = app.loader.resources['icon' + (id)].texture
        this._skin = new PIXI.Sprite(skinTexture)
        this._skin.width = 175;
        this._skin.y = this.scale.x
        this.addChild(this._skin)

        this._debugText = new PIXI.Text(id.toString())
        this._debugText.style.fontSize = 60
    }

    public setSkin(id: number) {
        this._skin.texture = app.loader.resources['icon' + (id)].texture;
        this._debugText.text = id.toString()
    }

    public set id(value: number){
        this._id = value;
    }
}