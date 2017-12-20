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

    // physics variables
    this.canJump = true;
    this.canDoubleJump = false;
    this.onWall = false;
    this.acceleration = 0;
	
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
        this.doubleJump = false;
    }

    if (this.body.blocked.down) {
        this.canJump = true;
    }

    if (this.body.onWall() && !this.body.blocked.down) {
        this.onWall = true;;
        this.body.gravity.y = 0;
        this.body.velocity.y = 100;
    } else {
        this.onWall = false;
        this.body.gravity.y = gameOptions.player.gravity;
    }

    this.move();

    if (this.input.jumpIsJustDown()) {
        this.jump();
    }


}

AdslJumper.Player.prototype.jump = function () {
    if (this.canJump) {
        if (this.body.blocked.down) {
            this.body.velocity.y= gameOptions.player.jump * -1;
        } else if (this.onWall) {
            this.body.velocity.y= gameOptions.player.jump * -1;
            if (this.body.blocked.left) {
                this.body.velocity.x = 550;
            } else {
                this.body.velocity.x = -550;
            }
        }
        
        // запретить обычный прыжок и разрешить двойной
        this.canJump = false;
        this.canDoubleJump = true;
    } else {
        if (this.canDoubleJump) {
            this.canDoubleJump = false;
            this.body.velocity.y = gameOptions.player.doubleJump * -1;
        }
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

    // less speed if in air 90%
    if (!this.body.onFloor()) {
        this.currentSpeed *= 0.9;
    }

    this.body.velocity.x = this.currentSpeed;
};

