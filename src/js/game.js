//@@include('./options.js')

var game;
var player;
var cursors;

window.onload = function () {
    // 480x270
    // 960x540
    // 1280×720
    // 1600×900
    // 1920×1080
    game = new Phaser.Game(480, 270, Phaser.AUTO);
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
        this.onWall = false; // player on wall (true/false)

        // game objects
        this.map = game.add.tilemap("map", 16, 16);
        this.map.addTilesetImage("tiles");
        this.map.setCollision([0, 1, 2, 3, 4, 5, 6, 7]);
        
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();

        // player
        player = game.add.sprite(80, 80, "player");
        player.anchor.setTo(0.5);
        player.scale.setTo(0.5);
        player.smoothed = false;
        
        // enable physics for the player
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = gameOptions.player.gravity;
        player.body.velocity.x = gameOptions.player.speed;

        // enable input
        cursors = game.input.keyboard.createCursorKeys();
    },

    update: function () {
        // reset values
        this.setDefaultValues();
        var self = this;

        // physics
        game.physics.arcade.collide(player, this.layer, function (p, tile) {
            // if player hit something, no double jump is allowed
            self.canDoubleJump = false;
            
            if (p.body.blocked.down) {
                self.canJump = true;
            }
        });

        // handle input
        // TODO не равнозначный ввод left right
        if (cursors.left.isDown) {
            player.body.velocity.x = gameOptions.player.speed * -1;
        }

        if (cursors.right.isDown) {
            player.body.velocity.x = gameOptions.player.speed;
        }

        // jump without checking
        if (cursors.up.justDown) {
            this.handleJump();
        }
    },

    // custom state functions
    setDefaultValues: function () {
        player.body.velocity.x = 0;
    },

    setPlayerXVelocity: function (defaultDirection) {
        
    },

    handleJump: function () {
        console.log("DO");
        if ((this.canJump && player.body.blocked.down) || this.onWall) {
            console.log("FIRST");
            player.body.velocity.y= gameOptions.player.jump * -1;

            // запретить обычный прыжок и разрешить двойной
            this.canJump = false;
            this.canDoubleJump = true;
        } else {
            if (this.canDoubleJump) {
                console.log("DOUBLE");
                this.canDoubleJump = false;
                player.body.velocity.y = gameOptions.player.doubleJump * -1;
            }
        }
    }
};
