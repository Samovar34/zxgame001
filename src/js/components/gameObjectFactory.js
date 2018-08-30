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
 * create enter door
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
 * create coin
 * @param {number} x
 * @param {number} y
 * @returns {AdslJumper.Coin}
 */
AdslJumper.gameObjectFactory.coin = function (x, y) {
    return new AdslJumper.Coin(this.state.game, x * _scaleFactor, (y - 22) * _scaleFactor);
};


/**
 *
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.screenD = function (x, y) {

    var sprite = this.state.make.sprite(x * _scaleFactor, (y - 10) * _scaleFactor, "atlas_2", "screenD1.png");

    sprite.animations.add("default", [
        "screenD1.png",
        "screenD2.png",
        "screenD3.png",
        "screenD4.png",
        "screenD5.png",
        "screenD6.png",
        "screenD7.png"
    ], 12, true);

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    return sprite;
};

/**
 * create led game object
 * @param {number} x
 * @param {number} y
 * @returns {AdslJumper.Led}
 */
AdslJumper.gameObjectFactory.led = function (x, y) {
    return new AdslJumper.Led(this.state.game, x * _scaleFactor, (y - 2) *_scaleFactor);
};

/**
 * create fan game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.fan = function (x, y) {
    var sprite = this.state.add.sprite(x * _scaleFactor, (y - 32) * _scaleFactor, "atlas_2", "fan01.png");

    sprite.smoothed = false;
    sprite.scale.setTo(_scaleFactor);

    sprite.animations.add("default", ["fan01.png", "fan02.png"], 18, true);

    return sprite;
};

/**
 * create blood particles
 * @returns {Phaser.Particles.Arcade.Emitter}
 */
AdslJumper.gameObjectFactory.createBloodParticles = function () {
    var gameObject = this.state.add.emitter(0, 0, 64);
    gameObject.makeParticles("atlas_2", ['blood1.png', 'blood2.png']);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(-1512, 512);
    gameObject.setXSpeed(-1900, 1900);
    gameObject.setScale(1, 2, 1, 2);
    gameObject.gravity = 900;

    return gameObject;
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
 * create platformA game object
 * @param {number} x
 * @param {number} y
 * @returns {Phaser.Sprite}
 */
AdslJumper.gameObjectFactory.platformA = function (x, y, mass, isTo, maxVelocityY) {
    var gameObject = this.state.game.make.sprite(x * _scaleFactor, y * _scaleFactor, "atlas_2", "platformA1.png");

    gameObject.smoothed = false;
    gameObject.scale.setTo(_scaleFactor);

    this.state.game.physics.arcade.enable(gameObject);
    gameObject.body.mass = mass || 1;
    gameObject.outOfBoundsKill = true;
    gameObject.checkWorldBounds = true;
    gameObject.body.maxVelocity.x = 0;
    gameObject.body.maxVelocity.y = maxVelocityY || 100;

    gameObject.tag = "platformA";

    gameObject.animations.add("default", [
        "platformA1.png",
        "platformA2.png"
    ], 8, true);

    gameObject.animations.play("default");

    return gameObject;
},

AdslJumper.gameObjectFactory1 = {

    // traps
    "Electric": function (x, y, properties) {
        var gameObject = this.game.make.sprite(x, y - 96, "atlas_2", "electric1.png");

        gameObject.name = "electric";
        gameObject.tag = "electric";

        gameObject.scale.setTo(1, (properties ? properties.scale : 1));

        if (gameObject.scale.y < 0) {
            gameObject.y += 224;
        }

        gameObject.animations.add("default", [
            "electric3.png",
            "electric4.png",
            "electric5.png",
            "electric4.png"
        ], 14, true);

        gameObject.animations.add("off", [
            "electric4.png",
            "electric2.png",
            "electric1.png"
        ], 4, false);

        this.game.physics.arcade.enable(gameObject);
        gameObject.body.immovable = true;

        gameObject.body.setSize(28, 96, 2, 6);

        return gameObject;
    },

    "ThornUp": function (x, y, properties) {
        return new AdslJumper.Thorn(this.game, x, y, "up", properties);
    },
    "ThornDown": function (x, y, properties) {
        return new AdslJumper.Thorn(this.game, x, y, "down", properties);
    },
    "ThornLeft": function (x, y, properties) {
        return new AdslJumper.Thorn(this.game, x, y, "left", properties);
    },
    "ThornRight": function (x, y, properties) {
        return new AdslJumper.Thorn(this.game, x, y, "right", properties);
    },
    "MovableThorn": function (x, y, properties) {
        return new AdslJumper.MovableThorn(this.game, x, y, properties);
    },
    "Mine": function (x, y, properties) {
        return new AdslJumper.Mine(this.game, x, y + 18, properties);
    },

    "FlyingThornUp": function (x, y, properties) {
        var gameObject = this.game.add.sprite(x, y - 32, "atlas_2", "flyingThornUp1.png");

        gameObject.name = properties ? properties.name : "flyingThorn";
        gameObject.tag = "flyingThorn";
        
        gameObject.animations.add("fly", [
            "flyingThornUp2.png",
            "flyingThornUp3.png"
        ], 12, true);

        this.game.physics.arcade.enable(gameObject);
        gameObject.body.immovable = true;
        gameObject.body.setSize(32, 20, 0, 6);

        return gameObject;
    },

    // rigidbodies

    "PlatformA": function (x, y, mass, isTo, maxVelocityY) {
        var gameObject = this.game.add.sprite(x, y, "atlas_2", "platformA1.png");
        this.game.physics.arcade.enable(gameObject);
        gameObject.body.mass = mass || 1;
        gameObject.outOfBoundsKill = true;
        gameObject.checkWorldBounds = true;
        gameObject.body.maxVelocity.x = 0;
        gameObject.body.maxVelocity.y = maxVelocityY || 424;
       

        gameObject.tag = "platformA";

        if (isTo) {
            gameObject._tween = this.game.add.tween(gameObject).to({y: gameObject.y - 4}, 600, null, true, 0, -1, true);
        } else {
            gameObject._tween = this.game.add.tween(gameObject).to({y: gameObject.y + 4}, 600, null, true, 0, -1, true);
        }
        

        gameObject.animations.add("default", [
            "platformA1.png",
            "platformA2.png"
        ], 8, true);

        gameObject.animations.play("default");

        return gameObject;
    },

    "PlatformB": function (x, y, mass, isTo, maxVelocityY) {
        var gameObject = this.game.make.sprite(x, y, "atlas_2", "platformB1.png");
        
        // physics
        this.game.physics.arcade.enable(gameObject);
        gameObject.body.setSize(64, 8, 0, 0);
        gameObject.body.immovable = true;
        gameObject.alpha = 0.9;
        
        gameObject.animations.add("default", [
            "platformB1.png",
            "platformB2.png",
            "platformB3.png",
            "platformB4.png",
            "platformB5.png",
            "platformB6.png",
            "platformB7.png",
            "platformB8.png",
            "platformB7.png",
            "platformB6.png",
            "platformB5.png",
            "platformB4.png",
            "platformB3.png",
            "platformB2.png"
        ], 12, true);

        gameObject.animations.add("disapear", [
            "platformB9.png",
            "platformB10.png",
            "platformB11.png",
            "platformB12.png",
            "platformB13.png",
            "platformB14.png"
        ]);

        gameObject.animations.add("apear", [
            "platformB14.png",
            "platformB13.png",
            "platformB12.png",
            "platformB11.png",
            "platformB10.png",
            "platformB9.png",
            
        ]);

        gameObject.animations.play("default");

        return gameObject;
    },

    // bonus
    "Coin": function (x, y, properties) {
        return new AdslJumper.Coin(this.game, x, y, properties);
    },

    // fx
    "Led": function (x, y, properties) {
        return new AdslJumper.Led(this.game, x, y + 30, properties);
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
    "ScreenC": function (x, y) {
        var gameObject = this.game.make.sprite(x, y + 22, "atlas_2", "screenC1.png");

        gameObject.animations.add("default", [
            "screenC1.png",
            "screenC2.png",
            "screenC3.png",
            "screenC4.png"
        ], 2, true);

        return gameObject;
    },
    "ScreenD": function (x, y) {
        return new AdslJumper.ScreenD(this.game, x, y + 22);
    },

    "level1ScreenA": function (x, y) {
        // this = Phaser.State
        this.levelScreen =  this.game.add.sprite(x, y + 18, "atlas_2", "level1ScreenA2.png");
        return this.levelScreen;
    },

    "Tutorial2": function (x, y) {
        return this.game.add.sprite(x, y - 32, "atlas_2", "tutorial3.png"); // rus
    },
    "Tutorial4": function (x, y) {
        return this.game.add.sprite(x, y - 32, "atlas_2", "tutorial5.png"); // rus
    },
    "Tutorial8": function (x, y) {
        return this.game.add.sprite(x, y + 32, "atlas_2", "tutorial9.png"); // rus
    },
    "Tutorial10": function (x, y) {
        return this.game.add.sprite(x, y + 32, "atlas_2", "tutorial11.png"); // rus
    }
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

//
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

AdslJumper.gameObjectFactory.createExplosionSprite = function (game) {
    var gameObject = game.make.sprite(0, 0, "atlas_2", "blow1.png");
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
}

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

// GAME WORLD FUNCTIONS

// call with binding context
AdslJumper.gameObjectFactory.createBackGround = function () {
   
    //temp variables
    this.tempArray = AdslJumper.utils.findObjectsByType('bg', this.map, 'background');
    this.tempElement = null;

    for (var i = 0; i < this.tempArray.length; i++) {
        this.game.add.sprite(
            this.tempArray[i].x,
            this.tempArray[i].y, //TODO скорректировать координата по оси Y
            this.tempArray[i].properties.atlas,
            this.tempArray[i].properties.sprite
        );
    }

    // clear temp variables
    this.tempArray = null;
    this.tempElement = null;
};

// return Phaser.Sprite
// this = Phaser.State
AdslJumper.gameObjectFactory.createCard = function (x, y, name) {
    var gameObject = this.game.add.sprite(x, y + 16, "atlas_2", "card1.png");
    gameObject.tag = "card";

    this.game.physics.arcade.enable(gameObject);

    // animation
    gameObject.animations.add("default", [
        "card1.png", 
        "card2.png", 
        "card3.png", 
        "card4.png", 
        "card5.png"
    ], 9, true);
    
    return this.card = gameObject;
}

// alias TODO
AdslJumper.gameObjectFactory.Card = AdslJumper.gameObjectFactory.createCard;