AdslJumper.playGameState = function (game) {};
AdslJumper.playGameState.prototype = {
    // main state functions
    create: function () {
        this.input = new AdslJumper.Input(game);
        //bg
        this.bg001 = this.addBackGround("bg001");

        // game objects
        this.map = game.add.tilemap("map1", 16, 16);
        this.map.addTilesetImage("collision", "tilemap");
        // create layers
        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        this.collisionLayer = this.map.createLayer("collisionLayer");

        this.map.setCollisionBetween(1, 2000, true, "collisionLayer");
        
        // resize game world to match layer dimensions
        this.bacgroundLayer.resizeWorld();

        // create coins group and add to game world
        this.createCoins();

        // create player
        var objects = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objectsLayer');
        player = this.player = new AdslJumper.Player(game, this.input, objects[0].x,  objects[0].y);

        // camera
        game.camera.follow(player);
    },

    update: function () {
        // // physics
        game.physics.arcade.collide(this.player, this.collisionLayer);

        // move bg
        this.moveBackGround(this.bg001);
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

// создаёт на карте монеты
// return void 
AdslJumper.playGameState.prototype.createCoins = function () {
    this.coins = this.game.add.group();
    this.coins.enableBody = true;

    var result = AdslJumper.utils.findObjectsByType("coin", this.map, "objectsLayer");
    result.forEach(function (element) {
        AdslJumper.utils.createFromTileObject(element, this.coins);
    }, this);

    // add tween animation for every coin
    this.coins.forEach(function (coin) {
        game.add.tween(coin).to({y: coin.y + 6}, 600, Phaser.Easing.Linear.None, true, 0 , 1000, true);
    });
};

// create background Sprite
// return sprite
AdslJumper.playGameState.prototype.addBackGround = function (textureName) {
    var sprite = this.game.add.sprite(0, -40, textureName);
    sprite.smoothed = false;
    sprite.fixedToCamera = true;
    return sprite;
};

// move background image
// paralax effect
AdslJumper.playGameState.prototype.moveBackGround = function (image) {
    image.cameraOffset = {x: Math.round(this.game.camera.x/40 * -1), y: Math.round(-10 + this.game.camera.y/30)};
};