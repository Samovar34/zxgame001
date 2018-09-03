AdslJumper.level6 = new AdslJumper.State(Game, {
    width: 480,
    height: 272,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true

});

AdslJumper.level6.doAfterCreate = function () {
    this.arrow = AdslJumper.gameObjectFactory.arrow(235 * _scaleFactor, 200 * _scaleFactor);
    this.fx.add(this.arrow);
};

// trigger event handler
AdslJumper.level6.blowUp = function (player, trigger) {
    trigger.kill();
    this.arrow.kill();
    this.gameOver();
    this.makeExplosion(470, 474);
    this.exitDoor.open();
};