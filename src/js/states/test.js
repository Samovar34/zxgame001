AdslJumper.testState = function (game) {};

var gameObject;
AdslJumper.testState.prototype = {
    create: function () {
        this.testGroup = this.game.add.group();
        gameObject = this.thorn = this.testGroup.add(new AdslJumper.MovableThorn(this.game, 128, 32, 0, "left"));
        this.mine = this.game.add.sprite(20, 20, "mine");
        this.mine.animations.add("default", [0, 1], 1, true);
        this.mine.animations.play("default");
        this.game.physics.arcade.enable(this.mine);
        this.mine.body.setSize(12, 6, 2, 8);
    },

    update: function () {
        //this.game.physics.arcade.collide(this.player, this.testGroup);
    },
    
    render: function () {
        this.game.debug.body(this.mine);

        this.game.debug.text("isDangerous: " + this.thorn.isDangerous(), 12, 12, "#ffffff");
        //this.game.debug.body(this.player);
    }
};
