AdslJumper.level11 = new AdslJumper.State(Game, {
    width: 480,
    height: 272,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true,
    debug: false
});

AdslJumper.level11.doAfterCreate = function () {
    // flying thorns
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT1.x,
        this.map.objects.fT1.y
    );
    this.triggers.add(this.fT1);
    this.add.tween(this.fT1).to(
        {x: this.map.objects.fT1End.x * _scaleFactor}, 850, "Linear", true, 0, -1, true
    );

    this.fT2 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT2.x,
        this.map.objects.fT2.y
    );
    this.triggers.add(this.fT2);
    this.add.tween(this.fT2).to(
        { x: this.map.objects.fT2End.x * _scaleFactor }, 850, "Linear", true, 0, -1, true
    );

    this.fT3 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT3.x,
        this.map.objects.fT3.y
    );
    this.triggers.add(this.fT3);
    this.add.tween(this.fT3).to(
        { x: this.map.objects.fT3End.x * _scaleFactor }, 1200, "Linear", true, 0, -1, true
    );

    this.fT4 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT4.x,
        this.map.objects.fT4.y
    );
    this.triggers.add(this.fT4);
    this.add.tween(this.fT4).to(
        { x: this.map.objects.fT4End.x * _scaleFactor}, 1200, "Linear", true, 0, -1, true
    );

    this.fT5 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT5.x,
        this.map.objects.fT5.y
    );
    this.triggers.add(this.fT5);
    this.add.tween(this.fT5).to(
        { x: this.map.objects.fT5End.x * _scaleFactor}, 1200, "Linear", true, 0, -1, true
    );
};