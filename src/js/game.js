//@@include('./options.js')

var game;

window.onload = function () {
    game = new Phaser.Game(640, 480, Phaser.AUTO);
    game.state.add("PreloadGame", preloadGame);
    //game.state.add("PlayGame", playGame);
    game.state.start("PreloadGame");
};
function preloadGame(game) {};
preloadGame.prototype = {
    preload: function () {
        // setup game area
        game.stage.backgroundColor = gameOptions.bgColor;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.disableVisibilityChange = true;
        
        // loading level tilemap and player image
        game.load.tilemap("level", "/assets/levels/level.json", Phaser.Tilemap.TILED_JSON);
        game.load.image("tile", "/assets/images/tile.png");
        game.load.image("player", "/assets/images/player.png");
    },
    create: function () {
        console.log("create");
        //game.state.start("PlayGame");
    }
};

function playGame (game) {};
playGame.prototype = {
    preload: function () {
        
    }
}