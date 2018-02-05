AdslJumper.bootState = function (game) {};

AdslJumper.bootState.prototype = {
    preload: function () {
        // load the loader bar

        // load font
    },

    create: function () {

        this.game.stage.backgroundColor = AdslJumper.gameOptions.getMainOptions().bgColor;

        // scaling
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.renderer.renderSession.roundPixels = false; // без этой опции страные артефакты. Проверено в Linux Mint
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start("preload");
    }
};