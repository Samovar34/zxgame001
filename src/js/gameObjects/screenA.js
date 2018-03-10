// Screen class
// extends Phaser.Sprite class
// only for goup
AdslJumper.ScreenA = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "screenA1.png");

    this.game = game;

    this.tag = "screenA";
    this.name = "screenA";

    // animation
    this.animations.add("default", [
        "screenA1.png",
        "screenA2.png",
        "screenA3.png",
        "screenA4.png"
    ], 2, true);
};

AdslJumper.ScreenA.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.ScreenA.prototype.constructor = AdslJumper.ScreenA;

