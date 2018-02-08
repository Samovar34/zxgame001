// Coin class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Coin = function (game, soundManager, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "coin");

    this.game = game;
    this.soundManager = soundManager;

    this.tag = "coin";
    this.name = "coin";

    // enable physics
    this.game.physics.arcade.enable(this);

    // animation
    this.animations.add("rotate", [0, 1, 2, 3, 4, 5], 8, true);
    this.animations.add("collected", [6, 7, 8, 9, 10, 12, 11, 10, 12]);
};

AdslJumper.Coin.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Coin.prototype.constructor = AdslJumper.Coin;

// play sound and animation
AdslJumper.Coin.prototype.disableBodyAndKill = function () {
    this.body.enable = false;
    this.soundManager.playCoin();
    this.animations.play("collected", 12, false, true);
}