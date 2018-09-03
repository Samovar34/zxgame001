/**
 * Basic state Class
 * @param {Phaser.Game} game
 * @param {number} width world width
 * @param {number} height world height
 * @param {boolean} isCanInputOnFlash
 * @param {boolean} isOpenDoor=true]
 * @constructor
 */
AdslJumper.State = function (game, prop) {
    this.game = game;

    /**
     * game world width
     * @type {number}
     * @private
     */
    this._width = prop.width;
    /**
     * game world height
     * @type {number}
     * @private
     */
    this._height = prop.height;


    /**
     * if true player can move after camera flash
     * @type {boolean}
     * @private
     */
    this._isCanInputOnFlash = prop.inputOnFlash;

    /**
     * if true exit door will open
     * @type {boolean}
     * @private
     */
    this._isOpenDoor = prop.openDoor;

    /**
     * if true explosion group will create
     * @type {boolean}
     * @private
     */
    this._createExplosion = prop.createExplosions;

    /**
     * create foreground layer
     * @type {boolean}
     * @private
     */
    this._createForeground = prop.createForeground;

    /**
     * Player instance
     * @type {AdslJumper.Player}
     */
    this.player = null;

    /**
     * Exit door instance
     * @type {AdslJumper.ExitDoor}
     */
    this.exitDoor = null;

    /**
     * triggers group
     * @type {Phaser.Group}
     */
    this.triggers = null;

    /**
     * collision group
     * @type {Phaser.Group}
     */
    this.collision2d = null;

    /**
     * fx group
     * @type {Phaser.Group}
     */
    this.fx = null;

    /**
     * bonus group
     * @type {Phaser.Group}
     */
    this.bonus = null;

    /**
     * foreground layer
     * @type {Phaser.Group}
     */
    this.foreground = null;

    /**
     * foreground layer
     * @type {Phaser.Group}
     */
    this.explosions = null;

    /**
     * @type {boolean}
     */
    this.hasTriggers = false;

    /**
     * @type {boolean}
     */
    this.hasBonus = false;

    /**
     * @type {Function}
     */
    this.doAfterBonus = null;

    /**
     * @type {Function}
     */
    this.doAfterTrigger = null;

    /**
     * @type {Function}
     */
    this.doAfterUpdate = null;

    /**
     * @type {Function}
     */
    this.doAfterCreate = null;

};

AdslJumper.State.prototype = {
    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = false;
        this.game.clearBeforeRender = false;

        // init modules
        AdslJumper.gameObjectFactory.init(this);
        AdslJumper.world.init(this);

        // game world bounds
        this.game.world.setBounds(0, 0, this._width * _scaleFactor, this._height * _scaleFactor);

        // level essential
        this.map = this.game.cache.getJSON("level" + _level);

        this.background = this.game.add.image(0, 0, "level" + _level + "bg");
        this.background.smoothed = false;
        this.background.scale.setTo(_scaleFactor);

        // enter door
        AdslJumper.gameObjectFactory.createEnterDoor(this.map.enterDoor.x, this.map.enterDoor.y);

        // exit door
        this.exitDoor = new AdslJumper.ExitDoor
        (
            this.state.game,
            this.map.exitDoor.x * _scaleFactor,
            (this.map.exitDoor.y - 60) * _scaleFactor,
            this.map.exitDoor.nextLevel
        );

        this.collision2d = AdslJumper.world.createCollision(this.map.collision);
        this.fx = AdslJumper.world.createFx(this.map.fx);

        if (this.map.triggers.length > 0) {
            this.triggers = AdslJumper.world.createTriggers(this.map.triggers);
            this.hasTriggers = true;
        }

        if (this.map.traps.length > 0) {
            AdslJumper.world.createTraps(this.map.traps);
        }

        if (this.map.bonus.length > 0) {
            this.bonus = AdslJumper.world.createBonus(this.map.bonus);
            this.hasBonus = true;
        }


        // create player
        this.player = new AdslJumper.Player(
            this.game,
            (this.map.player.x + 16) *_scaleFactor,
            (this.map.player.y - 16) * _scaleFactor
        );
        this.player.canInput = false;
        this.player.setOnDeathCompleteCallback(this.onPlayerDeathComplete, this);
        this.player.setOnRespawnCompleteCallback(this.onPlayerRespawnComplete, this);

        if (this._createExplosion) {
            this.explosions = this.game.add.group();
            this.explosions.add(AdslJumper.gameObjectFactory.explosion());
            this.explosions.add(AdslJumper.gameObjectFactory.explosion());
            this.explosions.add(AdslJumper.gameObjectFactory.explosion());
            this.explosions.killAll();
        }

        if (this._createForeground) {
            this.foreground = this.game.add.group();
        }


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

        // CAMERA
        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
        this.game.camera.flash(0x000000, AdslJumper.gameOptions.cameraFlashTime);

        if (this._isCanInputOnFlash) {
            this.game.camera.onFlashComplete.addOnce(this.onFlashCompleteFunction, this); // canInput = true
        }

        if (this._isOpenDoor) {
            this.exitDoor.open();
        }

        if (this.doAfterCreate !== null) {
            this.doAfterCreate();
        }

    },
    
    update: function () {
        Input.update();

        if (!this.player.alive) return;

        this.player._reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, this.playerCollideHandler, null, this);

        if (this.hasBonus) {
            this.game.physics.arcade.overlap(this.player, this.bonus, this.playerBonusHandler, this.doAfterBonus, this);
        }

        if (this.hasTriggers) {
            this.game.physics.arcade.overlap(this.player, this.triggers, this.playerTriggerHandler, this.doAfterTrigger, this);
        }

        if (this.exitDoor.isOpen && this.player.canInput) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.nextLevel, null, this);
        }

        if (this.doAfterUpdate !== null) {
            this.doAfterUpdate()
        }
    },
    
    render: function () {
        this.gui.updateTime(ELAPSED_TIME + Math.floor(this.game.time.elapsedSecondsSince(START_TIME)));
    },

    // GAME FUNCTIONS

    /**
     * game over function
     * @param {AdslJumper.Player} player
     * @param {Phaser.Sprite} other
     */
    gameOver: function (player, other, playSound) {
        playSound = typeof playSound === "boolean" ? playSound : true;

        // что бы быть уверенным что функция вызывается один раз
        if (this.player.canInput) {
            this.player.canInput = false;
            this.player.stopUpdate = true;


            // play player death sound
            if (playSound) {
                SoundManager.playPlayerDeath();
            }

            _levelDeaths++;
            _deaths++;

            this.player.body.stop();
            this.player.body.gravity.y = -300;
            this.player.animations.play("death");

            // TODO убрать биткойн
            // score -1 after death
            if (_score > 0) {
                _score -= 1;
                this.gui.flash();
            } else {
                // continue state
                alert("ГАМОВЕР");
            }

            this.gui.setScore(_score);

            this.game.camera.shake(0.01, 500);
        }
    },

    /**
     * restart level
     */
    restartLevel: function () {
        this.game.state.restart(this.game.state.current);
    },

    /**
     * prepare for new level
     * @param {AdslJumper.Player} player
     * @param {AdslJumper.ExitDoor} door
     */
    nextLevel: function (player, door) {
        // запретить управление пользователем
        player.canInput = false;
        player.stopUpdate = true;

        // Скрыть игрока
        player.kill();
        player.pendingDestroy = true;
        door.animations.play("close");

        // reset levelDeaths
        //_levelDeaths = 0;

        // set next level
        _level = door.nextLevel;

        // camera
        this.game.camera.follow(door,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);

        this.game.camera.fade(0x000000, AdslJumper.gameOptions.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(this.startNewLevelState, this);
    },

    /**
     * start new level
     */
    startNewLevelState: function () {
        this.game.state.start("level" + _level);
    },

    // CALLBACKS

    /**
     * on player's death animation complete function
     */
    onPlayerDeathComplete: function () {
        this.player.body.gravity.y = 0;
        this.player.body.stop();
        this.player.reset((this.map.player.x + 16) *_scaleFactor, (this.map.player.y - 16) *_scaleFactor);
        this.player.restoreDefault();
        this.player.animations.play("respawn");
        // play player respawn sound
        SoundManager.playPlayerRespawn();
    },

    onPlayerRespawnComplete: function () {
        this.player.body.gravity.y = this.player.options.gravity;
        this.player.canInput = true;
        this.player.stopUpdate = false;
        this.player.body.velocity.y = 0;
    },

    onFlashCompleteFunction: function () {
        this.player.canInput = true;
    },

    // HANDLERS

    /**
     * player's collision with the platform
     * @param {AdslJumper.Player} layer
     * @param {Phaser.Sprite} collider
     */
    playerCollideHandler: function (player, collider) {
        player.customTouchUp = player.body.touching.up;
        player.customTouchRight = player.body.touching.right;
        player.customTouchDown = player.body.touching.down;
        player.customTouchLeft = player.body.touching.left;
    },

    /**
     * player's overlap with the trigger
     * @param player
     * @param trigger
     * @this {Phaser.State}
     */
    playerTriggerHandler: function (player, trigger) {
        player.inTrigger = true;
        try {
            this[trigger._event](player, trigger);
        } catch (err) {
            console.warn("no handler for " + trigger._event);
        }
    },

    /**
     * player's overlap with bonus
     * @param {AdslJumper.Player} player
     * @param {Phaser.Sprite} bonus
     */
    playerBonusHandler: function (player, bonus) {
        // TODO delete
        AdslJumper.utils.info(player.game.state.current, "bonus tag", bonus.tag);

        if (player.canInput) {
            try {
                this[bonus.tag + "Handler"](player, bonus);
            } catch (err) {
                AdslJumper.utils.warn(player.game.state.current, "BONUS handler not found for", bonus.tag);
            }
        }
    },

    /**
     * player coin overlap handler
     * @param {AdslJumper.Player} player
     * @param {AdslJumper.Coin} coin
     * @returns {boolean}
     */
    coinHandler: function (player, coin) {
        coin.disableBodyAndKill();
        SoundManager.playCoin();
        _score += 1;
        this.gui.setScore(_score);

        return false;
    },

    // WORLD

    /**
     * show explosion animation and play sound
     * @param {number} x
     * @param {number} y
     */
    makeExplosion: function(x, y) {
        var explosion = this.explosions.getFirstDead();
        explosion.x = x;
        explosion.y = y - 56;
        explosion.revive();
        explosion.animations.play("default", 16, false, true);
        SoundManager.playExplosion();
    },

    mineGameOver: function (player, trigger) {
        trigger.kill();
        this.makeExplosion(trigger.x, trigger.y);
        this.gameOver();
    }

};