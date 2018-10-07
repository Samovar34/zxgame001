AdslJumper.level13 = new AdslJumper.State(Game, {
    width: 640,
    height: 272,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true
});

AdslJumper.level13.doAfterCreate = function () {
    this.easingType = Phaser.Easing.Cubic.InOut;
    this.loopDuration = 750;

    // flying thorns
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT1.x,
        this.map.objects.fT1.y
    );
    this.triggers.add(this.fT1);
    this.add.tween(this.fT1).to(
        {x: this.map.objects.fT1End.x * _scaleFactor}, this.loopDuration, this.easingType, true, 0, -1, true
    );
};