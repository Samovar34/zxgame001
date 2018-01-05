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
        game.load.tilemap('map', 'assets/levels/hd.csv', null, Phaser.Tilemap.CSV);
        game.load.image('tiles', 'assets/images/tilemap.png');
        game.load.image("player", "/assets/images/player.png");
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
        this.bg001 = game.add.sprite(-10, -10, "bg001");
        this.bg001.smoothed = false;

        // game objects
        this.map = game.add.tilemap("map", 16, 16);
        this.map.addTilesetImage("tiles");
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

        player = this.player = new AdslJumper.Player(game, this.input, 288, 95);

        // camera
        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.25, 0.25);
    },

    update: function () {
        // // physics
        game.physics.arcade.collide(this.player, this.layer);

        if (isTestFeatures) {
            // move bg
            var x = this.player.x/game.width;
            var y = this.player.y/game.height;

            x = (-10 + x * 10) * -1;
            y = (-10 + y * 10) * -1;

            this.bg001.x = x;
            this.bg001.y = y;
        }
    },

    render: function () {
        if (isDevelopment) {
            // col 1
            this.game.debug.text("input_left: " + this.input.leftIsDown(), 8, 12, "#00ff00");
            this.game.debug.text("input_right: " + this.input.rightIsDown(), 8, 27, "#00ff00");
            this.game.debug.text("input_jump: " + this.input.jumpIsJustDown(), 8, 42, "#00ff00");
            this.game.debug.text("blocked down: " + this.player.body.blocked.down, 8, 57, "#00ff00");
            this.game.debug.text("onWall: " + (this.player.body.blocked.left || this.player.body.blocked.right), 8, 72, "#00ff00");
            this.game.debug.text("speed(x;y): " + Math.round(this.player.body.velocity.x)  + ";" + Math.round(this.player.body.velocity.y) , 8, 87, "#00ff00");
            this.game.debug.text("state: " + this.player.currentState.name, 8, 102, "#00ff00");

            // col 2
            this.game.debug.text("wasOnGround: " + this.player.wasOnGround, 220, 12);
            this.game.debug.text("groundDelayTimer: " + this.player.groundDelayTimer, 220, 27);
            this.game.debug.text("canDoubleJump: " + this.player.canDoubleJump, 220, 42);
            this.game.debug.text("wallBreakClock: " + this.player.wallBreakClock, 220, 57);
            this.game.debug.text("drag: " + this.player.body.drag.x, 220, 72);
            this.game.debug.text("accel: " + this.player.body.acceleration.x, 220, 87);
            this.game.debug.text("settable: " + this.player.settable, 220, 102);
        }
        
    }
};
