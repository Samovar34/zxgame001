// Coin class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Coin = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "bitcoin1.png");

    this.game = game;

    this.tag = "coin";

    // enable physics
    this.game.physics.arcade.enable(this);

    this.smoothed = false;
    this.scale.setTo(_scaleFactor);

    // animation
    this.animations.add("default", [
        "bitcoin1.png",
        "bitcoin2.png", 
        "bitcoin3.png", 
        "bitcoin4.png", 
        "bitcoin5.png", 
        "bitcoin6.png", 
        "bitcoin7.png",
        "bitcoin8.png"
    ], 8, true);
    this.animations.add("collected", [
        "bitcoin8.png", 
        "bitcoin9.png", 
        "bitcoin10.png", 
        "bitcoin11.png", 
        "bitcoin12.png", 
        "bitcoin13.png",
        "bitcoin14.png",
        "bitcoin15.png"
    ]);
};

AdslJumper.Coin.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Coin.prototype.constructor = AdslJumper.Coin;

// play sound and animation
AdslJumper.Coin.prototype.disableBodyAndKill = function () {
    this.body.enable = false;
    this.animations.play("collected", 24, false, true);
};