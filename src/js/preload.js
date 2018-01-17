AdslJumper.preloadState = function (game) {};

AdslJumper.preloadState.prototype = {
    preload: function () {
        // load assets
        this.game.load.tilemap('map', 'assets/levels/level.csv', null, Phaser.Tilemap.CSV);
        this.game.load.tilemap('map1', 'assets/levels/level.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tilemap', 'assets/images/tilemap.png');
        this.game.load.image("player", "/assets/images/player.png");
        this.game.load.spritesheet("coin", "/assets/images/coin.png", 16, 16, 6);
        this.game.load.image("bg001", "/assets/images/back_001.png");
    },

    create: function () {
        console.log("preload create");

        this.game.state.start("menu");
    }
}