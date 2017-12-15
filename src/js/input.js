// INPUT Class

AdslJumper.Input = function (game) {
    this.game = game;

    // TODO init XBOX controller

    // init keyboard controlls
    // arrows
    this.cursors = this.game.input.keyboard.createCursors();

    // WASD
    this.moveLeftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.moveRightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

    // other buttons
    this.jumpButton2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.runButton = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
};

AdslJumper.Input.prototype.constructor = AdslJumper.Input;

