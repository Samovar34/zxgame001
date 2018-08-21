// Platform01 class
// extends Phaser.Sprite class
// only for group
AdslJumper.Platform01 = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "platform01.png");

    this.game = game;

    this.tag = "Platform01";
    this.name = "Platform01";

    // physics
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.setSize(60, 28, 2, 2);

    // animation
    this.animations.add("default", [
        "platform01.png",
        "platform02.png",
        "platform03.png",
        "platform04.png",
        "platform05.png",
        "platform06.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform07.png",
        "platform06.png",
        "platform05.png",
        "platform04.png",
        "platform03.png",
        "platform02.png",
        "platform01.png",
        "platform01.png",
        "platform01.png",
        "platform01.png",
        "platform01.png",
        "platform01.png",
        "platform01.png",
        "platform01.png",
        "platform01.png",
        "platform01.png"
    ], 5, true);
    this.animations.play("default");
};

AdslJumper.Platform01.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Platform01.prototype.constructor = AdslJumper.Platform01;

AdslJumper.Platform01.prototype.update = function () {

    if (this.frameName !== "platform07.png") {
        this.body.enable = false;
    } else {
        this.body.enable = true;
    }
};

