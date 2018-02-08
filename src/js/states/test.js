AdslJumper.testState = function (game) {};

var gameObject;
AdslJumper.testState.prototype = {
    create: function () {
        this.testGroup = this.game.add.group();
        gameObject = this.thorn = this.testGroup.add(new AdslJumper.MovableThornRight(this.game, 128, 32, 0, "left"));
        //this.player = new AdslJumper.Player(this.game, new AdslJumper.Input(this.game), 32, 32);
        // this.player = this.game.add.sprite(32, 32, "player");
        // this.player.animations.add("blow", [15, 16, 17, 18, 19, 20], 24, true);
        // this.player.animations.play("blow");
    },

    update: function () {
        this.game.physics.arcade.collide(this.player, this.testGroup);
    },
    
    render: function () {
        this.game.debug.body(this.thorn);

        this.game.debug.text("isDangerous: " + this.thorn.isDangerous(), 12, 12, "#ffffff");
        //this.game.debug.body(this.player);
    }
};
