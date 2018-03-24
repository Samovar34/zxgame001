AdslJumper.testState = function (game) {};


AdslJumper.testState.prototype = {
    preload: function () {
        this.game.load.image("level", "assets/images/levels/level1.png");
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

        this.blood = AdslJumper.gameObjectFactory.createBloodParticles.call(this);

        this.gameObjectFactory.createTraps.call(this);

        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);

        },

    update: function () {
        // reset player
        this.player.reset();

        this.game.physics.arcade.collide(this.player, this.collision2d, AdslJumper.gameFunc.playerCollideHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.triggers, AdslJumper.gameFunc.triggerHandler, null, this);
        this.game.physics.arcade.overlap(this.player, this.traps, AdslJumper.gameFunc.trapHandler, null, this);
        
        // TODO подумать о коллизиях со взрывом
        //this.game.physics.arcade.overlap(this.player, this.explosionSprites, AdslJumper.gameFunc.trapHandler, null, this);

    },
    
    render: function () {
        this.game.debug.text("state: " + this.player.currentState.name, 8, 24, "#00ff00");
        this.game.debug.text("isInteract: " + this.player.isInteract, 8, 32, "#00ff00");

        if (this.player.isInteract) {
            // TODO show message
        }
        //this.game.debug.body(this.player);
        //this.game.debug.body(this.exitDoor);
        //this.game.debug.physicsGroup(this.triggers);
    }
};

function randomExplosion() {
    var x = 64 + Math.floor(Math.random() * 640);
    var y = 64 + Math.floor(Math.random() * 360);
    AdslJumper.gameFunc.makeExplosion.call(this, x, y);
}

function blowMine(trigger) {
    if (trigger._killAfterInteract) {
        trigger.kill();
    }
    this.exitDoor.open();
}

