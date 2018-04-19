AdslJumper.playState = function (game) {};

AdslJumper.playState.prototype = {
    //core
    // CORE GAME FUNCTIONS
    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = true;
        this.game.clearBeforeRender = false;

        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.gameObjectFactory; // alias
        
        // main game functions
        this.playerCollideHandler = AdslJumper.gameFunc.playerCollideHandler;
        this.playerTriggerHandler = AdslJumper.gameFunc.playerTriggerHandler;
        this.playerTrapHandler = AdslJumper.gameFunc.trapHandler;
        this.playerBonusHandler = AdslJumper.gameFunc.bonusHandler;
        this.makeExplosion = AdslJumper.gameFunc.makeExplosion;

        this.levelUpdate = AdslJumper.gameFunc.update[AdslJumper.data.level] || false;

        // for triggers and level variable
        this.randomNumber = Math.floor(Math.random() * 100)/100;
        this.doorIsOpen = true;
        this.playerScore = AdslJumper.data.score;

        // game world bounds
        this.game.world.setBounds(0, 0, 768, 384);

        // game world
        this.map = this.game.add.tilemap("level" + AdslJumper.data.level, 32, 32);

        // LEVEL ESSENTIAL
        this.background = this.game.add.image(0, 0, "atlas_3", "level" + AdslJumper.data.level + ".png");
        this.background.smoothed = false;
        this.background.scale.setTo(2);
        
        AdslJumper.world.createDoors.call(this);
        AdslJumper.world.createCollision.call(this);
        AdslJumper.world.createTriggers.call(this);
        AdslJumper.world.createFx.call(this);

        this.foreGround = this.game.add.group();

        AdslJumper.world.createTraps.call(this);
        AdslJumper.world.createBonus.call(this);

    
        this.blood = AdslJumper.gameObjectFactory.createBloodParticles.call(this);

        // TRAPS WITH TRIGGERS level specific
        if (typeof AdslJumper.gameFunc.create[AdslJumper.data.level] === "function") {
            AdslJumper.gameFunc.create[AdslJumper.data.level].call(this);
        } else {
            this.exitDoor.open(true);
        }

        // PLAYER
        AdslJumper.world.createPlayer.call(this);
        this.player.canInput = false;

        // GUI
        //this.guiArrow = new AdslJumper.GUIArrow(this.game, this.card.x, this.card.y - 16);
        this.gui = new AdslJumper.GUI(this.game);
        this.gui.setRoom("0" + AdslJumper.data.level);
        this.gui.setScore(this.playerScore);

        // MUSIC
        if (!this.soundManager.currentTrack) {
            this.soundManager.currentTrack = this.soundManager.tempTrack;
            this.soundManager.tempTrack = null;
            this.soundManager.playTrack();
        };


        // CAMERA
        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
        this.game.camera.flash(0x000000, AdslJumper.gameOptions.cameraFlashTime);
        this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this); // canInput = true
        this.game.camera.onShakeComplete.addOnce(AdslJumper.gameFunc.onShakeCompleteFunction, this); // gameOver
    },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, this.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, this.playerTriggerHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.traps, this.playerTrapHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, this.playerBonusHandler, null, this);

        if (this.doorIsOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.nextLevel, null, this);
        }

        // level specific update functions
        if (this.levelUpdate) {
            this.levelUpdate();
        }
    },
    
    render: function () {
        if (AdslJumper.utils.enableDebug) {
            this.game.debug.text("tryCount: " + AdslJumper.data.levelDeaths, 8, 24, "#00ff00");

        }
    },

    //2
    l2_FlyingThornCollideHandler: function (rocket, collider) {
            // explosion
        this.makeExplosion(rocket.x + 16, rocket.y);
        rocket.animations.stop();
        rocket.kill();
    },

    //3
    l3_rigidBodyHandler: function (player, rigidbody) {

        rigidbody._tween.stop();

        this.player.customTouchUp = this.player.body.touching.up;
        this.player.customTouchRight = false;
        this.player.customTouchDown = this.player.body.touching.down;
        this.player.customTouchLeft = false;
    },

    l3_checkPlatformsCollide: function (platform, collider) {
        this.makeExplosion(platform.x + 48, platform.y + 16);
        platform.kill();
    },

    //4

    // проверка столкновения игрока с летающей платформой
    l4_checkPlatform: function (player, platform) {

        this.player.customTouchUp = this.player.body.touching.up;
        this.player.customTouchRight = false;
        this.player.customTouchDown = this.player.body.touching.down;
        this.player.customTouchLeft = false;

        platform.animations.play("disapear", 42, false, true);
    },

    //common
    // next level
    nextLevel: function (player, door) {
        // запретить управление пользователем
        this.player.canInput = false;

        // Скрыть игрока
        this.player.kill();
        door.animations.play("close");

        // save score
        AdslJumper.data.score = this.playerScore;

        // reset levelDeaths
        AdslJumper.data.levelDeaths = 0;

        // set next level
        AdslJumper.data.level = door.nextLevel;

        // camera
        this.game.camera.follow(door,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);

        // TODO проиграть анимация захода персонажа в дверь
        this.game.camera.fade(0x000000, AdslJumper.gameOptions.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(function() {
            // add state
            this.game.state.start("play");
        }, this);
    }
};