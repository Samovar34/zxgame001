/**
 * MovableThorn game object class
 * @param {Phaser.Game} game
 * @param {number} x
 * @param {number} y
 * @param {boolean} phase
 * @constructor
 */
AdslJumper.MovableThorn = function (game, x, y, phase) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "movableThorn1.png");

    this.game = game;
    this.frame = 0;
    this.smoothed = false;
    this.scale.setTo(_scaleFactor);

    this.tag = "movableThorn";
    this.data.event = "gameOverMT";

    //enable physics
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.setSize(24, 20, 32, 6);

    // animation
    if (phase) {
        this.animations.add("default", [
            // green
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            // yellow
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            // activate
            "movableThorn3.png",
            "movableThorn4.png",
            "movableThorn5.png",
            "movableThorn6.png",
            // red
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            // flash
            "movableThorn8.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn8.png",
            "movableThorn7.png",
            "movableThorn8.png",
            "movableThorn7.png",
            "movableThorn8.png",
            // disable
            "movableThorn6.png",
            "movableThorn5.png",
            "movableThorn4.png",
            "movableThorn3.png"
        ], 10, true);
    } else {
        this.animations.add("default", [
            // red
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            // flash
            "movableThorn8.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn7.png",
            "movableThorn8.png",
            "movableThorn7.png",
            "movableThorn8.png",
            "movableThorn7.png",
            "movableThorn8.png",
            //disable
            "movableThorn6.png",
            "movableThorn5.png",
            "movableThorn4.png",
            "movableThorn3.png",
            // green
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            "movableThorn1.png",
            // yellow
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            "movableThorn2.png",
            //activate
            "movableThorn3.png",
            "movableThorn4.png",
            "movableThorn5.png",
            "movableThorn6.png"
        ], 10, true);
    }

    this.animations.play("default");
};

AdslJumper.MovableThorn.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.MovableThorn.prototype.constructor = AdslJumper.MovableThorn;

/**
 *
 * @returns {boolean}
 */
AdslJumper.MovableThorn.prototype.isDangerous = function () {
    return !(
        this.frameName === "movableThorn1.png" ||
        this.frameName === "movableThorn2.png" ||
        this.frameName === "movableThorn3.png" ||
        this.frameName === "movableThorn4.png"
    );
};