AdslJumper.playGameState = function (game) {};

// TODO убрать из глобальной видимости
var level = 1;
var score = 0;

AdslJumper.playGameState.prototype = {
    // main state functions
    create: function () {
        // TODO delete
        this.collectedCoins = 0;
        this.totalLevelCoins = 0;

        this.input = new AdslJumper.Input(game);

        //sounds
        this.closeDoorSound = this.game.add.sound("closeDoor");
        this.getCoinSound = this.game.add.sound("getCoin");
        this.getCoinSound.volume = 0.5;

        //bg
        this.bg001 = this.addBackGround("bg001");

        // game objects
        this.map = game.add.tilemap("map" + level, 16, 16);
        this.map.addTilesetImage("collision", "tilemap");
        // create layers
        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        this.bacgroundLayer.setScale(2, 2);
        this.bacgroundLayer.smoothed = false;
        this.collisionLayer = this.map.createLayer("collisionLayer");
        this.collisionLayer.setScale(2, 2);
        this.collisionLayer.smoothed = false;

        this.map.setCollisionBetween(1, 2000, true, "collisionLayer");
        
        // resize game world to match layer dimensions
        this.collisionLayer.resizeWorld();
        this.bacgroundLayer.resizeWorld();

        // create coins group and add to game world
        this.createCoins();
        this.createDoors();

        // create particles
        this.em = this.game.add.emitter(0, 0, 12);
        this.em.makeParticles("sparks", [0]);
        var particleSpeed = 250;
        this.em.minParticleSpeed.setTo(-particleSpeed, -particleSpeed);
        this.em.maxParticleSpeed.setTo(particleSpeed, particleSpeed);
        this.em.gravity = 0;

        // create player
        var playerStartPosition = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objectsLayer');
        player = this.player = new AdslJumper.Player(game, this.input, playerStartPosition[0].x * 2,  playerStartPosition[0].y * 2);
        this.player.canInput = false;

        // show secret ways
        this.hiddenLayer = this.map.createLayer("hiddenLayer");

        // camera
        this.game.camera.follow(player,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);
        this.game.camera.flash(0x000000, gameOptions.cameraFlashTime);
        this.game.camera.onFlashComplete.addOnce(function () {
            console.log("go");
            this.player.canInput = true;
        })
    },

    update: function () {
        // // physics
        game.physics.arcade.collide(this.player, this.collisionLayer);
        game.physics.arcade.overlap(this.player, this.coins, this.playerCoinsHandler, null, this);
        game.physics.arcade.overlap(this.player, this.exitDoor, this.playerExitDoorHandler, null, this);

        // move bg
        this.moveBackGround(this.bg001);
    },

    render: function () {
        this.game.debug.text("score: " + score, 220, 12, "#ffffff");
        this.game.debug.text("room: " + level, 8, 12, "#00ff00");
        this.game.debug.text("coins: " + this.collectedCoins + "/" + this.totalLevelCoins, 8, 27, "#00ff00");


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
        coin.smoothed = false;
        coin.scale.setTo(2);
        coin.position = {x: coin.position.x *2, y: coin.position.y * 2};
        coin.animations.add("rotate", [0, 1, 2, 3, 4], 12, true);
        coin.animations.play("rotate");
        game.add.tween(coin).to({y: coin.y + 6 * 2}, 500, Phaser.Easing.Linear.None, true, 0 , 1000, true);
    });

    this.totalLevelCoins = this.coins.length;
};

AdslJumper.playGameState.prototype.createDoors = function () {
    // get info about doors
    var enterDoorTiledObject = AdslJumper.utils.findObjectsByType('enterDoor', this.map, 'objectsLayer');
    var exitDoorTiledObject = AdslJumper.utils.findObjectsByType('exitDoor', this.map, 'objectsLayer');

    // create enter Door
    this.enterDoor = this.game.add.sprite(enterDoorTiledObject[0].x *2, (enterDoorTiledObject[0].y - 24) * 2, "door");
    this.enterDoor.scale.setTo(2);
    this.enterDoor.smoothed = false;
    this.enterDoor.animations.add("close", [5, 4, 3, 2, 1, 0], 10);

    this.closeDoorSound.play();
    this.enterDoor.animations.play("close");

    // create exit Door
    this.exitDoor = new AdslJumper.ExitDoor(this.game, exitDoorTiledObject[0].x * 2, (exitDoorTiledObject[0].y - 24) * 2, exitDoorTiledObject[0].properties.nextLevel);
}

// create background Sprite
// textureName String - имя текстуры из кэша Phaser
// return sprite
AdslJumper.playGameState.prototype.addBackGround = function (textureName) {
    var sprite = this.game.add.sprite(0, 0, textureName);
    sprite.scale.setTo(2);
    sprite.smoothed = false;
    sprite.fixedToCamera = true;

    var child = sprite.addChild(this.game.make.sprite(227, 99, "killHuman"));
    child.smoothed = false;
    child.animations.add("default", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 9, 10, 9, 10, 9], 2, true);
    child.animations.play("default");

    return sprite;
};

// move background image
// image Phaser.Sprite
// paralax effect
AdslJumper.playGameState.prototype.moveBackGround = function (image) {
    image.cameraOffset = {x: Math.round(-1 * this.game.camera.x/2), y: Math.round(-1 * this.game.camera.y/2)};
};

AdslJumper.playGameState.prototype.playerCoinsHandler = function (player, coin) {
    // flag to destroy next update
    coin.pendingDestroy = true;
    
    this.getCoinSound.play();

    this.em.x = coin.x + 5;
    this.em.y = coin.y + 5;
    this.em.start(true, 60, 20, 8, 100);


    // TODO get position of coin and add effect

    this.collectedCoins++;
    score += 10;

    if (this.collectedCoins >= this.totalLevelCoins) {
        this.exitDoor.open();
    }
};

AdslJumper.playGameState.prototype.playerExitDoorHandler = function (player, door) {
    if (door.isOpen) {
        // запретить управление пользователем
        this.player.canInput = false;
        this.player.comeIn();

        console.log(door.position);

        // Скрыть игрока
        this.player.kill();
        door.animations.play("close");

        // TODO проиграть анимация захода персонажа в дверь
        // TODO сделать так что бы она закрывалась вместе с ним ( а может и не надо)
        this.game.camera.fade(0x000000, gameOptions.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(function() {
            // TODO level global variable
            // set AdslJumper variable
            level = door.nextLevel;
            this.game.state.start(this.game.state.current);
        }, this);
    }
};