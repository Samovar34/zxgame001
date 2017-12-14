// Player class
var Player = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, "player");
	
	this.game = game;
	
	this.anchor.setTo(0.5);
	player.smoothed = false;
	
	//add to game
	this.game.add.existing(this);
}

