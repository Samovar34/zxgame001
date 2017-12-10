//@@include('./options.js')

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
        game.load.tilemap('map', 'assets/levels/layout1.csv', null, Phaser.Tilemap.CSV);
        game.load.image('tiles', 'assets/images/tilemap.png');
        game.load.image("player", "/assets/images/player.png");

    },
    create: function () {
        game.state.start("PlayGame");
    }
};

var playGame = function (game) {};
playGame.prototype = {
    // main state functions
    create: function () {
        // state variables
        this.canJump = true;
        this.canDoubleJump = false;

        // game objects
        this.map = game.add.tilemap("map", 16, 16);
        this.map.addTilesetImage("tiles");
        this.map.setCollision([0, 1, 2, 3, 4, 5, 6, 7]);
        
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();

        // player
        player = game.add.sprite(80, 80, "player");
        player._direction = true;
        player.anchor.setTo(0.5);
        player.scale.setTo(1);
        player.smoothed = false;
        
        // enable physics for the player
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = gameOptions.player.gravity;
        player.body.velocity.x = gameOptions.player.speed;
        player.body.collideWorldBounds = true;

        // enable input
        leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rigthButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        jumpButton2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        runButton = game.input.keyboard.addKey(Phaser.Keyboard.L);
    },

    update: function () {
        // reset values
        this.setDefaultValues();
        var self = this;
        var curXVelocity = 0;

        // physics
        game.physics.arcade.collide(player, this.layer, function (p, tile) {
            // if player hit something, no double jump is allowed
            self.canDoubleJump = false;
            
            if (p.body.blocked.down) {
                self.canJump = true;
            }
        }, null, this);

        // handle input
        // TODO не равнозначный ввод left right
        if (leftButton.isDown) {
            // TODO вынести в отдельный класс Player
            player._direction = false;
            if (runButton.isDown) {
                curXVelocity -= gameOptions.player.runSpeed;
            } else {
                curXVelocity -= gameOptions.player.speed;
            }
        }

        if (rigthButton.isDown) {
            // TODO вынести в отдельный класс Player
            player._direction = true;
            if (runButton.isDown) {
                curXVelocity += gameOptions.player.runSpeed;
            } else {
                curXVelocity += gameOptions.player.speed;
            }
        }

        player.body.velocity.x = curXVelocity;

        // TODO вынести в отдельный класс Player
        if (player._direction) {
            player.scale.setTo(1, 1);
        } else {
            player.scale.setTo(-1, 1);
        }

        // jump without checking
        if (jumpButton.justDown || jumpButton2.justDown) {
            this.handleJump();
        }
    },

    render: function () {

    },

    // custom state functions
    setDefaultValues: function () {
        player.body.velocity.x = 0;
        player.body.gravity.y = gameOptions.player.gravity;
    },

    setPlayerXVelocity: function (defaultDirection) {
        
    },

    handleJump: function () {
        if (this.canJump && player.body.blocked.down) {
            player.body.velocity.y= gameOptions.player.jump * -1;

            // запретить обычный прыжок и разрешить двойной
            this.canJump = false;
            this.canDoubleJump = true;
        } else {
            if (this.canDoubleJump) {
                this.canDoubleJump = false;
                player.body.velocity.y = gameOptions.player.doubleJump * -1;
            }
        }
    }
};
