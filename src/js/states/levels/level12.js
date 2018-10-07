AdslJumper.level12 = new AdslJumper.State(Game, {
    width: 640,
    height: 272,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true
});

AdslJumper.level12.doAfterCreate = function () {

    this.curTerminal = 0;
    this.standTime = 0;
    this.standTimer = 1200;

    this.stateTimer1 = 0;
    this.stateTimer2 = 0;

    /**
     *  is challenge start
     * @type {boolean}
     */
    this.isChallenge = false;

    this.loopDuration = 550;

    this.easingType = Phaser.Easing.Cubic.InOut;

    // flying thorns
    this.fT1 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT1.x,
        this.map.objects.fT1.y
    );
    this.triggers.add(this.fT1);
    this.add.tween(this.fT1).to(
        {y: this.map.objects.fT1End.y * _scaleFactor}, this.loopDuration, this.easingType, true, 0, -1, true
    );

    this.fT2 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT2.x,
        this.map.objects.fT2.y
    );
    this.triggers.add(this.fT2);
    this.add.tween(this.fT2).to(
        { y: this.map.objects.fT2End.y * _scaleFactor }, this.loopDuration, this.easingType, true, 0, -1, true
    );

    this.fT3 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT3.x,
        this.map.objects.fT3.y
    );
    this.triggers.add(this.fT3);
    this.add.tween(this.fT3).to(
        { x: this.map.objects.fT3End.x * _scaleFactor }, this.loopDuration * 2, this.easingType, true, 0, -1, true
    );

    this.fT4 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT4.x,
        this.map.objects.fT4.y
    );
    this.triggers.add(this.fT4);
    this.add.tween(this.fT4).to(
        { y: this.map.objects.fT4End.y * _scaleFactor}, this.loopDuration, Phaser.Easing.Cubic.InOut, true, 0, -1, true
    );

    this.fT5 = AdslJumper.gameObjectFactory.flyingThorn(
        this.map.objects.fT5.x,
        this.map.objects.fT5.y
    );
    this.triggers.add(this.fT5);
    this.add.tween(this.fT5).to(
        { y: this.map.objects.fT5End.y * _scaleFactor}, this.loopDuration, Phaser.Easing.Cubic.InOut, true, 0, -1, true
    );

    // arrow
    // arrow
    this.arrow = AdslJumper.gameObjectFactory.arrow(
        (this.map.objects.ar1.x + 4) * _scaleFactor,
        (this.map.objects.ar1.y - 6) * _scaleFactor
    );
    this.fx.add(this.arrow);

    this.challengeScreen = new AdslJumper.ChallengeScreen(this.game, this.map.objects.sC.x, this.map.objects.sC.y);
    this.fx.add(this.challengeScreen);

    this.exitDoor.animationOpenDoor.onComplete.addOnce(function () {
        this.player.canInput = true;
    }, this);

};

AdslJumper.level12.startChallenge = function (player, trigger) {
    // stop player and disallow input
    if (player.canInput) {
        player.canInput = false;
        player.body.stop();
        this.arrow.kill();
    }

    // set player position
    if (player.x !== 358) {
        player.x = 358;
    }


    if (!this.challengeScreen.loadingAnim.isPlaying && !this.isChallenge && !this.player.stopUpdate) {
            this.isChallenge = true;
            this.challengeScreen.loadingAnim.play(8);
        }

    if (this.isChallenge && this.challengeScreen.challengeAnim.isPlaying) {
        if (Input.dy >= 1) {
            if (this.challengeScreen.checkInput()) {
                trigger.kill();
                this.exitDoor.open();
            } else {
                this.isChallenge = false;
                this.player.canInput = true;
                this.gameOver();
                this.arrow.revive();
            }
        }
    }

};

AdslJumper.level12.render = function () {
    AdslJumper.State.prototype.render.call(this);
    //this.game.debug.physicsGroup(this.triggers);
};