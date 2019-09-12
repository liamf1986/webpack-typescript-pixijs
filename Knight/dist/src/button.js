var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var buttons = /** @class */ (function (_super) {
    __extends(buttons, _super);
    function buttons(app) {
        var _this = _super.call(this) || this;
        _this.playGameButton = new PIXI.Sprite(app.loader.resources.playButton.texture);
        _this.app = app;
        return _this;
    }
    buttons.prototype.playButton = function () {
        var _this = this;
        this.playGameButton.interactive = true;
        this.playGameButton.buttonMode = true;
        this.app.stage.addChild(this.playGameButton);
        this.playGameButton.on('pointerdown', function () {
            _this.emit('pickMove');
        });
        this.playGameButton.width = 70;
        this.playGameButton.height = 70;
        this.playGameButton.x = this.app.screen.width * 0.5;
        this.playGameButton.y = this.app.screen.height * 0.9;
    };
    return buttons;
}(PIXI.Container));
export { buttons };
//# sourceMappingURL=button.js.map