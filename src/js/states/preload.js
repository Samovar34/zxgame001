AdslJumper.preloadState = function (game) {};

AdslJumper.preloadState.prototype = {
    preload: function () {

        this.game.add.image(24, 176, "preloadBorder");
        this.progress = this.game.add.image(28, 180, "progress");

        // load assets
        for (var i = 0; i <= 4; i++) {
            this.game.load.tilemap('map' + i, 'assets/levels/level' + i + ".json", null, Phaser.Tilemap.TILED_JSON);
        }

        // atlas
        this.game.load.atlas("atlas_1", 'assets/images/atlas1/atlas.png', 'assets/images/atlas1/atlas.json'); 
        this.game.load.atlas("atlas_2", 'assets/images/atlas2/atlas.png', 'assets/images/atlas2/atlas.json'); 

        // tilemaps
        this.game.load.image("adslWorldTilemap", "assets/images/adsl_world_tilemap.png");
        this.game.load.image("waitingAudio", "assets/images/waitAudioDecode.png");

        // audio
        this.load.audio('jump', 'assets/audio/jump.wav');
        this.load.audio('openDoor', 'assets/audio/openDoor.mp3');
        this.load.audio('getCoin', 'assets/audio/coin.wav');
        this.load.audio('doubleJump', 'assets/audio/doubleJump.wav');
        this.load.audio('playerDeath', 'assets/audio/playerDeath.wav');
        this.load.audio('step01', 'assets/audio/step01.wav');
        this.load.audio('step02', 'assets/audio/step02.wav');
        this.load.audio('punch', 'assets/audio/punch.wav');
        this.load.audio('explosion', 'assets/audio/explosion.wav');
        this.load.audio('menu_select_0', 'assets/audio/menu_select_0.wav');
        this.load.audio('menu_select_1', 'assets/audio/menu_select_1.wav');

        // music
        this.load.audio('intro', ['assets/audio/music/intro.ogg', 'assets/audio/music/intro.mp3'], false);

        // init game components
        this.game.load.onFileComplete.add(this.doOnFIleLoad, this);

    },

    create: function () {

        AdslJumper.modules.soundManager = new AdslJumper.SoundManager(this.game);
        AdslJumper.modules.inputManager = new AdslJumper.Input(this.game);

        // for waitDecodeAudio
        // m = main code
        AdslJumper.actionCode = {};
        AdslJumper.actionCode.FROMPRELOADTOSTORY = 0; // m
        AdslJumper.actionCode.FROMAUDIOTOSTORY = 1;
        AdslJumper.actionCode.FROMMENUTOPLAY = 2; // m
        AdslJumper.actionCode.FROMAUDIOTOPLAY = 3;
        AdslJumper.actionCode.FROMPLAYTOAUDIO = 3; // m

        // gama data
        AdslJumper.data = {
            level: 0,
            score: 0,
            actionCode: AdslJumper.actionCode.FROMPRELOADTOSTORY,
        };

        this.game.state.start("waitDecodeAudio");
    }
};


AdslJumper.preloadState.prototype.doOnFIleLoad = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.width = Math.floor(596 * progress/100);
};
