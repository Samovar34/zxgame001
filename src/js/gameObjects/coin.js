// Coin class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Coin = function (game, x, y, properties) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "bitcoin1.png");

    this.game = game;

    this.tag = "coin";
    this.name = properties ? properties.name : "coin";

    console.log(properties);

    // enable physics
    this.game.physics.arcade.enable(this);

    // animation
    this.animations.add("default", ["bitcoin1.png", 
        "bitcoin2.png", 
        "bitcoin3.png", 
        "bitcoin4.png", 
        "bitcoin5.png", 
        "bitcoin6.png", 
        "bitcoin1.png", 
        "bitcoin7.png"
    ], 9, true);
    this.animations.add("collected", [
        "bitcoin8.png", 
        "bitcoin9.png", 
        "bitcoin10.png", 
        "bitcoin11.png", 
        "bitcoin12.png", 
        "bitcoin13.png",
        "bitcoin14.png"
    ]);
};

AdslJumper.Coin.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Coin.prototype.constructor = AdslJumper.Coin;

// play sound and animation
AdslJumper.Coin.prototype.disableBodyAndKill = function () {
    this.body.enable = false;
    this.animations.play("collected", 18, false, true);
};