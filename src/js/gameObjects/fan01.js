// Fan01 class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Fan01 = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "fan01");

    this.game = game;

    this.tag = "fan01";
    this.name = "fan01";

    // animation
    this.animations.add("default", [0, 1], 12, true);
    this.animations.play("default");
};

AdslJumper.Fan01.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Fan01.prototype.constructor = AdslJumper.Fan01;

