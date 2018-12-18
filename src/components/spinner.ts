import * as PIXI from 'pixi.js';
import {ResultType} from '../result';
import { TweenMax } from 'gsap';

const FULL = 2.0;
const HALF = 1.0;
const THIRD = (2.0 / 3);
const QUARTER = (0.5);

export const DAGGER_COLOUR = 0xA51E0E;
export const MAGIC_COLOUR = 0x0C2487;
export const SHIELD_COLOUR = 0x1B9E34;

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

    private _spinnerContainer: PIXI.Container;
    private _daggerSegment: number = THIRD * Math.PI;
    private _magicSegment: number = (THIRD * 2) * Math.PI;
    private _shieldSegment: number = FULL * Math.PI;

    private _border: PIXI.Graphics;

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
    private _pointerSprite: PIXI.Sprite;
    private _wheelSprite: PIXI.Sprite;

    constructor(resources: ISpinnerResources | undefined) {
        super();

        if (resources !== undefined) {
            this._daggerTexture = resources.dagger;
            this._magicTexture = resources.magic;
            this._shieldTexture = resources.shield;
        }
    }

    public load(loader: PIXI.loaders.Loader) {
        loader.add('spinnerPointer', './assets/spinner/arrow.png');
        loader.add('wheel', './assets/spinner/wheel.png');
    }

    public draw(app: PIXI.Application) {
        this._wheelSprite = new PIXI.Sprite(app.loader.resources.wheel.texture);
        this._wheelSprite.anchor.set(0.5);
        this.addChild(this._wheelSprite);
        this._pointerSprite = new PIXI.Sprite(app.loader.resources.spinnerPointer.texture);
        this._pointerSprite.anchor.set(0.5, 1.0);
        this._pointerSprite.scale.set(0.5);
        this._pointerSprite.position.y += 25;
        this.addChild(this._pointerSprite);
    }

    public init(x: number, y:number, r: number) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.width = this.radius * 2;
        this.height = this.radius * 2;

        this._border = new PIXI.Graphics();
        this._border.beginFill(0x6F05A7);
        this._border.drawCircle(0, 0, this.radius);
        this.addChild(this._border);

        this._spinnerContainer = new PIXI.Container();
        this.addChild(this._spinnerContainer);

        this._daggerGraphics = new PIXI.Graphics();
        this._daggerGraphics.beginFill(DAGGER_COLOUR);
        this._daggerGraphics.lineStyle(1, DAGGER_COLOUR, 1);
        this._daggerGraphics.arc(0, 0, this.radius-10, 0, this._daggerSegment, false);
        this._daggerGraphics.lineTo(0, 0);
        this._spinnerContainer.addChild(this._daggerGraphics);
        
        this._magicGraphics = new PIXI.Graphics();
        this._magicGraphics.beginFill(MAGIC_COLOUR);
        this._magicGraphics.lineStyle(1, MAGIC_COLOUR, 1);
        this._magicGraphics.arc(0, 0, this.radius-10, this._daggerSegment, this._magicSegment, false);
        this._magicGraphics.lineTo(0, 0);
        this._spinnerContainer.addChild(this._magicGraphics);

        this._shieldGraphics = new PIXI.Graphics();
        this._shieldGraphics.beginFill(SHIELD_COLOUR);
        this._shieldGraphics.lineStyle(1, SHIELD_COLOUR, 1);
        this._shieldGraphics.arc(0, 0, this.radius-10, this._magicSegment, this._shieldSegment, false);
        this._shieldGraphics.lineTo(0, 0);
        this._spinnerContainer.addChild(this._shieldGraphics);

        this.handleIcons();

        const pointerWidth = 10;
        const pointerHeight = 30;
        this._pointer = new PIXI.Graphics();
        this._pointer.beginFill(0x000000);
        this._pointer.drawRect(-pointerWidth * 0.5, -this.radius, pointerWidth, pointerHeight);
        this.addChild(this._pointer);
    }

    public spin(result: ResultType, duration: number) {
        let stopPoint: number = 0;
        if (result === ResultType.Mage) {
            stopPoint = 0.165 + Math.random() * 0.11;
        } else if (result === ResultType.Rogue) {
            stopPoint = 0.495 + Math.random() * 0.11;
        } else if (result === ResultType.Knight) {
            stopPoint = 0.825 + Math.random() * 0.11;
        }

        this._wheelSprite.rotation = 0 ;
        const rotation = Math.PI * 6 + stopPoint * (Math.PI * 2);
        TweenMax.to(this._wheelSprite, duration, { rotation });
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