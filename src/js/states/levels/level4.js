AdslJumper.level4 = new AdslJumper.State(Game, 736, 448, true, true);

AdslJumper.level4.doAfterCreate = function() {
    this.fx.add(AdslJumper.gameObjectFactory.jumpForce(662, 320));

    this.player.allowWallSliding = false;
};

AdslJumper.level4.strongJump = function () {
    this.player.inTrigger = true;
    SoundManager.playJumpForce();
    this.player.canJump = false;
    this.player.body.velocity.y = - 1200;
};

AdslJumper.level4.render = function () {
    AdslJumper.State.prototype.render.call(this);

    this.game.debug.body(this.player);
    this.game.debug.body(this.exitDoor);
};

// AdslJumper.level4 = {
//
//     create: function () {
//         // set renderer
//         this.game.renderer.renderSession.roundPixels = false;
//         this.game.clearBeforeRender = false;
//
//         // init modules
//         AdslJumper.gameObjectFactory.init(this);
//         AdslJumper.world.init(this);
//
//         // level variables
//
//         // game world bounds
//         this.game.world.setBounds(0, 0, 736 * _scaleFactor, 448 * _scaleFactor);
//
//         // level essential
//         this.map = this.game.cache.getJSON("level4");
//
//         /**
//          * @type {Phaser.Image}
//          */
//         this.background = this.game.add.image(0, 0, "level4bg");
//         this.background.smoothed = false;
//         this.background.scale.setTo(_scaleFactor);
//
//         AdslJumper.gameObjectFactory.jumpForce(662, 320);
//
//         // create world
//         AdslJumper.world.createWorld(this.map);
//
//         this.triggers = AdslJumper.world.createTriggers(this.map.triggers);
//
//         /**
//          * @type {AdslJumper.Player}
//          */
//         // PLAYER
//         this.player = new AdslJumper.Player(
//             this.game,
//             (this.map.player.x + 16) *_scaleFactor,
//             (this.map.player.y - 16) * _scaleFactor
//         );
//         this.player.canInput = false;
//         this.player.allowDoubleJump = true;
//         this.player.allowWallSliding = false;
//
//         // essential
//         this.player.setOnDeathCompleteCallback(AdslJumper.gameFunc.onPlayerDeathComplete, this);
//         this.player.setOnRespawnCompleteCallback(AdslJumper.gameFunc.onPlayerRespawnComplete, this);
//
//         // GUI
//         this.gui = new AdslJumper.GUI(this.game);
//         this.gui.setRoom("0" + _level);
//         this.gui.setScore(_score);
//
//         // MUSIC
//         if (!SoundManager.currentTrack) {
//             SoundManager.currentTrack = SoundManager.tempTrack;
//             SoundManager.tempTrack = null;
//             SoundManager.playTrack();
//         }
//
//         this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
//         this.game.camera.flash(0x000000, AdslJumper.gameOptions.cameraFlashTime);
//         this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this); // canInput = true
//
//         this.exitDoor.open();
//     },
//
//     update: function () {
//         Input.update();
//
//         if (!this.player.alive) return;
//         // reset player
//         this.player._reset();
//
//         this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
//         this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.playerBonusHandler, null, this);
//         this.game.physics.arcade.overlap(this.player, this.triggers, AdslJumper.gameFunc.playerTriggerHandler, null, this);
//
//         if (this.exitDoor.isOpen && this.player.canInput) {
//             this.game.physics.arcade.overlap(this.player, this.exitDoor, AdslJumper.gameFunc.nextLevel, null, this);
//         }
//     },
//
//     render: AdslJumper.gameFunc.render,
//
//     strongJump: function () {
//         this.player.inTrigger = true;
//         SoundManager.playJumpForce();
//         this.player.canJump = false;
//         this.player.body.velocity.y = - 1200;
//
//     },
//
//     gameOver: AdslJumper.gameFunc.gameOver
// };