var AdslJumper = {};

//@@include('./options.js')
//@@include('./input.js')
//@@include('./player.js')

var game;
var player;
var cursors;
var rigthButton, leftButton, jumpButton, jumpButton2, runButton;
var debugInfo = {};
var isDevelopment = false;
var isTestFeatures = true; // патаму чта так сказал Сашка К.

window.onload = function () {
    // 480x270
    // 640x360
    // 960x540
    // 1280×720
    // 1600×900
    // 1920×1080
    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO);
    game.state.add("PreloadGame", preloadGame);
    game.state.add("PlayGame", playGame);
    game.state.start("PreloadGame");
};

var preloadGame =  function (game) {};
preloadGame.prototype = {
    preload: function () {
        // setup game area
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = gameOptions.bgColor;
        game.renderer.renderSession.roundPixels = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.disableVisibilityChange = true;

        // load assets
        game.load.tilemap('map', 'assets/levels/level_2.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('map1', 'assets/levels/level_3.csv', null, Phaser.Tilemap.CSV);
        game.load.image('tiles', 'assets/images/tilemap.png');
        game.load.image('tiles_hd', 'assets/images/tilemap_hd.png');
        game.load.image("player", "/assets/images/player.png");
        game.load.image("player_hd", "/assets/images/player_hd.png");
        game.load.spritesheet("coin", "/assets/images/coin.png", 16, 16, 6);
        game.load.image("bg001", "/assets/images/back_001.png");
    },
    create: function () {
        game.state.start("PlayGame");
    }
};

var player;

var playGame = function (game) {};
playGame.prototype = {
    // main state functions
    create: function () {
        this.input = new AdslJumper.Input(game);
        //bg
        this.bg001 = game.add.sprite(0, -40, "bg001");
        this.bg001.smoothed = false;
        this.bg001.fixedToCamera = true;

        // game objects
        this.map = game.add.tilemap("map", 16, 16);
        this.map.addTilesetImage("tiles");
        // this.map = game.add.tilemap("map", 64, 64);
        // this.map.addTilesetImage("tiles_hd");
        this.map.setCollision([0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,]);
        
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();

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

        player = this.player = new AdslJumper.Player(game, this.input, 288,  595); // old 288 95; 288 595

        // camera
        game.camera.follow(player);
    },

    update: function () {
        // // physics
        game.physics.arcade.collide(this.player, this.layer);

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
