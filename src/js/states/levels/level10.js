AdslJumper.level10 = new AdslJumper.State(Game, {
    width: 488,
    height: 544,
    inputOnFlash: true,
    openDoor: true,
    createExplosions: true,
    debug: false
});

AdslJumper.level10.doAfterCreate = function () {
    // flying thorns
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT1.x,
        this.map.objects.fT1.y
    );
    this.triggers.add(this.fT1);
    this.add.tween(this.fT1).to(
        { x: this.map.objects.fT1End.x * _scaleFactor }, 600, "Linear", true, 0, -1, true
    );

    this.fT2 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT2.x,
        this.map.objects.fT2.y
    );
    this.triggers.add(this.fT2);
    this.add.tween(this.fT2).to(
        { x: this.map.objects.fT2End.x * _scaleFactor }, 600, "Linear", true, 0, -1, true
    );

    this.fT3 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT3.x,
        this.map.objects.fT3.y
    );
    this.triggers.add(this.fT3);
    this.add.tween(this.fT3).to(
        { x: this.map.objects.fT3End.x * _scaleFactor }, 600, "Linear", true, 0, -1, true
    );

    this.fT4 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT4.x,
        this.map.objects.fT4.y
    );
    this.triggers.add(this.fT4);
    this.add.tween(this.fT4).to(
        { x: this.map.objects.fT4End.x * _scaleFactor }, 600, "Linear", true, 0, -1, true
    );

    this.fT5 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT5.x,
        this.map.objects.fT5.y
    );
    this.triggers.add(this.fT5);
    this.add.tween(this.fT5).to(
        { y: this.map.objects.fT5End.y * _scaleFactor }, 1200, "Linear", true, 0, -1, true
    );
};