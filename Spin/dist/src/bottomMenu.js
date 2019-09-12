import { app } from './application';
var bottomMenu = /** @class */ (function () {
    function bottomMenu() {
        var _this = this;
        this.buyInArray = [];
        this.style = new PIXI.TextStyle({
            fill: "#bd1410",
            fillGradientStops: [
                100
            ],
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 24,
            stroke: "#f9fff4"
        });
        this.buyButton = new PIXI.Sprite(app.loader.resources.buyButton.texture);
        this.minusIcon = new PIXI.Sprite(app.loader.resources.minusIcon.texture);
        this.plusIcon = new PIXI.Sprite(app.loader.resources.plusIcon.texture);
        this.buyInText = new PIXI.Text('', this.style);
        for (var i = 0; i < 5; i++) {
            this.buyInArray.push(i * 2.5);
            console.log(this.buyInArray);
        }
        this.buyButton.width = 125;
        this.buyButton.height = 125;
        this.buyButton.anchor.set(0.5);
        this.buyButton.x = app.stage.width * 0.5;
        this.buyButton.y = app.stage.height * 0.9;
        this.buyButton.buttonMode = true;
        this.buyButton.interactive = true;
        this.buyButton.on('pointerdown', function () {
            console.log('spin');
        });
        this.buyInText.anchor.set(0.5);
        this.buyInText.x = app.stage.width * 0.5;
        this.buyInText.y = app.stage.height * 0.7;
        this.plusIcon.width = 80;
        this.plusIcon.height = 80;
        this.plusIcon.anchor.set(0.5);
        this.plusIcon.x = app.stage.width * 0.575;
        this.plusIcon.y = app.stage.height * 0.91;
        this.plusIcon.buttonMode = true;
        this.plusIcon.interactive = true;
        this.plusIcon.on('pointerdown', function () {
            _this.buyInText.text = _this.buyInArray[2].toString(), _this.style;
        });
        this.minusIcon.width = 80;
        this.minusIcon.height = 80;
        this.minusIcon.anchor.set(0.5);
        this.minusIcon.x = app.stage.width * 0.42;
        this.minusIcon.y = app.stage.height * 0.9;
        this.minusIcon.buttonMode = true;
        this.minusIcon.interactive = true;
        this.minusIcon.on('pointerdown', function () {
            _this.buyInText.text = _this.buyInArray[0].toString(),
            ;
        });
        app.stage.addChild(this.buyButton);
        app.stage.addChild(this.plusIcon);
        app.stage.addChild(this.minusIcon);
        app.stage.addChild(this.buyInText);
    }
    return bottomMenu;
}());
export { bottomMenu };
//# sourceMappingURL=bottomMenu.js.map