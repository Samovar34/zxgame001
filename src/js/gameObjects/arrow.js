// Player class
// extends Phaser.Sprite class
AdslJumper.GUIArrow = function (game, x, y) {
    
    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "arrowD1.png");
    
    // components
    this.game = game;

    this.animations.add("default", [
        "arrowD1.png",
        "arrowD2.png",
        "arrowD3.png",
        "arrowD2.png"
    ], 6, true);
    
    this.animations.play("default");
	//add to game
    this.game.add.existing(this);
};

AdslJumper.GUIArrow.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.GUIArrow.prototype.constructor = AdslJumper.GUIArrow;
