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
var uiBar = /** @class */ (function (_super) {
    __extends(uiBar, _super);
    function uiBar(maxWidth, maxValue, maxSegments, horisontalPos, verticalPos) {
        var _this = _super.call(this) || this;
        _this.maxWidth = maxWidth;
        _this.maxSegments = maxSegments;
        _this.segmentSize = maxWidth / maxSegments;
        _this.maxValue = maxValue;
        _this.y = verticalPos;
        _this.x = horisontalPos;
        _this.setValue(maxValue);
        return _this;
    }
    uiBar.prototype.setValue = function (newValue) {
        this.clear();
        this.beginFill(0x881111);
        this.drawRect(0, 0, this.maxWidth, 20);
        this.beginFill(0xff2222);
        this.drawRect(0, 0, this.segmentSize * newValue, 20);
        this.endFill();
    };
    return uiBar;
}(PIXI.Graphics));
export { uiBar };
//# sourceMappingURL=healthBar.js.map