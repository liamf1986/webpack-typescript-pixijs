import { Cabinet } from './components/cabinet';
import Spinner from './components/spinner';
import stateMachine from './state-machine/state-machine';
import { PreGameState } from './state-machine/states/preGameState';
import drawBridge from './components/draw-bridge';
import Background from './components/background';
import { add } from 'pixi-sound';
import { HealthBar } from './components/health-bar';
import eventEmitter from './event-emitter';
import events from './events';
import result from './result';

export class Game {
    // Variable definitions
    private cabinet: Cabinet;
    private logo: PIXI.Sprite;
    private app: PIXI.Application;
    private spinner: Spinner;
    private background: Background;

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
        loader.add('logo', 'assets/logo.png');
        loader.add('background', 'assets/background/background.json');
        loader.add('game-background', 'assets/game-background/game-background.png');
        loader.add('window', 'assets/window.png');
        loader.add('spinner-dagger', 'assets/spinner/dagger.png');
        loader.add('spinner-shield', 'assets/spinner/shield.png');
        loader.add('spinner-magic', 'assets/spinner/wand.png');
    }
    
    /**
     * Called once to initialise the game before the Update loop begins
     * @param app The Application instance to be used for this game
     */
    startGame(app: PIXI.Application) : void {
        // create your assets: Sprites, Sounds, etc...
        
        

        this.logo = new PIXI.Sprite(app.loader.resources.logo.texture);

        drawBridge.init(app.loader.resources['background'].spineData);

        // Set any constiant data
        this.logo.anchor.set(0.5);

        // Position any objects based on screen dimensions
        this.setPositions(app.screen.width, app.screen.height);

        this.background = new Background(app.loader.resources['game-background'].texture);

        this.spinner = new Spinner({
            dagger: app.loader.resources['spinner-dagger'].texture,
            magic: app.loader.resources['spinner-magic'].texture,
            shield: app.loader.resources['spinner-shield'].texture
        });
        this.spinner.init(100, 100, 60);

        // Add any objects to the stage so they can be drawn
        //app.stage.addChild(this.logo);
        app.stage.addChild(this.background);
        app.stage.addChild(this.spinner);
        app.stage.addChild(drawBridge.animation);

        this.cabinet.draw(app);
        stateMachine.cabinet = this.cabinet;
        stateMachine.changeToState(new PreGameState());

        const playerHealthBar = new HealthBar(4);
        playerHealthBar.init(app.loader);
        app.stage.addChild(playerHealthBar);
        eventEmitter.on(events.GAME.DAMAGE_PLAYER, () => playerHealthBar.health = result.health);

        const enemyHealthBar = new HealthBar(4);
        enemyHealthBar.init(app.loader);
        enemyHealthBar.x = 1275;
        app.stage.addChild(enemyHealthBar);
        eventEmitter.on(events.GAME.DAMAGE_ENEMY, () => enemyHealthBar.health = result.enemyHealth);
    }

    /**
     * Positional data is based on screen size so will change on mobile Orientation changes (possibly mid-game).
     * This function can be called when required to reposition all objects.
     * @param width The width of the game area in pixels
     * @param height The height of the game area in pixels
     */
    setPositions(width: number, height: number) : void {
        this.logo.x = width / 2;
        this.logo.y = height / 2;
    }

    /**
     * Called once every frame
     * @param delta time between this frame and the last, used to ensure frame-rate independant animations
     */
    update(delta: number) : void {
        this.spinner.spin(0.1 * delta);
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