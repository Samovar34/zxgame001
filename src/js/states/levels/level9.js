AdslJumper.level9 = new AdslJumper.State(Game, {
    width: 800,
    height: 320,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true
});

AdslJumper.level9.doAfterCreate = function () {

    // platforms
    this.pl1 = AdslJumper.gameObjectFactory.platformA(
        this.map.objects.pl1.x,
        this.map.objects.pl1.y
    );
    this.pl1.body.maxVelocity.y = 25;
    this.collision2d.add(this.pl1);

    this.pl2 = AdslJumper.gameObjectFactory.platformA(
        this.map.objects.pl2.x,
        this.map.objects.pl2.y
    );
    this.collision2d.add(this.pl2);

    this.pl3 = AdslJumper.gameObjectFactory.platformA(
        this.map.objects.pl3.x,
        this.map.objects.pl3.y
    );
    this.collision2d.add(this.pl3);

    // platforms halo
    this.pl1Halo = AdslJumper.gameObjectFactory.platformAHalo(
        this.map.objects.pl1.x,
        this.map.objects.pl1.y
    );
    this.pl1Halo.events.onAnimationComplete.add(this.onPl1, this);
    this.pl1Halo.kill();
    this.fx.add(this.pl1Halo);

    this.pl2Halo = AdslJumper.gameObjectFactory.platformAHalo(
        this.map.objects.pl2.x,
        this.map.objects.pl2.y
    );
    this.pl2Halo.kill();
    this.fx.add(this.pl2Halo);

    this.pl3Halo = AdslJumper.gameObjectFactory.platformAHalo(
        this.map.objects.pl3.x,
        this.map.objects.pl3.y
    );
    this.pl3Halo.kill();
    this.fx.add(this.pl3Halo);

    // flying thorns
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT1.x,
        this.map.objects.fT1.y
    );
    this.triggers.add(this.fT1);
    this.add.tween(this.fT1).to(
        { x: this.map.objects.fT1End.x * _scaleFactor }, 1000, "Linear", true, 0, -1, true
    );


    this.fT2 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT2.x,
        this.map.objects.fT2.y
    );
    this.triggers.add(this.fT2);
    this.add.tween(this.fT2).to(
        { y: this.map.objects.fT2End.y * _scaleFactor }, 1000, "Linear", true, 0, -1, true
    );

    this.fT3 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT3.x,
        this.map.objects.fT3.y
    );
    this.triggers.add(this.fT3);
    this.add.tween(this.fT3).to(
        { x: this.map.objects.fT3End.x * _scaleFactor }, 1000, "Linear", true, 0, -1, true
    );

    this.fT4 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT4.x,
        this.map.objects.fT4.y
    );
    this.triggers.add(this.fT4);
    this.add.tween(this.fT4).to(
        { y: this.map.objects.fT4End.y * _scaleFactor }, 1000, "Linear", true, 0, -1, true
    );

    // door scree
    if (_lang === "ru") {
        this.doorScreen = this.fx.add(this.make.image(this.map.objects.sD.x * _scaleFactor, (this.map.objects.sD.y - 10) * _scaleFactor, "atlas_2", "screenDoor2.png"));
    } else {
        this.doorScreen = this.fx.add(this.make.image(this.map.objects.sD.x * _scaleFactor, (this.map.objects.sD.y - 10) * _scaleFactor, "atlas_2", "screenDoor1.png"));
    }
    this.doorScreen.smoothed = false;
    this.doorScreen.scale.setTo(_scaleFactor);

    // arrow
    this.arrow = AdslJumper.gameObjectFactory.arrow(
        this.map.objects.arrow.x * _scaleFactor,
        (this.map.objects.arrow.y - 6) * _scaleFactor
    );
    this.fx.add(this.arrow);
};


AdslJumper.level9.gameOver = function () {
    AdslJumper.State.prototype.gameOver.call(this);
    this.pl3Halo.revive();
    this.pl2Halo.revive();
    this.pl1Halo.revive();
    this.pl1Halo.animations.play("default");
};

AdslJumper.level9.openDoor = function () {
  this.exitDoor.open();
    this.exitDoor.open();
    this.arrow.kill();
    if (_lang === "ru") {
        this.doorScreen.frameName = "screenDoor4.png";
    } else {
        this.doorScreen.frameName = "screenDoor3.png";
    }
};

AdslJumper.level9.onPl1 = function () {
    this.pl1Halo.kill();
    this.pl1.revive();
    this.pl1.body.stop();
    this.pl1.x = this.pl1.data.x;
    this.pl1.y = this.pl1.data.y;

    this.pl2Halo.kill();
    this.pl2.revive();
    this.pl2.body.stop();
    this.pl2.x = this.pl2.data.x;
    this.pl2.y = this.pl2.data.y;

    this.pl3Halo.kill();
    this.pl3.revive();
    this.pl3.body.stop();
    this.pl3.x = this.pl3.data.x;
    this.pl3.y = this.pl3.data.y;
};