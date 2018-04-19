// level specific update functions
// this = Phaser.State
AdslJumper.gameFunc.update ={
    "2": function () {
        this.game.physics.arcade.collide(this.flyingThorn1, this.collision2d, this.l2_FlyingThornCollideHandler, null, this);
        this.game.physics.arcade.collide(this.flyingThorn2, this.collision2d, this.l2_FlyingThornCollideHandler, null, this);
    },

    "3": function () {
        this.game.physics.arcade.collide(this.platforms, this.collision2d, this.l3_checkPlatformsCollide, null, this);
        this.game.physics.arcade.collide(this.player, this.platforms, this.l3_rigidBodyHandler, null, this);
    },

    "4": function() {
        this.game.physics.arcade.collide(this.player, this.platforms, this.l4_checkPlatform, null, this);
    }

};