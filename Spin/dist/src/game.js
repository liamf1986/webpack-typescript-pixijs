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
import { app } from './application';
import { reelOne } from './reel1';
import { reelTwo } from './reel2';
import { reelThree } from './reel3';
import { bottomMenu } from './bottomMenu';
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.reelIcons = [];
        _this.allReelsContainer = new PIXI.Container();
        _this.allReelsContainer.name = 'Reel Container';
        return _this;
    }
    Game.prototype.load = function (loader) {
        //Sprites (png)
        loader.add('icon1', 'assets/icons/7Spin.png');
        loader.add('icon2', 'assets/icons/barSpin.png');
        loader.add('icon3', 'assets/icons/cherrySpin.png');
        loader.add('icon4', 'assets/icons/fruitSpin.png');
        loader.add('icon5', 'assets/icons/bannaSpin.png');
        loader.add('icon6', 'assets/icons/orangeSpin.png');
        loader.add('icon7', 'assets/icons/winSpin.png');
        loader.add('icon8', 'assets/icons/lemonSpin.png');
        loader.add('buyButton', 'assets/buyIcon.png');
        loader.add('plusIcon', 'assets/plusIcon.png');
        loader.add('minusIcon', 'assets/minusIcon.png');
        loader.add('background', 'assets/background1.jpg');
    };
    Game.prototype.startGame = function () {
        this.background = new PIXI.Sprite(app.loader.resources.background.texture);
        this.background.width = app.screen.width;
        this.background.height = app.screen.height;
        app.stage.addChild(this.background);
        this.BottomMenu = new bottomMenu();
        app.stage.addChild(this.BottomMenu.buyButton);
        this.reel1 = new reelOne();
        this.reel2 = new reelTwo();
        this.reel3 = new reelThree();
        this.allReelsContainer.x = app.screen.width * 0.5;
        for (var i = 0; i < 5; i++) {
            this.reelIcons.push(PIXI.Texture.from('icon' + (i + 1)));
            console.log(this.reelIcons[i]);
        }
        app.stage.addChild(this.reel1);
        app.stage.addChild(this.reel2);
        app.stage.addChild(this.reel3);
    };
    Game.prototype.update = function (delta) {
    };
    return Game;
}(PIXI.Container));
export { Game };
//# sourceMappingURL=game.js.map