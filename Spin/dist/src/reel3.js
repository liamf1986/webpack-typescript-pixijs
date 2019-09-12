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
import { baseReel } from './baseReel';
import { app } from './application';
var reelThree = /** @class */ (function (_super) {
    __extends(reelThree, _super);
    function reelThree() {
        return _super.call(this, app.screen.width * 0.64, 25) || this;
    }
    return reelThree;
}(baseReel));
export { reelThree };
//# sourceMappingURL=reel3.js.map