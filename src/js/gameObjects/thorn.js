// Thorn class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Thorn = function (game, x, y, type) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "thorn");

    this.game = game;
    this.tag = "thorn";

    // enable physics
    this.game.physics.arcade.enable(this);

    this.body.immovable = true;

    switch(type) {
        case "up":
            this.body.setSize(32, 20, 0, 12);
            this.frame = 0;
            break;
        case "right":
            this.body.setSize(20, 22, 0, 5);
            this.frame = 6;
            break;
        case "down":
            this.body.setSize(32, 20, 0, 0);
            this.frame = 12;
            break;
        case "left": 
            this.body.setSize(20, 22, 12, 5);
            this.frame = 18;
            break;
        case "default":
            this.body.setSize(32, 20, 0, 0);
            this.frame = 12;
            break;
    }
};

AdslJumper.Thorn.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Thorn.prototype.constructor = AdslJumper.Thorn;

