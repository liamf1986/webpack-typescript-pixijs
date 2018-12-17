import * as PIXI from 'pixi.js';

const spinnerRadius: number = 60;

function getCircX(origin: number, angle: number): number {
    return origin + (origin * Math.cos(angle));
}

function getCircY(origin: number, angle: number): number {
    return origin + (origin * Math.sin(angle));
}

export default class Spinner extends PIXI.Container {
    private background: PIXI.Graphics;
    private lines: PIXI.Graphics;

    constructor() {
        super();

        this.position.set(spinnerRadius + 10, spinnerRadius + 10);

        this.background = new PIXI.Graphics();
        this.createBackground();

        this.lines = new PIXI.Graphics();
        this.createLines();
    }

    private createBackground(): void {
        this.background.beginFill(0xFFFFFF);
        this.background.drawCircle(0, 0, spinnerRadius);
        this.background.endFill();

        this.addChild(this.background);
    }

    private drawAngledLine(x: number, y: number, length: number, angle: number): void {
        const radians = angle / 180 * Math.PI;
        let endX = x + length * Math.cos(radians);
        let endY = y - length * Math.sin(radians);

        this.lines.moveTo(x, y);
        this.lines.lineTo(endX, endY);
    }

    private createLines(): void {
        this.lines.beginFill(0x0000FF);
        this.lines.lineStyle(3, 0x0000FF);
        this.drawAngledLine(0, 0, spinnerRadius, 0);
        this.drawAngledLine(0, 0, spinnerRadius, 120);
        this.drawAngledLine(0, 0, spinnerRadius, 240);
        this.lines.endFill();

        this.addChild(this.lines);
    }
}