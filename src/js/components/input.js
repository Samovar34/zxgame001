// INPUT Class
AdslJumper.Input = function (game) {
    this.game = game;

    // TODO init XBOX controller

    // init keyboard controlls
    // arrows
    this.cursors = this.game.input.keyboard.createCursorKeys();

    // WASD
    this.moveLeftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.moveRightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.actionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.L);

    // other buttons
    this.selectButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.runButton = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
};

AdslJumper.Input.prototype.constructor = AdslJumper.Input;

// Get button objects
AdslJumper.Input.prototype.leftIsDown = function () {
    return this.cursors.left.isDown || this.moveLeftButton.isDown;
};

AdslJumper.Input.prototype.rightIsDown = function () {
    return this.cursors.right.isDown || this.moveRightButton.isDown;
};

AdslJumper.Input.prototype.actionButtonIsJustDown = function () {
    return this.actionButton.justDown;
};

// W or arrow up
AdslJumper.Input.prototype.jumpIsJustDown = function () {
    return this.jumpButton.justDown || this.cursors.up.justDown;
};

// enter
AdslJumper.Input.prototype.selectButtonIsJustDown = function () {
    return this.selectButton.justDown;
};

// S or arrow down
AdslJumper.Input.prototype.downIsJustDown = function () {
    return this.downButton.justDown || this.cursors.down.justDown;
};

// возникает баг при вызове player.destroy(); ещё не разобрался
AdslJumper.Input.prototype.destroy = function() {
    // nothing
  };

