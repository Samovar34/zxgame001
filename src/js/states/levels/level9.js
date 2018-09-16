AdslJumper.level9 = new AdslJumper.State(Game, {
    width: 800,
    height: 320,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true
});

//144 128

AdslJumper.level9.doAfterCreate = function () {

    this.pl1 = AdslJumper.gameObjectFactory.platformA(160, 128);

    this.pl1.events.onKilled.add(function () {
        this.makeExplosion(this.pl1.x + 41, this.pl1.y);
    }, this);

    this.collision2d.add(this.pl1);

    this.pl2 = AdslJumper.gameObjectFactory.platformA(320, 128);

    this.pl2.events.onKilled.add(function () {
        this.makeExplosion(this.pl2.x + 41, this.pl2.y);
    }, this);

    this.collision2d.add(this.pl2);

    this.pl3 = AdslJumper.gameObjectFactory.platformA(480, 140);

    this.pl3.events.onKilled.add(function () {
        this.makeExplosion(this.pl3.x + 41, this.pl3.y);
    }, this);

    this.collision2d.add(this.pl3);

    var laser = this.add.sprite(466, 240, "atlas_2", "flyingThorn.png");
    laser.smoothed = false;
    laser.scale.setTo(_scaleFactor);
    this.game.physics.arcade.enable(laser);
    laser._event = "gameOver";

    this.add.tween(laser).to( { y: 80 }, 1000, "Linear", true, 0, -1, true);
    this.triggers.add(laser);


    laser = this.add.sprite(112 * _scaleFactor, 108 * _scaleFactor, "atlas_2", "flyingThorn.png");
    laser.smoothed = false;
    laser.scale.setTo(_scaleFactor);
    this.game.physics.arcade.enable(laser);
    laser._event = "gameOver";

    // 652
    this.add.tween(laser).to( { x: 326 * _scaleFactor }, 1000, "Linear", true, 0, -1, true);

    this.triggers.add(laser);

    laser = this.add.sprite(652 * _scaleFactor, 108 * _scaleFactor, "atlas_2", "flyingThorn.png");
    laser.smoothed = false;
    laser.scale.setTo(_scaleFactor);
    this.game.physics.arcade.enable(laser);
    laser._event = "gameOver";

    // 652
    this.add.tween(laser).to( { x: 400 * _scaleFactor }, 1000, "Linear", true, 0, -1, true);

    this.triggers.add(laser);

    laser = this.add.sprite(652 * _scaleFactor, 500, "atlas_2", "flyingThorn.png");
    laser.smoothed = false;
    laser.scale.setTo(_scaleFactor);
    this.game.physics.arcade.enable(laser);
    laser._event = "gameOver";

    this.add.tween(laser).to( { y: 240 }, 1000, "Linear", true, 0, -1, true);
    this.triggers.add(laser);
};


AdslJumper.level9.gameOver = function () {
  AdslJumper.State.prototype.gameOver.call(this);

      this.pl1.revive();
      this.pl1.body.stop();
      this.pl1.x = 160*_scaleFactor;
      this.pl1.y = 128*_scaleFactor;

    this.pl2.revive();
    this.pl2.body.stop();
    this.pl2.x = 320*_scaleFactor;
    this.pl2.y = 128*_scaleFactor;

    this.pl3.revive();
    this.pl3.body.stop();
    this.pl3.x = 480*_scaleFactor;
    this.pl3.y = 140*_scaleFactor;
};

AdslJumper.level9.openDoor = function () {
  this.exitDoor.open();
};