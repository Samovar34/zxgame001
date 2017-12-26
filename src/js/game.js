var AdslJumper = {};

//@@include('./options.js')
//@@include('./input.js')
//@@include('./player.js')

var game;
var player;
var cursors;
var rigthButton, leftButton, jumpButton, jumpButton2, runButton;
var debugInfo = {};

window.onload = function () {
    // 480x270
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
        // game objects
        this.map = game.add.tilemap("map", 32, 32);
        this.map.addTilesetImage("tiles");
        this.map.setCollision([0, 1, 2, 3, 4, 5, 6, 7]);
        
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();

        player = this.player = new AdslJumper.Player(game, this.input, 288, 95);

        // camera
        //game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1);
    },

    update: function () {
        // // physics
        game.physics.arcade.collide(this.player, this.layer);
    },

    render: function () {
        // col 1
        this.game.debug.text("input_left: " + this.input.leftIsDown(), 32, 32);
        this.game.debug.text("input_right: " + this.input.rightIsDown(), 32, 52);
        this.game.debug.text("input_jump: " + this.input.jumpIsJustDown(), 32, 72);
        this.game.debug.text("blocked down: " + this.player.body.blocked.down, 32, 92);
        this.game.debug.text("onWall: " + (this.player.body.blocked.left || this.player.body.blocked.right), 32, 112);
        this.game.debug.text("speed(x;y): " + this.player.body.velocity.x  + ";" + this.player.body.velocity.y , 32, 132);
        this.game.debug.text("state: " + this.player.currentState.name, 32, 152);
        
        // col 2
        this.game.debug.text("wasOnGround: " + this.player.wasOnGround, 250, 32);
        this.game.debug.text("groundDelayTimer: " + this.player.groundDelayTimer, 250, 52);
        this.game.debug.text("canDoubleJump: " + this.player.canDoubleJump, 250, 72);
        this.game.debug.text("wallBreakClock: " + this.player.wallBreakClock, 250, 92);
    }
};
