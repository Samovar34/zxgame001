//AdslJumper.level1 = function () {};

AdslJumper.level1 = {

    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = false;
        this.game.clearBeforeRender = false;

        // init modules
        AdslJumper.gameObjectFactory.init(this);
        AdslJumper.world.init(this);

        // level variables
        this.coinCollected = 0;

        // game world bounds
        this.game.world.setBounds(0, 0, 480 * _scaleFactor, 272 * _scaleFactor);

        // level essential
        this.map = this.game.cache.getJSON("level1");

        /**
         * @type {Phaser.Image}
         */
        this.background = this.game.add.image(0, 0, "level1bg");
        this.background.smoothed = false;
        this.background.scale.setTo(_scaleFactor);

        // create world
        AdslJumper.world.createWorld(this.map);

        /**
         * @type {AdslJumper.Player}
         */
        // PLAYER
        this.player = new AdslJumper.Player(
            this.game,
            (this.map.player.x + 16) *_scaleFactor,
            (this.map.player.y - 16) * _scaleFactor
        );
        this.player.canInput = false;
        this.player.allowDoubleJump = false;
        this.player.allowWallSliding = false;

        // GUI
        this.gui = new AdslJumper.GUI(this.game);
        this.gui.setRoom("0" + _level);
        this.gui.setScore(_score);

        // MUSIC
        if (!SoundManager.currentTrack) {
            SoundManager.currentTrack = SoundManager.tempTrack;
            SoundManager.tempTrack = null;
            SoundManager.playTrack();
        }

        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
        this.game.camera.flash(0x000000, AdslJumper.gameOptions.cameraFlashTime);
        this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this); // canInput = true
    },

    update: function () {
        Input.update();
        // reset player
        this.player._reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.playerBonusHandler, this.doOnCoin, this);

        if (this.exitDoor.isOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, AdslJumper.gameFunc.nextLevel, null, this);
        }
    },

    doOnCoin: function () {
        if (++this.coinCollected >= this.bonus.length) {
            this.exitDoor.open(false);
        }
    }
};