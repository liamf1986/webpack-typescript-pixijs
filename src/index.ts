import * as PIXI from 'pixi.js';
import { Game } from './game';

// Create the Application instance
var app = new PIXI.Application();
// Add the canvas element to the HTML page
document.body.appendChild(app.view);

var loadingText = new PIXI.Text('Loading... 0%', {fill:"#ffffff"});
loadingText.x = (app.view.width * 0.5) - (loadingText.width * 0.5);
loadingText.y = (app.view.height * 0.5) - (loadingText.height * 0.5);

app.stage.addChild(loadingText);
app.loader.on("progress", loadProgressHandler);

// Create the Game instance
let game = new Game();

// Call the Game Loader
game.load(app.loader);

// Load added assets, afterwhich call the onAssetsLoaded function
app.loader.load(onAssetsLoaded);

function loadProgressHandler() : void {
    loadingText.text = "Loading... " + app.loader.progress + "%";
}

function onAssetsLoaded() : void
{
    app.stage.removeChildren();
    // Initialise the game
    game.startGame(app);
    // Set the game.update function to the app.ticker so it is called every frame
    app.ticker.add((delta) => game.update(delta));
}