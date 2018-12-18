import { Graphics, Sprite, Texture, Rectangle } from "pixi.js";

export class Popup extends PIXI.Container {

    private _leaveButton : PIXI.Graphics;
    private _continueButton : PIXI.Graphics;
    private _popupPanel : PIXI.Sprite;
    private _victoryIcon : PIXI.Sprite;
    private _defeatIcon : PIXI.Sprite;
    private _choiceMsg : PIXI.Text;
    private _continueMsg : PIXI.Text;
    private _leaveMsg : PIXI.Text;

    private leaveButtonSprite: PIXI.Sprite;
    private continueButtonSprite: PIXI.Sprite;

    constructor() {
        super()
    }

    load(loader: PIXI.loaders.Loader) : void {
        
        //loader.add('leaveBtn', 'assets/popup/leave-button.png');
        //loader.add('continueBtn', 'assets/popup/continue-button.png')
        loader.add('popupPnl', 'assets/pop-up/pop-up-panel.png');
        loader.add('button', 'assets/buttons.png');
        loader.add('victoryIcon', 'assets/pop-up/victory-icon.png');
        loader.add('defeatIcon', 'assets/pop-up/defeat-icon.png');
    }

    draw(app: PIXI.Application) : void {
        this._continueButton = new PIXI.Graphics();
        this._leaveButton = new PIXI.Graphics();
        const texture: Texture = app.loader.resources['button'].texture;
        this.leaveButtonSprite = new Sprite(Texture.from(texture.baseTexture));
        this.continueButtonSprite = new Sprite(Texture.from(texture.baseTexture));
        this.leaveButtonSprite.texture.frame = new Rectangle(1130, 24, 1010, 420);
        this.continueButtonSprite.texture.frame = new Rectangle(48, 24, 1010, 420);

        let choiceMsgXPos = -200;
        let choiceMsgYPos = 25;
        let continueMsgXPos = 40;
        let continueMsgYPos = 110;
        let leaveMsgXPos = 40;
        let leaveMsgYPos = 110;
        

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

        this._defeatIcon = new PIXI.Sprite(app.loader.resources.defeatIcon.texture);
        this._defeatIcon.anchor.set(0.5);
        this._defeatIcon.scale.set(0.4);
        this._defeatIcon.position.y = -30;
        this.addChild(this._defeatIcon);

        this.leaveButtonSprite.x = -230;
        this.leaveButtonSprite.y = 90;
        this.leaveButtonSprite.scale.set(0.2);
        this.leaveButtonSprite.interactive = true;
        this.leaveButtonSprite.buttonMode = true;
        this.leaveButtonSprite.on('pointerdown', this.leaveButtonClicked.bind(this));
        this.addChild(this.leaveButtonSprite);

        this.continueButtonSprite.x = 30;
        this.continueButtonSprite.y = 90;
        this.continueButtonSprite.scale.set(0.2);
        this.continueButtonSprite.interactive = true;
        this.continueButtonSprite.buttonMode = true;
        this.continueButtonSprite.on('pointerdown', this.continueButtonClicked.bind(this))
        this.addChild(this.continueButtonSprite);

        this._choiceMsg = new PIXI.Text ('What will you choose ?', {fontFamily : 'lato-lig', fontSize: 40,fontWeight: 'bold', align: 'centre'});
        this._choiceMsg.position.x = choiceMsgXPos;
        this._choiceMsg.position.y = choiceMsgYPos;
        this.addChild(this._choiceMsg);

        this._continueMsg = new PIXI.Text ('Continue', {fontFamily : 'lato-lig', fontSize: 40,fontWeight: 'bold', align: 'centre'});
        this._continueMsg.position.x = continueMsgXPos;
        this._continueMsg.position.y = continueMsgYPos;
        this._continueMsg.scale.set(5);
        this.continueButtonSprite.addChild(this._continueMsg);

        this._leaveMsg = new PIXI.Text ('Retreat', {fontFamily : 'lato-lig', fontSize: 40,fontWeight: 'bold', align: 'centre'});
        this._leaveMsg.position.x = leaveMsgXPos;
        this._leaveMsg.position.y = leaveMsgYPos;
        this._leaveMsg.scale.set(5);
        this.leaveButtonSprite.addChild(this._leaveMsg);

        //this.showDefeat();
    }

    continueButtonClicked() : void {
        this.emit('continueclicked');
    }

    leaveButtonClicked() : void {
        this.emit('leaveclicked');
    }

    public hide(): void {
        this.visible = false;
    }

     public showDefeat() : void {
        this.visible = true;
        this._victoryIcon.visible = false;
        
        this._choiceMsg.text = "You dropped all your loot to get away.";
        this._choiceMsg.scale.set(0.7);
        this._choiceMsg.position.x = -230;
        this.leaveButtonSprite.position.x = -100;

        this.continueButtonSprite.visible = false;
    }

    public showVictory() : void {
        this.visible = true;
        this._defeatIcon.visible = false;
    }
}

export default new Popup();
