/**
 * Basic state Class
 * @param {Phaser.Game} game
 * @param {Object} game properties
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
     * @type boolean
     */
    this._debug = prop.debug;

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
        // save game
        AdslJumper.storage.save(ELAPSED_TIME + Math.floor(this.game.time.elapsedSecondsSince(START_TIME)));

        AdslJumper.storage.load();

        // set renderer
        this.game.renderer.renderSession.roundPixels = false;
        this.game.clearBeforeRender = false;

        // init modules
        AdslJumper.gameObjectFactory.init(this);

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


        this.createCollision();
        this.createFx();
        this.createTriggers();
        this.hasTriggers = true;

        // if (this.map.triggers.length > 0) {
        //     this.createTriggers();
        //     this.hasTriggers = true;
        // }

        if (this.map.traps.length > 0) {
            this.createTraps();
        }

        if (this.map.bonus.length > 0) {
            this.createBonus();
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

        // TODO debug
        if (this._debug) {
            this.player.body.gravity.setTo(0, 0);
            this.player.alpha = 0.2;
        }

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
        this.gui.setRoom(_level);
        this.gui.setScore(_score);

        // MUSIC
        if (!SoundManager.currentTrack) {
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

        if (this._debug) {
            this.game.physics.arcade.moveToPointer(this.player, 160, this.game.input.activePointer, 500);
            return;
        }


        // TODO debug
        if (!this.player.alive) {
            return;
        }

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
     */
    gameOver: function () {
        // что бы быть уверенным что функция вызывается один раз
        if (this.player.canInput) {
            this.player.canInput = false;
            this.player.stopUpdate = true;

            SoundManager.playPlayerDeath();

            _levelDeaths++;
            _deaths++;

            this.player.body.stop();
            this.player.body.gravity.y = -300;
            this.player.animations.play("death");

            this.gui.flash();

            // TODO add death score

            this.game.camera.shake(0.01, 500);
        }
    },

    /**
     * gameOver
     * @param {AdslJumper.Player} player
     * @param {AdslJumper.MovableThorn} movableThorn
     */
    gameOverMT: function (player, movableThorn) {
        if (movableThorn.isDangerous()) {
            this.gameOver();
        }
    },

    /**
     *
     * @param {AdslJumper.Player} player
     * @param {Phaser.Sprite} trigger
     */
    mineGameOver: function (player, trigger) {
        trigger.kill();
        this.makeExplosion(trigger.x, trigger.y);
        this.gameOver();
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
        if (_level === 11) {
            this.game.state.start("waitDecodeAudio");
        } else {
            this.game.state.start("level" + _level);
        }

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

        if (collider.tag === "rb2d") {
            player.customTouchRight = false;
            player.customTouchLeft = false
        }
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
            this[trigger.data.event](player, trigger);
        } catch (err) {
            console.warn(err.message);
            console.warn("no handler for " + trigger.data.event);
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
     * create collision group for player
     */
    createCollision: function () {
        this.collision2d = this.add.group();
        this.collision2d.enableBody = true;

        var tempSprite = null;

        for (var i = 0; i < this.map.collision.length; i += 4) {
            tempSprite = this.make.sprite(
                this.map.collision[i] *_scaleFactor,
                this.map.collision[i + 1] * _scaleFactor
            );
            tempSprite.width = this.map.collision[i + 2] * _scaleFactor;
            tempSprite.height = this.map.collision[i + 3] * _scaleFactor;

            this.collision2d.add(tempSprite);
        }

        this.collision2d.setAll("body.immovable", "true");
    },
    /**
     * create group with bonus
     */
    createBonus: function () {

        this.bonus = this.add.group();

        for (var i = 0; i < this.map.bonus.length; i += 3) {
            this.bonus.add(
                AdslJumper.gameObjectFactory[this.map.bonus[i]](this.map.bonus[i + 1], this.map.bonus[i + 2])
            );
        }

        this.bonus.callAll("animations.play", "animations", "default");
    },

    /**
     * create fx group
     */
    createFx: function () {

        this.fx = this.add.group();

        for (var i = 0; i < this.map.fx.length; i += 3) {
            try {
                this.fx.add(AdslJumper.gameObjectFactory[this.map.fx[i]](this.map.fx[i + 1], this.map.fx[i + 2]));
            } catch (err) {
                console.warn("createFx: " + this.map.fx[i] + " not gameObject(function)");
            }

        }

        this.fx.callAll("animations.play", "animations", "default");
    },

    /**
     * create triggers group
     */
    createTriggers: function () {
        // create triggers group and activate physics
        this.triggers = this.add.group();
        this.triggers.enableBody = true;

        //temp variables
        var tempElement = null;

        for (var i = 0; i < this.map.triggers.length; i += 5) {
            // create an element
            tempElement = this.make.sprite(
                this.map.triggers[i] * _scaleFactor,
                this.map.triggers[i+1] * _scaleFactor);

            // setup the element
            tempElement.width = this.map.triggers[i+2] * _scaleFactor;
            tempElement.height = this.map.triggers[i+3] * _scaleFactor;

            tempElement.data.event = this.map.triggers[i+4];

            // add to the group
            this.triggers.add(tempElement);
        }
    },

    /**
     * create traps
     */
    createTraps: function () {

        for (var i = 0; i < this.map.traps.length; i++) {

            // add to the group
            this.triggers.add(AdslJumper.gameObjectFactory[this.map.traps[i].name](this.map.traps[i].x, this.map.traps[i].y));
        }

        this.triggers.callAll("animations.play", "animations", "default");
    },

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
    }

};