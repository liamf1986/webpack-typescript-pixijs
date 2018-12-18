import * as PIXI from 'pixi.js';
import {ResultType} from '../result';

const FULL = 2.0;
const HALF = 1.0;
const THIRD = (2.0 / 3);
const QUARTER = (0.5);

export const DAGGER_COLOUR = 0xFF0000;
export const MAGIC_COLOUR = 0x0000FF;
export const SHIELD_COLOUR = 0x00FF00;

export interface ISpinnerResources {
    dagger: PIXI.Texture
    magic: PIXI.Texture
    shield: PIXI.Texture
}

interface ICirclePoint {
    endX: number
    endY: number
}

function getCirclePoint(x: number, y: number, length: number, radians: number): ICirclePoint {
    const endX: number = x + length * Math.cos(radians);
    const endY: number = y - length * Math.sin(radians);

    return {endX, endY};
}

export default class Spinner extends PIXI.Container {
    private radius: number;
    private _rotationSpeed: number = 0;

    private _spinerContainer: PIXI.Container;
    private _daggerSegment: number = THIRD * Math.PI;
    private _magicSegment: number = (THIRD * 2) * Math.PI;
    private _shieldSegment: number = FULL * Math.PI;

    private _daggerGraphics: PIXI.Graphics;
    private _magicGraphics: PIXI.Graphics;
    private _shieldGraphics: PIXI.Graphics;

    private _daggerTexture: PIXI.Texture;
    private _daggerSprite: PIXI.Sprite;
    private _magicSprite: PIXI.Sprite;
    private _magicTexture: PIXI.Texture;
    private _shieldSprite: PIXI.Sprite;
    private _shieldTexture: PIXI.Texture;

    private _pointer: PIXI.Graphics;

    private _isRotating: boolean = false;

    constructor(resources: ISpinnerResources) {
        super();

        this._daggerTexture = resources.dagger;
        this._magicTexture = resources.magic;
        this._shieldTexture = resources.shield;
    }

    public init(x: number, y:number, r: number) {
        this._spinerContainer = new PIXI.Container();
        this.addChild(this._spinerContainer);

        this.x = x;
        this.y = y;
        this.radius = r;
        this.width = this.radius * 2;
        this.height = this.radius * 2;

        this._daggerGraphics = new PIXI.Graphics();
        this._daggerGraphics.beginFill(DAGGER_COLOUR);
        this._daggerGraphics.lineStyle(1, DAGGER_COLOUR, 1);
        this._daggerGraphics.arc(0, 0, this.radius, 0, this._daggerSegment, false);
        this._daggerGraphics.lineTo(0, 0);
        this._spinerContainer.addChild(this._daggerGraphics);
        
        this._magicGraphics = new PIXI.Graphics();
        this._magicGraphics.beginFill(MAGIC_COLOUR);
        this._magicGraphics.lineStyle(1, MAGIC_COLOUR, 1);
        this._magicGraphics.arc(0, 0, this.radius, this._daggerSegment, this._magicSegment, false);
        this._magicGraphics.lineTo(0, 0);
        this._spinerContainer.addChild(this._magicGraphics);

        this._shieldGraphics = new PIXI.Graphics();
        this._shieldGraphics.beginFill(SHIELD_COLOUR);
        this._shieldGraphics.lineStyle(1, SHIELD_COLOUR, 1);
        this._shieldGraphics.arc(0, 0, this.radius, this._magicSegment, this._shieldSegment, false);
        this._shieldGraphics.lineTo(0, 0);
        this._spinerContainer.addChild(this._shieldGraphics);

        this.handleIcons();

        const pointerWidth = 10;
        const pointerHeight = 30;
        this._pointer = new PIXI.Graphics() ;
        this._pointer.beginFill(0x000000);
        this._pointer.drawRect(-pointerWidth * 0.5, -this.radius, pointerWidth, pointerHeight);
        this.addChild(this._pointer);
    }

    public update(delta: number) {
        if (this._isRotating) {
            this._spinerContainer.rotation += (this._rotationSpeed * delta);
        }
    }

    public spin(result: ResultType, duration: number) {
        const revolutionDistance: number = 6 * Math.PI;
        const segmentDistance: number = (2 * Math.PI) / 3;
        let speed: number = 0;

        if (result === ResultType.Knight) {
            speed = revolutionDistance / duration;
        } else if (result === ResultType.Mage) {
            speed = (revolutionDistance + segmentDistance) / duration;
        } else if (result === ResultType.Rogue) {
            speed = (revolutionDistance - segmentDistance) / duration;
        }

        this._rotationSpeed = speed;
        this._isRotating = true;
    }

    public stopSpinning() {
        this._isRotating = false;
    }

    private handleIcons() {
        const iconScale: number = 50;

        // Create, scale and position dagger icon
        let daggerPosition = getCirclePoint(0, 0, this.radius * 0.5, -(this._daggerSegment * 0.5));

        this._daggerSprite = new PIXI.Sprite(this._daggerTexture);
        this._daggerSprite.anchor.set(0.5);
        this._daggerSprite.position.set(daggerPosition.endX, daggerPosition.endY);
        this._daggerSprite.width = iconScale;
        this._daggerSprite.height = iconScale;
        this._daggerGraphics.addChild(this._daggerSprite);

        // Create, scale and position magic icon
        let magicPosition = getCirclePoint(0, 0, this.radius * 0.5, -((this._magicSegment + this._daggerSegment) * 0.5));

        this._magicSprite = new PIXI.Sprite(this._magicTexture);
        this._magicSprite.anchor.set(0.5);
        this._magicSprite.position.set(magicPosition.endX, magicPosition.endY);
        this._magicSprite.width = iconScale;
        this._magicSprite.height = iconScale;
        this._magicGraphics.addChild(this._magicSprite);

        // Create, scale and position shield icon
        let shieldPosition = getCirclePoint(0, 0, this.radius * 0.5, (this._shieldSegment - this._magicSegment + this._daggerSegment) * 0.25);

        this._shieldSprite = new PIXI.Sprite(this._shieldTexture);
        this._shieldSprite.anchor.set(0.5);
        this._shieldSprite.position.set(shieldPosition.endX, shieldPosition.endY);
        this._shieldSprite.width = iconScale;
        this._shieldSprite.height = iconScale;
        this._shieldGraphics.addChild(this._shieldSprite);
    }
}