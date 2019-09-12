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
import { uiBar } from './healthBar';
import { buttons } from './button';
import { knightAnimations } from './moves';
import { golemAnimations } from './golemMoves';
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(app) {
        var _this = _super.call(this) || this;
        _this.idleFrames = [];
        _this.chanceArray = [];
        _this.damageCount = 0;
        _this.knightDamageCount = 0;
        _this.app = app;
        _this.counter = 0;
        return _this;
    }
    Game.prototype.load = function (loader) {
        loader.add('golemSheet', 'assets/golem-0.json');
        loader.add('golemSheet1', 'assets/golem-1.json');
        loader.add('golemSheet2', 'assets/golem-2.json');
        loader.add('golemSheet3', 'assets/golem-3.json');
        loader.add('knight', 'assets/knight.json');
        loader.add('background', 'assets/background.png');
        loader.add('playButton', 'assets/playButton.png');
        //Health Bars
        loader.add('fullBar', 'assets/healthBarFull.png');
        loader.add('mediumBar', 'assets/healthBarAbout.png');
        loader.add('lowBar', 'assets/healthBarAlmost.png');
        loader.add('emptyBar', 'assets/healthBarDead.png');
    };
    Game.prototype.startGame = function () {
        var _this = this;
        //Background
        this.background = new PIXI.Sprite(this.app.loader.resources.background.texture);
        this.background.width = this.app.screen.width;
        this.background.height = this.app.screen.height;
        this.app.stage.addChild(this.background);
        //Play button
        this.playButton = new buttons(this.app);
        this.playButton.playButton();
        this.playButton.on('pickMove', function () { _this.pickMove(); });
        this.uiBar = new uiBar(200, 4, 4, 900, 280);
        this.app.stage.addChild(this.uiBar);
        this.knightAnimations = new knightAnimations(this.app);
        this.golemAnimations = new golemAnimations(this.app);
        this.keyboardEvents = new KeyboardEvents(this.app);
        this.app.stage.addChild(this.knightAnimations);
        this.app.stage.addChild(this.golemAnimations);
    };
    Game.prototype.pickMove = function () {
        // var randomNumber = Math.floor(Math.random() * 3);
        // var moves = ['attack','miss',"freeze"];
        // //console.log(moves[randomNumber]);
        // var golemMoves = ['attack','miss'];
        // console.log(golemRandomNumber);
        // //console.log(golemMoves[golemRandomNumber], 'Golem Moves');
        var golemRandomNumber = Math.floor(Math.random() * 2);
        var moves = [];
        var attackPCT = 60;
        var freezePCT = 30;
        var missPCT = 10;
        for (var $a = 0; $a < attackPCT; $a++) {
            moves.push('attack');
        }
        for (var $f = 0; $f < freezePCT; $f++) {
            moves.push('freeze');
        }
        for (var $m = 0; $m < missPCT; $m++) {
            moves.push('miss');
        }
        var randomNumber = Math.floor(Math.random() * moves.length);
        console.log(moves[randomNumber]);
        switch (moves[randomNumber]) {
            case 'attack':
                this.knightAnimations.attackAnimation();
                //this.golemAnimations.attackAnimation();
                break;
            case 'miss':
                this.knightAnimations.missAnimation();
                //this.golemAnimations.missAnimation();
                break;
            case 'freeze':
                //freezeAnimation();
                break;
            default:
                console.log('Nothing');
                break;
        }
        if (golemRandomNumber === 0) {
            this.knightDamageCount++;
            if (this.knightDamageCount === 1) {
                this.golemAnimations.attackAnimation();
                this.knightAnimations.hurtAnimation();
                console.log('The knight took damage');
            }
            else if (this.knightDamageCount === 2) {
                this.golemAnimations.attackAnimation();
                this.knightAnimations.hurtAnimation();
                console.log('Bigup the mandem');
            }
            else if (this.knightDamageCount === 3) {
                this.golemAnimations.attackAnimation();
                this.knightAnimations.hurtAnimation();
                console.log('near death');
            }
            else if (this.knightDamageCount >= 4) {
                console.log('You are dead');
                this.knightAnimations.deadAnimation();
                this.playButton.playGameButton.interactive = false;
                this.playButton.playGameButton.buttonMode = false;
                this.knightAnimations.testText.text = 'YOU DIED! Refresh to try again...';
            }
            else {
                console.log(this.knightDamageCount);
            }
        }
        if (moves[randomNumber] === 'attack') {
            this.damageCount++;
            this.golemAnimations.hurtAnimation();
            if (this.damageCount === 1) {
                this.uiBar.setValue(3);
                //this.graphics.alpha = 2;
            }
            else if (this.damageCount === 2) {
                this.uiBar.setValue(2);
                //this.graphics.alpha = 3;
            }
            else if (this.damageCount === 3) {
                this.uiBar.setValue(1);
                //this.graphics.alpha = 4;
            }
            else if (this.damageCount >= 4) {
                this.uiBar.setValue(0);
                //this.graphics.alpha = 5;
                this.golemAnimations.deadAnimation();
                this.knightAnimations.testText.text = 'You Win!';
                this.playButton.playGameButton.interactive = false;
                this.playButton.playGameButton.buttonMode = false;
            }
            else {
                return (console.log(console.error()));
            }
        }
    };
    Game.prototype.setPositions = function (width, height) {
    };
    Game.prototype.update = function (delta) {
        // this.counter++;
        // if (this.counter>20){
        //     console.log("tick")
        //     this.counter=0;
        // }
    };
    /**
     * Called when the window detects a resize
     * @param app The Application instance to be used for this game
     * IMPORTANT: This is currently never called, see index.ts
     */
    Game.prototype.onResize = function (app) {
        this.setPositions(app.screen.width, app.screen.height);
    };
    return Game;
}(PIXI.Container));
export { Game };
//# sourceMappingURL=game.js.map