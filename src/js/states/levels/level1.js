AdslJumper.level1 = new AdslJumper.State(Game, {
    width: 480,
    height: 272,
    inputOnFlash: true
});

AdslJumper.level1.doAfterCreate = function () {

    this.player.allowWallSliding = false;
    this.player.allowDoubleJump = false;
};

AdslJumper.level1.collectedCoins = 0;

AdslJumper.level1.doAfterBonus = function (player, bonus) {
    if (++this.collectedCoins >= this.bonus.length) {
        this.exitDoor.open();
    }
};