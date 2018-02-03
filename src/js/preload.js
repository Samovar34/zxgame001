AdslJumper.preloadState = function (game) {};

AdslJumper.preloadState.prototype = {
    preload: function () {
        // load assets
        for (var i = 1; i <= 2; i++) {
            this.game.load.tilemap('map' + i, 'assets/levels/level' + i + "_2x.json", null, Phaser.Tilemap.TILED_JSON);
        }
        this.game.load.image('tilemap', 'assets/images/tilemap.png');
        this.game.load.spritesheet("player", "/assets/images/player.png", 32, 32, 21);
        this.game.load.spritesheet("coin", "/assets/images/coin.png", 20, 20, 5);
        this.game.load.spritesheet("door", "/assets/images/door.png", 48, 80, 14);
        this.game.load.spritesheet("killHuman", "/assets/images/kill_human.png", 112, 30, 11);
        this.game.load.spritesheet("sparks", "/assets/images/sparks.png", 2, 2, 2);
        this.game.load.spritesheet("thorn", "/assets/images/thorn.png", 32, 32, 24);
        this.game.load.spritesheet("movableThorn", "/assets/images/movableThornRight.png", 64, 32, 8);
        this.game.load.spritesheet("blood", "/assets/images/blood.png", 16, 16, 2);
        this.game.load.image("bg001", "/assets/images/back_001.png");
        this.game.load.image("exit", "/assets/images/exit.png");

        // audio
        this.load.audio('jump', 'assets/audio/jump.wav');
        this.load.audio('openDoor', 'assets/audio/openDoor.mp3');
        this.load.audio('closeDoor', 'assets/audio/closeDoor.mp3');
        this.load.audio('getCoin', 'assets/audio/coin.wav');
        this.load.audio('doubleJump', 'assets/audio/doubleJump.wav');
        this.load.audio('playerDeath', 'assets/audio/playerDeath.wav');
        this.load.audio('step01', 'assets/audio/step01.wav');
        this.load.audio('step02', 'assets/audio/step02.wav');
        this.load.audio('step03', 'assets/audio/step03.wav');
        this.load.audio('step04', 'assets/audio/step04.wav');
        this.load.audio('track01', 'assets/audio/track01.mp3');
    },

    create: function () {
        this.game.state.start("menu");
    }
}