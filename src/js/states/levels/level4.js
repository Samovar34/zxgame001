AdslJumper.level4 = new AdslJumper.State(Game, 736, 448, true, true);

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