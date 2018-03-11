AdslJumper.bootState = function (game) {};

AdslJumper.bootState.prototype = {
    preload: function () {
        // load the loader bar
        this.game.load.image("preloadBorder", "assets/images/preloadBorder.png");
        this.game.load.image("progress", "assets/images/progress.png");
        // load font
    },

    create: function () {

        this.game.stage.backgroundColor = AdslJumper.gameOptions.getMainOptions().bgColor;

        // // scaling
        this.game.renderer.renderSession.roundPixels = true;; // без этой опции страные артефакты. Проверено в Linux Mint
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // start physics
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start("preload");
    }
};