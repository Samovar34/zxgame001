AdslJumper.level2 = {

    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = false;
        this.game.clearBeforeRender = false;

        // init modules
        AdslJumper.gameObjectFactory.init(this);
        AdslJumper.world.init(this);

        // game world bounds
        this.game.world.setBounds(0, 0, 640 * _scaleFactor, 272 * _scaleFactor);

        // level essential
        this.map = this.game.cache.getJSON("level2");

        // bg
        this.background = this.game.add.image(0, 0,"level2bg");
        this.background.smoothed = false;
        this.background.scale.setTo(_scaleFactor);

        // special level sprite
        this.scyNet = this.add.sprite(311 * _scaleFactor, 107 * _scaleFactor, "atlas_2", "screenF1.png");
        this.scyNet.smoothed = false;
        this.scyNet.scale.setTo(_scaleFactor);

        // create world
        AdslJumper.world.createWorld(this.map);

        this.triggers = AdslJumper.world.createTriggers(this.map.triggers);

        this.player = new AdslJumper.Player(
            this.game,
            (this.map.player.x + 16) *_scaleFactor,
            (this.map.player.y - 16) * _scaleFactor
        );
        this.player.canInput = false;
        this.player.allowDoubleJump = false;
        this.player.allowWallSliding = false;

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

        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);
        this.game.camera.flash(0x000000, AdslJumper.gameOptions.cameraFlashTime);
        this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this); // canInput = true

        this.exitDoor.open(true);
    },

    update: function () {
        // update input
        Input.update();
        // reset player
        this.player._reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.playerBonusHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, AdslJumper.gameFunc.playerTriggerHandler, null, this);

        if (this.exitDoor.isOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, AdslJumper.gameFunc.nextLevel, null, this);
        }

        if (this.player.canInput) {
            if (this.player.x < this.scyNet.x - 64 * _scaleFactor) {
                this.scyNet.frameName = "screenF4.png";
            } else if (this.player.x > this.scyNet.x + 80 * _scaleFactor) {
                this.scyNet.frameName = "screenF3.png";

            } else {
                this.scyNet.frameName = "screenF1.png";
            }
        }

    },

    gameOver: function (player, trigger) {
        AdslJumper.gameFunc.gameOver.call(this, player, trigger);
        this.scyNet.frameName = "screenF2.png";
    }
};