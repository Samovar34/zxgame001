AdslJumper.testState = function (game) {};


AdslJumper.testState.prototype = {
    preload: function () {
        this.game.load.image("level", "assets/images/levels/level1.png");
        this.game.load.image("platform", "assets/images/platform.png");
        this.game.load.tilemap('map', 'assets/levels/level1' + ".json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("render", "assets/images/render.png");
    },
    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = true;
        this.game.clearBeforeRender = false;

        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.gameObjectFactory;

        this.game.world.setBounds(0, 0, 768, 384);

        this.background = this.game.add.image(0, 0, "level");

        // game world
        this.map = this.game.add.tilemap("map", 32, 32);

        this.gameObjectFactory.createDoors.call(this);

        this._events = {
            "openDoor": blowMine
        }

        // player
        this.gameObjectFactory.createPlayer.call(this);

        this.gameObjectFactory.createCollision.call(this);
        this.gameObjectFactory.createTriggers.call(this);

        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
    },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, callback, null, this);
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
    if (trigger._killOnOverlap) {
        trigger.body.enable = false;
    }

    this._events[trigger._event].call(this);
    console.log(trigger._event);
}

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

function blowMine() {
    this.exitDoor.open();
}

