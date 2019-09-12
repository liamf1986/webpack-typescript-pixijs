import * as PIXI from 'pixi.js';
//import sound from 'pixi.js';
import { Game } from './game';
import { app, MAX_SCREEN_WIDTH, MAX_SCREEN_HEIGHT } from './application';
// Canvas dimensions
var ratio = MAX_SCREEN_WIDTH / MAX_SCREEN_HEIGHT;
// Create the Application instance
PIXI.settings.RESOLUTION = window.devicePixelRatio;
calcSize();
// Add the canvas element to the HTML page
document.body.appendChild(app.view);
window.addEventListener("resize", onResize);
// The text to display during loading
var loadingText = new PIXI.Text('Loading... 0%', { fill: "#ffffff" });
// Centering that text
loadingText.x = (app.screen.width * 0.5) - (loadingText.width * 0.5);
loadingText.y = (app.screen.height * 0.5) - (loadingText.height * 0.5);
// Add the text to the stage
app.stage.addChild(loadingText);
// Call the loadProgressHandler() function on every progress event of the Loader
app.loader.on("progress", loadProgressHandler);
// The text to display during loading
var loadingText = new PIXI.Text('Loading... 0%', { fill: "#ffffff" });
// Centering that text
loadingText.x = (app.screen.width * 0.5) - (loadingText.width * 0.5);
loadingText.y = (app.screen.height * 0.5) - (loadingText.height * 0.5);
// Add the text to the stage
app.stage.addChild(loadingText);
// Call the loadProgressHandler() function on every progress event of the Loader
app.loader.on("progress", loadProgressHandler);
// Create the Game instance
var game = new Game();
// Call the Game Loader
game.load(app.loader);
app.renderer.backgroundColor = 0xff668f;
// Load added assets, afterwhich call the onAssetsLoaded function
app.loader.load(onAssetsLoaded);
/**
 * Called each progress event of the loader
 * i.e. Each time an individual item is loaded
 */
function loadProgressHandler() {
    loadingText.text = "Loading... " + app.loader.progress + "%";
}
/**
 * Called once all assets are loaded
 */
function onAssetsLoaded() {
    app.stage.removeChildren();
    // Initialise the game
    game.startGame();
    // Set the game.update function to the app.ticker so it is called every frame
    app.ticker.add(function (delta) { return game.update(delta); });
}
/**
 * Calculate and set the size of the renderer.view.
 */
function calcSize() {
    // Maintain a maximum width as set in globals
    var width = (window.innerWidth > MAX_SCREEN_WIDTH) ? MAX_SCREEN_WIDTH : window.innerWidth;
    // Calculate the height based on a 16:9 ratio
    var height = (width / ratio);
    // If the new Height is greater than the window height recalculate
    if (height > window.innerHeight) {
        height = window.innerHeight;
        width = (height * ratio);
    }
    // Resize the renderer accordingly
    /*
     * This didn't seem to scale Sprites as the canvas got smaller on Desktop.
     * Something to go back to another day
     */
    //app.renderer.resize(width, height);
    // Resizing via style to mantain asset scales
    /*
     * This approach maintains the scale of the assets in the game window
     * but means the canvas must retain the same aspect ratio leaving borders on taller devices.
     */
    app.renderer.view.style.width = width + 'px';
    app.renderer.view.style.height = height + 'px';
}
/**
 * Called when the window is resized
 */
function onResize() {
    // Calculate the new size of the canvas
    calcSize();
    // Resize the game
    /*
     * Currently the game doesn't need to be resized as the render is getting resized via css.
     * This doesn't affect the scale of the assets as long as the ratio is maintained.
     */
    //game.onResize(app);
}
//# sourceMappingURL=index.js.map