AdslJumper.level3 = {

    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = false;
        this.game.clearBeforeRender = false;

        // init modules
        AdslJumper.gameObjectFactory.init(this);
        AdslJumper.world.init(this);


        // game world bounds
        this.game.world.setBounds(0, 0, 480 * _scaleFactor, 272 * _scaleFactor);

        // level essential
        this.map = this.game.cache.getJSON("level3");

        /**
         * @type {Phaser.Image}
         */
        this.background = this.game.add.image(0, 0, "level3bg");
        this.background.smoothed = false;
        this.background.scale.setTo(_scaleFactor);

        // create world
        AdslJumper.world.createWorld(this.map);

        this.triggers = AdslJumper.world.createTriggers(this.map.triggers);

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
        this.player.allowDoubleJump = true;
        this.player.allowWallSliding = true;

        // essential
        this.player.setOnDeathCompleteCallback(AdslJumper.gameFunc.onPlayerDeathComplete, this);
        this.player.setOnRespawnCompleteCallback(AdslJumper.gameFunc.onPlayerRespawnComplete, this);

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

        this.exitDoor.open();
    },

    update: function () {
        Input.update();
        // reset player
        this.player._reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.playerBonusHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, AdslJumper.gameFunc.playerTriggerHandler, null, this);

        if (this.exitDoor.isOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, AdslJumper.gameFunc.nextLevel, null, this);
        }
    },

    render: AdslJumper.gameFunc.render,


    gameOver: AdslJumper.gameFunc.gameOver
};