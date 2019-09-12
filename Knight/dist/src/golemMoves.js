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
import { TweenLite, Elastic } from "gsap";
var golemAnimations = /** @class */ (function (_super) {
    __extends(golemAnimations, _super);
    function golemAnimations(app) {
        var _this = _super.call(this) || this;
        //Idle Golem Var
        _this.idleFrames = [];
        //Attack Golem Var
        _this.attackGolemFrames = [];
        //Dead Golem Var
        _this.deadGolemFrames = [];
        _this.app = app;
        // //Animated Dead Golem Attack
        for (var i = 0; i < 5; i++) {
            _this.deadGolemFrames.push(PIXI.Texture.fromFrame('GolemDead' + (i + 1) + '@2x.png'));
        }
        _this.deadGolemAnim = new PIXI.extras.AnimatedSprite(_this.deadGolemFrames);
        _this.deadGolemAnim.visible = false;
        _this.addChild(_this.deadGolemAnim);
        //Animated Golem Attack
        for (var i = 0; i < 7; i++) {
            _this.attackGolemFrames.push(PIXI.Texture.fromFrame('GolemAttack' + (i + 1) + '@2x.png'));
        }
        _this.attackGolemAnim = new PIXI.extras.AnimatedSprite(_this.attackGolemFrames);
        _this.attackGolemAnim.visible = false;
        _this.addChild(_this.attackGolemAnim);
        //Animated Golem Idle Sprite
        for (var i = 0; i < 6; i++) {
            _this.idleFrames.push(PIXI.Texture.fromFrame('GolemIdle' + (i + 1) + '@2x.png'));
        }
        _this.idleAnim = new PIXI.extras.AnimatedSprite(_this.idleFrames);
        _this.addChild(_this.idleAnim);
        _this.idleAnim.loop = true;
        _this.width = _this.app.screen.width * 0.5;
        _this.scale.y = _this.scale.x;
        _this.x = 1320 - _this.width * 0.5;
        _this.y = 700 - _this.height * 0.5;
        _this.scale.x = -_this.scale.x;
        _this.attackGolemAnim.animationSpeed = 0.16;
        _this.idleAnim.animationSpeed = 0.16;
        _this.idleAnim.anchor.set(0.5);
        _this.idleAnim.play();
        _this.attackGolemAnim.onComplete = function () {
            _this.attackGolemAnim.visible = false;
            _this.idleAnim.visible = true;
        };
        _this.deadGolemAnim.onComplete = function () {
            _this.deadGolemAnim.visible = true;
            _this.idleAnim.visible = false;
        };
        return _this;
    }
    golemAnimations.prototype.attackAnimation = function () {
        this.attackGolemAnim.position.x = -670;
        this.attackGolemAnim.position.y = -600;
        this.attackGolemAnim.loop = false;
        this.attackGolemAnim.visible = true;
        this.idleAnim.visible = false;
        this.attackGolemAnim.gotoAndPlay(0);
        TweenLite.to(this.attackGolemAnim, 1, { x: -600, y: -600 });
    };
    golemAnimations.prototype.hurtAnimation = function () {
        var _this = this;
        var oldCords = [this.x, this.y];
        TweenLite.to(this, 1, { x: oldCords[0] + 20, y: oldCords[1] + 5, ease: Elastic.easeOut.config(2.5, 0.3), onComplete: function () {
                _this.x = oldCords[0];
                _this.y = oldCords[1];
            } });
    };
    golemAnimations.prototype.missAnimation = function () {
        this.attackGolemAnim.position.x = -670;
        this.attackGolemAnim.position.y = -600;
        this.attackGolemAnim.loop = false;
        this.attackGolemAnim.visible = true;
        this.idleAnim.visible = false;
        this.attackGolemAnim.gotoAndPlay(0);
    };
    golemAnimations.prototype.deadAnimation = function () {
        this.deadGolemAnim.position.x = -670;
        this.deadGolemAnim.position.y = -600;
        this.deadGolemAnim.loop = false;
        this.deadGolemAnim.visible = true;
        this.idleAnim.visible = false;
        this.deadGolemAnim.gotoAndPlay(0);
        // this.deadGolemAnim.position.x = -670;
        // this.deadGolemAnim.position.y = -600;
        // this.deadGolemAnim.visible = true;
        // this.idleAnim.visible = false;
        // this.attackGolemAnim.visible = false;
    };
    return golemAnimations;
}(PIXI.Container));
export { golemAnimations };
//# sourceMappingURL=golemMoves.js.map