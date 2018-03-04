// Thorn class
// extends Phaser.Sprite class
// only for goup
AdslJumper.Thorn = function (game, x, y, type) {

    // extend
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "thorn1.png");

    this.game = game;
    this.tag = "thorn";

    // enable physics
    this.game.physics.arcade.enable(this);

    this.body.immovable = true;

    switch(type) {
        case "up":
            this.body.setSize(32, 20, 0, 12);
            this.frameName = "thorn1.png";
            break;
        case "right":
            this.body.setSize(20, 22, 0, 5);
            this.frameName = "thorn2.png";
            break;
        case "down":
            this.body.setSize(32, 20, 0, 0);
            this.frameName = "thorn3.png";
            break;
        case "left": 
            this.body.setSize(20, 22, 12, 5);
            this.frameName = "thorn4.png";
            break;
        case "default":
            this.body.setSize(32, 20, 0, 0);
            this.frame = "thorn3.png";
            break;
    }
};

AdslJumper.Thorn.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.Thorn.prototype.constructor = AdslJumper.Thorn;

