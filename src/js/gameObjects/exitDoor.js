// ExitDoor class
// inheritance Phaser.Sprite class
AdslJumper.ExitDoor = function (game, x, y, nextLevel) {
    Phaser.Sprite.call(this, game, x, y, "door");

    this.game = game;

    this.smoothed = false;
    this.frame = 0;

    //variables
    this.nextLevel = nextLevel;
    this.isOpen = false;
    this.isOpening = false;

    // animation
    this.animationOpenDoor = this.animations.add("open", [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 14);
    this.animationCloseDoor = this.animations.add("close", [14, 15, 16, 17], 8);
    this.animations.add("default", [0, 1], 2, true);
    // physics
    this.game.physics.arcade.enable(this);
    this.body.setSize(32, 54, 8, 26)
    this.body.immovable = true;

    
    //add to game
    this.game.add.existing(this);
    this.animations.play("default", [0, 1]);

    // add label and animate
    // this.exitLabel = this.game.add.sprite(this.x + 8 , this.y - 30, "exit");
    // this.exitLabel.smoothed = false;
    // this.game.add.tween(this.exitLabel).to({y: this.exitLabel.y - 8}, 300, Phaser.Easing.Linear.None, true, 0 , 1000, true);
}

AdslJumper.ExitDoor.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.ExitDoor.prototype.constructor = AdslJumper.ExitDoor;

// open door
// void
AdslJumper.ExitDoor.prototype.open = function () {
    // if door is open do nothing
    if (this.isOpen) {
        return;
    }

    // if door is opening do nothing
    if (!this.isOpening) {
        this.isOpening = true;
        // play sound
        AdslJumper.modules.soundManager.playOpenDoor();

        this.animations.play("open");
        this.animationOpenDoor.onComplete.addOnce(function () {
            this.isOpen = true;
        }, this);
    }
};