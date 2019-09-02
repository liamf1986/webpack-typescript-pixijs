import { Application } from 'pixi.js';
import { Icons } from './icon';
import { buttons } from './buttons';

export class Game {
    // Variable definitions
    private app = new Application();
    private icons = new Icons();
    private buttons = new buttons();

    //private spriteArray: PIXI.Sprite[] = [];
    private numberArray: number[] = [];
    private winningSymbolCount: number = 0;
    private winningText: PIXI.Text;
    private balance: number = 0;

    private style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 100,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
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


    /**
     * Constructor for the Game Object
     */
    constructor() {
    }
    /**
     * Load function called before startGame to load all required assets
     * @param loader The loader to add these assets too
     */
    load(loader: PIXI.loaders.Loader) : void {
        loader.add('logo', 'assets/logo.png');
        loader.add('hopper', 'assets/cartoon hopper.png');
        loader.add('bat', 'assets/cartoon bat.png');
        loader.add('car', 'assets/cartoon police car.png');
        loader.add('ell', 'assets/gun.png');
        loader.add('bulb', 'assets/cartoon lightbulb.png');
        loader.add('monster', 'assets/cartoon monster.png');
        loader.add('faceDown', 'assets/stopSign.png');
        loader.add('reset','assets/reset.png');
        loader.add('win','assets/win.png');
        loader.add('howToPlayButton','assets/htp button.png')
    }

    /**
     * Called once to initialise the game before the Update loop begins
     * @param app The Application instance to be used for this game
     */
    startGame(app: PIXI.Application) : void {
        // create your assets: Sprites, Sounds, etc...
        // Set any constiant data
        this.buttons.button(app);
        this.buttons.htp(app);
        this.buttons.on('resetEvent', () => {this.resetGame(app)});
        app.stage.addChild(this.buttons);
        //Set circle Graphics points
        // var graphicPoints = [[0.25,0.25],[0.5,0.25],[0.75,0.25],[0.25,0.5],[0.5,0.5],[0.75,0.5],[0.25,0.75],[0.5,0.75],[0.75,0.75]];
        this.icons.setupGame(app);
        this.winningText = new PIXI.Text('You Win!',this.style);

        // Position any objects based on screen dimensions
        this.setPositions(app.screen.width, app.screen.height);
    }

    /**
     * Positional data is based on screen size so will change on mobile Orientation changes (possibly mid-game).
     * This function can be called when required to reposition all objects.
     * @param width The width of the game area in pixels
     * @param height The height of the game area in pixels
     */
    setPositions(width: number, height: number) : void {
        
    }

    resetGame(app: PIXI.Application){
        this.icons.spriteArray.forEach(icon => {
            icon.texture = app.loader.resources.faceDown.texture;
            icon.interactive = true;
            icon.buttonMode = true;
            icon.visible = true;
            icon.width = 170;
        });

        this.winningSymbolCount = 0;
        this.numberArray = [];
        this.winningText.visible = false;
        console.log(this.winningText)
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
}

