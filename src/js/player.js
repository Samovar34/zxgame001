// Player class
// inheritance Phaser.Sprite class
AdslJumper.Player = function (game, input, x, y) {
    
	Phaser.Sprite.call(this, game, x, y, "player");
	
    this.game = game;
    this.input = input;
    
    // player variables
    this.facing = "right";
    this.settable = true; // проверка на возможность настроить игрока для текущего состояния
	
	this.anchor.setTo(0.5);
    //this.smoothed = false;
    
    // physics
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.player.gravity;
    this.body.collideWorldBounds = true;
    this.body.acceleration.x = 0;
    this.body.maxVelocity.x = gameOptions.player.speed;
    this.body.maxVelocity.y = gameOptions.player.maxFallSpeed;
    this.body.drag.x = gameOptions.player.drag;
    this.currentSpeed = 0; 
    this.groundDelay = gameOptions.player.groundDelay; // player can jump a few frames after leaving ground
    this.groundDelayTimer = 0;
    this.wasOnGround = true; // for custom ground check
    this.wallBreakTime = gameOptions.player.wallBreakTime;
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
};

AdslJumper.Player.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Player.prototype.constructor = AdslJumper.Player;

AdslJumper.Player.prototype.update = function () {

    // player state

    // check collision with worldBounds or Tile
    // false = collision
    // true = no collision
    // if player hit tile or worldBounds, no double jump is allowed
    if(!this.body.blocked.none) {
        this.canDoubleJump = false;
    }

    this.currentState();

    if (this.input.jumpIsJustDown()) {
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
        this.body.maxVelocity.y = gameOptions.player.maxFallSpeed;
        this.body.velocity.y = gameOptions.player.jump * -1;

        if (this.body.blocked.left) {
            this.body.velocity.x = gameOptions.player.speed;
        } else {
            this.body.velocity.x = -gameOptions.player.speed;
        }
        this.settable = true;
        this.currentState = this.airState;

    // прыжок с платформы (пола)
    } else if (this.body.onFloor() || this.wasOnGround) {
        // simple jump
        this.wasOnGround = false;
        this.canDoubleJump = true;
        this.body.velocity.y = gameOptions.player.jump * -1;
        this.settable = true;
        this.currentState = this.airState;

    // дополнительный прыжок
    } else if (!this.body.onFloor() && this.canDoubleJump) {
        // double jump
        this.canDoubleJump = false;
        this.body.velocity.y = gameOptions.player.doubleJump * -1;
        this.settable = true;
        this.currentState = this.airState;
    }
};

// moving X axis player 
// void
AdslJumper.Player.prototype.move = function () {
    // reset current acceleration
    this.currentAcceleration = 0;

    if (this.input.leftIsDown()) {
        this.facing = "left";
        this.scale.setTo(-.5, .5);
        this.currentAcceleration -= gameOptions.player.acceleration;
    }
    
    if (this.input.rightIsDown()) {
        this.facing = "right";
        this.scale.setTo(.5, .5);
        this.currentAcceleration += gameOptions.player.acceleration;
    }

    // less acceleration if in air
    if (this.currentState == this.airState) {
        this.currentAcceleration /= gameOptions.player.inAirAccelerationRate ;
    }

    this.body.acceleration.x = this.currentAcceleration;
};

// states
AdslJumper.Player.prototype.groundState = function groundState() {
    // setup player
    if (this.settable) {
        this.body.drag.x = gameOptions.player.drag;
        this.body.maxVelocity.y = gameOptions.player.maxFallSpeed;
        this.settable = false;
    }

    // stae logic
    this.wasOnGround = true;

    // X axis movement
    this.move();

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
        this.body.drag.x = gameOptions.player.drag/2;
        this.body.maxVelocity.y = gameOptions.player.maxFallSpeed;
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
        this.currentState = this.wallSlideState;
    }

    // player hit ground
    if (this.body.onFloor()) {
        this.settable = true; // allow set player for next state
        this.currentState = this.groundState;
    }
};

AdslJumper.Player.prototype.wallSlideState = function wallSlideState() {
    // setup player
    if (this.settable) {
        this.body.maxVelocity.y = gameOptions.player.grip;
        this.settable = false;
    }

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
