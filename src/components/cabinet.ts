import user from '../User';

export class Cabinet extends PIXI.Container {
    private _actionButton : PIXI.Sprite;
    private _actionButtonTextures : PIXI.Texture[] = [];
    private _stakePlusButton : PIXI.Sprite;
    private _stakeMinusButton : PIXI.Sprite;
    private _balanceArea : PIXI.Graphics;
    private _messageArea : PIXI.Graphics;
    private _graphics : PIXI.Graphics;
    private _msg : PIXI.Text;
    private _balanceMsg : PIXI.Text;
    private _stakeMsg : PIXI.Text;
    private _sounds : string[] = [];

    private _stakes : {text:string, value:number}[] = [{text:'5p', value:5}, {text:'10p', value:10}, {text:'20p', value:20}, {text:'50p', value:50}, {text:'£1', value:100}]
    private _currentStakeId : number = 0;

    constructor() {
        super();
    }

    load(loader: PIXI.loaders.Loader) : void {
        PIXI.sound.init();
        loader.add('buyBtn', 'assets/cabinet/buy-button.png');
        loader.add('spinBtn', 'assets/cabinet/spin-button.png');
        loader.add('stakeMinusBtn', 'assets/cabinet/minus-button.png');
        loader.add('stakePlusBtn', 'assets/cabinet/plus-button.png');
        PIXI.sound.add('purchaseSfx', {url: 'assets/cabinet/purchase.{ogg,mp3}'});
        PIXI.sound.add('stakeChangeSfx', {url: 'assets/cabinet/stakechange.{ogg,mp3}'});
    }

    draw(app: PIXI.Application) : void {
        this._currentStakeId = user.lastStakeId;
        
        this._actionButtonTextures.push(app.loader.resources.buyBtn.texture);
        this._actionButtonTextures.push(app.loader.resources.spinBtn.texture);

        this._sounds.push('purchaseSfx');

        let margin = 50;
        let height = (app.view.height / 10) + (margin * 2);
        let width = app.view.width;
        let btnSpacing = 30;
        let position = {
            x: 0,
            y: app.view.height - height
        };
        this._graphics = new PIXI.Graphics();

        this._graphics.beginFill(0xFFFFFF, 0.25);
        this._graphics.drawRoundedRect(margin, margin, width - (margin * 2), height - (margin * 2), 15);
        this._graphics.endFill();
        this.addChild(this._graphics);

        this._messageArea = new PIXI.Graphics();
        this._messageArea.beginFill(0xFFFFFF, 0.25);
        this._messageArea.drawRect(0, 0, width / 5, height - (margin * 2));
        this._messageArea.endFill();
        this._messageArea.position.x = margin + width / 10;
        this._messageArea.position.y = margin;
        this.addChild(this._messageArea);

        let textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 25,
            fill: '#00BCAD',
            align: 'center'
        });
        this._msg = new PIXI.Text('message\nline 2', textStyle);
        this._msg.anchor.set(0.5);
        this._msg.position.x = this._messageArea.width / 2;
        this._msg.position.y = this._messageArea.height / 2;
        this._messageArea.addChild(this._msg);

        this._balanceArea = new PIXI.Graphics();
        this._balanceArea.beginFill(0xFFFFFF, 0.25);
        this._balanceArea.drawRect(0, 0, width / 5, height - (margin * 2));
        this._balanceArea.endFill();
        this._balanceArea.position.x = (width) - margin - (width / 5) - (width / 10);
        this._balanceArea.position.y = margin;
        this.addChild(this._balanceArea);

        this._balanceMsg = new PIXI.Text('balance\n' + user.balanceString, textStyle);
        this._balanceMsg.anchor.set(0.5);
        this._balanceMsg.position.x = this._balanceArea.width / 2;
        this._balanceMsg.position.y = this._balanceArea.height / 2;
        this._balanceArea.addChild(this._balanceMsg);

        this._actionButton = new PIXI.Sprite(this._actionButtonTextures[0]);
        this._actionButton.anchor.set(0.5);
        this._actionButton.height = height - (margin * 1.5);
        this._actionButton.width = height - (margin * 1.5);
        this._actionButton.position.x = (width / 2);
        this._actionButton.position.y = (height / 2);
        this._actionButton.interactive = true;
        this._actionButton.buttonMode = true;
        this._actionButton.on('pointerdown', this.actionButtonClicked.bind(this));
        this.addChild(this._actionButton);

        let stateTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fill: '#FFFFFF',
            align: 'center'
        });
        this._stakeMsg = new PIXI.Text(this._stakes[this._currentStakeId].text, stateTextStyle);
        this._stakeMsg.anchor.set(0.5);
        this._stakeMsg.position.x = 0;
        this._stakeMsg.position.y = 45;
        this._actionButton.addChild(this._stakeMsg);

        this._stakePlusButton = new PIXI.Sprite(app.loader.resources.stakePlusBtn.texture);
        this._stakePlusButton.anchor.set(0, 0.5);
        this._stakePlusButton.scale.set(0.7);
        this._stakePlusButton.position.x = this._actionButton.position.x + (this._actionButton.width / 2) + btnSpacing;
        this._stakePlusButton.position.y = (height / 2);
        this._stakePlusButton.interactive = true;
        this._stakePlusButton.buttonMode = true;
        this._stakePlusButton.on('pointerdown', this.stakePlusButtonClicked.bind(this));
        this.addChild(this._stakePlusButton);

        this._stakeMinusButton = new PIXI.Sprite(app.loader.resources.stakeMinusBtn.texture);
        this._stakeMinusButton.anchor.set(1, 0.5);
        this._stakeMinusButton.scale.set(0.7);
        this._stakeMinusButton.position.x = this._actionButton.position.x - (this._actionButton.width / 2) - btnSpacing;
        this._stakeMinusButton.position.y = (height / 2);
        this._stakeMinusButton.interactive = true;
        this._stakeMinusButton.buttonMode = true;
        this._stakeMinusButton.on('pointerdown', this.stakeMinusButtonClicked.bind(this));
        this.addChild(this._stakeMinusButton);

        this.position.x = position.x;
        this.position.y = position.y;
        app.stage.addChild(this);

        this.disableStakeMinusButton();
    }

    setCabinetMessage(text: string) : void {
        this._msg.text = text;
    }

    disableActionButton() : void {
        this._actionButton.alpha = 0.5;
        this._actionButton.interactive = false;
        this._actionButton.buttonMode = false;
    }

    enableActionButton() : void {
        this._actionButton.alpha = 1;
        this._actionButton.interactive = true;
        this._actionButton.buttonMode = true;
    }

    disableStakeButtons() : void {
        this.disableStakeMinusButton();
        this.disableStakePlusButton();
    }

    enableStakeButtons() : void {
        this.enableStakeMinusButton();
        this.enableStakePlusButton();
    }

    disableStakeMinusButton() : void {
        this._stakeMinusButton.alpha = 0.5;
        this._stakeMinusButton.interactive = false;
        this._stakeMinusButton.buttonMode = false;
    }

    enableStakeMinusButton() : void {
        if (this._currentStakeId > 0) {
            this._stakeMinusButton.alpha = 1;
            this._stakeMinusButton.interactive = true;
            this._stakeMinusButton.buttonMode = true;
        }
    }

    disableStakePlusButton() : void {
        this._stakePlusButton.alpha = 0.5;
        this._stakePlusButton.interactive = false;
        this._stakePlusButton.buttonMode = false;
    }

    enableStakePlusButton() : void {
        if (this._currentStakeId < this._stakes.length - 1) {
            this._stakePlusButton.alpha = 1;
            this._stakePlusButton.interactive = true;
            this._stakePlusButton.buttonMode = true;
        }
    }

    hideStakeText() : void {
        this._stakeMsg.visible = false;
    }

    displayStakeText() : void {
        this._stakeMsg.visible = true;
    }

    changeActionTexture(id : number) : void {
        if (id < this._actionButtonTextures.length && id >= 0)
            this._actionButton.texture = this._actionButtonTextures[id];
    }

    actionButtonClicked() : void {
        PIXI.sound.play('purchaseSfx');
        this.emit("actionclicked");
    }

    stakePlusButtonClicked() : void {
        PIXI.sound.play('stakeChangeSfx');
        this._currentStakeId++;
        if (this._currentStakeId === this._stakes.length - 1)
            this.disableStakePlusButton();
        if (this._currentStakeId === 1)
            this.enableStakeMinusButton();

        this.changeStakeText(this._stakes[this._currentStakeId].text);
    }

    stakeMinusButtonClicked() : void {
        PIXI.sound.play('stakeChangeSfx');
        this._currentStakeId--;
        if (this._currentStakeId === 0)
            this.disableStakeMinusButton();
        if (this._currentStakeId === this._stakes.length - 2)
            this.enableStakePlusButton();

        this.changeStakeText(this._stakes[this._currentStakeId].text);
    }

    changeStakeText(newStake : string) : void {
        this._stakeMsg.text = newStake;
    }

    set balanceMsg(msg : string) {
        this._balanceMsg.text = msg;
    }

    get currentStake() : number {
        return this._stakes[this._currentStakeId].value;
    }
}