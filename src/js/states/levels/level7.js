AdslJumper.level7 = new AdslJumper.State(Game, {
    width: 480,
    height: 272,
    inputOnFlash: true,
    openDoor: true,
    createExplosions: true
});

AdslJumper.level7.doAfterCreate = function () {
  this.mT = new AdslJumper.MovableThorn(this.game, (464 + 32) * _scaleFactor, 128 * _scaleFactor, 1);
  this.mT.scale.x = -1 * _scaleFactor;
  this.fx.add(this.mT);
};

AdslJumper.level7.checkOverlap = function () {
    if (this.mT.isDangerous()) {
        this.gameOver();
    }
};

AdslJumper.level7.setGravity = function () {
    this.player.body.gravity.y = 800;
};