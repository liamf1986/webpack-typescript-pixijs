import * as PIXI from 'pixi.js';
import { Game } from './game';

// Create the Application instance
var app = new PIXI.Application();
// Add the canvas element to the HTML page
document.body.appendChild(app.view);

// Create the Game instance
let game: Game = new Game();

// Call the Game Loader
game.load(app.loader);

// Load added assets, afterwhich call the onAssetsLoaded function
app.loader.load(onAssetsLoaded);

function onAssetsLoaded()
{
    // Initialise the game
    game.startGame(app);
    // Set the game.update function to the app.ticker so it is called every frame
    app.ticker.add((delta) => game.update(delta));
}