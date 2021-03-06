// MovableThornRight class
// extends Phaser.Sprite class
// only for goup
// perion int (0, 1) откуда начинается анимация
// type string up, right, down, left
AdslJumper.MovableThorn = function (game, x, y, period, type) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "movableThorn1.png");

    this.game = game;
    this.frame = 0;

    this.tag = "movableThorn";

    // enable physics
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.setSize(20, 20, 32, 6);

    switch(type) {
        case "right":
            this.name = "movableThornRight";
            break;
        case "left":
            this.position.x += 34;
            this.scale.setTo(-1, 1);
            this.name = "movableThornLeft";
            break;
    }

    // animation
    if (period === 0) {
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
            //activete
            "movableThorn3.png",
            "movableThorn4.png",
            "movableThorn5.png",
            "movableThorn6.png"
        ], 10, true);
    }
    // TODO где запускать?
    this.animations.play("default");
};

AdslJumper.MovableThorn.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.MovableThorn.prototype.constructor = AdslJumper.MovableThorn;

// if true it can kill player
AdslJumper.MovableThorn.prototype.isDangerous = function () {
    return !(this.frameName == "movableThorn1.png" || this.frameName == "movableThorn2.png" || this.frameName == "movableThorn3.png" || this.frameName == "movableThorn4.png");
};