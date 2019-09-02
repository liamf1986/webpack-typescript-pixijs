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
var knightAnimations = /** @class */ (function (_super) {
    __extends(knightAnimations, _super);
    function knightAnimations(app) {
        var _this = _super.call(this) || this;
        _this.deadKnightFrames = [];
        _this.hurtKnightFrames = [];
        _this.attackKnightFrames = [];
        _this.idleKnightFrames = [];
        //Text Styling
        _this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 60,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'],
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });
        _this.app = app;
        //Attack Animation
        for (var i = 0; i < 9; i++) {
            _this.attackKnightFrames.push(PIXI.Texture.fromFrame('Attack' + (i + 1 + '.png')));
        }
        _this.attackKnightAnim = new PIXI.extras.AnimatedSprite(_this.attackKnightFrames);
        _this.attackKnightAnim.visible = false;
        _this.addChild(_this.attackKnightAnim);
        //Hurt Animation
        for (var i = 0; i < 9; i++) {
            _this.hurtKnightFrames.push(PIXI.Texture.fromFrame('Hurt' + (i + 1 + '.png')));
        }
        _this.hurtKnightAnim = new PIXI.extras.AnimatedSprite(_this.hurtKnightFrames);
        _this.hurtKnightAnim.visible = false;
        _this.addChild(_this.hurtKnightAnim);
        //Miss Animation
        _this.missKnightAnim = new PIXI.extras.AnimatedSprite(_this.attackKnightFrames);
        _this.missKnightAnim.visible = false;
        _this.addChild(_this.missKnightAnim);
        //Death Animation
        for (var i = 0; i < 9; i++) {
            _this.deadKnightFrames.push(PIXI.Texture.fromFrame('Die' + (i + 1 + '.png')));
        }
        _this.deadKnightAnim = new PIXI.extras.AnimatedSprite(_this.deadKnightFrames);
        _this.deadKnightAnim.visible = false;
        _this.addChild(_this.deadKnightAnim);
        //Animated Knight Idle Sprite
        for (var i = 0; i < 9; i++) {
            _this.idleKnightFrames.push(PIXI.Texture.fromFrame('Idle' + (i + 1 + '.png')));
        }
        _this.idleKnightAnim = new PIXI.extras.AnimatedSprite(_this.idleKnightFrames);
        _this.idleKnightAnim.loop = true;
        _this.addChild(_this.idleKnightAnim);
        _this.width = _this.app.screen.width * 0.3;
        _this.scale.y = _this.scale.x;
        _this.x = 120 - _this.width * 0.5;
        _this.y = 540 - _this.height * 0.5;
        _this.idleKnightAnim.animationSpeed = 0.16;
        _this.attackKnightAnim.animationSpeed = 0.16;
        _this.hurtKnightAnim.animationSpeed = 0.16;
        _this.idleKnightAnim.play();
        //Text
        _this.testText = new PIXI.Text('', _this.style);
        _this.testText.x = _this.app.screen.width * 0.4;
        _this.app.stage.addChild(_this.testText);
        _this.attackKnightAnim.onComplete = function () {
            _this.visableAnimationState(_this.idleKnightAnim);
        };
        _this.hurtKnightAnim.onComplete = function () {
            _this.visableAnimationState(_this.idleKnightAnim);
        };
        _this.missKnightAnim.onComplete = function () {
            _this.visableAnimationState(_this.idleKnightAnim);
        };
        return _this;
    }
    knightAnimations.prototype.attackAnimation = function () {
        this.testText.text = 'You swung your sword and struck the Ice Golem';
        this.attackKnightAnim.loop = false;
        this.visableAnimationState(this.attackKnightAnim);
        this.attackKnightAnim.gotoAndPlay(0);
    };
    knightAnimations.prototype.hurtAnimation = function () {
        this.testText.text = 'The ice golem hit you and you took damage';
        this.hurtKnightAnim.loop = false;
        this.visableAnimationState(this.hurtKnightAnim);
        this.hurtKnightAnim.gotoAndPlay(0);
    };
    knightAnimations.prototype.missAnimation = function () {
        this.attackKnightAnim.loop = false;
        this.testText.text = 'You missed the Ice golem!';
        this.visableAnimationState(this.attackKnightAnim);
        this.attackKnightAnim.gotoAndPlay(0);
    };
    knightAnimations.prototype.deadAnimation = function () {
        this.deadKnightAnim.loop = false;
        this.testText.text = 'You`re dead! Hit the refresh button and try again!';
        this.visableAnimationState(this.deadKnightAnim);
        this.deadKnightAnim.gotoAndPlay(0);
    };
    knightAnimations.prototype.freeze = function () {
    };
    knightAnimations.prototype.visableAnimationState = function (animation) {
        this.deadKnightAnim.visible = false;
        this.idleKnightAnim.visible = false;
        this.missKnightAnim.visible = false;
        this.hurtKnightAnim.visible = false;
        this.attackKnightAnim.visible = false;
        animation.visible = true;
    };
    return knightAnimations;
}(PIXI.Container));
export { knightAnimations };
//# sourceMappingURL=moves.js.map