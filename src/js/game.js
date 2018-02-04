var AdslJumper = {};

// loaded game components, such Input, BoomBox
AdslJumper.modules = {};

//@@include('./options.js')

//@@include('./components/soundManager.js')
//@@include('./components/input.js')
//@@include('./components/utils.js')
//@@include('./components/player.js')
//@@include('./components/exitDoor.js')
//@@include('./components/gameObjectFactory.js')


//@@include('./states/boot.js')
//@@include('./states/preload.js')
//@@include('./states/menu.js')
//@@include('./states/play.js')

// TODO move from global scope
var game;
// var player;
// var cursors;
// var rigthButton, leftButton, jumpButton, jumpButton2, runButton;
// var debugInfo = {};
// var isDevelopment = false;
// var isTestFeatures = true; // патаму чта так сказал Сашка К.

// TODO delete
var player;

window.onload = function () {
    // 480x270
    // 640x360
    // 960x540
    // 1280×720
    // 1600×900
    // 1920×1080
    var gameOptions = AdslJumper.gameOptions.getMainOptions();

    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO);
    game.state.add("boot", AdslJumper.bootState);
    game.state.add("preload", AdslJumper.preloadState);
    game.state.add("menu", AdslJumper.menuState);
    game.state.add("play", AdslJumper.playGameState);

    game.state.start("boot");
};




