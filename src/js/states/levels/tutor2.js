AdslJumper.tutor2State = function (game) {};

AdslJumper.tutor2State.prototype = {
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

        // for triggers and level variable
        //this.randomNumber = Math.floor(Math.random() * 100)/100;
        this.doorIsOpen = true;
        this.playerScore = AdslJumper.data.score;

        // game world bounds
        this.game.world.setBounds(0, 0, 768, 384);

        // game world
        this.map = this.game.add.tilemap("tutorMap2", 32, 32);

        // LEVEL ESSENTIAL
        this.background = this.game.add.image(0, 0, "tutor2");
        this.background.smoothed = false;
        //this.background.scale.setTo(2);
        
        this.gameObjectFactory.createDoors.call(this);
        this.gameObjectFactory.createCollision.call(this);
        this.gameObjectFactory.createTriggers.call(this);
        this.gameObjectFactory.createFx.call(this);
        this.gameObjectFactory.createTraps.call(this);
        this.gameObjectFactory.createBonus.call(this);

        this.exitDoor.open(true);

        this.blood = AdslJumper.gameObjectFactory.createBloodParticles.call(this);

        // TRAPS WITH TRIGGERS
        this.flyingThorn = this.traps.getByName("flyingThorn");

        // this.thorn0 = this.traps.getByName("dropThorn0");
        // this.thorn0.outOfBoundsKill = true;
        // this.thorn0.checkWorldBounds = true;
    

        // level special

        // PLAYER
        this.gameObjectFactory.createPlayer.call(this);
        this.player.canInput = false;

        // GUI
        //this.guiArrow = new AdslJumper.GUIArrow(this.game, this.card.x, this.card.y - 16);
        this.gui = new AdslJumper.GUI(this.game);
        this.gui.setRoom("03");
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
        this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this);
        this.game.camera.onShakeComplete.addOnce(AdslJumper.gameFunc.onShakeCompleteFunction, this); // gameOver
    },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, this.playerCollideHandler, null, this);
        this.game.physics.arcade.collide(this.flyingThorn, this.collision2d, this.flyingThornCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, this.playerTriggerHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.traps, this.playerTrapHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.bonus, this.playerBonusHandler, null, this);

        if (this.doorIsOpen) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.nextLevel, null, this);
        }

    },
    
    render: function () {
        if (AdslJumper.utils.enableDebug) {
            this.game.debug.text("tryCount: " + AdslJumper.data.levelDeaths, 8, 24, "#00ff00");

        }
    },

    // TRIGGER EVENTS HANDLER
    lanchRocket: function (trigger) {
        this.flyingThorn.animations.play("fly");
        this.flyingThorn.body.gravity.y = - 2500;
    },

    flyingThornCollideHandler: function (rocket, collider) {
            // explosion
        this.makeExplosion(rocket.x + 16, rocket.y);
        rocket.animations.stop();
        rocket.kill();
    },

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

        // camera
        this.game.camera.follow(door,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);

        // TODO проиграть анимация захода персонажа в дверь
        this.game.camera.fade(0x000000, AdslJumper.gameOptions.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(function() {

            AdslJumper.data.level = "level1";
            this.game.state.start("level1");
        }, this);
    }
};


