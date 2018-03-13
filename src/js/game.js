var AdslJumper = {};

// loaded game components, such Input, BoomBox
AdslJumper.modules = {};

//@@include('./include.js')


window.onload = function () {
    var gameOptions = AdslJumper.gameOptions.getMainOptions();

    var game = new Phaser.Game({
        width: gameOptions.gameWidth,
        height: gameOptions.gameHeight,
        renderer: Phaser.AUTO,
        enableDebug: false,
        antialias: false
    });
    game.state.add("boot", AdslJumper.bootState);
    game.state.add("preload", AdslJumper.preloadState);
    game.state.add("story", AdslJumper.storyState);
    game.state.add("menu", AdslJumper.menuState);
    game.state.add("waitDecodeAudio", AdslJumper.waitDecodeAudio);
    game.state.add("play", AdslJumper.playGameState);

    game.state.start("boot");
};




