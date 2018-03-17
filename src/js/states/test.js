AdslJumper.testState = function (game) {};


AdslJumper.testState.prototype = {
    preload: function () {
        this.game.load.image("level", "assets/images/level3.png");
        this.game.load.image("platform", "assets/images/platform.png");
        this.game.load.tilemap('map', 'assets/levels/level_2' + ".json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("render", "assets/images/render.png");
    },
    create: function () {
        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.modules.gameObjectFactory;

        this.game.world.setBounds(0, 0, 1152, 576);

        this.game.add.image(0, 0, "level");

        // game world
        this.map = this.game.add.tilemap("map", 32, 32);

        createDoors.call(this);

        this._events = {
            "blowMine": blowMine
        }

        // player
        this.player = new AdslJumper.Player(this.game, this.input, 128,  156);

        createWalls.call(this);
        createTriggers.call(this);

        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
    },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.walls, callback, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, callback2, null, this);

    },
    
    render: function () {
        this.game.debug.text("state: " + this.player.currentState.name, 8, 24, "#00ff00");
        //this.game.debug.body(this.player);
        //this.game.debug.body(this.exitDoor);
        //this.game.debug.physicsGroup(this.triggers);
    }
};

function callback() {
    this.player.customTouch.u = this.player.body.touching.up;
    this.player.customTouch.r = this.player.body.touching.right;
    this.player.customTouch.d = this.player.body.touching.down;
    this.player.customTouch.l = this.player.body.touching.left;
}

function callback2(player, trigger) {
    if (!trigger.props.interactable) {
        trigger.body.enable = false;
    }

    if (trigger.props.event) {
        if (typeof this._events[trigger.props.event] === "function") {
            this._events[trigger.props.event].call(this);
        }

    }
}

// void
function createWalls() {
    this.walls = this.game.add.group();
    this.walls.enableBody = true;
    this.elements = AdslJumper.utils.findObjectsByType('wall', this.map, 'walls');
    this.tempElem = null;

    for (var i = 0; i < this.elements.length; i++) {
        if (this.elements[i].properties) {
            this.tempElem = this.game.add.sprite(this.elements[i].x, this.elements[i].y + 48, this.elements[i].properties.sprite);
        } else {
            this.tempElem = this.game.add.sprite(this.elements[i].x, this.elements[i].y + 48);
        }

        this.tempElem.width = this.elements[i].width;
        this.tempElem.height = this.elements[i].height;

        this.game.physics.arcade.enable(this.tempElem);

        if (this.elements[i].properties) {
            if (this.elements[i].properties.movable !== true) {
                this.tempElem.body.immovable = true;
            } else {
                this.tempElem.outOfBoundsKill = true;
            }

            if (this.elements[i].properties.tween === true) {
                this.game.add.tween(this.tempElem).to( { x: this.elements[i].properties.endX }, 2000, "Linear", true, 0, -1, true);
            } 
        } else {
            this.tempElem.body.immovable = true;
        }


      
        this.walls.add(this.tempElem);
    }

    //this.walls.setAll("body.immovable", "true");

    this.elements = null;
    this.tempElem = null;
};

// create doors
// void
function createDoors() {
    // get info about doors
    var enterDoorTiledObject = AdslJumper.utils.findObjectsByType('enterDoor', this.map, 'objects');
    var exitDoorTiledObject = AdslJumper.utils.findObjectsByType('exitDoor', this.map, 'objects');

    // create enter Door
    this.enterDoor = this.game.add.sprite(
        enterDoorTiledObject[0].x,
        enterDoorTiledObject[0].y - 42,
        "atlas_2",
        "door1.png"
    );
    this.enterDoor.animations.add("default", ["door1.png", "door2.png"], 2, true);
    this.enterDoor.animations.play("default");

    // create exit Door
    this.exitDoor = new AdslJumper.ExitDoor(
        this.game,
        exitDoorTiledObject[0].x,
        exitDoorTiledObject[0].y - 42,
        exitDoorTiledObject[0].properties.nextLevel
    );
};

// void
AdslJumper.testState.prototype.createTraps = function () {
    var elements = AdslJumper.utils.findObjectsByType('trap', this.map, 'fxLayer');
    var currentFunction = null;

    for (var i = 0; i < elements.length; i++) {
        currentFunction = AdslJumper.gameObjectFactory[elements[i].name];
        if (currentFunction !== undefined) {
            this.foregroundLayer.add(currentFunction.call(this, elements[i].x, elements[i].y, elements[i].properties));
        } else {
            console.error(elements[i].name, "not found");
        }
    }

    // play animation
    this.foregroundLayer.callAll("animations.play", "animations", "default");
};

// main trap handler method.
// void
AdslJumper.testState.prototype.trapHandler = function (player, trap) {
    var handler = this.trapHandlerCollection[trap.tag];
    if (handler !== undefined) {
        handler.call(this, player, trap);
    } else {
        console.error("handled not found for " + trap.tag);
    }
};

function createTriggers() {
    this.triggers = this.game.add.group();
    this.triggers.enableBody = true;

    this.elements = AdslJumper.utils.findObjectsByType('trigger', this.map, 'triggers');
    this.tempElem = null;

    for (var i = 0; i < this.elements.length; i++) {
        this.tempElem = this.game.add.sprite(this.elements[i].x, this.elements[i].y + 32);

        this.tempElem.width = this.elements[i].width;
        this.tempElem.height = this.elements[i].height;

        this.tempElem.props = {};
        this.tempElem.props.event = this.elements[i].properties.event;
        this.tempElem.props.interactable = this.elements[i].properties.interactable;
      
        this.triggers.add(this.tempElem);
    }

    //this.walls.setAll("body.immovable", "true");

    this.elements = null;
    this.tempElem = null;
}

function blowMine() {
    this.exitDoor.open();
}

