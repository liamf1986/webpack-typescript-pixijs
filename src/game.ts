import { Cabinet } from './components/cabinet';
import popup, { Popup } from './components/popup'
import Spinner from './components/spinner';
import stateMachine from './state-machine/state-machine';
import { PreGameState } from './state-machine/states/preGameState';
import { TweenMax } from "gsap";
import drawBridge from './components/draw-bridge';
import Background from './components/background';
import { add } from 'pixi-sound';
import { playerHealthBar, enemyHealthBar } from './components/health-bar';
import eventEmitter from './event-emitter';
import events from './events';
import result from './result';
import { Party } from './components/party';
import enemyParty, { EnemyParty } from './components/enemyParty';
import screenTransition from './components/screen-transition';

export class Game {
    // Variable definitions
    private cabinet: Cabinet;

    private app: PIXI.Application;
    private playerSpinner: Spinner;
    private enemySpinner: Spinner;
    private background: Background;
    private party: Party;

    /**
     * Constructor for the Game Object
     */
    constructor(app: PIXI.Application) {
        this.app = app;
    }

    /**
     * Load function called before startGame to load all required assets
     * @param loader The loader to add these assets too
     */
    load(loader: PIXI.loaders.Loader) : void {
        this.cabinet = new Cabinet();
        this.cabinet.load(loader);
        loader.add('popup', 'assets/Pop-up.png');

        popup.load(loader); 
        loader.add('logo', 'assets/logo.png');
        loader.add('background', 'assets/background/background.json');
        loader.add('game-background', 'assets/game-background/game-background.png');
        loader.add('window', 'assets/window.png');
        loader.add('spinner-dagger', 'assets/spinner/dagger.png');
        loader.add('spinner-shield', 'assets/spinner/shield.png');
        loader.add('spinner-magic', 'assets/spinner/wand.png');

        this.party = new Party();
        this.party.load(loader);

        enemyParty.load(loader);

        this.playerSpinner = new Spinner(undefined);
        this.playerSpinner.load(loader);
        this.enemySpinner = new Spinner(undefined);

        // sounds
        PIXI.sound.add('bgMusic', {url: 'assets/audio/cave-ambient-noise.{wav}'});
        PIXI.sound.add('humanDamage', {url: 'assets/audio/human-damage-taken.{wav}'});
        PIXI.sound.add('monsterDamage', {url: 'assets/audio/monster-damage-taken.{wav}'});
        PIXI.sound.add('attackDagger', {url: 'assets/audio/attack-dagger.{wav}'});
        PIXI.sound.add('attackShield', {url: 'assets/audio/attack-shield.{wav}'});
        PIXI.sound.add('attackSpell', {url: 'assets/audio/attack-spell.{wav}'});
        PIXI.sound.add('attackMonster', {url: 'assets/audio/attack-monster.{wav}'});
        PIXI.sound.add('attackGolem', {url: 'assets/audio/attack-golem.{wav}'});
        PIXI.sound.add('attackDraw', {url: 'assets/audio/attack-draw.{wav}'});
    }
    
    /**
     * Called once to initialise the game before the Update loop begins
     * @param app The Application instance to be used for this game
     */
    startGame(app: PIXI.Application) : void {
        popup.draw(app);

        drawBridge.init(app.loader.resources['background'].spineData);

        // Set any constiant data

        // Position any objects based on screen dimensions
        this.setPositions(app.screen.width, app.screen.height);

        this.background = new Background(app.loader.resources['game-background'].texture);

        /* let spinnerResources = {
            dagger: app.loader.resources['spinner-dagger'].texture,
            magic: app.loader.resources['spinner-magic'].texture,
            shield: app.loader.resources['spinner-shield'].texture
        } */
        /* this.playerSpinner = new Spinner(spinnerResources);
        this.playerSpinner.init(300, 150, 100); */
        this.playerSpinner.draw(app);
        this.playerSpinner.position.set(300, 150);

        this.enemySpinner.draw(app);
        this.enemySpinner.position.set(1000, 150);

        // Add any objects to the stage so they can be drawn
        
        app.stage.addChild(this.background);
        
        this.party.draw();
        this.party.position.set(200, 450);
        app.stage.addChild(this.party);

        enemyParty.draw();
        enemyParty.position.set(1000, 350);
        enemyParty.init();
        app.stage.addChild(enemyParty);

        playerHealthBar.init(app.loader);
        app.stage.addChild(playerHealthBar);
        eventEmitter.on(events.GAME.DAMAGE_PLAYER, () => playerHealthBar.health = result.health);

        enemyHealthBar.init(app.loader);
        enemyHealthBar.x = 1235;
        app.stage.addChild(enemyHealthBar);
        eventEmitter.on(events.GAME.DAMAGE_ENEMY, () => enemyHealthBar.health = result.enemyHealth);

        app.stage.addChild(this.playerSpinner);
        app.stage.addChild(this.enemySpinner);

        //this.popup.anchor.set(0.5);
        // popup.scale.set(1);
        //TweenMax.fromTo(this.popup, 1, {x:650, y:1000}, {x:650, y:300});
        app.stage.addChild(popup);

        app.stage.addChild(drawBridge.animation);
        app.stage.addChild(screenTransition);

        this.cabinet.draw(app);
        stateMachine.cabinet = this.cabinet;
        stateMachine.playerSpinner = this.playerSpinner;
        stateMachine.enemySpinner = this.enemySpinner;
        stateMachine.party = this.party;
        stateMachine.changeToState(new PreGameState());
    }

    /**
     * Positional data is based on screen size so will change on mobile Orientation changes (possibly mid-game).
     * This function can be called when required to reposition all objects.
     * @param width The width of the game area in pixels
     * @param height The height of the game area in pixels
     */
    setPositions(width: number, height: number) : void {
        popup.x = width / 2;
        popup.y = height / 2;
    }

    /**
     * Called once every frame
     * @param delta time between this frame and the last, used to ensure frame-rate independant animations
     */
    update(delta: number) : void {
    }

    /**
     * Called when the window detects a resize
     * @param app The Application instance to be used for this game
     * IMPORTANT: This is currently never called, see index.ts
     */
    onResize(app: PIXI.Application) : void {
        this.setPositions(app.screen.width, app.screen.height);
    }
}