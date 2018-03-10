// creates game objects

// Call only with binding context
// call, apply, bind

AdslJumper.gameObjectFactory = {

    // traps
    "ThornUp": function (x, y) {
        return new AdslJumper.Thorn(this.game, x, y, "up");
    },
    "ThornDown": function (x, y) {
        return new AdslJumper.Thorn(this.game, x, y, "down");
    },
    "ThornLeft": function (x, y) {
        return new AdslJumper.Thorn(this.game, x, y, "left");
    },
    "ThornRight": function (x, y) {
        return new AdslJumper.Thorn(this.game, x, y, "right");
    },
    "MovableThorn": function (x, y, properties) {
        return new AdslJumper.MovableThorn(this.game, x, y, properties.period, properties.direction);
    },
    "Mine": function (x, y) {
        return new AdslJumper.Mine(this.game, this.soundManager, this.explosionSprite, x, y + 18);
    },

    // fx
    "Led": function (x, y, prop) {
        return new AdslJumper.Led(this.game, x, y + 30, prop.color);
    },
    "Fan": function (x, y) {
        return new AdslJumper.Fan01(this.game, x, y);
    },
    "Error01": function (x, y) {
        return new AdslJumper.Error01(this.game, x, y + 10);
    },
    "ScreenA": function (x, y) {
        return new AdslJumper.ScreenA(this.game, x, y + 14);
    }
};

AdslJumper.gameObjectFactory.createFartParticles = function () {
    // particles
    var gameObject = this.game.add.emitter(0, 0, 10);
    gameObject.makeParticles("atlas_2", ["sparks2.png", "sparks3.png"]);
    gameObject.setYSpeed(-6, 32);
    gameObject.setXSpeed(-24, 24);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.alpha = 0.4;

    return gameObject;
};

AdslJumper.gameObjectFactory.createBackGround01 = function () {

    var gameObject = this.game.add.sprite()
    gameObject.width = 640;
    gameObject.height = 360;
    gameObject.fixedToCamera = true;


    gameObject._filter = new Phaser.Filter(game, null, game.cache.getShader('testShader'));
    gameObject._filter.setResolution(640, 360);

    gameObject.filters = [gameObject._filter];

    return gameObject;
};

AdslJumper.gameObjectFactory.createMeatBlowSprite = function(x, y) {
    var gameObject = this.game.make.sprite(x, y, "atlas_2", "player16.png");
    gameObject.anchor.setTo(0.5);
    gameObject.animations.add("default", [
        "player16.png",
        "player17.png",
        "player18.png",
        "player19.png",
        "player20.png",
        "player21.png"
    ], this.options.deathAnimationSpeed);
    gameObject.animations.getAnimation("default").killOnComplete = true;
    return gameObject;
};

AdslJumper.gameObjectFactory.createExplosionSprite = function () {
    var gameObject = this.game.make.sprite(0, 0, "atlas_2", "blow1.png");
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
    ], 24, true);

    return gameObject;
}

AdslJumper.gameObjectFactory.createBloodParticles = function () {
    var gameObject = this.game.add.emitter(0, 0, 128);
    gameObject.makeParticles("atlas_2", ['blood1.png', 'blood2.png']);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(-1576, 1576);
    gameObject.setXSpeed(-1052, 1052);
    gameObject.gravity = 900;

    return gameObject;
};

AdslJumper.gameObjectFactory.createSparks = function () {
    var gameObject = this.game.add.emitter(0, 0, 24);
    gameObject.makeParticles("atlas_2", ["sparks2.png", "sparks3.png"]);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(-256, 256);
    gameObject.setXSpeed(-256, 256);
    gameObject.alpha = 1;
    gameObject.gravity = 0;

    return gameObject;
};

AdslJumper.gameObjectFactory.createScreenA = function (x, y) {
    var gameObject = this.game.make.sprite(x, y, "atlas_2", "screenA1.png");
    gameObject.animations.add("default", [
        "screenA1.png",
        "screenA2.png",
        "screenA3.png",
        "screenA4.png"
    ], 2, true);

    return gameObject;
};

AdslJumper.gameObjectFactory.createMessage1 = function () {
    var gameObject = this.game.add.sprite(100, 72);
    var temp = null;

    // bg
    temp = this.game.make.sprite(0, 0, "atlas_2", "sparks2.png");
    temp.width = 440;
    temp.height = 198;
    temp.alpha = 0.8;
    gameObject.addChild(temp);

    // buttons
    // a
    temp = this.game.make.sprite(32, 32, "atlas_2", "buttons2.png");
    gameObject.addChild(temp);
    //d
    temp = this.game.make.sprite(32, 54, "atlas_2", "buttons6.png");
    gameObject.addChild(temp);

    // arrow
    temp = this.game.make.sprite(64, 32, "atlas_2", "buttons4.png");
    gameObject.addChild(temp);
    // arrow
    temp = this.game.make.sprite(64, 54, "atlas_2", "buttons5.png");
    gameObject.addChild(temp);

    // =
    temp = this.game.make.sprite(96, 43, "atlas_2", "buttons9.png");
    gameObject.addChild(temp);

    temp = this.game.make.sprite(128, 32, "atlas_2", "tutorial1.png");
    temp.animations.add("default", [
        "tutorial1.png",
        "tutorial2.png",
        "tutorial3.png",
        "tutorial4.png",
        "tutorial5.png",
        "tutorial4.png",
        "tutorial3.png",
        "tutorial2.png"
    ], 4, true);
    temp.animations.play("default");
    gameObject.addChild(temp);

    // w
    temp = this.game.make.sprite(32, 116, "atlas_2", "buttons1.png");
    gameObject.addChild(temp);
    // arrow up
    temp = this.game.make.sprite(64, 116, "atlas_2", "buttons7.png");
    gameObject.addChild(temp);

    // =
    temp = this.game.make.sprite(96, 116, "atlas_2", "buttons9.png");
    gameObject.addChild(temp);

    temp = this.game.make.sprite(128, 100, "atlas_2", "tutorial6.png");
    temp.animations.add("default", [
        "tutorial6.png",
        "tutorial7.png",
        "tutorial8.png",
        "tutorial9.png",
        "tutorial10.png",
        "tutorial11.png"
    ], 4, true);
    temp.animations.play("default");
    gameObject.addChild(temp);

    // w
    temp = this.game.make.sprite(330, 170, "atlas_2", "buttons1.png");
    gameObject.addChild(temp);
    // arrow up
    temp = this.game.make.sprite(362, 170, "atlas_2", "buttons7.png");
    gameObject.addChild(temp);

    // arrow up
    temp = this.game.make.sprite(388, 170, "atlas_2", "buttons9.png");
    gameObject.addChild(temp);

    temp = this.game.make.sprite(410, 170, "atlas_2", "buttons15.png");
    gameObject.addChild(temp);

    return gameObject;
};

AdslJumper.gameObjectFactory.createMessage2 = function () {
    var gameObject = this.game.add.sprite(100, 72);
    var temp = null;

    // bg
    temp = this.game.make.sprite(0, 0, "atlas_2", "sparks2.png");
    temp.width = 440;
    temp.height = 198;
    temp.alpha = 0.8;
    gameObject.addChild(temp);

    // buttons
    // w
    temp = this.game.make.sprite(32, 32, "atlas_2", "buttons1.png");
    gameObject.addChild(temp);
    //arrow
    temp = this.game.make.sprite(32, 54, "atlas_2", "buttons7.png");
    gameObject.addChild(temp);

    // +
    temp = this.game.make.sprite(51, 43, "atlas_2", "buttons8.png");
    gameObject.addChild(temp);

    // w
    temp = this.game.make.sprite(70, 32, "atlas_2", "buttons1.png");
    gameObject.addChild(temp);
    // arrow
    temp = this.game.make.sprite(70, 54, "atlas_2", "buttons7.png");
    gameObject.addChild(temp);

    // =
    temp = this.game.make.sprite(96, 43, "atlas_2", "buttons9.png");
    gameObject.addChild(temp);

    temp = this.game.make.sprite(128, 32, "atlas_2", "tutorial1.png");
    temp.animations.add("default", [
        "tutorial12.png",
        "tutorial13.png",
        "tutorial14.png",
        "tutorial15.png",
        "tutorial16.png",
        "tutorial17.png",
        "tutorial18.png",
        "tutorial19.png"
    ], 4, true);
    temp.animations.play("default");
    gameObject.addChild(temp);

    // w
    temp = this.game.make.sprite(330, 170, "atlas_2", "buttons1.png");
    gameObject.addChild(temp);
    // arrow up
    temp = this.game.make.sprite(362, 170, "atlas_2", "buttons7.png");
    gameObject.addChild(temp);

    // arrow up
    temp = this.game.make.sprite(388, 170, "atlas_2", "buttons9.png");
    gameObject.addChild(temp);

    temp = this.game.make.sprite(410, 170, "atlas_2", "buttons15.png");
    gameObject.addChild(temp);

    return gameObject;
};

AdslJumper.gameObjectFactory.createMessage3 = function () {
    var gameObject = this.game.add.sprite(100, 264);
    var temp = null;

    // bg
    temp = this.game.make.sprite(0, 0, "atlas_2", "sparks2.png");
    temp.width = 440;
    temp.height = 198;
    temp.alpha = 0.8;
    gameObject.addChild(temp);

    // buttons
    // a
    // buttons
    // w
    temp = this.game.make.sprite(32, 32, "atlas_2", "buttons1.png");
    gameObject.addChild(temp);
    //arrow
    temp = this.game.make.sprite(32, 54, "atlas_2", "buttons7.png");
    gameObject.addChild(temp);
    

    // +
    temp = this.game.make.sprite(51, 43, "atlas_2", "buttons8.png");
    gameObject.addChild(temp);

    // w
    temp = this.game.make.sprite(70, 32, "atlas_2", "buttons2.png");
    gameObject.addChild(temp);
    temp = this.game.make.sprite(92, 32, "atlas_2", "buttons4.png");
    gameObject.addChild(temp);
    // arrow
    temp = this.game.make.sprite(70, 54, "atlas_2", "buttons6.png");
    gameObject.addChild(temp);
    temp = this.game.make.sprite(92, 54, "atlas_2", "buttons5.png");
    gameObject.addChild(temp);

    // =
    temp = this.game.make.sprite(118, 43, "atlas_2", "buttons9.png");
    gameObject.addChild(temp);

    temp = this.game.make.sprite(144, 32, "atlas_2", "tutorial1.png");
    temp.animations.add("default", [
        "tutorial20.png",
        "tutorial21.png",
        "tutorial22.png",
        "tutorial23.png",
        "tutorial24.png",
        "tutorial25.png",
        "tutorial26.png",
        "tutorial27.png",
        "tutorial28.png"
    ], 4, true);
    temp.animations.play("default");
    gameObject.addChild(temp);


    temp = this.game.make.sprite(232, 32, "atlas_2", "tutorial6.png");
    temp.animations.add("default", [
        "tutorial29.png",
        "tutorial30.png",
        "tutorial31.png",
        "tutorial32.png",
        "tutorial33.png",
        "tutorial34.png",
        "tutorial35.png"
    ], 4, true);
    temp.animations.play("default");
    gameObject.addChild(temp);

    // w
    temp = this.game.make.sprite(330, 170, "atlas_2", "buttons1.png");
    gameObject.addChild(temp);
    // arrow up
    temp = this.game.make.sprite(362, 170, "atlas_2", "buttons7.png");
    gameObject.addChild(temp);

    // arrow up
    temp = this.game.make.sprite(388, 170, "atlas_2", "buttons9.png");
    gameObject.addChild(temp);

    temp = this.game.make.sprite(410, 170, "atlas_2", "buttons15.png");
    gameObject.addChild(temp);

    return gameObject;
};