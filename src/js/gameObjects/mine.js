// Mine class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Mine = function (game, soundManager, explosionSprite, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "mine1.png");

    this.game = game;
    this.soundManager = soundManager;
    this.explosionSprite = explosionSprite

    this.tag = "mine";
    this.name = "mine";

    // enable physics
    this.game.physics.arcade.enable(this);
    this.body.setSize(12, 6, 2, 8);

    // animation
    this.animations.add("default", ["mine1.png", "mine2.png"], 1, true);
};

AdslJumper.Mine.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Mine.prototype.constructor = AdslJumper.Mine;

// play sound and animation
AdslJumper.Mine.prototype.blow = function () {
    this.body.enable = false;
    this.kill();
    this.explosionSprite.revive();
    this.explosionSprite.x = this.x - 48;
    this.explosionSprite.y = this.y - 96;
    this.soundManager.playExplosion();
    this.explosionSprite.animations.play("default", 24, false, true);
}