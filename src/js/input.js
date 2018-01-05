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
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.speedUpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.L);

    // other buttons
    this.jumpButton2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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

AdslJumper.Input.prototype.speedUpIsDown = function () {
    return this.speedUpButton.isDown;
};

AdslJumper.Input.prototype.jumpIsJustDown = function () {
    return this.jumpButton.justDown || this.jumpButton2.justDown || this.cursors.up.justDown;
};

