AdslJumper.gameFunc.events = {
    // level 2
    level2LaunchRocket1: function (trigger) {
        this.flyingThorn1.animations.play("fly");
        this.flyingThorn1.body.gravity.y = - 2500;
    },

    level2LaunchRocket2: function (trigger) {
        this.flyingThorn2.animations.play("fly");
        this.flyingThorn2.body.gravity.y = - 2500;
    },

    // level 3
    level3LaunchRocket: function (trigger) {
        this.flyingThorn.animations.play("fly");
        this.flyingThorn.body.gravity.y = - 2300;
    }
};