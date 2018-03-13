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
        return new AdslJumper.Mine(this.game, x, y + 18);
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
    },
    "ScreenD": function (x, y) {
        return new AdslJumper.ScreenD(this.game, x, y + 32);
    },
    "Tutor1": function (x, y) {
        return this.game.add.sprite(x, y + 32, "atlas_2", "tutorial3.png");
    },
    "Tutor2": function (x, y) {
        return this.game.add.sprite(x, y + 32, "atlas_2", "tutorial5.png");
    },
    "Tutor3": function (x, y) {
        return this.game.add.sprite(x, y + 32, "atlas_2", "tutorial7.png");
    },
    "Tutor4": function (x, y) {
        return this.game.add.sprite(x, y + 32, "atlas_2", "tutorial9.png");
    },
    "Tutor5": function (x, y) {
        return this.game.add.sprite(x, y + 32, "atlas_2", "tutorial11.png");
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

    var gameObject = this.game.add.sprite();
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