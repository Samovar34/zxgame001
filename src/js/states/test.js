AdslJumper.testState = function (game) {};

var tryCount = 0;

AdslJumper.testState.prototype = {
    preload: function () {
        this.game.load.image("level", "assets/images/levels/level1.png");
        this.game.load.tilemap('map', 'assets/levels/level1' + ".json", null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image("render", "assets/images/render.png");
    },
    create: function () {
        // set renderer
        this.game.renderer.renderSession.roundPixels = true;
        this.game.clearBeforeRender = true;

        this.rocket = this.game.add.sprite(10, 10, "atlas_2", "flyingThornUp1.png");
        this.rocket.animations.add("fly", [
            "flyingThornUp2.png",
            "flyingThornUp3.png"
        ], 12, true);

        this.game.physics.arcade.enable(this.rocket);
        this.rocket.body.immovable = true;

        this.rocket.body.setSize(32, 20, 0, 6);

        this.rocket.animations.play("fly");

        this.count = 0;

    },

    update: function () {
        this.count++;
        if (this.count >= 200) {
            this.rocket.animations.stop();
        } 

        
        // TODO подумать о коллизиях со взрывом
        //this.game.physics.arcade.overlap(this.player, this.explosionSprites, AdslJumper.gameFunc.trapHandler, null, this);

    },
    
    render: function () {
        this.game.debug.text("state: test ", 8, 24, "#00ff00");

        this.game.debug.body(this.rocket);
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

function dropThorn0(trigger) {
    if (trigger._killAfterInteract) {
        trigger.kill();
    }
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
    if (trigger._killAfterInteract) {
        trigger.kill();
    }
    if (tryCount === 2 ) {
        this.thorn4.body.gravity.y = 1900;
    }
}

function dropThorn1(trigger) {
    if (trigger._killAfterInteract) {
        trigger.kill();
    }
    this.thorn1.body.gravity.y = 1900;
}

function dropThorn2(trigger) {
    if (trigger._killAfterInteract) {
        trigger.kill();
    }
    this.thorn2.body.gravity.y = 1800;
}

