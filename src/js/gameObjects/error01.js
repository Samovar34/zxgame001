// Error01 class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Error01 = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "error01.png");

    this.game = game;

    this.tag = "error01";
    this.name = "error01";

    // animation
    this.animations.add("default", ["error01.png", "error02.png"], 1.2, true);
};

AdslJumper.Error01.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Error01.prototype.constructor = AdslJumper.Error01;

