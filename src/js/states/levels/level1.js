AdslJumper.level1 = function () {};

AdslJumper.level1.prototype = {
    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = true;
        this.game.clearBeforeRender = false;

        // for triggers and level variable
        this.doorIsOpen = true;

        // game world bounds
        this.game.world.setBounds(0, 0, 768, 384);

        // game world
        this.map = this.game.add.tilemap("level1", 32, 32);

        // level essential
        this.background = this.game.add.image(0, 0, "atlas_3", "level1.png");
        this.background.smoothed = false;

        AdslJumper.world.createDoors.call(this);
        AdslJumper.world.createCollision.call(this);
        AdslJumper.world.createTriggers.call(this);
        AdslJumper.world.createFx.call(this);
        AdslJumper.world.createTraps.call(this);
        AdslJumper.world.createBonus.call(this);

        this.blood = AdslJumper.gameObjectFactory.createBloodParticles.call(this);

        // PLAYER
        this.player = AdslJumper.world.createPlayer.call(this, this.game, this.map);
        this.player.canInput = false;

        // GUI
        this.gui = new AdslJumper.GUI(this.game);
        this.gui.setRoom("0" + AdslJumper.data.level);
        this.gui.setScore(AdslJumper.data.score);

        // MUSIC
        if (!AdslJumper.modules.soundManager.currentTrack) {
            AdslJumper.modules.soundManager.currentTrack = AdslJumper.modules.soundManager.tempTrack;
            AdslJumper.modules.soundManager.tempTrack = null;
            AdslJumper.modules.soundManager.playTrack();
        }

        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
        this.game.camera.flash(0x000000, AdslJumper.gameOptions.cameraFlashTime);
        this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this); // canInput = true
        this.game.camera.onShakeComplete.addOnce(AdslJumper.gameFunc.onShakeCompleteFunction, this); // gameOver

        this.exitDoor.open(true);
    },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, AdslJumper.gameFunc.playerTriggerHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.traps, AdslJumper.gameFunc.trapHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.bonusHandler, null, this);

        if (this.doorIsOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.nextLevel, null, this);
        }
    },

    render: function () {

    }
};