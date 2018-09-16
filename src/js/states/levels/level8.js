AdslJumper.level8 = new AdslJumper.State(Game, {
    width: 576,
    height: 384,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true
});

AdslJumper.level8.doAfterCreate = function() {

    // strong jump
    this.jF = this.fx.add(AdslJumper.gameObjectFactory.jumpForce(336, 320));
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
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(160, 160);
    this.add.tween(this.fT1).to( { x: 576 + 64 }, 700, "Linear", true, 0, -1, true);
    this.triggers.add(this.fT1);

    this.fT2 = AdslJumper.gameObjectFactory.flyingThorn(192, 240);
    this.add.tween(this.fT2).to( { x: 70 }, 700, "Linear", true, 0, -1, true);
    this.triggers.add(this.fT2);


    // door
    if (_lang === "ru") {
        this.doorScreen = this.fx.add(this.make.image(102 * _scaleFactor, 84 * _scaleFactor, "atlas_2", "screenDoor2.png"));
    } else {
        this.doorScreen = this.fx.add(this.make.image(102 * _scaleFactor, 84 * _scaleFactor, "atlas_2", "screenDoor1.png"));
    }

    this.doorScreen.smoothed = false;
    this.doorScreen.scale.setTo(_scaleFactor);

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
   //this.game.debug.body(this.fT1);
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
    if (_lang === "ru") {
        this.doorScreen.frameName = "screenDoor4.png";
    } else {
        this.doorScreen.frameName = "screenDoor3.png";
    }
};
