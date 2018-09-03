AdslJumper.level3 = new AdslJumper.State(Game, {
    width: 480,
    height: 272,
    inputOnFlash: true,
    openDoor: true
});

AdslJumper.level3.doAfterCreate = function () {
    this.player.allowWallSliding = false;
};