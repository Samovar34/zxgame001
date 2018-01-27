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
        this.game.load.spritesheet("sparks", "/assets/images/sparks.png", 2, 2, 2);
        this.game.load.image("bg001", "/assets/images/back_001.png");
        this.game.load.image("exit", "/assets/images/exit.png");

        // audio
        this.load.audio('jump', 'assets/audio/jump.mp3');
        this.load.audio('openDoor', 'assets/audio/openDoor.mp3');
        this.load.audio('closeDoor', 'assets/audio/closeDoor.mp3');
        this.load.audio('getCoin', 'assets/audio/coin.wav');
        this.load.audio('doubleJump', 'assets/audio/doubleJump.wav');
    },

    create: function () {
        this.game.state.start("menu");
    }
}