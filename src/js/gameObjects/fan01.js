// Fan01 class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Fan01 = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "fan01.png");

    this.game = game;

    this.tag = "fan01";
    this.name = "fan01";

    // animation
    this.animations.add("default", ["fan01.png", "fan02.png"], 12, true);
};

AdslJumper.Fan01.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Fan01.prototype.constructor = AdslJumper.Fan01;

