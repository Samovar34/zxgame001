AdslJumper.gameFunc.events = {
    //2
    level2LaunchRocket: function (player, trigger) {
        if (trigger._target === "flyingThorn1") {
            this.flyingThorn1.animations.play("fly");
            this.flyingThorn1.body.gravity.y = - 2500;
        } else {
            this.flyingThorn2.animations.play("fly");
            this.flyingThorn2.body.gravity.y = - 2500;
        }
    },

    //3
    level3LaunchRocket: function (player, trigger) {
        this.flyingThorn.animations.play("fly");
        this.flyingThorn.body.gravity.y = - 2300;
    },

    gameOver:  AdslJumper.gameFunc.thornHandler
};