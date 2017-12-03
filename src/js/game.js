//@@include('./options.js')

var game;
var player;

var canvasWidth = 320;
var canvasHeight = 240;
var resizeRatio = 1;

window.onload = function () {
    // 480x270
    // 960x540
    // 1280×720
    // 1600×900
    // 1920×1080
    game = new Phaser.Game(480, 270, Phaser.AUTO);
    game.state.add("PreloadGame", preloadGame);
    game.state.add("PlayGame", playGame);
    game.state.start("PreloadGame");
};
var preloadGame =  function (game) {};
preloadGame.prototype = {
    preload: function () {
        // setup game area
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = gameOptions.bgColor;
        game.renderer.renderSession.roundPixels = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.disableVisibilityChange = true;
        

    },
    create: function () {
        console.log("create");
        console.log("preload", resizeRatio);
        game.state.start("PlayGame");
    }
};

var playGame = function (game) {};
playGame.prototype = {
    preload: function () {
        game.load.tilemap('map', 'assets/levels/layout1.csv', null, Phaser.Tilemap.CSV);
        game.load.image('tiles', 'assets/images/tilemap.png');
        game.load.image("player", "/assets/images/player.png");
    },

    create: function () {
        var map = game.add.tilemap("map", 16, 16);
        map.addTilesetImage("tiles");
        var layer = map.createLayer(0);
        layer.resizeWorld();
        player = game.add.sprite(80, 80, "player");
        player.anchor.setTo(0.5);
        player.scale.setTo(0.7);
        player.smoothed = false;

    }
};
