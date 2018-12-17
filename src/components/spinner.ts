import * as PIXI from 'pixi.js';

const FULL = 2.0;
const HALF = 1.0;
const THIRD = (2.0 / 3);
const QUARTER = (0.5);

export const DAGGER_COLOUR = 0xFF0000;
export const MAGIC_COLOUR = 0x0000FF;
export const SHIELD_COLOUR = 0x00FF00;

export default class Spinner extends PIXI.Container {
    private radius: number;

    private _daggerSegment = THIRD * Math.PI;
    private _magicSegment = (THIRD * 2) * Math.PI;
    private _shieldSegment = FULL * Math.PI;

    private _daggerGraphics: PIXI.Graphics;
    private _magicGraphics: PIXI.Graphics;
    private _shieldGraphics: PIXI.Graphics;

    constructor() {
        super();
    }

    public init(x: number, y:number, r: number) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.width = this.radius * 2;
        this.height = this.radius * 2;

        this._daggerGraphics = new PIXI.Graphics();
        this._daggerGraphics.beginFill(DAGGER_COLOUR);
        this._daggerGraphics.lineStyle(1, DAGGER_COLOUR, 1);
        this._daggerGraphics.arc(0, 0, this.radius, 0.0 * Math.PI, this._daggerSegment, false);
        this._daggerGraphics.lineTo(0, 0);
        this.addChild(this._daggerGraphics);
        
        this._magicGraphics = new PIXI.Graphics();
        this._magicGraphics.beginFill(MAGIC_COLOUR);
        this._magicGraphics.lineStyle(1, MAGIC_COLOUR, 1);
        this._magicGraphics.arc(0, 0, this.radius, this._daggerSegment, this._magicSegment, false);
        this._magicGraphics.lineTo(0, 0);
        this.addChild(this._magicGraphics);

        this._shieldGraphics = new PIXI.Graphics();
        this._shieldGraphics.beginFill(SHIELD_COLOUR);
        this._shieldGraphics.lineStyle(1, SHIELD_COLOUR, 1);
        this._shieldGraphics.arc(0, 0, this.radius, this._magicSegment, this._shieldSegment, false);
        this._shieldGraphics.lineTo(0, 0);
        this.addChild(this._shieldGraphics);
    }

    public spin(speed: number) {
        this.rotation += speed;
    }
}