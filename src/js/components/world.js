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

/**
 *
 * @param {[]} arr
 */
AdslJumper.world.createTraps = function (arr) {

    for (var i = 0; i < arr.length; i++) {

        // add to the group
        this.state.triggers.add(AdslJumper.gameObjectFactory[arr[i].name](arr[i].x, arr[i].y));
    }

    this.state.triggers.callAll("animations.play", "animations", "default");
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
AdslJumper.world.createWorld = function (map) {
    // enter door
    AdslJumper.gameObjectFactory.createEnterDoor(map.enterDoor.x, map.enterDoor.y);

    // exit door
    this.state.exitDoor = new AdslJumper.ExitDoor
    (
        this.state.game,
        map.exitDoor.x * _scaleFactor,
        (map.exitDoor.y - 60) * _scaleFactor,
        map.exitDoor.nextLevel
    );

    // create collision
    this.state.collision2d = this.createCollision(map.collision);

    // create traps

    // create fx
    this.state.fx = this.createFx(map.fx);

    // create bonus
    this.state.bonus = this.createBonus(map.bonus);
};