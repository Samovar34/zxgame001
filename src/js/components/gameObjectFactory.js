/**
 * create game objects
 * @type {{}}
 */
AdslJumper.gameObjectFactory = {};

/**
 * set this.state property for creating gameObjects
 * @param {Phaser.State} state
 */
AdslJumper.gameObjectFactory.init = function (state) {
    this.state = state;
};

/**
 * create arrowRight game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.arrowRight = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 16) * _scaleFactor, "atlas_2", "arrowRight1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", ["arrowRight1.png", "arrowRight2.png", "arrowRight3.png"], 8, true);

    return sprite;
};

/**
 * create card game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.card = function (x, y) {
    var gameObject = this.state.make.sprite(x, y + 16, "atlas_2", "card1.png");
    gameObject.tag = "card";

    this.state.game.physics.arcade.enable(gameObject);

    // animation
    gameObject.animations.add("default", [
        "card1.png",
        "card2.png",
        "card3.png",
        "card4.png",
        "card5.png"
    ], 9, true);

    return gameObject;
};

/**
 * create coin
 * @param {number} x
 * @param {number} y
 * @returns {AdslJumper.Coin}
 */
AdslJumper.gameObjectFactory.coin = function (x, y) {
    return new AdslJumper.Coin(this.state.game, x * _scaleFactor, (y - 22) * _scaleFactor);
};

/**
 * create and add to the game world enter door
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.createEnterDoor = function (x, y) {
    var sprite = this.state.add.sprite(x * _scaleFactor, (y - 60) * _scaleFactor, "atlas_2", "door1.png");
    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);
    sprite.animations.add("default", ["door1.png", "door2.png"], 2, true);
    sprite.animations.play("default");

    return sprite;
};



/**
 * create fart particles for player
 * @returns {Phaser.Particles.Arcade.Emitter}
 */
AdslJumper.gameObjectFactory.createFartParticles = function () {
    // particles
    var gameObject = this.state.add.emitter(0, 0, 10);
    gameObject.makeParticles("atlas_2", ["sparks2.png", "sparks3.png"]);
    gameObject.setYSpeed(-6, 32);
    gameObject.setXSpeed(-24, 24);
    gameObject.setScale(1, _scaleFactor, 1, _scaleFactor);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.alpha = 0.4;

    return gameObject;
};

/**
 * create and add to the game world sparks particles
 * @returns {Phaser.Particles.Arcade.Emitter}
 */
AdslJumper.gameObjectFactory.createSparks = function () {
    var gameObject = this.state.add.emitter(0, 0, 24);
    gameObject.makeParticles("atlas_2", ["sparks2.png", "sparks3.png"]);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(-256, 256);
    gameObject.setXSpeed(-256, 256);
    gameObject.alpha = 1;
    gameObject.gravity = 0;

    return gameObject;
};

/**
 * create explosion sprite
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.explosion = function () {
    var gameObject = this.state.make.sprite(0, 0, "atlas_2", "blow1.png");
    gameObject.name = "explosion";
    gameObject.animations.add("default", [
        "blow1.png",
        "blow2.png",
        "blow3.png",
        "blow4.png",
        "blow5.png",
        "blow6.png",
        "blow7.png",
        "blow8.png",
        "blow9.png",
        "blow10.png",
        "blow11.png",
        "blow12.png",
        "blow13.png",
        "blow14.png"
    ], 24);

    return gameObject;
};

/**
 * create and fan game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.fan = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 32) * _scaleFactor, "atlas_2", "fan01.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", ["fan01.png", "fan02.png"], 18, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.fxCableLed = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 16) * _scaleFactor, "atlas_2", "fxCableLed1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "fxCableLed1.png",
        "fxCableLed2.png"
    ], 8, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.fxSquare = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 16) * _scaleFactor, "atlas_2", "fxSquare1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "fxSquare1.png",
        "fxSquare2.png"
    ], 1/2, true);

    return sprite;
};

/**
 * create jumpForce game object and add to the game world
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.jumpForce = function (x, y) {
    var sprite = this.state.add.sprite(x * _scaleFactor, y * _scaleFactor, "atlas_2", "jumpForce1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", ["jumpForce1.png", "jumpForce2.png", "jumpForce3.png", "jumpForce4.png"], 8, true);

    sprite.animations.play("default");

    return sprite;
};

/**
 * create platformA game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.platformA = function (x, y) {
    var gameObject = this.state.game.make.sprite(x * _scaleFactor, y * _scaleFactor, "atlas_2", "platformA1.png");

    gameObject.smoothed = false;
    gameObject.scale.setTo(_scaleFactor);

    this.state.game.physics.arcade.enable(gameObject);
    gameObject.body.mass = 1;
    gameObject.outOfBoundsKill = true;
    gameObject.checkWorldBounds = true;
    gameObject.body.maxVelocity.x = 0;
    gameObject.body.maxVelocity.y = 100;

    gameObject.tag = "platformA";

    gameObject.animations.add("default", [
        "platformA1.png",
        "platformA2.png"
    ], 8, true);

    gameObject.animations.play("default");

    return gameObject;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenErrorBig = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 32) * _scaleFactor, "atlas_2", "screenErrorBig1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenErrorBig1.png", // E
        "screenErrorBig4.png",
        "screenErrorBig2.png", // R
        "screenErrorBig4.png",
        "screenErrorBig2.png", // R
        "screenErrorBig4.png",
        "screenErrorBig3.png", // O
        "screenErrorBig4.png",
        "screenErrorBig2.png", // R
        "screenErrorBig4.png",
        "screenErrorBig4.png",
        "screenErrorBig4.png",
        "screenErrorBig4.png"
    ], 6, true);


    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenErrorFace = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 22) * _scaleFactor, "atlas_2", "screenErrorFace1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenErrorFace1.png",
        "screenErrorFace2.png",
    ], 4, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenGreenLoad = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 10) * _scaleFactor, "atlas_2", "screenGreenLoad1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenGreenLoad1.png",
        "screenGreenLoad2.png",
        "screenGreenLoad3.png",
        "screenGreenLoad4.png",
        "screenGreenLoad5.png"
    ], 8, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenGreenLow = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 10) * _scaleFactor, "atlas_2", "screenGreenLow1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenGreenLow1.png",
        "screenGreenLow2.png"
    ], 2, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenLan = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 32) * _scaleFactor, "atlas_2", "screenLan1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenLan1.png",
        "screenLan2.png",
        "screenLan3.png",
        "screenLan4.png"
    ], 8, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenPercentage = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 10) * _scaleFactor, "atlas_2", "screenPercentage1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenPercentage1.png",
        "screenPercentage2.png",
        "screenPercentage3.png",
        "screenPercentage4.png",
        "screenPercentage5.png",
        "screenPercentage6.png",
        "screenPercentage7.png",
        "screenPercentage6.png",
        "screenPercentage5.png",
        "screenPercentage3.png",
        "screenPercentage2.png"
    ], 4, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenSad = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 32) * _scaleFactor, "atlas_2", "screenSad1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenSad1.png",
        "screenSad2.png",
        "screenSad3.png",
        "screenSad4.png",
        "screenSad5.png",
        "screenSad6.png",
        "screenSad7.png"
    ], 8, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screen380VLoad = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 18) * _scaleFactor, "atlas_2", "screen380VLoad1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screen380VLoad1.png",
        "screen380VLoad2.png"
    ], 1, true);

    return sprite;
};

/**
 * create fx game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenLeds = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 18) * _scaleFactor, "atlas_2", "screenLeds1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", [
        "screenLeds1.png",
        "screenLeds2.png",
        "screenLeds3.png",
        "screenLeds4.png"
    ], Math.floor(Math.random() * 17 + 8), true);

    return sprite;
};

/**
 * create wallLight game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.wallLight = function (x, y) {
    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 16) * _scaleFactor, "atlas_2", "wallLight1.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", ["wallLight1.png", "wallLight2.png"], 1, true);

    return sprite;
};