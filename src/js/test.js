var AdslJumper = {};

// loaded game components, such Input, SoundManager
AdslJumper.modules = {};

//@@include('./include.js')

// TODO move from global scope
var game;

// TODO delete
var player;

window.onload = function () {

    game = new Phaser.Game({
        width: AdslJumper.gameOptions.gameWidth,
        height: AdslJumper.gameOptions.gameHeight,
        renderer: Phaser.AUTO,
        antialias: false
    });

    game.state.add("boot", AdslJumper.bootState);
    game.state.add("preload", AdslJumper.preloadState);
    game.state.add("waitDecodeAudio", AdslJumper.testState);
    // game.state.add("menu", AdslJumper.menuState);
    // game.state.add("play", AdslJumper.testState);

    game.state.start("boot");
};




