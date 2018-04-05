// create world's object

AdslJumper.world = {};

// this = Phaser.State
AdslJumper.world.createCollision = function () {

    // create collision group and activate physics
    this.collision2d  = this.game.add.group();
    this.collision2d.enableBody = true;

    //temp variables
    var tempArray = AdslJumper.utils.findObjectsByType('box2d', this.map, 'collision');
    var tempElement = null;

    for (var i = 0; i < tempArray.length; i++) {
        // create element
        tempElement = this.game.make.sprite(tempArray[i].x, tempArray[i].y + 32);
        tempElement.width = tempArray[i].width;
        tempElement.height = tempArray[i].height;

        // add to group
        this.collision2d.add(tempElement);
    }

    this.collision2d.setAll("body.immovable", "true");
};

// this = Phaser.State
AdslJumper.world.createDoors = function () {
    //temp variables
    var tempArray = AdslJumper.utils.findObjectsByType('door', this.map, 'doors');

    for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].name === "ExitDoor") {
            // create exit Door
            this.exitDoor = new AdslJumper.ExitDoor(
                this.game,
                tempArray[i].x,
                tempArray[i].y - 28,
                tempArray[i].properties.nextLevel
            );
        } else {
            // create enter Door
            this.enterDoor = this.game.add.sprite(
                tempArray[i].x,
                tempArray[i].y - 28,
                "atlas_2",
                "door1.png"
            );
            this.enterDoor.animations.add("default", ["door1.png", "door2.png"], 2, true);
            this.enterDoor.animations.play("default");
        }
    }
};

// this = Phaser.State
AdslJumper.world.createPlayer = function () {
    //temp variables
    var tempArray = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objects');

    this.player = new AdslJumper.Player(
        this.game,
        this.input,
        tempArray[0].x + 16,
        tempArray[0].y + 16
    );
};

// this = Phaser.State
AdslJumper.world.createTraps = function () {

    // create traps group
    this.traps = this.game.add.group();

    var tempArray = AdslJumper.utils.findObjectsByType('trap', this.map, 'objects');
    var tempElement = null;

    for (i = 0; i < tempArray.length; i++) {
        tempElement = AdslJumper.gameObjectFactory[tempArray[i].name];
        if (typeof tempElement === "function") {
            this.traps.add(
                tempElement.call(
                    this,
                    tempArray[i].x,
                    tempArray[i].y,
                    tempArray[i].properties
                )
            );
        } else {
            console.error(tempArray[i].name, "not found");
        }
    }

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
AdslJumper.world.createBonus = function () {

    // create bonus group
    this.bonus = this.game.add.group();

    var tempArray = AdslJumper.utils.findObjectsByType('bonus', this.map, 'bonus');
    var tempElement = null;

    for (i = 0; i < tempArray.length; i++) {
        tempElement = AdslJumper.gameObjectFactory[tempArray[i].name];
        if (typeof tempElement === "function") {
            this.bonus.add(
                tempElement.call(
                    this,
                    tempArray[i].x,
                    tempArray[i].y,
                    tempArray[i].properties
                )
            );
        } else {
            console.error(tempArray[i].name, "not found");
        }
    }

    // play animation
    this.bonus.callAll("animations.play", "animations", "default");
};

// this = Phaser.State
AdslJumper.world.createFx = function () {

    // create fx group
    this.fx = this.game.add.group();

    var tempArray = AdslJumper.utils.findObjectsByType('fx', this.map, 'fx');
    var tempElement = null;

    for (i = 0; i < tempArray.length; i++) {
        tempElement = AdslJumper.gameObjectFactory[tempArray[i].name];
        if (typeof tempElement === "function") {
            this.fx.add(
                tempElement.call(
                    this,
                    tempArray[i].x,
                    tempArray[i].y,
                    tempArray[i].properties
                )
            );
        } else {
            console.error(tempArray[i].name, "not found");
        }
    }

    // play animation
    this.fx.callAll("animations.play", "animations", "default");
};

// call with binding context
// call after createCollision2d
// this = Phaser.State
AdslJumper.world.createRigidbodies = function () {

    //temp variables
    var tempArray = AdslJumper.utils.findObjectsByType('rb2d', this.map, 'rigidbody');
    var tempElement = null;

    for (var i = 0; i < tempArray.length; i++) {
        // TODO logic here
    }

};

// call with binding context
// this = Phaser.State
AdslJumper.world.createTriggers = function () {
    
    // create triggers group and activate physics
    this.triggers = this.game.add.group();
    this.triggers.enableBody = true;

    //temp variables
    var tempArray = AdslJumper.utils.findObjectsByType('tr2d', this.map, 'triggers');
    var tempElement = null;

    for (var i = 0; i < tempArray.length; i++) {
        // create an element
        tempElement = this.game.make.sprite(
            tempArray[i].x,
            tempArray[i].y + 32
        );

        // setup the element
        tempElement.width = tempArray[i].width;
        tempElement.height = tempArray[i].height;

        tempElement._killOnOverlap = tempArray[i].properties.killOnOverlap;
        tempElement._event = tempArray[i].properties.event;

        // add to the group
        this.triggers.add(tempElement);
    }
};