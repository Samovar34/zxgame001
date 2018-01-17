AdslJumper.bootState = function (game) {};

AdslJumper.bootState.prototype = {
    preload: function () {
        // load the loader bar

        // load font
    },

    create: function () {
        console.log("boot create");

        this.game.stage.backgroundColor = gameOptions.bgColor;

        // scaling
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.renderer.renderSession.roundPixels = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // start physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start("preload");
    }
};