import { Graphics } from "pixi.js";

export class Popup extends PIXI.Container {

    private _leaveButton : PIXI.Graphics;
    private _continueButton : PIXI.Graphics;
    private _popupPanel : PIXI.Sprite;
    private _victoryIcon : PIXI.Sprite;
    private _choiceMsg : PIXI.Text;
    private _continueMsg : PIXI.Text;
    private _leaveMsg : PIXI.Text;

    constructor() {
        super()
    }

    load(loader: PIXI.loaders.Loader) : void {
        //loader.add('leaveBtn', 'assets/popup/leave-button.png');
        //loader.add('continueBtn', 'assets/popup/continue-button.png')
        loader.add('popupPnl', 'assets/pop-up/pop-up-panel.png');
        loader.add('victoryIcon', 'assets/pop-up/victory-icon.png');
    }

    draw(app: PIXI.Application) : void {
        this._continueButton = new PIXI.Graphics();
        this._leaveButton = new PIXI.Graphics();


        let choiceMsgXPos = -200;
        let choiceMsgYPos = 25;
        let continueMsgXPos = 50;
        let continueMsgYPos = 120;
        let leaveMsgXPos = -200;
        let leaveMsgYPos = 120;
        

        // this.pivot.x = (this.height / 2);
        // this.pivot.y = (this.width / 2);

        this._popupPanel = new PIXI.Sprite(app.loader.resources.popupPnl.texture);
        this._popupPanel.anchor.set(0.5);
        this._popupPanel.scale.set(0.3);
        this.addChild(this._popupPanel);

        this._victoryIcon = new PIXI.Sprite(app.loader.resources.victoryIcon.texture);
        this._victoryIcon.anchor.set(0.5);
        this._victoryIcon.scale.set(0.4);
        this.addChild(this._victoryIcon);

        this._continueButton.beginFill(0xFFF00,0.75);
        this._continueButton.drawRoundedRect(25, 100, 200, 75,15);
        this._continueButton.endFill();
        this._continueButton.interactive = true;
        this._continueButton.buttonMode = true;
        this._continueButton.on('pointerdown', this.continueButtonClicked.bind(this))
        this.addChild(this._continueButton);

        this._leaveButton.beginFill(0xf43548,0.75);
        this._leaveButton.drawRoundedRect(-230, 100, 200, 75,15);
        this._leaveButton.endFill();
        this._leaveButton.interactive = true;
        this._leaveButton.buttonMode = true;
        this._leaveButton.on('pointerdown', this.leaveButtonClicked.bind(this))
        this.addChild(this._leaveButton);

        this._choiceMsg = new PIXI.Text ('What will you choose ?', {fontFamily : 'lato-lig', fontSize: 40,fontWeight: 'bold', align: 'centre'});
        this._choiceMsg.position.x = choiceMsgXPos;
        this._choiceMsg.position.y = choiceMsgYPos;
        this.addChild(this._choiceMsg);

        this._continueMsg = new PIXI.Text ('Continue', {fontFamily : 'lato-lig', fontSize: 40,fontWeight: 'bold', align: 'centre'});
        this._continueMsg.position.x = continueMsgXPos;
        this._continueMsg.position.y = continueMsgYPos;
        this.addChild(this._continueMsg);

        this._leaveMsg = new PIXI.Text ('Retreat', {fontFamily : 'lato-lig', fontSize: 40,fontWeight: 'bold', align: 'centre'});
        this._leaveMsg.position.x = leaveMsgXPos;
        this._leaveMsg.position.y = leaveMsgYPos;
        this.addChild(this._leaveMsg);
    }

    continueButtonClicked() : void {
        this.emit('continueclicked');
    }

    leaveButtonClicked() : void {
        this.emit('leaveclicked');
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }
}

export default new Popup();