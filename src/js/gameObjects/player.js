/**
 * Player class
 * @param {Phaser.Game} game
 * @param {number} x
 * @param {number} y
 * @constructor
 */
AdslJumper.Player = function (game, x, y) {
    
    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "player1.png");

    this.anchor.setTo(0.5);
    this.smoothed = false;
    
    // components
    this.game = game;
    this.options = {
        gravity: 1512, // 1512
        grip: 256,
        speed: 432, // 232
        maxFallSpeed: 1200, // 720
        runSpeedUpRate: 1.5,
        acceleration: 2500, // 2500
        jump: 564, // 624
        doubleJump: 484,
        drag: 3050, // 3050
        inAirAccelerationRate: 1.2, // acceleration *= inAirAccelerationRate
        inAirDrag: 0.1,
        groundDelay: 5, // delay in frames
        wallBreakTime: 15, // delay in frames
        walkAnimationSpeed: 10,
        doubleAnimationSpeed: 10,
        comeInAnimationSpeed: 10
    };

    // player variables
    this.settable = true; // проверка на возможность настроить игрока для текущего состояния
    this.canInput = true; // возможно ли управление персонажем
    this.isInteract = false; // может ли взаимодействовать игрок с тригерром
    this.inTrigger = false; // внутри триггера или нет?
    this.allowDoubleJump = true;
    this.allowWallSliding = true;
    this.hasCard = false; // взял ли игрок специальный ключ
    



    // animation
    this.idleAnimation = this.animations.add("idle", [
        "player1.png",
        "player2.png"
    ], 2);

    this.walkAnimation = this.animations.add("walk", [
        "player3.png",
        "player4.png",
        "player5.png",
        "player6.png"
    ], this.options.walkAnimationSpeed);
    
    this.doubleJumpAnimation = this.animations.add("doubleJump", [
        "player10.png",
        "player11.png",
        "player12.png",
        "player13.png"
    ], this.options.doubleAnimationSpeed);

    this.respawnAnimation = this.animations.add("respawn", [
        "player15.png",
        "player16.png",
        "player17.png",
        "player18.png",
        "player19.png",
        "player20.png",
        "player21.png",
        "player22.png",
        "player23.png"
    ], 12);

    this.deathAnimation = this.animations.add("death", [
        "player24.png",
        "player25.png",
        "player26.png",
        "player27.png",
        "player28.png",
        "player29.png"
    ], 16);

    // physics
    this.game.physics.arcade.enable(this);
    this.body.setSize(20, 30, 7, 2);
    this.body.gravity.y = this.options.gravity;
    this.body.acceleration.x = 0;
    this.body.maxVelocity.x = this.options.speed;
    this.body.maxVelocity.y = this.options.maxFallSpeed;
    this.body.drag.x = this.options.drag;
    this.groundDelay = this.options.groundDelay; // player can jump a few frames after leaving ground
    this.groundDelayTimer = 0;
    this.wasOnGround = true; // for custom ground check
    this.wallBreakTime = this.options.wallBreakTime;
    this.wallBreakClock = 0; // for custom wall check

    // physics variables
    this.canJump = true;
    this.canDoubleJump = false;
    this.onWall = false;
    this.doubleJumpDelay = 10; // time when can do double jump
    this.doubleJumpClock = 0;
    
    this.customTouchUp = false;
    this.customTouchRight = false;
    this.customTouchDown = false;
    this.customTouchLeft = false;

    this.scale.setTo(_scaleFactor);

    // player state
    this.currentState = this.groundState;
	
	//add to game
    this.game.add.existing(this);
    
    // particles
    this.fartParticles = AdslJumper.gameObjectFactory.createFartParticles();
};

AdslJumper.Player.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Player.prototype.constructor = AdslJumper.Player;

/**
 * restore player's variables to default
 */
AdslJumper.Player.prototype.restoreDefault = function () {
    // physics
    this.body.acceleration.x = 0;

    this.groundDelayTimer = 0;
    this.wasOnGround = true; // for custom ground check
    this.wallBreakClock = 0; // for custom wall check

    // physics variables
    this.canJump = true;
    this.canDoubleJump = false;
    this.onWall = false;

    this.customTouchUp = false;
    this.customTouchRight = false;
    this.customTouchDown = false;
    this.customTouchLeft = false;

    this.scale.x = _scaleFactor;

    // player state
    this.currentState = this.groundState;

    this.settable = true;
};

/**
 * Phaser call update function. Call after State.update
 */
AdslJumper.Player.prototype.update = function () {


    //TODO разобраться почему возникает прыжок если вызывать хардкорно
    if (!this.canInput) {
        return;
    }

    // check collision with wall
    // for particles when player touch roof
    if(this.customTouchUp) {
        SoundManager.playPunch();
    }

    // if player touch enything no allow double jump
    if (this._isToucn()) {
        this.canDoubleJump = false;
    }

    this.currentState();


    if (this.canInput && Input.dy > 0) {
        this.jump();
    }
};

/**
 * player's jump
 */
AdslJumper.Player.prototype.jump = function (force) {


    // jump from wall
    if (this._onWall() && !this._onFloor() && this.canJump && this.allowWallSliding) {
        this.wasOnGround = false;
        this.canDoubleJump = true;
        this.body.maxVelocity.y = this.options.maxFallSpeed;
        this.body.velocity.y = this.options.jump * -1;

        // play sound
        SoundManager.playJump();

        if (this.customTouchLeft) {
            this.body.velocity.x = this.options.speed;
        } else {
            this.body.velocity.x = -this.options.speed;
        }
        this.settable = true;
        this.currentState = this.airState;

    // jump from ground
    } else if (
        (this._onFloor() || this.wasOnGround) &&
        this.canJump
    ) {
        // simple jump
        this.wasOnGround = false;
        this.canDoubleJump = true;
        // play sound
        SoundManager.playJump();

        this.body.velocity.y = this.options.jump * -1;
        this.settable = true;
        this.currentState = this.airState;

    // double jump
    } else if (
        !this._onFloor() &&
        this.canDoubleJump &&
        this.allowDoubleJump &&
        this.doubleJumpClock > this.doubleJumpDelay
    ) {
        this.canDoubleJump = false;
        this.body.velocity.y = this.options.doubleJump * -1;
        this.settable = true;
        this.currentState = this.airState;

        // play sound and animation
        SoundManager.playDoubleJump();
        this.animations.play("doubleJump");

        // show particles
        this.fartParticles.x = this.position.x;
        this.fartParticles.y = this.position.y;
        this.fartParticles.start(true, 525, null, 4, 100);
    }
};

/**
 * X axis movement
 */
AdslJumper.Player.prototype.move = function () {

    if (this.canInput && Input.dx !== 0) {
        this.scale.x = _scaleFactor * Input.dx;

        if (this.currentState === this.groundState) {
            if (!this.walkAnimation.isPlaying) {
                this.animations.play("walk");
            }

        }
    }

    this.body.acceleration.x = this.options.acceleration * Input.dx;

};

/**
 * ground state
 */
AdslJumper.Player.prototype.groundState = function groundState() {
    // setup player
    if (this.settable) {
        this.body.drag.x = this.options.drag;
        this.body.maxVelocity.y = this.options.maxFallSpeed;
        this.settable = false;
    }

    this.doubleJumpClock = 0;
    this.canJump = true;


    // state logic
    this.wasOnGround = true;

    // X axis movement
    this.move();

    // this.currentAcceleration
    if (this.body.acceleration.x === 0) {
        if (this.walkAnimation.isPlaying) {
            this.walkAnimation.stop();
        }
        if (!this.idleAnimation.isPlaying) {
            this.animations.play("idle");
        }
    }
    
    // play sound
    if (
        this.frameName === "player3.png" ||
        this.frameName === "player4.png" ||
        this.frameName === "player5.png" ||
        this.frameName === "player6.png"
    ) {
        SoundManager.playStep01();
    }

    // fell of a ledge
    if (!this._onFloor()) {
        this.settable = true; // allow set player for next state
        this.currentState = this.airState;
    }
};

/**
 * air state
 */
AdslJumper.Player.prototype.airState = function airState() {
    // setup player
    if (this.settable) {
        // reduce friction
        this.body.drag.x = this.options.drag * this.options.inAirDrag;
        this.body.maxVelocity.y = this.options.maxFallSpeed;
        this.settable = false; // deny set player
    }

    this.doubleJumpClock++;

    // state logic
    if (this.wasOnGround) {
        this.groundDelayTimer++;
        if (this.groundDelayTimer > this.groundDelay) {
            this.groundDelayTimer = 0;
            this.wasOnGround = false;
            this.canJump = false;
        }
    } else {
        this.groundDelayTimer = 0;
    }

    // X axis movement
    this.move();

    if (this.doubleJumpAnimation.isPlaying) {
        // do nothing
    } else if (this.body.velocity.y < 0) {
        this.frameName  = "player8.png";
    } else {
        if (this.body.velocity.x !== 0) {
            this.frameName = "player13.png";
        } else {
            this.frameName = "player9.png";
        }

    }

    // player sliding wall (pre wall-jump)
    if (this._onWall() && this.allowWallSliding) {
        // play sound
        SoundManager.playStep02();
        this.settable = true; // allow set player for next state
        this.currentState = this.wallSlideState;
    } else if (this._onFloor()) { // player hit ground
        // play sound
        SoundManager.playStep02();
        this.settable = true; // allow set player for next state
        this.currentState = this.groundState;
    }
};

/**
 * wall slide state
 */
AdslJumper.Player.prototype.wallSlideState = function wallSlideState() {
    // setup player
    if (this.settable) {
        this.body.maxVelocity.y = this.options.grip;
        this.settable = false;
    }

    this.doubleJumpClock = 0;
    this.canJump = true;

    // stop any animation
    this.animations.stop();

    // display frame
    this.frameName = "player14.png";

    // state logic
    if ((Input.dx < 0 && this.scale.x < 0) || (Input.dx > 0 && this.scale.x >= 0)) {
        this.wallBreakClock = 0;
    } else {
        this.wallBreakClock++;
    }
    
    if (this.wallBreakClock >= this.wallBreakTime) {
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.airState;
    } else if (!this._onWall()) { // let go of the wall
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.airState;
    } else if (this._onFloor()) {
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.groundState;
    }
};

/**
 * custom reset function
 */
AdslJumper.Player.prototype._reset = function () {
    this.isInteract = false;
    this.inTrigger = false;
    this.hasKey = false;

    this.customTouchUp = false;
    this.customTouchRight = false;
    this.customTouchDown = false;
    this.customTouchLeft = false;
};

/**
 * custom wall check
 * @returns {boolean}
 */
AdslJumper.Player.prototype._onWall = function () {
    return this.customTouchLeft || this.customTouchRight;
};

/**
 * custom floor check
 * @returns {boolean}
 */
AdslJumper.Player.prototype._onFloor = function () {
    return this.customTouchDown;
};

/**
 * custom roof check
 * @returns {boolean}
 */
AdslJumper.Player.prototype._onRoof = function () {
    return this.customTouchUp;
};

/**
 * custom touch check
 * @returns {boolean}
 */
AdslJumper.Player.prototype._isToucn = function () {
    return this.customTouchUp  ||
        this.customTouchRight  ||
        this.customTouchDown  ||
        this.customTouchLeft;
};


/**
 * set callback
 * @param {Function} fn
 * @param {any} context
 */
AdslJumper.Player.prototype.setOnDeathCompleteCallback = function (fn, context) {
    this.deathAnimation.onComplete.add(fn, context);
};

/**
 * set callback
 * @param {Function} fn
 * @param {any} context
 */
AdslJumper.Player.prototype.setOnRespawnCompleteCallback = function (fn, context) {
    this.respawnAnimation.onComplete.add(fn, context);
};