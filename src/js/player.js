// Player class
var Player = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, "player");
	
    this.game = game;
    
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

    // physics variables
    this.canJump = true;
    this.canDoubleJump = false;
    this.onWall = false;
    this.acceleration = 0;
	
	//add to game
	this.game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.moveLeft = function () {

};

Player.prototype.moveRight = function () {

};

Player.prototype.jump = function () {

};

Player.prototype.move = function () {

};

