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
import { app } from "./application";
var baseReel = /** @class */ (function (_super) {
    __extends(baseReel, _super);
    function baseReel(x, y) {
        var _this = _super.call(this) || this;
        _this.iconSize = 175;
        _this.reelIcons = [];
        _this.spriteReel = [];
        for (var i = 0; i < 8; i++) {
            _this.reelIcons.push(app.loader.resources['icon' + (i + 1)].texture);
        }
        for (var i = 0; i < 3; i++) {
            console.log(Math.floor(Math.random() * _this.reelIcons.length));
            _this.icons = new PIXI.Sprite(_this.reelIcons[Math.floor(Math.random() * _this.reelIcons.length)]);
            _this.icons.y = y + (i * _this.iconSize);
            _this.icons.scale.x = _this.icons.scale.y = Math.min(_this.iconSize / _this.icons.width, _this.iconSize / _this.icons.height);
            _this.icons.x = x + Math.round((_this.iconSize - _this.icons.width) / 2);
            _this.spriteReel.push(_this.icons);
            _this.addChild(_this.icons);
        }
        return _this;
    }
    baseReel.prototype.startGame = function () {
    };
    return baseReel;
}(PIXI.Container));
export { baseReel };
//# sourceMappingURL=baseReel.js.map