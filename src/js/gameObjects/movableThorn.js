// MovableThornRight class
// extends Phaser.Sprite class
// only for goup
// perion int (0, 1) откуда начинается анимация
// type string up, right, down, left
AdslJumper.MovableThorn = function (game, x, y, period, type) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "movableThorn");

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
            this.position.x += 64;
            this.scale.setTo(-1, 1);
            this.name = "movableThornLeft";
            break;
    }

    // animation
    if (period === 0) {
        this.animations.add("default", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 7, 6, 6, 6, 7, 6, 7, 6, 7, 5, 4, 3, 2], 8, true);
    } else {
        this.animations.add("default", [2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 7, 6, 6, 6, 7, 6, 7, 6, 7, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 8, true);
    }
    // TODO где запускать?
    this.animations.play("default");
};

AdslJumper.MovableThorn.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.MovableThorn.prototype.constructor = AdslJumper.MovableThorn;

// if true it can kill player
AdslJumper.MovableThorn.prototype.isDangerous = function () {
    return !(this.frame == 0 || this.frame == 1 || this.frame == 2);
}