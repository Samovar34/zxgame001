// Error01 class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Error01 = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "error01");

    this.game = game;

    this.tag = "error01";
    this.name = "error01";

    // animation
    this.animations.add("default", [0, 1], 0.8, true);
    this.animations.play("default");
};

AdslJumper.Error01.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Error01.prototype.constructor = AdslJumper.Error01;

