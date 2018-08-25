// ExitDoor class
// inheritance Phaser.Sprite class
AdslJumper.ExitDoor = function (game, x, y, nextLevel) {
    // y - 60 Tiled fix
    Phaser.Sprite.call(this, game, x, y, "atlas_2", "door1.png");

    this.game = game;

    this.smoothed = false;
    this.scale.setTo(_scaleFactor);
    this.frame = 0;

    //variables
    this.nextLevel = nextLevel;
    this.isOpen = false;
    this.isOpening = false;

    // animation
    this.animationOpenDoor = this.animations.add("open", [
        "door3.png",
        "door4.png",
        "door5.png",
        "door6.png",
        "door7.png",
        "door8.png",
        "door9.png",
        "door10.png",
        "door11.png",
        "door12.png",
        "door13.png",
        "door14.png",
        "door15.png"
    ], 16);
    this.animationCloseDoor = this.animations.add("close", [
        "door16.png",
        "door17.png",
        "door18.png",
        "door19.png",
        "door20.png"
    ], 9);
    this.animations.add("default", ["door1.png", "door2.png"], 2, true);
    
    // physics
    this.game.physics.arcade.enable(this);
    this.body.setSize(40, 46, 4, 6);
    this.body.immovable = true;

    
    //add to game
    this.game.add.existing(this);
    this.animations.play("default", [0, 1]);

    // add label
    this.exitLabel = this.game.add.sprite(this.x - (4 * _scaleFactor), this.y - (18 * _scaleFactor), "atlas_2", "doorExitLabel1.png");
    this.exitLabel.animations.add("exit", [
        "doorExitLabel5.png",
        "doorExitLabel6.png",
        "doorExitLabel7.png",
        "doorExitLabel8.png",
        "doorExitLabel9.png",
        "doorExitLabel10.png",
        "doorExitLabel11.png",
        "doorExitLabel12.png",
        "doorExitLabel13.png",
        "doorExitLabel14.png",
        "doorExitLabel15.png",
        "doorExitLabel16.png",
        "doorExitLabel17.png"
    ], 12, true);

    this.exitLabel.smoothed = false;
    this.exitLabel.scale.setTo(_scaleFactor);

    this.exitLabelOpenAnimation = this.exitLabel.animations.add("open", [
        "doorExitLabel2.png",
        "doorExitLabel3.png",
        "doorExitLabel4.png"
    ], 12, false);
};

AdslJumper.ExitDoor.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.ExitDoor.prototype.constructor = AdslJumper.ExitDoor;

// open door
// void
AdslJumper.ExitDoor.prototype.open = function (isMute) {
    // if door is open do nothing
    if (this.isOpen) {
        return;
    }

    // play label animation
    this.exitLabel.animations.play("open");
    this.exitLabelOpenAnimation.onComplete.addOnce(this.onCompleteOpenLabelAnimFunction, this);

    // if door is opening do nothing
    if (!this.isOpening) {
        this.isOpening = true;
        // play sound
        if (!isMute) {
            SoundManager.playOpenDoor();
        }        

        this.animations.play("open");
        this.animationOpenDoor.onComplete.addOnce(this.onCompleteFunction, this);
    }
};

AdslJumper.ExitDoor.prototype.onCompleteFunction = function () {
    this.isOpen = true;
};

AdslJumper.ExitDoor.prototype.onCompleteOpenLabelAnimFunction = function () {
    this.exitLabel.animations.play("exit");
};