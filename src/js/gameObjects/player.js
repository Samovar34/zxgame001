// Player class
// extends Phaser.Sprite class
AdslJumper.Player = function (game, input, x, y) {
    
    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "player1.png");
    
    // components
    this.game = game;
    this.input = input;
    this.soundManager = AdslJumper.modules.soundManager;
    this.options = AdslJumper.gameOptions.getPlayerOptions();

    // player variables
    this.facing = "right";
    this.settable = true; // проверка на возможность настроить игрока для текущего состояния
    this.canInput = true; // возможно ли управление персонажем
    this.isComeIn = false; // входит ли игрок в дверь
    
    this.anchor.setTo(0.5);

    // animation
    this.animations.add("walk", [
        "player2.png",
        "player3.png",
        "player4.png",
        "player3.png"
    ], this.options.walkAnimationSpeed);
    this.doubleJumpAnimation = this.animations.add("doubleJump", [
        "player7.png",
        "player8.png",
        "player7.png",
        "player9.png",
        "player6.png"
    ], this.options.doubleAnimationSpeed);

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
    this.fartParticles = AdslJumper.gameObjectFactory.createFartParticles.call(this);

};

AdslJumper.Player.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Player.prototype.constructor = AdslJumper.Player;

AdslJumper.Player.prototype.update = function () {

    // check collision with worldBounds or Tile
    // for particles when player touch roof
    if(this.body.blocked.up) {
        //this.canDoubleJump = false;
        this.soundManager.playPunch();
        this.fartParticles.x = this.position.x;
        this.fartParticles.y = this.position.y - 16;
        this.fartParticles.start(true, 525, null, 2, 100);
    }

    this.currentState();

    this.input.update();

    if (this.canInput && this.input.jumpIsJustDown()) {
        this.jump();
    }
};

// player jump Y axis
// void
AdslJumper.Player.prototype.jump = function () {  

    // прыжок от стены
    if (this.body.onWall() && !this.body.onFloor()) {
        this.wasOnGround = false;
        this.canDoubleJump = true;
        this.body.maxVelocity.y = this.options.maxFallSpeed;
        this.body.velocity.y = this.options.jump * -1;

        // play sound
        this.soundManager.playJump();

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
        this.soundManager.playJump();
        this.body.velocity.y = this.options.jump * -1;
        this.settable = true;
        this.currentState = this.airState;

    // дополнительный прыжок
    } else if (!this.body.onFloor() && this.canDoubleJump) {
        // double jump

        this.canDoubleJump = false;
        this.body.velocity.y = this.options.doubleJump * -1;
        this.settable = true;
        this.currentState = this.airState;

        // play sound and animation
        this.soundManager.playDoubleJump();
        this.animations.play("doubleJump");

        // show particles
        this.fartParticles.x = this.position.x;
        this.fartParticles.y = this.position.y;
        this.fartParticles.start(true, 525, null, 4, 100);
    }
};

// moving X axis player 
// void
AdslJumper.Player.prototype.move = function () {
    // reset current acceleration
    this.currentAcceleration = 0;

    if (this.canInput && this.input.leftIsDown()) {
        this.facing = "left";
        this.scale.x = -1;
        this.currentAcceleration -= this.options.acceleration;

        // play animation
        if (this.currentState === this.groundState) {
            this.animations.play("walk");
        }
    }
    
    if (this.canInput && this.input.rightIsDown()) {
        this.facing = "right";
        this.scale.x = 1;
        this.currentAcceleration += this.options.acceleration;

        // play animation
        if (this.currentState === this.groundState) {
            this.animations.play("walk");
        }
    }

    // less acceleration if in air
    if (this.currentState === this.airState) {
        this.currentAcceleration *= this.options.inAirAccelerationRate ;
    }

    this.body.acceleration.x = this.currentAcceleration;
};

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

    if (this.currentAcceleration === 0) {
        this.frameName = "player1.png";
    }
    
    // play sound
    if (this.frameName === "player2.png" || this.frameName === "player3.png" || this.frameName === "player4.png") {
        this.soundManager.playStep01();
    }

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

    if (this.doubleJumpAnimation.isPlaying) {
        // do nothing
    } else if (this.body.velocity.y < 0) {
        this.frameName  = "player5.png";
    } else {
        this.frameName = "player6.png";
    }

    // player sliding wall (pre wall-jump)
    if (this.body.onWall()) {
        // play sound
        this.soundManager.playStep02();

        this.settable = true; // allow set player for next state
        this.currentState = this.wallSlideState;
    } else if (this.body.onFloor()) { // player hit ground
        // play sound
        this.soundManager.playStep02();
        
        this.settable = true; // allow set player for next state
        this.currentState = this.groundState;
    }
};

AdslJumper.Player.prototype.wallSlideState = function wallSlideState() {
    // setup player
    if (this.settable) {
        this.body.maxVelocity.y = this.options.grip;
        this.settable = false;
    }

    this.frameName = "player10.png";

    // state logic
    if ((this.input.leftIsDown() && this.facing === "left") || (this.input.rightIsDown() && this.facing === "right")) {
        this.wallBreakClock = 0;
    } else {
        this.wallBreakClock++;
    }
    
    if (this.wallBreakClock >= this.wallBreakTime) {
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.airState;
    } else if (!this.body.onWall()) { // let go of the wall
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.airState;
    } else if (this.body.onFloor()) {
        this.wallBreakClock = 0;
        this.settable = true;
        this.currentState = this.groundState;
    }
};
