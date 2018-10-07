AdslJumper.preloadState = function (game) {};

AdslJumper.preloadState.prototype = {
    preload: function () {

        this.progressBorder = this.game.add.image(180, 262, "atlas_0", "preloadBorder.png");
        this.progressBorder.smoothed = false;
        this.progressBorder.scale.setTo(_scaleFactor);

        this.progress = this.game.add.image(184, 266, "atlas_0", "progress.png");
        this.progress.smoothed = false;
        this.progress.scale.setTo(_scaleFactor);

        // load levels
        for (var i = 1; i <= 13; i++) {
            this.load.json("level" + i, "assets/levels/level" + i + ".json");
            this.load.image("level" + i + "bg", "assets/images/levels/level" + i + ".png");
        }

        // atlas
        this.game.load.atlas("atlas_1", 'assets/images/atlas1/atlas.png', 'assets/images/atlas1/atlas.json'); 
        this.game.load.atlas("atlas_2", 'assets/images/atlas2/atlas.png', 'assets/images/atlas2/atlas.json');

        // audio skyNetEyes
        this.load.audio('jump', 'assets/audio/jump.wav');
        this.load.audio('openDoor', ['assets/audio/doorOpen.wav', 'assets/audio/doorOpen.ogg']);
        this.load.audio('getCoin', 'assets/audio/coin.wav');
        this.load.audio('doubleJump', 'assets/audio/doubleJump.wav');
        this.load.audio('playerDeath', ['assets/audio/playerDeath.wav', 'assets/audio/playerDeath.ogg']);
        this.load.audio('screenTimer', ['assets/audio/screenTimer.wav', 'assets/audio/screenTimer.ogg']);
        this.load.audio('playerRespawn', ['assets/audio/playerRespawn.wav', 'assets/audio/playerRespawn.ogg']);
        this.load.audio('skyNetEyes', ['assets/audio/skynetEyes.wav', 'assets/audio/skynetEyes.ogg']);
        this.load.audio('jumpForce', ['assets/audio/jumpForce.wav', 'assets/audio/jumpForce.ogg']);
        this.load.audio('step01', 'assets/audio/step01.wav');
        this.load.audio('step02', 'assets/audio/step02.wav');
        this.load.audio('punch', 'assets/audio/punch.wav');
        this.load.audio('explosion', 'assets/audio/explosion.wav');
        this.load.audio('menu_select_0', 'assets/audio/menu_select_0.wav');
        this.load.audio('menu_select_1', 'assets/audio/menu_select_1.wav');
        this.load.audio('pickUp', ['assets/audio/pickUp.ogg', 'assets/audio/pickUp.mp3']);
        this.load.audio('openDoor2', ['assets/audio/openDoor2.ogg', 'assets/audio/openDoor2.mp3']);

        // init game components
        this.game.load.onFileComplete.add(this.doOnFIleLoad, this);

    },

    create: function () {

        SoundManager = new AdslJumper.SoundManager(Game);
        Input = new AdslJumper.Input(Game);
        AdslJumper.utils.enableDebug = Game.debug.isDisabled;

        // TODO del
        var urlLevel = parseInt(window.location.hash.slice(1).trim());
        if (!isNaN(urlLevel)) {
            _level = urlLevel;
        }

        // TODO del debug info
        AdslJumper.utils.info("preload", "urlLevel", urlLevel);

        this.game.state.start("waitDecodeAudio");
    },

    doOnFIleLoad: function (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.progress.width = Math.floor(592 * progress/100);
    }
};
