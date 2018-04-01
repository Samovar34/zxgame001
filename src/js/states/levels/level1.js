AdslJumper.level1State = function (game) {};

AdslJumper.level1State.prototype = {
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

        // for triggers and level variable
        this.randomNumber = Math.floor(Math.random() * 100)/100;
        this.doorIsOpen = false;
        this.playerScore = AdslJumper.data.score;

        // game world bounds
        this.game.world.setBounds(0, 0, 768, 384);

        // game world
        this.map = this.game.add.tilemap("map1", 32, 32);

        // LEVEL ESSENTIAL
        this.background = this.game.add.image(0, 0, "level1");
        this.background.smoothed = false;
        this.background.scale.setTo(2);
        
        this.gameObjectFactory.createDoors.call(this);
        this.gameObjectFactory.createCollision.call(this);
        this.gameObjectFactory.createTriggers.call(this);
        this.gameObjectFactory.createFx.call(this);
        this.gameObjectFactory.createTraps.call(this);
        this.gameObjectFactory.createBonus.call(this);

        this.blood = AdslJumper.gameObjectFactory.createBloodParticles.call(this);

        // TRAPS WITH TRIGGERS
        this.thorn0 = this.traps.getByName("dropThorn0");
        this.thorn0.outOfBoundsKill = true;
        this.thorn0.checkWorldBounds = true;
        this.thorn3 = this.traps.getByName("dropThorn3");
        this.thorn3.outOfBoundsKill = true;
        this.thorn3.checkWorldBounds = true;
        this.thorn4 = this.traps.getByName("dropThorn4");
        this.thorn4.outOfBoundsKill = true;
        this.thorn4.checkWorldBounds = true;

        this.thorn1 = this.traps.getByName("dropThorn1");
        this.thorn1.outOfBoundsKill = true;
        this.thorn1.checkWorldBounds = true;

        this.thorn2 = this.traps.getByName("dropThorn2");
        this.thorn2.outOfBoundsKill = true;
        this.thorn2.checkWorldBounds = true;

        this.thorn5 = this.traps.getByName("dropThorn5");
        this.thorn5.outOfBoundsKill = true;
        this.thorn5.checkWorldBounds = true;

        // level special
        this.doorScreen = this.game.add.sprite(104, 100, "atlas_2", "level1Screen1.png");
        
        this.doorToComputer = this.game.add.sprite(192, 116, "atlas_2", "level1Door1.png");
        this.game.physics.arcade.enable(this.doorToComputer);
        this.doorToComputer.body.immovable = true;
        this.doorToComputer.animations.add("default", [
            "level1Door1.png",
            "level1Door2.png",
            "level1Door3.png",
            "level1Door4.png",
            "level1Door5.png"
        ], 10);

        // PLAYER
        this.gameObjectFactory.createPlayer.call(this);
        this.player.canInput = false;

        // GUI
        this.guiArrow = new AdslJumper.GUIArrow(this.game, this.card.x, this.card.y - 16);
        this.gui = new AdslJumper.GUI(this.game);
        this.gui.setRoom("01");
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
        this.game.physics.arcade.collide(this.player, this.doorToComputer);
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
            this.game.debug.text("random: " + this.randomNumber, 8, 88, "#00ff00");
            this.game.debug.text("exist: " + this.thorn0.alive, 8, 104, "#00ff00");
            this.game.debug.body(this.exitDoor);
           // this.game.debug.physicsGroup(this.triggers);
        }
    },

    // TRIGGER EVENTS HANDLER
    dropThorn0: function (trigger) {
        if (AdslJumper.data.levelDeaths === 0) {
            this.thorn0.body.gravity.y = 1900;
        } else if (AdslJumper.data.levelDeaths === 1) {
            this.thorn3.body.gravity.y = 1900;
        } else if (AdslJumper.data.levelDeaths >= 3) {
            if (this.randomNumber < 0.1) {
                this.thorn0.body.gravity.y = 1900;
            } else if (this.randomNumber > 0.1 && this.randomNumber < 0.2) {
                this.thorn3.body.gravity.y = 1900;
            } else if (this.randomNumber > 0.5 && this.randomNumber < 0.6) {
                this.thorn4.body.gravity.y = 1900;
            }
        }
    },

    dropThorn1: function (trigger) {
        this.thorn1.body.gravity.y = 2000;
    },

    dropThorn2: function (trigger) {
        this.thorn2.body.gravity.y = 1800;
    },

    dropThorn3: function (trigger) {
        if (AdslJumper.data.levelDeaths === 2 ) {
            this.thorn4.body.gravity.y = 1900;
        }
    },

    dropThorn4: function (trigger) {
        if (this.doorIsOpen) {
            trigger.kill();
            this.thorn5.body.gravity.y = 1800;
        }
    },

    openDoor: function (trigger) {
        if (trigger._killAfterInteract) {
            trigger.kill();
        }
    
        // kill gui arrow and show screen
        this.guiArrow.kill();
        this.doorScreen.frameName = "level1Screen2.png";
    
        // open door
        this.exitDoor.open();
        this.doorIsOpen = true;
    },

    openDoorToRoom: function (trigger) {
        if (this.player.hasCard) {
            trigger.kill();
    
            this.soundManager.playOpenDoor2();
    
            this.doorToComputer.body.enable = false;
            this.doorToComputer.animations.play("default");
    
            this.levelScreen.frameName = "level1ScreenA1.png";
    
            this.guiArrow.x = 122;
            this.guiArrow.y = 84;
        }
    },

    onCardFunction: function () {
        this.guiArrow.x = 232;
        this.guiArrow.y = 278;
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

            AdslJumper.data.level = door.nextLevel;
            this.game.state.start(this.game.state.current);
        }, this);
    }
};













// END Trigger events handlers

