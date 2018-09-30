/**
 *
 * @param {Phaser.Game} game
 * @param {number} x
 * @param {number} y
 * @constructor
 */
AdslJumper.Timer = function (game, x, y) {

    // extend
    Phaser.Sprite.call(this, game, x * _scaleFactor, (y - 14) * _scaleFactor, "atlas_2", "screenTimer1.png");
    this.game = game;

    this.smoothed = false;
    this.scale.setTo(_scaleFactor);
};

AdslJumper.Timer.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Timer.prototype.constructor = AdslJumper.Timer;

/**
 * set screen image
 * @param {number }lvl 0 - 10
 */
AdslJumper.Timer.prototype.setLevel = function (lvl) {
  if (lvl > 10) lvl = 10;
  lvl = Math.floor(lvl);
  this.frameName = "screenTimer" + (7 + lvl) + ".png";
};

/**
 * set state of timer screen
 * @param {number} state
 * @param {boolean} playSound
 */
AdslJumper.Timer.prototype.setState = function (state, playSound) {
    if (state < 0 || state > 4) {
        console.warn("screenTimer setState method wrong param: " + state + "; 0 - 4 allow");
        this.frameName = "screenTimer1.png";
    }
    this.frameName = "screenTimer" + (state + 2) + ".png";

    if (playSound) SoundManager.playScreenTimer();
};