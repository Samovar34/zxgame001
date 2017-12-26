// Player class
// inheritance Phaser.Sprite class
AdslJumper.Player = function (game, input, x, y) {
    
	Phaser.Sprite.call(this, game, x, y, "player");
	
    this.game = game;
    this.input = input;
    
    // player variables
    this.facing = "right";
	
	this.anchor.setTo(0.5);
    this.smoothed = false;
    
    // physics
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.player.gravity;
    this.body.collideWorldBounds = true;
    this.body.acceleration.x = 0;
    this.body.maxVelocity.x = gameOptions.player.speed;
    //this.body.drag.x = gameOptions.player.drag;
    this.currentSpeed = 0; 
    this.groundDelay = gameOptions.player.groundDelay; // player can jump a few frames after leaving ground
    this.groundDelayTimer = 0;
    this.wasOnGround = true; // for custom ground check
    this.wallBreakTime = gameOptions.player.wallBreakTime;
    this.wallBreakClock = 0;
    this.body.stopVelocityOnCollide = false;

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

AdslJumper.Player.prototype.jump = function () {  
    //TODO запрет прыжка при определённых условиях

    if (this.body.onWall() && !this.body.onFloor()) {
        // jump from wall
        this.wasOnGround = false;
        this.canDoubleJump = true;
        this.body.maxVelocity.y = gameOptions.player.gravity;
        this.body.velocity.y = gameOptions.player.jump * -1;
        if (this.body.blocked.left) {
            this.body.velocity.x = gameOptions.player.speed * 500;
        } else {
            this.body.velocity.x = -gameOptions.player.speed * 500;
        }
        this.currentState = this.airState;
    } else if (this.body.onFloor() || this.wasOnGround) {
        // simple jump
        this.wasOnGround = false;
        this.canDoubleJump = true;
        this.body.velocity.y = gameOptions.player.jump * -1;
        this.currentState = this.airState;
    } else if (!this.body.onFloor() && this.canDoubleJump) {
        // double jump
        this.wasOnGround = false;
        this.canDoubleJump = false;
        this.body.velocity.y = gameOptions.player.doubleJump * -1;
        this.currentState = this.airState;
    }
};

// moving X axis player 
// void
AdslJumper.Player.prototype.move = function () {

    this.currentAcceleration = 0;

    if (this.input.leftIsDown()) {
        this.facing = "left";
        this.currentAcceleration -= gameOptions.player.acceleration;
    }
    
    if (this.input.rightIsDown()) {
        this.facing = "right";
        this.currentAcceleration += gameOptions.player.acceleration;
    }

    if (this.input.speedUpIsDown()) {
        this.body.maxVelocity.x = gameOptions.player.speed * gameOptions.player.runSpeedUpRate;
    } else {
        this.body.maxVelocity.x = gameOptions.player.speed;
    }

    // less speed if in air
    if (this.currentState == this.airState) {
        this.body.maxVelocity.x *= gameOptions.player.inAirVelocityRate;
    }

    this.body.acceleration.x = this.currentAcceleration;
};

// states
AdslJumper.Player.prototype.groundState = function groundState() {
    // player moving on ground
    this.wasOnGround = true;

    this.move();

    // fell of a ledge
    if (!this.body.onFloor()) {
        this.currentState = this.airState;
    }
};

AdslJumper.Player.prototype.airState = function airState() {
    // player moving on air
    if (this.wasOnGround) {
        this.groundDelayTimer++;
        if (this.groundDelayTimer > this.groundDelay) {
            this.groundDelayTimer = 0;
            this.wasOnGround = false;
        }
    } else {
        this.groundDelayTimer = 0;
    }

    // moving player
    this.move();

    // reduce friction
    //this.body.drag.x = gameOptions.player.drag/10;

    // player sliding wall (pre wall-jump)
    if (this.body.onWall()) {
        this.body.maxVelocity.y = gameOptions.player.grip;
        this.currentState = this.wallSlideState;
    }

    // player hit ground
    if (this.body.onFloor()) {
        this.body.drag.x = gameOptions.player.drag;
        this.currentState = this.groundState;
    }
};

AdslJumper.Player.prototype.wallSlideState = function wallSlideState() {

    if ((this.input.leftIsDown() && this.facing == "left") || (this.input.rightIsDown() && this.facing == "right")) {
        this.wallBreakClock = 0;
    } else {
        this.wallBreakClock++;
    }
    
    if (this.wallBreakClock >= this.wallBreakTime) {
        this.wallBreakClock = 0;
        this.body.maxVelocity.y = gameOptions.player.gravity;
        this.currentState = this.airState;
    }

    // let go of the wall
    if (!this.body.onWall()) {
        this.body.maxVelocity.y = gameOptions.player.gravity;
        this.wallBreakClock = 0;
        this.currentState = this.airState;
    }

    if (this.body.onFloor()) {
        this.body.maxVelocity.y = gameOptions.player.gravity;
        this.wallBreakClock = 0;
        this.currentState = this.groundState;
    }
};
