// ScreenD class
// extends Phaser.Sprite class
// only for goup
AdslJumper.ScreenD = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "screenD1.png");

    this.game = game;

    this.tag = "screenD";
    this.name = "screenD";

    // animation
    this.animations.add("default", [
        "screenD1.png",
        "screenD2.png",
        "screenD3.png",
        "screenD4.png",
        "screenD5.png",
        "screenD6.png",
        "screenD7.png"
    ], 12, true);
};

AdslJumper.ScreenD.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.ScreenD.prototype.constructor = AdslJumper.ScreenD;

