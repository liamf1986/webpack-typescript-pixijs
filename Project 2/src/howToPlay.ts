import { Popup } from './basePopup'
import strings from './strings';
import { app } from './application';

export class HowToPlay extends Popup {
    private icon: PIXI.Sprite;
    private welcomeText: PIXI.Text;
    private htpText: PIXI.Text;

    constructor() {
        super(0xf4169e1, 940, 500, 20);

        this.icon = new PIXI.Sprite(app.loader.resources.icon.texture);
        this.icon.width = this.background.width * 0.2;
        this.icon.scale.y = this.icon.scale.x;
        this.icon.x = this.background.width * 0.05;
        this.icon.y = this.background.height * 0.05;

        const textStyle = new PIXI.TextStyle({
            fill: "#ffffff",
            fillGradientStops: [100],
            fontFamily: "Arial, Helvetica, san-serif",
            fontSize: 24,
            stroke: "#ffffff"
        });
        
        this.welcomeText = new PIXI.Text('', textStyle);
        this.welcomeText.text = strings.welcomeText + '\n';
        this.welcomeText.text += '\n' + strings.info[1] + '\n' + strings.info[2] + '\n' + strings.info[3] + '\n';
        this.htpText = new PIXI.Text('', textStyle);
        this.htpText.text = strings.htp.title + '\n' + '\n';
        this.htpText.text += strings.htp.info[1] + '\n' + strings.htp.info[2] + '\n' + strings.htp.info[3] + '\n' + strings.htp.info[4];

        this.welcomeText.x = this.background.width * 0.3;
        this.welcomeText.y = this.background.height * 0.05;
        this.htpText.x = this.welcomeText.x;
        this.htpText.y = this.welcomeText.y + this.welcomeText.height;

        this.addChild(this.icon);
        this.addChild(this.htpText)
        this.addChild(this.welcomeText);
    }

}