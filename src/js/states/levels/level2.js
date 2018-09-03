AdslJumper.level2 = new AdslJumper.State(Game, {
    width: 640,
    height: 272,
    inputOnFlash: true
});

AdslJumper.level2.doAfterCreate = function () {
     // special level sprite
    this.scyNet = this.fx.add(this.add.sprite(311 * _scaleFactor, 107 * _scaleFactor, "atlas_2", "screenF1.png"));
    this.scyNet.smoothed = false;
    this.scyNet.scale.setTo(_scaleFactor);

    this.player.allowWallSliding = false;
    this.player.allowDoubleJump = false;

    this.exitDoor.open(true);
};
//
AdslJumper.level2.doAfterUpdate = function () {
    if (this.player.canInput) {
        if (this.player.x < this.scyNet.x - 64 * _scaleFactor) {
            this.scyNet.frameName = "screenF4.png";
        } else if (this.player.x > this.scyNet.x + 80 * _scaleFactor) {
            this.scyNet.frameName = "screenF3.png";

        } else {
            this.scyNet.frameName = "screenF1.png";
        }
    }
};

AdslJumper.level2.gameOver = function () {
    AdslJumper.State.prototype.gameOver.call(this);
    this.scyNet.frameName = "screenF2.png";
};