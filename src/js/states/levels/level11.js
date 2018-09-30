AdslJumper.level11 = new AdslJumper.State(Game, {
    width: 480,
    height: 272,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true
});

AdslJumper.level11.doAfterCreate = function () {

    this.curTerminal = 0;
    this.standTime = 0;
    this.standTimer = 1200;

    this.stateTimer1 = 0;
    this.stateTimer2 = 0;

    this.loopDuration = 1600;

    // flying thorns
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT1.x,
        this.map.objects.fT1.y
    );
    this.triggers.add(this.fT1);
    this.add.tween(this.fT1).to(
        {x: this.map.objects.fT1End.x * _scaleFactor}, 850, Phaser.Easing.Linear.None, true, 0, -1, true
    );

    this.fT2 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT2.x,
        this.map.objects.fT2.y
    );
    this.triggers.add(this.fT2);
    this.add.tween(this.fT2).to(
        { x: this.map.objects.fT2End.x * _scaleFactor }, 850, Phaser.Easing.Linear.None, true, 0, -1, true
    );

    this.fT3 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT3.x,
        this.map.objects.fT3.y
    );
    this.triggers.add(this.fT3);
    this.add.tween(this.fT3).to(
        { x: this.map.objects.fT3End.x * _scaleFactor }, this.loopDuration, Phaser.Easing.Cubic.InOut, true, 0, -1, true
    );

    this.fT4 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT4.x,
        this.map.objects.fT4.y
    );
    this.triggers.add(this.fT4);
    this.add.tween(this.fT4).to(
        { x: this.map.objects.fT4End.x * _scaleFactor}, this.loopDuration, Phaser.Easing.Cubic.InOut, true, 0, -1, true
    );

    this.fT5 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT5.x,
        this.map.objects.fT5.y
    );
    this.triggers.add(this.fT5);
    this.add.tween(this.fT5).to(
        { x: this.map.objects.fT5End.x * _scaleFactor}, this.loopDuration, Phaser.Easing.Cubic.InOut, true, 0, -1, true
    );

    // arrow
    this.arrow = AdslJumper.gameObjectFactory.arrow(
        (this.map.objects.ar1.x + 4) * _scaleFactor,
        (this.map.objects.ar1.y - 6) * _scaleFactor
    );
    this.fx.add(this.arrow);

    // screenTimer1
    this.sT1 = new AdslJumper.Timer(this.game, this.map.objects.sT1.x, this.map.objects.sT1.y);
    this.sT1.setState(this.stateTimer1, false);
    this.fx.add(this.sT1);

    // screenTimer2
    this.sT2 = new AdslJumper.Timer(this.game, this.map.objects.sT2.x, this.map.objects.sT2.y);
    this.sT2.setState(this.stateTimer2, false);
    this.fx.add(this.sT2);
};

AdslJumper.level11.checkTimerOne = function (player, trigger) {
    if (this.curTerminal === 0 && this.player.canInput) {
        this.standTime += this.game.time.elapsed;
        this.sT1.setLevel(this.standTime/this.standTimer * 10);

        if (this.standTime >= this.standTimer) {
            this.sT1.setState(++this.stateTimer1, true);
            this.standTime = 0;
            this.curTerminal = 1;
            this.arrow.x = (this.map.objects.ar2.x + 4) * _scaleFactor;
            this.arrow.y = (this.map.objects.ar2.y - 6) * _scaleFactor;

            // kill trigger
            if (this.stateTimer1 === 4) {
                trigger.kill();
            }
        }
    }
};

AdslJumper.level11.checkTimerTwo = function (player, trigger) {
    if (this.curTerminal === 1 && this.player.canInput) {
        this.standTime += this.game.time.elapsed;
        this.sT2.setLevel(this.standTime/this.standTimer * 10);

        if (this.standTime >= this.standTimer) {
            this.sT2.setState(++this.stateTimer2, true);
            this.standTime = 0;
            this.curTerminal = 0;
            this.arrow.x = (this.map.objects.ar1.x + 4) * _scaleFactor;
            this.arrow.y = (this.map.objects.ar1.y - 6) * _scaleFactor;

            // kill trigger
            if (this.stateTimer2 === 4) {
                this.arrow.kill();
                this.exitDoor.open();
                trigger.kill();
            }
        }
    }
};