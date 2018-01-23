AdslJumper.preloadState = function (game) {};

AdslJumper.preloadState.prototype = {
    preload: function () {
        // load assets
        for (var i = 1; i <= 2; i++) {
            this.game.load.tilemap('map' + i, 'assets/levels/level' + i + ".json", null, Phaser.Tilemap.TILED_JSON);
            console.log("for", i);
        }
        this.game.load.image('tilemap', 'assets/images/tilemap.png');
        this.game.load.image("player", "/assets/images/player.png");
        this.game.load.spritesheet("coin", "/assets/images/coin.png", 10, 10, 5);
        this.game.load.spritesheet("door", "/assets/images/door.png", 24, 40, 7);
        this.game.load.spritesheet("killHuman", "/assets/images/kill_human.png", 56, 15, 11);
        this.game.load.image("bg001", "/assets/images/back_001.png");
        this.game.load.image("exit", "/assets/images/exit.png");
    },

    create: function () {
        this.game.state.start("menu");
    }
}