AdslJumper.menuState = function (game) {};

AdslJumper.menuState.prototype = {
    create: function () {
        this.game.state.start("play");
    }
};