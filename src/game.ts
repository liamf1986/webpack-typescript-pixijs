import { Cabinet } from './components/cabinet';
import { Popup } from './components/popup'
import Spinner from './components/spinner';
import stateMachine from './state-machine/state-machine';
import { PreGameState } from './state-machine/states/preGameState';
import { TweenMax } from "gsap";

export class Game {
    // Variable definitions
    private cabinet: Cabinet;

    private popup: Popup;
    private app: PIXI.Application;
    private spinner: Spinner;

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

        this.popup = new Popup();
        this.popup.load(loader); 
    }
    
    /**
     * Called once to initialise the game before the Update loop begins
     * @param app The Application instance to be used for this game
     */
    startGame(app: PIXI.Application) : void {
        // create your assets: Sprites, Sounds, etc...
        this.cabinet.draw(app);
        stateMachine.cabinet = this.cabinet;
        stateMachine.changeToState(new PreGameState());

        this.popup.draw(app);

        // Set any constiant data
        //this.popup.anchor.set(0.5);
        this.popup.scale.set(1);

        TweenMax.fromTo(this.popup, 1, {x:650, y:1000}, {x:650, y:300});

        // Position any objects based on screen dimensions
        this.setPositions(app.screen.width, app.screen.height);

        // Add any objects to the stage so they can be drawn
        app.stage.addChild(this.popup);

        this.createSpinner();
        /**
         * Anything you don't want to draw yet should still be added
         * but set the visible value to false
         * eg. this.logo.visible = false;
         * 
         * This can be set to true when you want to display it.
         */
    }

    /**
     * Positional data is based on screen size so will change on mobile Orientation changes (possibly mid-game).
     * This function can be called when required to reposition all objects.
     * @param width The width of the game area in pixels
     * @param height The height of the game area in pixels
     */
    setPositions(width: number, height: number) : void {
        this.popup.x = width / 2;
        this.popup.y = height / 2;
    }

    /**
     * Called once every frame
     * @param delta time between this frame and the last, used to ensure frame-rate independant animations
     */
    update(delta: number) : void {
        //this.logo.rotation += 0.1 * delta;
    }

    /**
     * Called when the window detects a resize
     * @param app The Application instance to be used for this game
     * IMPORTANT: This is currently never called, see index.ts
     */
    onResize(app: PIXI.Application) : void {
        this.setPositions(app.screen.width, app.screen.height);
    }

    private createSpinner(): void {
        this.spinner = new Spinner();

        this.app.stage.addChild(this.spinner);
    }
}