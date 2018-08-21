AdslJumper.level1 = function () {};

AdslJumper.level1.prototype = {

    create: function () {
        // set renderer
        //this.game.renderer.renderSession.roundPixels = true;
        this.game.clearBeforeRender = false;

        // init modules
        AdslJumper.gameObjectFactory.init(this);
        AdslJumper.world.init(this);

        // game world bounds
        this.game.world.setBounds(0, 0, 768 * _scaleFactor, 320 * _scaleFactor);

        // level essential
        this.map = this.game.cache.getJSON("level1");

        // bg
        this.background = this.game.add.image(0, 0, "atlas_3", "level1.png");
        this.background.smoothed = false;
        this.background.scale.setTo(_scaleFactor);

        /** @type {Phaser.Image}*/
        var tutorImage1 = null;

        /** @type {Phaser.Image}*/
        var tutorImage2 = null;

        // add tutors
        if (_lang === "ru") {
            tutorImage1 = this.game.add.image(144 * _scaleFactor, 112 * _scaleFactor, "atlas_2", "tutorial3.png"); // ru
            tutorImage2 = this.game.add.image(432 * _scaleFactor, 112 * _scaleFactor, "atlas_2", "tutorial5.png"); // ru
        } else {
            tutorImage1 = this.game.add.image(144 * _scaleFactor, 112 * _scaleFactor, "atlas_2", "tutorial2.png"); // en
            tutorImage2 =this.game.add.image(432 * _scaleFactor, 112 * _scaleFactor, "atlas_2", "tutorial4.png"); // en
        }

        tutorImage1.smoothed = false;
        tutorImage2.smoothed = false;

        tutorImage1.scale.setTo(_scaleFactor);
        tutorImage2.scale.setTo(_scaleFactor);

        // create world
        AdslJumper.world.createWorld();

        /**
         * @type {AdslJumper.Player}
         */
        // PLAYER
        this.player = new AdslJumper.Player(
            this.game,
            AdslJumper.modules.inputManager,
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
        if (!AdslJumper.modules.soundManager.currentTrack) {
            AdslJumper.modules.soundManager.currentTrack = AdslJumper.modules.soundManager.tempTrack;
            AdslJumper.modules.soundManager.tempTrack = null;
            AdslJumper.modules.soundManager.playTrack();
        }

        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
        this.game.camera.flash(0x000000, AdslJumper.gameOptions.cameraFlashTime);
        this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this); // canInput = true

        this.exitDoor.open(true);
    },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.playerBonusHandler, null, this);

        if (this.exitDoor.isOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, AdslJumper.gameFunc.nextLevel, null, this);
        }
    },

    render: function () {
        this.game.debug.text(this.player.currentState.name, 8, 24);
        this.game.debug.text(this.player.frameName, 8, 32);
        this.game.debug.text(this.player.y, 8, 42);
    }
};