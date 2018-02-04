// Player class
// inheritance Phaser.Sprite class
AdslJumper.Player = function (game, input, x, y) {
    
	Phaser.Sprite.call(this, game, x, y, "player");
	
    this.game = game;
    this.input = input;

    // возможно ли управление персонажем
    this.canInput = true;
    this.isComeIn = false; // входит ли игрок в дверь
    
    // player variables
    this.facing = "right";
    this.settable = true; // проверка на возможность настроить игрока для текущего состояния
	
    this.anchor.setTo(0.5);
    this.scale.setTo(gameOptions.scaleFactor);
    this.smoothed = false;

    this.options = AdslJumper.gameOptions.getPlayerOptions();

    // animation
    this.animations.add("walk", [1, 2, 3, 2], this.options.walkAnimationSpeed);
    this.doubleJumpAnimation = this.animations.add("doubleJump", [6, 7, 6, 8, 5], this.options.doubleAnimationSpeed);
    this.animations.add("comeIn", [11, 12, 13, 14, 10], this.options.comeInAnimationSpeed)

    // // sounds
    // this.jumpSound = this.game.add.audio('jump');
    // this.jumpSound.volume = gameOptions.sound.sfx * 0.75;
    // this.doubleJumpSound = this.game.add.audio('doubleJump');
    // this.doubleJumpSound.volume = gameOptions.sound.sfx;
    // this.step01 = this.game.add.audio("step01");
    // this.step01.volume = gameOptions.sound.sfx * 0.4;
    // this.step02 = this.game.add.audio("step02");
    // this.step02.volume = gameOptions.sound.sfx * 0.4;
    
    // physics
    this.game.physics.arcade.enable(this);
    this.body.setSize(26, 30, 4, 2);
    this.body.gravity.y = this.options.gravity;
    this.body.collideWorldBounds = true;
    this.body.acceleration.x = 0;
    this.body.maxVelocity.x = this.options.speed;
    this.body.maxVelocity.y = this.options.maxFallSpeed;
    this.body.drag.x = this.options.drag;
    this.currentSpeed = 0; 
    this.groundDelay = this.options.groundDelay; // player can jump a few frames after leaving ground
    this.groundDelayTimer = 0;
    this.wasOnGround = true; // for custom ground check
    this.wallBreakTime = this.options.wallBreakTime;
    this.wallBreakClock = 0;

    // physics variables
    this.canJump = true;
    this.canDoubleJump = false;
    this.onWall = false;
    this.acceleration = 0;

    // player state
    this.currentState = this.groundState;
	
	//add to game
    this.game.add.existing(this);
    
    // particles
    this.em = this.game.add.emitter(0, 0, 10);
    this.em.makeParticles("sparks", [1]);
    this.em.setYSpeed(this.options.particleSpeed.minY, this.options.particleSpeed.maxY);
    this.em.setXSpeed(-gameOptions.particleSpeed/25, gameOptions.particleSpeed/25);
    this.em.minRotation = 0;
    this.em.maxRotation = 0;
    this.em.minParticleScale = 1;
    this.em.maxParticleScale = 5;
    this.em.alpha = 0.4;

};

AdslJumper.Player.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Player.prototype.constructor = AdslJumper.Player;

AdslJumper.Player.prototype.update = function () {

    // player state

    // check collision with worldBounds or Tile
    // false = collision
    // true = no collision
    // if player hit tile or worldBounds, no double jump is allowed
    if(this.body.blocked.up) {
        this.canDoubleJump = false;
    }

    this.currentState();

    if (this.canInput && this.input.jumpIsJustDown()) {
        this.jump();
    }
}

// player jump Y axis
// void
AdslJumper.Player.prototype.jump = function () {  
    //TODO запрет прыжка при определённых условиях

    // прыжок от стены
    if (this.body.onWall() && !this.body.onFloor()) {
        this.wasOnGround = false;
        this.canDoubleJump = true;
        this.body.maxVelocity.y = this.options.maxFallSpeed;
        this.body.velocity.y = this.options.jump * -1;

        // play sound
        this.jumpSound.play();

        if (this.body.blocked.left) {
            this.body.velocity.x = this.options.speed;
        } else {
            this.body.velocity.x = -this.options.speed;
        }
        this.settable = true;
        this.currentState = this.airState;

    // прыжок с платформы (пола)
    } else if (this.body.onFloor() || this.wasOnGround) {
        // simple jump
        this.wasOnGround = false;
        this.canDoubleJump = true;
        // play sound
        this.jumpSound.play();
        this.body.velocity.y = this.options.jump * -1;
        this.settable = true;
        this.currentState = this.airState;

    // дополнительный прыжок
    } else if (!this.body.onFloor() && this.canDoubleJump) {
        // double jump
        // play sound
        this.doubleJumpSound.play();
        this.canDoubleJump = false;
        this.body.velocity.y = this.options.doubleJump * -1;
        this.settable = true;
        this.currentState = this.airState;
        this.doubleJumpAnimation.play();
        this.em.x = this.position.x;
        this.em.y = this.position.y;
        this.em.start(true, 525, null, 6, 100);
    }

    // animation happens in move
};

// moving X axis player 
// void
AdslJumper.Player.prototype.move = function () {
    // reset current acceleration
    this.currentAcceleration = 0;

    if (this.canInput && this.input.leftIsDown()) {
        this.facing = "left";
        this.scale.x = -gameOptions.scaleFactor;
        this.currentAcceleration -= this.options.acceleration;

        // play animation
        if (this.currentState === this.groundState) {
            this.animations.play("walk");
        }
    }
    
    if (this.canInput && this.input.rightIsDown()) {
        this.facing = "right";
        this.scale.x = gameOptions.scaleFactor;
        this.currentAcceleration += this.options.acceleration;

        // play animation
        if (this.currentState === this.groundState) {
            this.animations.play("walk");
        }
    }

    // less acceleration if in air
    if (this.currentState == this.airState) {
        this.currentAcceleration *= this.options.inAirAccelerationRate ;
    }

    this.body.acceleration.x = this.currentAcceleration;

    if (this.currentState === this.airState) {
        if (this.doubleJumpAnimation.isPlaying) {
            
        } else if (this.body.velocity.y < 0) {
            this.frame  = 4;
        } else {
            // frame 6 not in use
            this.frame = 5;
        }
    }

    if (this.currentAcceleration == 0 && this.currentState === this.groundState) {
        this.frame = 0;
    }
};

AdslJumper.Player.prototype.comeIn = function () {
    this.currentState = this.comeInState;
}

// states
AdslJumper.Player.prototype.groundState = function groundState() {
    // setup player
    if (this.settable) {
        this.body.drag.x = this.options.drag;
        this.body.maxVelocity.y = this.options.maxFallSpeed;
        this.settable = false;
    }

    // stae logic
    this.wasOnGround = true;

    // X axis movement
    this.move();

    var temp = Math.random();
    // play sound
    if (this.frame === 1) {
        if (!this.step01.isPlaying) {
            this.step01.play();
        }

    }
    if (this.frame === 3) {
        if (!this.step02.isPlaying) {
            this.step02.play();
        }
    }


    // TODO animation
    // TODO play sound
    // TODO stop running animation

    // fell of a ledge
    if (!this.body.onFloor()) {
        this.settable = true; // allow set player for next state
        this.currentState = this.airState;
    }
};

AdslJumper.Player.prototype.airState = function airState() {
    // setup player
    if (this.settable) {
        // reduce friction
        this.body.drag.x = this.options.drag * this.options.inAirDrag;
        this.body.maxVelocity.y = this.options.maxFallSpeed;
        this.settable = false; // deny set player
    }

    // state logic
    if (this.wasOnGround) {
        this.groundDelayTimer++;
        if (this.groundDelayTimer > this.groundDelay) {
            this.groundDelayTimer = 0;
            this.wasOnGround = false;
        }
    } else {
        this.groundDelayTimer = 0;
    }

    // X axis movement
    this.move();

    // player sliding wall (pre wall-jump)
    if (this.body.onWall()) {
        this.settable = true; // allow set player for next state

        // play sound
        if (!this.step01.isPlaying) {
            this.step01.play();
        }
        this.currentState = this.wallSlideState;
    }

    // player hit ground
    if (this.body.onFloor()) {
        this.settable = true; // allow set player for next state

        // play sound
        if (!this.step01.isPlaying) {
            this.step01.play();
        }

        this.currentState = this.groundState;
    }
};

AdslJumper.Player.prototype.wallSlideState = function wallSlideState() {
    // setup player
    if (this.settable) {
        this.body.maxVelocity.y = this.options.grip;
        this.settable = false;
    }

    // TODO подумать где изменять фрейм
    this.frame = 9;

    // state logic
    if ((this.input.leftIsDown() && this.facing == "left") || (this.input.rightIsDown() && this.facing == "right")) {
        this.wallBreakClock = 0;
    } else {
        this.wallBreakClock++;
    }
    
    if (this.wallBreakClock >= this.wallBreakTime) {
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.airState;
    }

    // let go of the wall
    if (!this.body.onWall()) {
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.airState;
    }

    if (this.body.onFloor()) {
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.groundState;
    }
};

AdslJumper.Player.prototype.comeInState = function () {
    // если игрок не входит в дверь
    if (!this.isComeIn) {
        this.isComeIn = true;
        this.animations.play("comeIn");
    }
};
