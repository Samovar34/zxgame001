/**
 * world functions
 * @type {{}}
 */
AdslJumper.world = {};

/**
 * init world object
 * @param {Phaser.State} state
 */
AdslJumper.world.init = function (state) {
    this.state = state;
};

/**
 * create collision group for player
 * @param {[]}arr
 * @returns {Phaser.Group}

 */
AdslJumper.world.createCollision = function (arr) {

    var collision2d = this.state.add.group();
    collision2d.enableBody = true;

    var tempSprite = null;

    for (var i = 0; i < arr.length; i += 4) {
        tempSprite = this.state.make.sprite(arr[i] *_scaleFactor, arr[i + 1] * _scaleFactor);
        tempSprite.width = arr[i + 2] * _scaleFactor;
        tempSprite.height = arr[i + 3] * _scaleFactor;

        collision2d.add(tempSprite);
    }

    collision2d.setAll("body.immovable", "true");

    return collision2d;
};

// this = Phaser.State
AdslJumper.world.createTraps = function (game, map) {

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
    //this.explosionSprites.enableBody = true;

    for (var i = 0; i < 5; i++) {
        this.explosionSprites.add(AdslJumper.gameObjectFactory.createExplosionSprite(this.game));
    }

    this.explosionSprites.killAll();

    // play animation
    this.traps.callAll("animations.play", "animations", "default");
};

/**
 * create group with bonus
 * @param arr
 * @returns {Phaser.Group}
 * @this AdslJumper.world
 */
AdslJumper.world.createBonus = function (arr) {

    var group = this.state.add.group();

    for (var i = 0; i < arr.length; i += 3) {
        group.add(AdslJumper.gameObjectFactory[arr[i]](arr[i + 1], arr[i + 2]));
    }

    group.callAll("animations.play", "animations", "default");

    return group;
};

/**
 * create fx group
 * @param {[]} arr
 * @returns {Phaser.Group}
 * @this AdslJumper.world
 */
AdslJumper.world.createFx = function (arr) {

    var group = this.state.add.group();

    for (var i = 0; i < arr.length; i += 3) {
        try {
            group.add(AdslJumper.gameObjectFactory[arr[i]](arr[i + 1], arr[i + 2]));
        } catch (err) {
            console.warn("createFx: " + arr[i] + " not gameObject(function)");
        }

    }

    group.callAll("animations.play", "animations", "default");

    return group;
};

/**
 * create trigger group
 * @param {[]} arr
 * @returns {Phaser.Group}
 * @this {AdslJumper.world}
 */
AdslJumper.world.createTriggers = function (arr) {
    
    // create triggers group and activate physics
    var group = this.state.add.group();
    group.enableBody = true;

    //temp variables
    var tempElement = null;

    for (var i = 0; i < arr.length; i += 5) {
        // create an element
        tempElement = this.state.make.sprite(arr[i] * _scaleFactor, arr[i+1] * _scaleFactor);

        // setup the element
        tempElement.width = arr[i+2] * _scaleFactor;
        tempElement.height = arr[i+3] * _scaleFactor;

        tempElement._event = arr[i+4];

        // add to the group
        group.add(tempElement);
    }

    return group;
};

/**
 * create game world
 * @this {Phaser.State}
 */
AdslJumper.world.createWorld = function () {
    // enter door
    AdslJumper.gameObjectFactory.createEnterDoor(this.state.map.enterDoor.x, this.state.map.enterDoor.y);

    // exit door
    this.state.exitDoor = new AdslJumper.ExitDoor
    (
        this.state.game,
        this.state.map.exitDoor.x * _scaleFactor,
        (this.state.map.exitDoor.y - 60) * _scaleFactor,
        this.state.map.exitDoor.nextLevel
    );

    // create collision
    this.state.collision2d = this.createCollision(this.state.map.collision);

    // create traps

    // create fx
    this.state.fx = this.createFx(this.state.map.fx);

    // create bonus
    this.state.bonus = this.createBonus(this.state.map.bonus);
};