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
    this.body.drag.x = gameOptions.player.drag;
    this.currentSpeed = 0; 
    this.groundDelay = gameOptions.player.groundDelay; // player can jump a few frames after leaving ground
    this.groundDelayTimer = 0;
    this.wasOnGround = true; // for custom ground check

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

    if (this.body.onWall() && !this.body.blocked.down) {
        this.onWall = true;;
        this.body.gravity.y = 0;
        this.body.velocity.y = 100;
    } else {
        this.onWall = false;
        this.body.gravity.y = gameOptions.player.gravity;
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

    this.move();

    // player hit ground
    if (this.body.onFloor()) {
        this.currentState = this.groundState;
    }
};

// moving X axis player 
// void
AdslJumper.Player.prototype.move = function () {
    this.currentSpeed = 0;

    if (this.input.leftIsDown()) {
        //currentAcceleration -= gameOptions.player.acceleration;
        this.currentSpeed-= gameOptions.player.speed;
    }
    
    if (this.input.rightIsDown()) {
        //currentAcceleration += gameOptions.player.acceleration;
        this.currentSpeed += gameOptions.player.speed;
    }

    if (this.input.speedUpIsDown()) {
        this.currentSpeed *= gameOptions.player.runSpeedUpRate;
    }

    // less speed if in air
    if (this.currentState == this.airState) {
        this.currentSpeed *= gameOptions.player.inAirVelocityRate;
        console.log("air");
    }

    this.body.velocity.x = this.currentSpeed;
};

