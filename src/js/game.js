var AdslJumper = {};

//@@include('./options.js')
//@@include('./input.js')
//@@include('./player.js')
//@@include('./boot.js')
//@@include('./preload.js')
//@@include('./menu.js')
//@@include('./play.js')

var game;
var player;
var cursors;
var rigthButton, leftButton, jumpButton, jumpButton2, runButton;
var debugInfo = {};
var isDevelopment = false;
var isTestFeatures = true; // патаму чта так сказал Сашка К.
var player;

window.onload = function () {
    // 480x270
    // 640x360
    // 960x540
    // 1280×720
    // 1600×900
    // 1920×1080
    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO);
    game.state.add("boot", AdslJumper.bootState);
    game.state.add("preload", AdslJumper.preloadState);
    game.state.add("menu", AdslJumper.menuState);
    game.state.add("play", AdslJumper.playGameState);

    game.state.start("boot");
};




