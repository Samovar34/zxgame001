AdslJumper.level8 = new AdslJumper.State(Game, {
    width: 576,
    height: 384,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true
});

AdslJumper.level8.doAfterCreate = function() {
    var mapObjects = this.map.objects;

    // strong jump
    this.jF = this.fx.add(AdslJumper.gameObjectFactory.jumpForce(mapObjects.fJ.x, mapObjects.fJ.y));
    this.triggers.add(this.jF);

    // movable thorn
    this.mT = new AdslJumper.MovableThorn(this.game, (529 + 32) * _scaleFactor, 240 * _scaleFactor, 1);
    this.mT.scale.x = -1 * _scaleFactor;
    this.triggers.add(this.mT);

    // x = 432
    this.mT2 = new AdslJumper.MovableThorn(this.game, (432) * _scaleFactor, 240 * _scaleFactor, 1);
    this.triggers.add(this.mT2);

    this.mT3 = new AdslJumper.MovableThorn(this.game, (529 + 32) * _scaleFactor, 112 * _scaleFactor, 0);
    this.mT3.scale.x = -1 * _scaleFactor;
    this.triggers.add(this.mT3);

    // x = 432
    this.mT4 = new AdslJumper.MovableThorn(this.game, (432) * _scaleFactor, 112 * _scaleFactor, 0);
    this.triggers.add(this.mT4);


    // flying thorns
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(mapObjects.fT1.x, mapObjects.fT1.y);
    this.add.tween(this.fT1).to( { x: mapObjects.fT1End.x * _scaleFactor }, 700, Phaser.Easing.Linear.None, true, 0, -1, true);
    this.triggers.add(this.fT1);

    this.fT2 = AdslJumper.gameObjectFactory.flyingThorn(mapObjects.fT2.x, mapObjects.fT2.y);
    this.add.tween(this.fT2).to( { x: mapObjects.fT2End.x * _scaleFactor }, 700, Phaser.Easing.Linear.None, true, 0, -1, true);
    this.triggers.add(this.fT2);

    this.fT3 = AdslJumper.gameObjectFactory.flyingThorn(mapObjects.fT3.x, mapObjects.fT3.y);
    this.add.tween(this.fT3).to( { x: mapObjects.fT3End.x * _scaleFactor }, 1400, Phaser.Easing.Sinusoidal.Out, true, 0, -1, true);
    this.triggers.add(this.fT3);

    this.doorScreen = new AdslJumper.DoorScreen(this, 102, 84);

    this.arrow = AdslJumper.gameObjectFactory.arrow(124 * _scaleFactor, 70 * _scaleFactor);
    this.fx.add(this.arrow);
};

/**
 * trigger event
 */
AdslJumper.level8.strongJump = function () {
    this.player.inTrigger = true;
    SoundManager.playJumpForce();
    this.player.canJump = false;
    this.player.canDoubleJump = false;
    this.player.body.velocity.y = - 1200;
};

AdslJumper.level8.render = function () {
    AdslJumper.State.prototype.render.call(this);
};

/**
 * trigger event
 * @param {AdslJumper.Player} p
 * @param {Phaser.Sprite} t
 */
AdslJumper.level8.openDoor = function (p, t) {
    t.kill();
    this.arrow.kill();
    this.exitDoor.open();
    this.doorScreen.open();
};
