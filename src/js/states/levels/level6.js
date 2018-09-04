AdslJumper.level6 = new AdslJumper.State(Game, {
    width: 480,
    height: 272,
    inputOnFlash: true,
    openDoor: false,
    createExplosions: true

});

AdslJumper.level6.doAfterCreate = function () {
    this.arrow = AdslJumper.gameObjectFactory.arrow(235 * _scaleFactor, 200 * _scaleFactor);
    this.fx.add(this.arrow);

    this.decorImage = this.fx.add(this.make.image(204 * _scaleFactor, 202 * _scaleFactor, "atlas_2", "level6Decor.png"));
    this.decorImage.smoothed = false;
    this.decorImage.scale.setTo(_scaleFactor);
    this.decorImage.kill();

    this.faceImage = this.fx.add(this.make.image(180 * _scaleFactor, 70 * _scaleFactor, "atlas_2", "level6Face.png"));
    this.faceImage.smoothed = false;
    this.faceImage.scale.setTo(_scaleFactor);
    this.faceImage.kill();

    if (_lang === "ru") {
        this.doorScreen = this.fx.add(this.make.image(214 * _scaleFactor, 212 * _scaleFactor, "atlas_2", "screenDoor2.png"));
        this.screenText = this.fx.add(this.make.image(176 * _scaleFactor, 170 * _scaleFactor, "atlas_2", "level6Text2.png"));
    } else {
        this.doorScreen = this.fx.add(this.make.image(214 * _scaleFactor, 212 * _scaleFactor, "atlas_2", "screenDoor1.png"));
        this.screenText = this.fx.add(this.make.image(176 * _scaleFactor, 170 * _scaleFactor, "atlas_2", "level6Text1.png"));
    }

    this.doorScreen.smoothed = false;
    this.doorScreen.scale.setTo(_scaleFactor);

    this.screenText.smoothed = false;
    this.screenText.scale.setTo(_scaleFactor);
    this.screenText.alpha = 0.0;
    this.screenText.kill();
};

// trigger event handler
AdslJumper.level6.blowUp = function (player, trigger) {
    trigger.kill();
    this.arrow.kill();
    this.gameOver();
    this.makeExplosion(470, 474);
    this.exitDoor.open();
    this.decorImage.revive();
    this.faceImage.revive();
    this.screenText.revive();
    this.doorScreen.kill();

    this.add.tween(this.screenText).to( { alpha: 1 }, 500, "Linear", true, 0, -1, true);
};