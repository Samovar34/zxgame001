// Mine class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Mine = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "mine1.png");

    this.game = game;

    this.tag = "mine";
    this.name = "mine";

    // enable physics
    this.game.physics.arcade.enable(this);
    this.body.setSize(12, 6, 2, 8);

    // animation
    this.animations.add("default", ["mine1.png", "mine2.png"], 1, true);
};

AdslJumper.Mine.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Mine.prototype.constructor = AdslJumper.Mine;