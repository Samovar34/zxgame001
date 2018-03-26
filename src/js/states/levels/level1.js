AdslJumper.level1State = function (game) {};

var tryCount = 0;

AdslJumper.level1State.prototype = {
    preload: function () {
        // TODO move preload function to waitAudioDecode
    },
    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = true;
        this.game.clearBeforeRender = false;

        this.soundManager = AdslJumper.modules.soundManager;

        // music
        if (!this.soundManager.currentTrack) {
            this.soundManager.currentTrack = this.soundManager.tempTrack;
            this.soundManager.tempTrack = null;
            this.soundManager.playTrack();
        };

        // for triggers and level variable
        this.randomeNumber = Math.floor(Math.random() * 100)/100;
        this.doorIsOpen = false;

        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.gameObjectFactory;

        this.game.world.setBounds(0, 0, 768, 384);

        this.background = this.game.add.image(0, 0, "level1");

        // game world
        this.map = this.game.add.tilemap("map1", 32, 32);

        this.gameObjectFactory.createDoors.call(this);

        // for triggers
        this._events = {
            "openDoor": blowMine,
            "dropThorn0": dropThorn0,
            "dropThorn1": dropThorn1,
            "dropThorn2": dropThorn2,
            "dropThorn3": dropThorn3,
            "dropThorn4": dropThorn4,
        }

        this.gameObjectFactory.createCollision.call(this);
        this.gameObjectFactory.createTriggers.call(this);

        this.blood = AdslJumper.gameObjectFactory.createBloodParticles.call(this);

        this.gameObjectFactory.createTraps.call(this);

        this.thorn0 = this.traps.getByName("dropThorn0");
        this.thorn0.outOfBoundsKill = true;
        this.thorn0.checkWorldBounds = true;
        this.thorn3 = this.traps.getByName("dropThorn3");
        this.thorn3.outOfBoundsKill = true;
        this.thorn3.checkWorldBounds = true;
        this.thorn4 = this.traps.getByName("dropThorn4");
        this.thorn4.outOfBoundsKill = true;
        this.thorn4.checkWorldBounds = true;

        this.thorn1 = this.traps.getByName("dropThorn1");
        this.thorn1.outOfBoundsKill = true;
        this.thorn1.checkWorldBounds = true;

        this.thorn2 = this.traps.getByName("dropThorn2");
        this.thorn2.outOfBoundsKill = true;
        this.thorn2.checkWorldBounds = true;

        this.thorn5 = this.traps.getByName("dropThorn5");
        this.thorn5.outOfBoundsKill = true;
        this.thorn5.checkWorldBounds = true;

        // player
        this.gameObjectFactory.createPlayer.call(this);

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
        this.game.debug.text("isInteract: " + this.player.isInteract, 8, 40, "#00ff00");
        this.game.debug.text("inTrigger: " + this.player.inTrigger, 8, 56, "#00ff00");
        this.game.debug.text("tryCount: " + tryCount, 8, 72, "#00ff00");
        this.game.debug.text("random: " + this.randomeNumber, 8, 88, "#00ff00");
        this.game.debug.text("exist: " + this.thorn0.alive, 8, 104, "#00ff00");

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
    this.doorIsOpen = true;
}

function dropThorn0(trigger) {
    if (tryCount === 0) {
        this.thorn0.body.gravity.y = 1900;
    } else if (tryCount === 1) {
        this.thorn3.body.gravity.y = 1900;
    } else if (tryCount >= 3) {
        if (this.randomeNumber < 0.1) {
            this.thorn0.body.gravity.y = 1900;
        } else if (this.randomeNumber > 0.1 && this.randomeNumber < 0.2) {
            this.thorn3.body.gravity.y = 1900;
        } else if (this.randomeNumber > 0.5 && this.randomeNumber < 0.6) {
            this.thorn4.body.gravity.y = 1900;
        }
    }
    
}

function dropThorn3(trigger) {
    if (tryCount === 2 ) {
        this.thorn4.body.gravity.y = 1900;
    }
}

function dropThorn1(trigger) {
    this.thorn1.body.gravity.y = 1900;
}

function dropThorn2(trigger) {
    this.thorn2.body.gravity.y = 1800;
}

function dropThorn4(trigger) {
    console.log("outside");
    if (this.doorIsOpen) {
        console.log("inside");
        trigger.kill();
        this.thorn5.body.gravity.y = 1800;
    }
    
}

