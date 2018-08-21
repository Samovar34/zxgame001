AdslJumper.bootState = function (game) {};

AdslJumper.bootState.prototype = {
    preload: function () {
        // load the loader bar
        this.game.load.atlas("atlas_0", 'assets/images/atlas0/atlas.png', 'assets/images/atlas0/atlas.json'); 
        // load font
    },

    create: function () {

        this.game.stage.backgroundColor = AdslJumper.gameOptions.bgColor;

        // // scaling
        this.game.renderer.renderSession.roundPixels = true; // без этой опции страные артефакты. Проверено в Linux Mint
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // start physics
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start("preload");
    }
};