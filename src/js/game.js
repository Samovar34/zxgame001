//@@include('./options.js')

var game;

window.onload = function () {
    // 960x540
    // 1280×720
    // 1600×900
    // 1920×1080
    game = new Phaser.Game(1280, 720, Phaser.AUTO);
    game.state.add("PreloadGame", preloadGame);
    //game.state.add("PlayGame", playGame);
    game.state.start("PreloadGame");
};
var preloadGame =  function (game) {};
preloadGame.prototype = {
    preload: function () {
        // setup game area
        game.stage.backgroundColor = gameOptions.bgColor;
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.disableVisibilityChange = true;
        
        // loading level tilemap and player image
        game.load.tilemap("level", "/assets/levels/level.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("tile", "/assets/images/tile.png");
        game.load.image("player", "/assets/images/player.png");
    },
    create: function () {
        console.log("create");
        //game.state.start("PlayGame");
    }
};

var playGame = function (game) {};
playGame.prototype = {
    preload: function () {
        
    }
};
