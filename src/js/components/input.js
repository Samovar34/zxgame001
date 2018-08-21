/**
 * input manager
 * @param {Phaser.Game} game
 * @constructor
 */
AdslJumper.Input = function (game) {
    this.game = game;

    //init XBOX controller
    this.game.input.gamepad.start();
    this.pad1 = this.game.input.gamepad.pad1;

    // if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad1.connected) {
    //     this.usingPad = true;
    // } 


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

    this.jumpButtonBuffer = 0;
};

AdslJumper.Input.prototype.constructor = AdslJumper.Input;

/**
 * input manager update
 */
AdslJumper.Input.prototype.update = function () {
    if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad1.connected) {
        this.usingPad = true;
    } else {
        this.usingPad = false;
    }
};

/**
 *
 * @type {number}
 */
AdslJumper.Input.prototype.DURATION = 32;

// Get button objects
AdslJumper.Input.prototype.leftIsDown = function () {
    if (this.usingPad) {
        return this.cursors.left.isDown ||
            this.moveLeftButton.isDown ||
            this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
            (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1);
    }
    return this.cursors.left.isDown || this.moveLeftButton.isDown;
};

/**
 * check right button
 * @returns {boolean}
 */
AdslJumper.Input.prototype.rightIsDown = function () {
    if (this.usingPad) {
        return this.cursors.right.isDown ||
            this.moveRightButton.isDown ||
            this.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) ||
            (this.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1);
    }

    return this.cursors.right.isDown || this.moveRightButton.isDown;
};

AdslJumper.Input.prototype.actionButtonIsJustDown = function () {
    return this.actionButton.justDown;
};

// W or arrow up
AdslJumper.Input.prototype.jumpIsJustDown = function () {
    if (this.usingPad) {
        return this.jumpButton.justDown ||
            this.cursors.up.justDown ||
            this.pad1.justPressed(Phaser.Gamepad.XBOX360_A, 32);
    }   
    
    return this.jumpButton.justDown || this.cursors.up.justDown;   
};

// enter
AdslJumper.Input.prototype.selectButtonIsJustDown = function () {
    if (this.usingPad) {
        return this.pad1.justPressed(Phaser.Gamepad.XBOX360_START, this.DURATION) || this.selectButton.justDown;
    }
    
    return this.selectButton.justDown;
};

// methods for menu
// ...


// S or arrow down
AdslJumper.Input.prototype.downIsJustDown = function () {
    return this.downButton.justDown || this.cursors.down.justDown;
};

// возникает баг при вызове player.destroy(); ещё не разобрался
AdslJumper.Input.prototype.destroy = function() {
    // nothing
};

