AdslJumper.playGameState = function (game) {};

// TODO убрать из глобальной видимости
var level = 1;
var score = 0;
var currentTrack;

AdslJumper.playGameState.prototype = {
    // main state functions
    create: function () {
        
        // game options
        this.options = AdslJumper.gameOptions.getMainOptions();

        // TODO delete
        this.collectedCoins = 0;
        this.totalLevelCoins = 0;
        this.canCheckOverlapExitDoor = false;
        
        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.modules.gameObjectFactory;

        // music
        if (!this.soundManager.currentTrack) {
            this.soundManager.setTrack("track01");
            this.soundManager.playTrack();
        }

        //bg
        this.background = this.gameObjectFactory.createBackGround01();

        // game objects
        this.map = game.add.tilemap("map" + level, 32, 32);
        this.map.addTilesetImage("collision", "tilemap");
        // create layers

        this.collisionLayer = this.map.createLayer("collisionLayer");
        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        

        this.map.setCollisionBetween(0, 2000, true, this.collisionLayer);
        
        // resize game world to match layer dimensions
        this.collisionLayer.resizeWorld();
        this.bacgroundLayer.resizeWorld();

        // create coins group and add to game world
        this.createCoins();
        this.createDoors();
        this.createTraps();

        // game layers
        this.game.layers = {
            player: this.game.add.group(),
            foreground: this.game.add.group(),
            fx: this.game.add.group(),
            ui: this.game.add.group()
        };

        // create particles
       //this.sparks = this.gameObjectFactory.createSparks();

        // create player
        var playerStartPosition = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objectsLayer');
        player = this.player = new AdslJumper.Player(game, this.input, playerStartPosition[0].x + 16,  playerStartPosition[0].y + 15);

        // show secret ways
        this.hiddenLayer = this.map.createLayer("hiddenLayer");
            
        // blood
        this.blood = this.gameObjectFactory.createBloodParticles();
        this.game.layers.fx.add(this.blood);
        
        this.meatBlowSprite = this.gameObjectFactory.createMeatBlowSprite(0, 0);
        this.game.layers.player.add(this.meatBlowSprite);
        this.meatBlowSprite.kill();

        // camera
        this.game.camera.follow(player,  this.game.camera.FOLLOW_PLATFORMER, 0.12, 0.12);
        this.game.camera.flash(0x000000, this.options.cameraFlashTime);
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
        // move bg
        this.moveBackGround(this.background);
    },

    render: function () {
        // move bg
        //this.moveBackGround(this.background);

        // this.game.debug.text("score: " + score, 220, 12, "#ffffff");
        // this.game.debug.text("room: " + level, 8, 12, "#00ff00");
        // this.game.debug.text("coins: " + this.collectedCoins + "/" + this.totalLevelCoins, 8, 27, "#00ff00");
        // this.game.debug.body(this.exitDoor);
        // this.game.debug.body(this.player);        
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
        coin.position = {x: coin.position.x, y: coin.position.y};
        coin.animations.add("rotate", [0, 1, 2, 3, 4, 5], 8, true);
        coin.animations.add("collected", [6, 7, 8, 9, 10, 12, 11, 10, 12]);
        coin.animations.play("rotate");
    });

    this.totalLevelCoins = this.coins.length;
};

AdslJumper.playGameState.prototype.createDoors = function () {
    // get info about doors
    var enterDoorTiledObject = AdslJumper.utils.findObjectsByType('enterDoor', this.map, 'objectsLayer');
    var exitDoorTiledObject = AdslJumper.utils.findObjectsByType('exitDoor', this.map, 'objectsLayer');

    // create enter Door
    this.enterDoor = this.game.add.sprite(enterDoorTiledObject[0].x, enterDoorTiledObject[0].y - 48, "door");
    this.enterDoor.smoothed = false;
    this.enterDoor.animations.add("close", [5, 4, 3, 2, 1, 0], 10);

    this.soundManager.playCloseDoor();
    this.enterDoor.animations.play("close");

    // create exit Door
    this.exitDoor = new AdslJumper.ExitDoor(this.game, exitDoorTiledObject[0].x, exitDoorTiledObject[0].y - 48, exitDoorTiledObject[0].properties.nextLevel);
}

// // create background Sprite
// // textureName String - имя текстуры из кэша Phaser
// // return sprite
// AdslJumper.playGameState.prototype.addBackGround = function (textureName) {
//     var sprite = this.game.add.sprite(0, 0, textureName);
//     sprite.scale.setTo(this.options.scaleFactor);
//     sprite.smoothed = false;
//     sprite.fixedToCamera = true;

//     var child = sprite.addChild(this.game.make.sprite(454, 198, "killHuman"));
//     child.smoothed = false;
//     child.animations.add("default", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 9, 10, 9, 10, 9], 2, true);
//     child.animations.play("default");

//     return sprite;
// };

// move background image
// image Phaser.Sprite
// paralax effect
AdslJumper.playGameState.prototype.moveBackGround = function (image) {
    image.cameraOffset = {x: Math.round(this.options.paralacsFactor.x * this.game.camera.x), y: Math.round(this.options.paralacsFactor.y  * this.game.camera.y)};
};

AdslJumper.playGameState.prototype.playerCoinsHandler = function (player, coin) {
    // flag to destroy next update
    //coin.pendingDestroy = true;
    coin.body.enable = false;
    coin.animations.play("collected", 12, false, true);
    
    this.soundManager.playCoin();

    // this.sparks.x = coin.x + 15;
    // this.sparks.y = coin.y + 15;
    // this.sparks.start(true, 256, 20, 12, 100);


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
        if (trap.frame == 0 || trap.frame == 1 || trap.frame == 2) {
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
    this.soundManager.playPlayerDeath();

    // start blood
    this.blood.x = player.x + offsetX;
    this.blood.y = player.y + offsetY;
    this.blood.start(true, 2200, 20, 64, 100);

    this.meatBlowSprite.position.setTo(player.x + offsetX, player.y + offsetY);
    this.meatBlowSprite.revive();
    this.meatBlowSprite.animations.play("default");


    this.game.camera.shake(0.01, this.options.cameraShakeTime);
    this.game.camera.onShakeComplete.addOnce(function() {
        // restart level after camera shake
        this.game.camera.fade(0x000000, this.options.cameraFadeTime);
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
        this.game.camera.fade(0x000000, this.options.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(function() {
            // TODO level global variable
            // set AdslJumper variable
            level = door.nextLevel;
            this.game.state.start(this.game.state.current);
        }, this);
    }
};