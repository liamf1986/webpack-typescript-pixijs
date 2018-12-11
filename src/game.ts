export class Game {
    // Variable definitions
    private logo: PIXI.Sprite;

    /**
     * Constructor for the Game Object
     */
    constructor() {}

    /**
     * Load function called before startGame to load all required assets
     * @param loader The loader to add these assets too
     */
    load(loader: PIXI.loaders.Loader) {
        loader.add('logo', 'assets/logo.png');
    }
    
    /**
     * 
     * @param app The Application instance to be used for this game
     */
    startGame(app: PIXI.Application) {
        // create your assets: Sprites, Sounds, etc...
        this.logo = new PIXI.Sprite(app.loader.resources.logo.texture);

        // Set any constiant data
        this.logo.anchor.set(0.5);

        // Position any objects based on screen dimensions
        this.setPositions(app.screen.width, app.screen.height);

        // Add any objects to the stage so they can be drawn
        app.stage.addChild(this.logo);
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
    setPositions(width: number, height: number) {
        this.logo.x = width / 2;
        this.logo.y = height / 2;
    }

    /**
     * Called once every frame
     * @param delta time between this frame and the last, used to ensure frame-rate independant animations
     */
    update(delta: number)
    {
        this.logo.rotation += 0.1 * delta;
    }
}