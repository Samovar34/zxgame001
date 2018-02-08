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

//@@include("./gameObjects/thorn.js")

//@@include('./states/boot.js')
//@@include('./states/preload.js')
//@@include('./states/menu.js')
//@@include('./states/play.js')

// TODO move from global scope
var game;

// TODO delete
var player;

window.onload = function () {
    var gameOptions = AdslJumper.gameOptions.getMainOptions();

    game = new Phaser.Game({
        width: gameOptions.gameWidth,
        height: gameOptions.gameHeight,
        renderer: Phaser.AUTO,
        antialias: false
    });
    game.state.add("boot", AdslJumper.bootState);
    game.state.add("preload", AdslJumper.preloadState);
    game.state.add("menu", AdslJumper.menuState);
    game.state.add("play", AdslJumper.playGameState);

    game.state.start("boot");
};




