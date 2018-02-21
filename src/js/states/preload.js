AdslJumper.preloadState = function (game) {};

AdslJumper.preloadState.prototype = {
    preload: function () {
        // load assets
        for (var i = 1; i <= 1; i++) {
            this.game.load.tilemap('map' + i, 'assets/levels/level' + i + "_3x.json", null, Phaser.Tilemap.TILED_JSON);
        }
        
        this.game.load.image('tilemap', 'assets/images/adsl_world_tilemap.png');
        this.game.load.spritesheet("player", "/assets/images/player.png", 32, 32, 21);
        this.game.load.spritesheet("coin", "/assets/images/coin.png", 16, 16, 13);
        this.game.load.spritesheet("door", "/assets/images/door2.png", 48, 60, 18);
        this.game.load.spritesheet("killHuman", "/assets/images/kill_human.png", 112, 30, 11);
        this.game.load.spritesheet("sparks", "/assets/images/sparks.png", 8, 8, 4);
        this.game.load.spritesheet("thorn", "/assets/images/thorn.png", 32, 32, 24);
        this.game.load.spritesheet("movableThorn", "/assets/images/movableThornRight.png", 64, 32, 8);
        this.game.load.spritesheet("blood", "/assets/images/blood.png", 8, 8, 4);
        this.game.load.spritesheet("led", "/assets/images/led.png", 6, 6, 3);
        this.game.load.spritesheet("explosionSprite", "/assets/images/blow.png", 128, 128, 14);
        this.game.load.spritesheet("mine", "/assets/images/mine.png", 16, 14, 2);
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
        this.load.audio('punch', 'assets/audio/punch.wav');
        this.load.audio('explosion', 'assets/audio/explosion.wav');
        this.load.audio('track00', 'assets/audio/intro.mp3');
        this.load.audio('track01', 'assets/audio/track01.mp3');
        this.load.audio('track02', 'assets/audio/track02.mp3');

        // shaders
        this.game.load.shader('testShader', 'assets/shaders/test.frag');
    },

    create: function () {
        // init game components
        AdslJumper.modules.soundManager = new AdslJumper.SoundManager(this.game);
        AdslJumper.modules.inputManager = new AdslJumper.Input(this.game);
        AdslJumper.modules.gameObjectFactory = new AdslJumper.GameObjectFactory(this.game);

        AdslJumper.data = {
            level: 1,
            score: 0
        };

        this.game.state.start("menu");
    }
}