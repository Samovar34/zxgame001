AdslJumper.playGameState = function (game) {};
AdslJumper.playGameState.prototype = {
    // main state functions
    create: function () {
        this.input = new AdslJumper.Input(game);
        //bg
        this.bg001 = game.add.sprite(0, -40, "bg001");
        this.bg001.smoothed = false;
        this.bg001.fixedToCamera = true;

        // game objects
        this.map = game.add.tilemap("map1", 16, 16);
        this.map.addTilesetImage("collision", "tilemap");
        // create layers
        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        this.collisionLayer = this.map.createLayer("collisionLayer");

        this.map.setCollisionBetween(1, 2000, true, "collisionLayer");
        
        // resize game world to match layer dimensions
        this.bacgroundLayer.resizeWorld();

        // TODO delete
        var coin;
        for (var i = 0; i < 10; i++) {
            coin = game.add.sprite(64 + i * 32, 300, "coin");
            coin.anchor.setTo(0.5, 0.5);
            coin.smoothed = false;
            coin.animations.add("rotate");
            coin.animations.play("rotate", 12,  true);
            game.add.tween(coin).to({y: coin.y + 10}, 600, Phaser.Easing.Linear.None, true, 0 , 1000, true);
        }

        player = this.player = new AdslJumper.Player(game, this.input, 50,  330); // old 288 95; 288 595

        // camera
        game.camera.follow(player);
    },

    update: function () {
        // // physics
        game.physics.arcade.collide(this.player, this.collisionLayer);

        if (gameOptions.isFeatures) {
            // move bg
            var x = game.camera.x;
            var y = game.camera.y;

            this.bg001.cameraOffset = {x: Math.round(x/40 * -1), y: Math.round(-10 + y/30)};
        }
    },

    render: function () {
        if (gameOptions.isDevelopment) {
            // col 1
            this.game.debug.text("input_left: " + this.input.leftIsDown(), 8, 12, "#00ff00");
            this.game.debug.text("input_right: " + this.input.rightIsDown(), 8, 27, "#00ff00");
            this.game.debug.text("input_jump: " + this.input.jumpIsJustDown(), 8, 42, "#00ff00");
            this.game.debug.text("blocked down: " + this.player.body.blocked.down, 8, 57, "#00ff00");
            this.game.debug.text("onWall: " + (this.player.body.blocked.left || this.player.body.blocked.right), 8, 72, "#00ff00");
            this.game.debug.text("speed(x;y): " + (this.player.body.velocity.x).toFixed(2)  + ";" + Math.round(this.player.body.velocity.y) , 8, 87, "#00ff00");
            this.game.debug.text("state: " + this.player.currentState.name, 8, 102, "#00ff00");

            // col 2
            this.game.debug.text("wasOnGround: " + this.player.wasOnGround, 220, 12);
            this.game.debug.text("groundDelayTimer: " + this.player.groundDelayTimer, 220, 27);
            this.game.debug.text("canDoubleJump: " + this.player.canDoubleJump, 220, 42);
            this.game.debug.text("wallBreakClock: " + this.player.wallBreakClock, 220, 57);
            this.game.debug.text("drag: " + this.player.body.drag.x, 220, 72);
            this.game.debug.text("accel: " + this.player.body.acceleration.x, 220, 87);
            this.game.debug.text("settable: " + this.player.settable, 220, 102);
            this.game.debug.text("cam: " + game.camera.x + ";" + game.camera.y, 220, 117);
        }
        
    }
};