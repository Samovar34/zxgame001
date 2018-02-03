AdslJumper.playGameState = function (game) {};

// TODO убрать из глобальной видимости
var level = 1;
var score = 0;
var currentTrack;

AdslJumper.playGameState.prototype = {
    // main state functions
    create: function () {
        // main variables
        this.paralacsFactor = gameOptions.paralacsFactor;

        // TODO delete
        this.collectedCoins = 0;
        this.totalLevelCoins = 0;
        this.canCheckOverlapExitDoor = false;

        this.input = new AdslJumper.Input(game);

        //sounds
        this.closeDoorSound = this.game.add.sound("closeDoor");
        this.getCoinSound = this.game.add.sound("getCoin");
        this.getCoinSound.volume = gameOptions.sound.sfx * 0.75;
        this.playerDeathSound = this.game.add.sound("playerDeath");

        // music
        if (!currentTrack) {
            currentTrack = this.game.add.audio('track01');
            currentTrack.loopFull(gameOptions.sound.musicVolume);
        }

        //bg
        this.bg001 = this.addBackGround("bg001");

        // game objects
        this.map = game.add.tilemap("map" + level, 32, 32);
        this.map.addTilesetImage("collision", "tilemap");
        // create layers
        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        this.bacgroundLayer.smoothed = false;
        this.collisionLayer = this.map.createLayer("collisionLayer");
        this.collisionLayer.smoothed = false;

        this.map.setCollisionBetween(0, 2000, true, "collisionLayer");
        
        // resize game world to match layer dimensions
        this.collisionLayer.resizeWorld();
        this.bacgroundLayer.resizeWorld();

        // create coins group and add to game world
        this.createCoins();
        this.createDoors();
        this.createTraps();

        // create particles
        this.em = this.game.add.emitter(0, 0, 48);
        this.em.makeParticles("sparks", [1]);
        this.em.minRotation = 0;
        this.em.maxRotation = 0;
        this.em.minParticleScale = 1;
        this.em.maxParticleScale = 2;
        this.em.minParticleSpeed.setTo(-gameOptions.particleSpeed, -gameOptions.particleSpeed);
        this.em.maxParticleSpeed.setTo(gameOptions.particleSpeed, gameOptions.particleSpeed);
        this.em.gravity = 1000;

        // create player
        var playerStartPosition = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objectsLayer');
        player = this.player = new AdslJumper.Player(game, this.input, playerStartPosition[0].x + 16,  playerStartPosition[0].y + 15);
        this.player.canInput = false;

        // show secret ways
        this.hiddenLayer = this.map.createLayer("hiddenLayer");
            
        // blood
        this.blood = this.game.add.emitter(0, 0, 200);
        this.blood.makeParticles('blood', [0, 1]);
        this.blood.minRotation = 0;
        this.blood.maxRotation = 0;
        this.blood.minParticleScale = 0.0625;
        this.blood.maxParticleScale = 0.5;
        // this.blood.minParticleSpeed.setTo(-gameOptions.particleSpeed * 0.25, -gameOptions.particleSpeed * 0.25);
        // this.blood.maxParticleSpeed.setTo(gameOptions.particleSpeed * 1.25, gameOptions.particleSpeed * 1.25);
        this.blood.setYSpeed(-gameOptions.particleSpeed * 1.5, gameOptions.particleSpeed/10);
        this.blood.setXSpeed(-gameOptions.particleSpeed, gameOptions.particleSpeed);
        this.blood.gravity = 1500;

        // camera
        this.game.camera.follow(player,  this.game.camera.FOLLOW_PLATFORMER, 0.12, 0.12);
        this.game.camera.flash(0x000000, gameOptions.cameraFlashTime);
        this.player.canInput = true;
        // this.game.camera.onFlashComplete.addOnce(function () {
        //     this.player.canInput = true;
        // })
    },

    update: function () {
        // // physics
        game.physics.arcade.collide(this.player, this.collisionLayer);
        game.physics.arcade.overlap(this.player, this.thorns, this.trapHandler, null, this);
        
        // if player collected all coins check overlap or check overlap with coins
        if (this.canCheckOverlapExitDoor == true) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.playerExitDoorHandler, null, this);
        } else {
            game.physics.arcade.overlap(this.player, this.coins, this.playerCoinsHandler, null, this);
        }

    },

    render: function () {
        // move bg
        this.moveBackGround(this.bg001);

        this.game.debug.text("score: " + score, 220, 12, "#ffffff");
        this.game.debug.text("room: " + level, 8, 12, "#00ff00");
        this.game.debug.text("coins: " + this.collectedCoins + "/" + this.totalLevelCoins, 8, 27, "#00ff00");
        // this.game.debug.body(this.exitDoor);
        // this.game.debug.body(this.player);

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
        coin.scale.setTo(gameOptions.scaleFactor);
        coin.position = {x: coin.position.x, y: coin.position.y};
        coin.animations.add("rotate", [0, 1, 2, 3, 4], 12, true);
        coin.animations.play("rotate");
        game.add.tween(coin).to({y: coin.y + 16}, 500, Phaser.Easing.Linear.None, true, 0 , 1000, true);
    });

    this.totalLevelCoins = this.coins.length;
};

AdslJumper.playGameState.prototype.createDoors = function () {
    // get info about doors
    var enterDoorTiledObject = AdslJumper.utils.findObjectsByType('enterDoor', this.map, 'objectsLayer');
    var exitDoorTiledObject = AdslJumper.utils.findObjectsByType('exitDoor', this.map, 'objectsLayer');

    // create enter Door
    this.enterDoor = this.game.add.sprite(enterDoorTiledObject[0].x, (enterDoorTiledObject[0].y - 48) * gameOptions.scaleFactor, "door");
    this.enterDoor.scale.setTo(gameOptions.scaleFactor);
    this.enterDoor.smoothed = false;
    this.enterDoor.animations.add("close", [5, 4, 3, 2, 1, 0], 10);

    this.closeDoorSound.play();
    this.enterDoor.animations.play("close");

    // create exit Door
    this.exitDoor = new AdslJumper.ExitDoor(this.game, exitDoorTiledObject[0].x, (exitDoorTiledObject[0].y - 48) * gameOptions.scaleFactor, exitDoorTiledObject[0].properties.nextLevel);
}

// create background Sprite
// textureName String - имя текстуры из кэша Phaser
// return sprite
AdslJumper.playGameState.prototype.addBackGround = function (textureName) {
    var sprite = this.game.add.sprite(0, 0, textureName);
    sprite.scale.setTo(gameOptions.scaleFactor);
    sprite.smoothed = false;
    sprite.fixedToCamera = true;

    var child = sprite.addChild(this.game.make.sprite(454, 198, "killHuman"));
    child.smoothed = false;
    child.animations.add("default", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 9, 10, 9, 10, 9], 2, true);
    child.animations.play("default");

    return sprite;
};

// move background image
// image Phaser.Sprite
// paralax effect
AdslJumper.playGameState.prototype.moveBackGround = function (image) {
    image.cameraOffset = {x: Math.round(-this.paralacsFactor.x * this.game.camera.x), y: Math.round(-this.paralacsFactor.y  * this.game.camera.y)};
};

AdslJumper.playGameState.prototype.playerCoinsHandler = function (player, coin) {
    // flag to destroy next update
    coin.pendingDestroy = true;
    
    this.getCoinSound.play();

    this.em.x = coin.x + 15 * gameOptions.scaleFactor;
    this.em.y = coin.y + 15 * gameOptions.scaleFactor;
    this.em.start(true, 100, 20, 24, 100);


    // TODO get position of coin and add effect

    this.collectedCoins++;
    score += 10;

    if (this.collectedCoins >= this.totalLevelCoins) {
        this.canCheckOverlapExitDoor = true;
        this.exitDoor.open();
    }
};

AdslJumper.playGameState.prototype.trapHandler = function (player, trap) {
    var offsetX = 0;
    var offsetY = 0;

    if (trap.name == "movableThornRight") {
        if (trap.frame == 0 || trap.frame == 1) {
            return;
        } else {

        }
    } else {
        // Static Thorn
        // thornUp
        if (trap.frame == 0) {
            offsetY = 12;
        } else if (trap.frame == 6) {
            // thornRight
            offsetY = -12;
        } else if (trap.frame == 12) {
            // thornDown
            offsetX = -12;
        } else {
            // thornUp
            offsetX = 12;
        } 
    }

    this.game.camera.unfollow();
    
    // player dies
    player.pendingDestroy = true;

    // play sound
    this.playerDeathSound.play();

    // start lava splash
    this.blood.x = player.x + offsetX;
    this.blood.y = player.y + offsetY;
    this.blood.start(true, 2200, null, 60, 100);

    var a = this.game.add.sprite(this.blood.x, this.blood.y, "player");
    a.anchor.setTo(0.5);
    a.animations.add("death", [15, 16, 17, 18, 19, 20], gameOptions.player.deathAnimationSpeed);
    var aa = a.animations.play("death");
    aa.onComplete.addOnce(function () {
        a.kill();
    }, this);

    this.game.camera.shake(0.004, 1200);
    this.game.camera.onShakeComplete.addOnce(function() {
        // restart level after camera shake
        this.game.camera.fade(0x000000, gameOptions.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(function() {
            // restart current state
            this.game.state.start(this.game.state.current);
        }, this);
      }, this);
};

AdslJumper.playGameState.prototype.createTraps = function () {
    this.thorns = this.game.add.group();
    // this.thorns.enableBody = true;
    // this.thorns.enableBodyDebug = true;
    var thorns = AdslJumper.utils.findObjectsByType('thornUp', this.map, 'objectsLayer');
    var curThorn;
    for (var i = 0; i < thorns.length; i++) {
        curThorn = this.game.add.sprite(thorns[i].x, thorns[i].y, "thorn");
        curThorn.frame = 0;
        this.game.physics.arcade.enable(curThorn);
        curThorn.body.immovable = true;
        curThorn.body.setSize(32, 20, 0, 12);
        this.thorns.add(curThorn);
    }

    thorns = AdslJumper.utils.findObjectsByType('thornDown', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        curThorn = this.game.add.sprite(thorns[i].x, thorns[i].y, "thorn");
        curThorn.frame = 12;
        this.game.physics.arcade.enable(curThorn);
        curThorn.body.immovable = true;
        curThorn.body.setSize(32, 20, 0, 0);
        this.thorns.add(curThorn);
    }

    thorns = AdslJumper.utils.findObjectsByType('thornLeft', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        curThorn = this.game.add.sprite(thorns[i].x, thorns[i].y, "thorn");
        curThorn.frame = 18;
        this.game.physics.arcade.enable(curThorn);
        curThorn.body.immovable = true;
        curThorn.body.setSize(20, 22, 12, 5);
        this.thorns.add(curThorn);
    }

    thorns = AdslJumper.utils.findObjectsByType('thornRight', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        curThorn = this.game.add.sprite(thorns[i].x, thorns[i].y, "thorn");
        curThorn.frame = 6;
        this.game.physics.arcade.enable(curThorn);
        curThorn.body.immovable = true;
        curThorn.body.setSize(20, 28, 12, 2);
        this.thorns.add(curThorn);
    }

    thorns = AdslJumper.utils.findObjectsByType('movableThornRight', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        curThorn = this.game.add.sprite(thorns[i].x, thorns[i].y, "movableThorn");
        curThorn.frame = 0;
        curThorn.name = "movableThornRight";
        this.game.physics.arcade.enable(curThorn);
        curThorn.body.immovable = true;
        curThorn.body.setSize(20, 20, 32, 6);
        curThorn.animations.add("default", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 7, 6, 6, 6, 7, 6, 7, 6, 7, 5, 4, 3, 2], 10, true);
        curThorn.animations.play("default");
        this.thorns.add(curThorn);
    }
    
    
};

AdslJumper.playGameState.prototype.playerExitDoorHandler = function (player, door) {
    if (door.isOpen) {
        // запретить управление пользователем
        this.player.canInput = false;
        this.player.comeIn();

        // Скрыть игрока
        this.player.kill();
        door.animations.play("close");

        // camera
        this.game.camera.follow(door,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);

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