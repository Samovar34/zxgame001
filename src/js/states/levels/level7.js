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
  this.triggers.add(this.mT)

    var mapObjects = this.map.objects;

    // strong jump
    this.jF1 = this.fx.add(AdslJumper.gameObjectFactory.jumpForce(mapObjects.jF1.x, mapObjects.jF1.y));
    this.triggers.add(this.jF1);

    this.jF2 = this.fx.add(AdslJumper.gameObjectFactory.jumpForce(mapObjects.jF2.x, mapObjects.jF2.y));
    this.triggers.add(this.jF2);

    this.jF3 = this.fx.add(AdslJumper.gameObjectFactory.jumpForce(mapObjects.jF3.x, mapObjects.jF3.y));
    this.triggers.add(this.jF3);
};

AdslJumper.level7.setGravity = function () {
    this.player.body.gravity.y = 800;
};

/**
 * trigger event
 */
AdslJumper.level7.strongJump = function () {
    this.player.inTrigger = true;
    SoundManager.playJumpForce();
    this.player.canJump = false;
    this.player.canDoubleJump = false;
    this.player.body.velocity.y = - 1200;
};