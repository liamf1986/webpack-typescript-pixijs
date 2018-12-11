
import * as PIXI from 'pixi.js';
import * as PIXISound from 'pixi-sound';
import { Game } from './game';

// Create the Application instance
var app = new PIXI.Application();
// Add the canvas element to the HTML page
document.body.appendChild(app.view);

// The text to display during loading
var loadingText = new PIXI.Text('Loading... 0%', {fill:"#ffffff"});
// Centering that text
loadingText.x = (app.screen.width * 0.5) - (loadingText.width * 0.5);
loadingText.y = (app.screen.height * 0.5) - (loadingText.height * 0.5);
// Add the text to the stage
app.stage.addChild(loadingText);
// Call the loadProgressHandler() function on every progress event of the Loader
app.loader.on("progress", loadProgressHandler);

// Create the Game instance
let game = new Game();

// Call the Game Loader
game.load(app.loader);

// Load added assets, afterwhich call the onAssetsLoaded function
app.loader.load(onAssetsLoaded);

/**
 * Called each progress event of the loader
 * i.e. Each time an individual item is loaded
 */
function loadProgressHandler() : void {
    loadingText.text = "Loading... " + app.loader.progress + "%";
}

/**
 * Called once all assets are loaded
 */
function onAssetsLoaded() : void
{
    app.stage.removeChildren();
    // Initialise the game
    game.startGame(app);
    // Set the game.update function to the app.ticker so it is called every frame
    app.ticker.add((delta) => game.update(delta));
}