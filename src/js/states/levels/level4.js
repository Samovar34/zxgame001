AdslJumper.level4 = new AdslJumper.State(Game, {
    width: 736,
    height: 448,
    inputOnFlash: true,
    openDoor: true
});

AdslJumper.level4.doAfterCreate = function() {
    this.fx.add(AdslJumper.gameObjectFactory.jumpForce(662, 320));

    this.player.allowWallSliding = false;
};

// trigger event
AdslJumper.level4.strongJump = function () {
    this.player.inTrigger = true;
    SoundManager.playJumpForce();
    this.player.canJump = false;
    this.player.body.velocity.y = - 1200;
};