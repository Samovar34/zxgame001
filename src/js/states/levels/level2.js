AdslJumper.level2 = function () {};

AdslJumper.level2.prototype = {

    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = false;
        this.game.clearBeforeRender = false;

        // init modules
        AdslJumper.gameObjectFactory.init(this);
        AdslJumper.world.init(this);

        // game world bounds
        this.game.world.setBounds(0, 0, 768 * _scaleFactor, 320 * _scaleFactor);

        // level essential
        this.map = this.game.cache.getJSON("level2");

        // bg
        this.background = this.game.add.image(0, 0, "atlas_3", "level2.png");
        this.background.smoothed = false;
        this.background.scale.setTo(_scaleFactor);

        this.scyNet = this.add.sprite(391 * _scaleFactor, (107 - 32) * _scaleFactor, "atlas_2", "screenF1.png");
        this.scyNet.smoothed = false;
        this.scyNet.scale.setTo(_scaleFactor);

        // create world
        AdslJumper.world.createWorld();

        this.triggers = AdslJumper.world.createTriggers(this.map.triggers);

        this.blood = AdslJumper.gameObjectFactory.createBloodParticles();

        this.player = new AdslJumper.Player(
            this.game,
            (this.map.player.x + 16) *_scaleFactor,
            (this.map.player.y - 16) * _scaleFactor
        );
        this.player.canInput = false;
        this.player.allowDoubleJump = true;
        this.player.allowWallSliding = true;

        // GUI
        this.gui = new AdslJumper.GUI(_game);
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
        this.game.camera.onShakeComplete.addOnce(AdslJumper.gameFunc.onShakeCompleteFunction, this); // gameOver

        this.exitDoor.open(true);
    },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.playerBonusHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, AdslJumper.gameFunc.playerTriggerHandler, null, this);

        if (this.exitDoor.isOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, AdslJumper.gameFunc.nextLevel, null, this);
        }

        if (this.player.alive) {
            if (this.player.x < this.scyNet.x - 64 * _scaleFactor) {
                this.scyNet.frameName = "screenF4.png";
            } else if (this.player.x > this.scyNet.x + 80 * _scaleFactor) {
                this.scyNet.frameName = "screenF3.png";
            } else {
                this.scyNet.frameName = "screenF1.png";
            }
        }

    },

    render: function () {
        this.game.debug.text(this.player.currentState.name, 8, 24);
        this.game.debug.text(this.player.frameName, 8, 32);
        this.game.debug.text(this.player.y, 8, 42);
        //this.game.debug.physicsGroup(this.triggers);
    },

    gameOver: function (player, trigger) {
        AdslJumper.gameFunc.gameOver.call(this, player, trigger);
        this.scyNet.frameName = "screenF2.png";
    }
};