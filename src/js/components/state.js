/**
 * Basic state Class
 * @param {Phaser.Game} game
 * @param {number} width world width
 * @param {number} height world height
 * @param {boolean} isCanInputOnFlash
 * @param {boolean} isOpenDoor=true]
 * @constructor
 */
AdslJumper.State = function (game, width, height, isCanInputOnFlash, isOpenDoor) {
    this.game = game;

    /**
     * game world width
     * @type {number}
     * @private
     */
    this._width = width;
    /**
     * game world height
     * @type {number}
     * @private
     */
    this._height = height;


    /**
     * if true player can move after camera flash
     * @type {boolean}
     * @private
     */
    this._isCanInputOnFlash = isCanInputOnFlash;
    /**
     * if true exit door will open
     * @type {boolean}
     * @private
     */
    this._isOpenDoor = isOpenDoor;



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
        this.player.setOnDeathCompleteCallback(AdslJumper.gameFunc.onPlayerDeathComplete, this);
        this.player.setOnRespawnCompleteCallback(AdslJumper.gameFunc.onPlayerRespawnComplete, this);

        this.foreground = this.game.add.group();

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
            this.game.camera.onFlashComplete.addOnce(AdslJumper.gameFunc.onFlashCompleteFunction, this); // canInput = true
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

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);

        if (this.hasBonus) {
            this.game.physics.arcade.overlap(this.player, this.bonus, AdslJumper.gameFunc.playerBonusHandler, this.doAfterBonus, this);
        }

        if (this.hasTriggers) {
            this.game.physics.arcade.overlap(this.player, this.triggers, AdslJumper.gameFunc.playerTriggerHandler, this.doAfterTrigger, this);
        }

        if (this.exitDoor.isOpen && this.player.canInput) {
            this.game.physics.arcade.collide(this.player, this.exitDoor, AdslJumper.gameFunc.nextLevel, null, this);
        }

        if (this.doAfterUpdate !== null) {
            this.doAfterUpdate()
        }
    },
    
    render: function () {
        this.gui.updateTime(Math.floor(this.game.time.elapsedSecondsSince(START_TIME)));
    },

    gameOver: AdslJumper.gameFunc.gameOver
};