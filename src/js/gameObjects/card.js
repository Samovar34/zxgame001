// Card class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Card = function (game, x, y, properties) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "card1.png");

    this.game = game;

    this.tag = "card";
    this.name = properties ? properties.name : "card";

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
};

AdslJumper.Card.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Card.prototype.constructor = AdslJumper.Card;
