// creates game objects

// Call only with binding context
// call, apply, bind

AdslJumper.gameObjectFactory = {

    // traps
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

    "PlatformA": function (x, y, mass, isTo) {
        var gameObject = this.game.add.sprite(x, y, "atlas_2", "platformA1.png");
        this.game.physics.arcade.enable(gameObject);
        gameObject.body.mass = mass || 1;
        gameObject.outOfBoundsKill = true;
        gameObject.checkWorldBounds = true;

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
    "ScreenD": function (x, y) {
        return new AdslJumper.ScreenD(this.game, x, y + 32);
    },

    "level1ScreenA": function (x, y) {
        // this = Phaser.State
        this.levelScreen =  this.game.add.sprite(x, y + 18, "atlas_2", "level1ScreenA2.png");
        return this.levelScreen;
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

AdslJumper.gameObjectFactory.createBloodParticles = function () {
    var gameObject = this.game.add.emitter(0, 0, 64);
    gameObject.makeParticles("atlas_2", ['blood1.png', 'blood2.png']);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(-1052, 1576/10);
    gameObject.setXSpeed(-900, 900);
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

// call with binding context
AdslJumper.gameObjectFactory.createCollision = function () {
    this.collision2d  = this.game.add.group();
    this.collision2d.enableBody = true;

    //temp variables
    this.tempArray = AdslJumper.utils.findObjectsByType('box2d', this.map, 'collision');
    this.tempElement = null;

    for (var i = 0; i < this.tempArray.length; i++) {
        // create element
        this.tempElement = this.game.make.sprite(this.tempArray[i].x, this.tempArray[i].y + 32);
        this.tempElement.width = this.tempArray[i].width;
        this.tempElement.height = this.tempArray[i].height;

        // add to group
        this.collision2d.add(this.tempElement);
    }

    this.collision2d.setAll("body.immovable", "true");

    // clear temp variables
    this.tempArray = null;
    this.tempElement = null;
};

// call with binding context
AdslJumper.gameObjectFactory.createDoors = function () {
    //temp variables
    this.tempArray = AdslJumper.utils.findObjectsByType('door', this.map, 'doors');
    this.tempElement = null;

    for (var i = 0; i < this.tempArray.length; i++) {
        if (this.tempArray[i].name === "ExitDoor") {
            // create exit Door
            this.exitDoor = new AdslJumper.ExitDoor(
                this.game,
                this.tempArray[i].x,
                this.tempArray[i].y - 28
            );
        } else {
            // create enter Door
            this.enterDoor = this.game.add.sprite(
                this.tempArray[i].x,
                this.tempArray[i].y - 28,
                "atlas_2",
                "door1.png"
            );
            this.enterDoor.animations.add("default", ["door1.png", "door2.png"], 2, true);
            this.enterDoor.animations.play("default");
        }
    }

    // clear temp variables
    this.tempArray = null;
    this.tempElement = null;
};

// call with binding context
AdslJumper.gameObjectFactory.createPlayer = function () {
    //temp variables
    this.tempArray = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objects');
    this.tempElement = null;

    this.player = new AdslJumper.Player(
        this.game,
        this.input,
        this.tempArray[0].x + 16,
        this.tempArray[0].y + 16);

    // clear temp variables
    this.tempArray = null;
    this.tempElement = null;
};

// call with binding context
// call after createCollision2d
AdslJumper.gameObjectFactory.createRigidbodies = function () {

    //temp variables
    this.tempArray = AdslJumper.utils.findObjectsByType('rb2d', this.map, 'rigidbody');
    this.tempElement = null;

    for (var i = 0; i < this.tempArray.length; i++) {
        // TODO logic here
    }

    this.collision2d.setAll("body.immovable", "true");

    // clear temp variables
    this.tempArray = null;
    this.tempElement = null;
};

// call with binding context
// this = Phaser.State
AdslJumper.gameObjectFactory.createTriggers = function () {
    this.triggers = this.game.add.group();
    this.triggers.enableBody = true;

    //temp variables
    this.tempArray = AdslJumper.utils.findObjectsByType('tr2d', this.map, 'triggers');
    this.tempElement = null;

    for (var i = 0; i < this.tempArray.length; i++) {
        // create an element
        this.tempElement = this.game.make.sprite(
            this.tempArray[i].x,
            this.tempArray[i].y + 32
        );

        // setup the element
        this.tempElement.width = this.tempArray[i].width;
        this.tempElement.height = this.tempArray[i].height;

        this.tempElement._killOnOverlap = this.tempArray[i].properties.killOnOverlap;
        this.tempElement._event = this.tempArray[i].properties.event;

        // add to the group
        this.triggers.add(this.tempElement);
    }

    // clear temp variables
    this.tempArray = null;
    this.tempElement = null;
};

// void
// call with binding context
// this = Phaser.State
AdslJumper.gameObjectFactory.createTraps = function () {

    this.traps = this.game.add.group();
    this.tempArray = AdslJumper.utils.findObjectsByType('trap', this.map, 'objects');
    this.tempElement = null;

    for (i = 0; i < this.tempArray.length; i++) {
        this.tempElement = AdslJumper.gameObjectFactory[this.tempArray[i].name];
        if (this.tempElement !== undefined) {
            this.traps.add(
                this.tempElement.call(
                    this,
                    this.tempArray[i].x,
                    this.tempArray[i].y,
                    this.tempArray[i].properties
                )
            );
        } else {
            console.error(this.tempArray[i].name, "not found");
        }
    }

    this.tempArray = null;
    this.tempElement = null;

    //TODO перенести
    this.explosionSprites = this.game.add.group();
    this.explosionSprites.enableBody = true;

    for (var i = 0; i < 5; i++) {
        this.explosionSprites.add(AdslJumper.gameObjectFactory.createExplosionSprite(this.game));
    }

    this.explosionSprites.killAll();

    // play animation
    this.traps.callAll("animations.play", "animations", "default");
};

// void
// call with binding context
// this = Phaser.State
AdslJumper.gameObjectFactory.createBonus = function () {

    this.bonus = this.game.add.group();
    this.tempArray = AdslJumper.utils.findObjectsByType('bonus', this.map, 'bonus');
    this.tempElement = null;

    for (i = 0; i < this.tempArray.length; i++) {
        this.tempElement = AdslJumper.gameObjectFactory[this.tempArray[i].name];
        if (this.tempElement !== undefined) {
            this.bonus.add(
                this.tempElement.call(
                    this,
                    this.tempArray[i].x,
                    this.tempArray[i].y,
                    this.tempArray[i].properties
                )
            );
        } else {
            console.error(this.tempArray[i].name, "not found");
        }
    }

    this.tempArray = null;
    this.tempElement = null;

    // play animation
    this.bonus.callAll("animations.play", "animations", "default");
};

// call with binding context
// this = Phaser.State
AdslJumper.gameObjectFactory.createFx = function () {

    this.fx = this.game.add.group();
    this.tempArray = AdslJumper.utils.findObjectsByType('fx', this.map, 'fx');
    this.tempElement = null;

    for (i = 0; i < this.tempArray.length; i++) {
        this.tempElement = AdslJumper.gameObjectFactory[this.tempArray[i].name];
        if (this.tempElement !== undefined) {
            this.fx.add(
                this.tempElement.call(
                    this,
                    this.tempArray[i].x,
                    this.tempArray[i].y,
                    this.tempArray[i].properties
                )
            );
        } else {
            console.error(this.tempArray[i].name, "not found");
        }
    }

    this.tempArray = null;
    this.tempElement = null;

    // play animation
    this.fx.callAll("animations.play", "animations", "default");
};

// alias TODO
AdslJumper.gameObjectFactory.Card = AdslJumper.gameObjectFactory.createCard;