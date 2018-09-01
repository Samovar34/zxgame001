AdslJumper.level3 = new AdslJumper.State(Game, 480, 272, true, true);

AdslJumper.level3.doAfterCreate = function () {
    this.player.allowWallSliding = false;
};