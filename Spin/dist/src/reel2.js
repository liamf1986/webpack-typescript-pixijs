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
var reelTwo = /** @class */ (function (_super) {
    __extends(reelTwo, _super);
    function reelTwo() {
        return _super.call(this, app.screen.width * 0.43, 25) || this;
    }
    return reelTwo;
}(baseReel));
export { reelTwo };
//# sourceMappingURL=reel2.js.map