// level specific update functions
// this = Phaser.State
AdslJumper.gameFunc.update ={
    "2": function () {
        this.game.physics.arcade.collide(this.flyingThorn1, this.collision2d, this.flyingThornCollideHandler, null, this);
        this.game.physics.arcade.collide(this.flyingThorn2, this.collision2d, this.flyingThornCollideHandler, null, this);
    },

    "3": function () {
        this.game.physics.arcade.collide(this.platforms, this.collision2d, this.checkPlatformsCollide, null, this);
        this.game.physics.arcade.collide(this.player, this.platforms, this.rigidBodyHandler, null, this);
    }
};