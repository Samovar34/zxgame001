AdslJumper.playGameState = function (game) {};

AdslJumper.playGameState.prototype = {
    // main state functions
    create: function () {
        // game options
        this.options = AdslJumper.gameOptions.getMainOptions();

        // TODO delete
        this.collectedCoins = 0;
        this.totalLevelCoins = 0;
        this.canCheckOverlapExitDoor = false;

        // get score
        this.currentScore = AdslJumper.data.score;
        
        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.modules.gameObjectFactory;

        // music
        if (!this.soundManager.currentTrack) {
            this.soundManager.setTrack("track01");
            this.soundManager.playTrack();
        }

        // background image or WebGL Shader
        this.background = this.gameObjectFactory.createBackGround01();


        // game world
        this.map = game.add.tilemap("map" + AdslJumper.data.level, 32, 32);
        this.map.addTilesetImage("world_tilemap", "tilemap");
       
        // create layers
        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        this.collisionLayer = this.map.createLayer("collisionLayer");
        
        this.map.setCollisionBetween(0, 2000, true, this.collisionLayer);
        
        // resize game world to match layer dimensions
        this.collisionLayer.resizeWorld();
        this.bacgroundLayer.resizeWorld();

        this.createDoors();

        // foreground layer for FX
        this.foregroundLayer = this.game.add.group();
        this.doorSensor = null;

        // create Fx GameObjects and Particles
        this.explosionSprite = this.gameObjectFactory.createExplosionSprite()
        this.explosionSprite.kill();

        // blood
        this.blood = this.gameObjectFactory.createBloodParticles();

        this.meatBlowSprite = this.gameObjectFactory.createMeatBlowSprite(0, 0);
        this.meatBlowSprite.kill();


        // create Game Objects
        // create coins group and add to game world
        this.createCoins();

        this.createTraps();
        this.createFx();

        // create player
        var playerStartPosition = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objectsLayer');
        player = this.player = new AdslJumper.Player(game, this.input, playerStartPosition[0].x + 16,  playerStartPosition[0].y + 15);

        // show secret ways
        this.hiddenLayer = this.map.createLayer("hiddenLayer");

        // самый верхний слой для визуальных эффектов
        this.topLayer = this.game.add.group();

        // add fx and particals to topLayer
        this.topLayer.add(this.blood);
        this.topLayer.add(this.meatBlowSprite);
        this.topLayer.add(this.explosionSprite);

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
        game.physics.arcade.overlap(this.player, this.traps, this.trapHandler, null, this);
        
        // if player collected all coins check overlap or check overlap with coins
        if (this.canCheckOverlapExitDoor == true) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.exitDoorHandler, null, this);
        } else {
            game.physics.arcade.overlap(this.player, this.coins, this.coinsHandler, null, this);
        }

        // update bg
        this.background._filter.update();
    },

    render: function () {

        this.game.debug.text("room: " + AdslJumper.data.level, 8, 12, "#00ff00");
        this.game.debug.text("coins: " + this.collectedCoins + "/" + this.totalLevelCoins, 8, 27, "#00ff00");
        this.game.debug.text("score: " + this.currentScore, 8, 42, "#00ff00");
        // this.game.debug.body(this.exitDoor);
        // this.game.debug.body(this.player);        
    }
};


// CREATE OBJECTS

// создаёт на карте монеты
// void 
AdslJumper.playGameState.prototype.createCoins = function () {
    this.coins = this.game.add.group();

    AdslJumper.utils.findObjectsByType("coin", this.map, "objectsLayer").forEach(function (element) {
        this.coins.add(new AdslJumper.Coin(this.game, AdslJumper.modules.soundManager, element.x, element.y));
    }, this);

    // play animation
    this.coins.callAll("animations.play", "animations", "rotate");

    this.totalLevelCoins = this.coins.length;
};

// create doors
// void
AdslJumper.playGameState.prototype.createDoors = function () {
    // get info about doors
    var enterDoorTiledObject = AdslJumper.utils.findObjectsByType('enterDoor', this.map, 'objectsLayer');
    var exitDoorTiledObject = AdslJumper.utils.findObjectsByType('exitDoor', this.map, 'objectsLayer');

    // create enter Door
    this.enterDoor = this.game.add.sprite(enterDoorTiledObject[0].x, enterDoorTiledObject[0].y - 28, "door");
    this.enterDoor.animations.add("default", [0, 1], 2, true);
    this.enterDoor.smoothed = false;
    this.enterDoor.animations.play("default");
    

    //this.soundManager.playCloseDoor();

    // create exit Door
    this.exitDoor = new AdslJumper.ExitDoor(this.game, exitDoorTiledObject[0].x, exitDoorTiledObject[0].y - 28, exitDoorTiledObject[0].properties.nextLevel);
}

// void
AdslJumper.playGameState.prototype.createTraps = function () {
    this.traps = this.game.add.group();

    var elements = AdslJumper.utils.findObjectsByType('trap', this.map, 'objectsLayer');
    var currentFunction = null;
    for (var i = 0; i < elements.length; i++) {
        currentFunction = this.createObjects[elements[i].name];
        if (currentFunction !== undefined) {
            this.traps.add(currentFunction.call(this, elements[i].x, elements[i].y, elements[i].properties));
        } else {
            console.error(elements[i].name, "not found");
        }
        
    }

    // play animation
    this.traps.callAll("animations.play", "animations", "default");
};

// create FX (Visual)
// void
AdslJumper.playGameState.prototype.createFx = function () {
    var tempArray = AdslJumper.utils.findObjectsByType('ledYellow', this.map, 'fxLayer');
    var i;
    // create Leds
    for (i = 0; i < tempArray.length; i++) {
        // y + 26 => поправка к у координате из за особенностей импорта из Tiled
        this.foregroundLayer.add(new AdslJumper.Led(this.game, tempArray[i].x, tempArray[i].y + 26, "yellow"));
    };

    tempArray = AdslJumper.utils.findObjectsByType('error01', this.map, 'fxLayer');
    for (i = 0; i < tempArray.length; i++) {
        // y + 10 => поправка к у координате из за особенностей импорта из Tiled
        this.foregroundLayer.add(new AdslJumper.Error01(this.game, tempArray[i].x, tempArray[i].y + 10));
    };

    tempArray = AdslJumper.utils.findObjectsByType('fan01', this.map, 'fxLayer');
    for (i = 0; i < tempArray.length; i++) {
        this.foregroundLayer.add(new AdslJumper.Fan01(this.game, tempArray[i].x, tempArray[i].y));
    };

    tempArray = AdslJumper.utils.findObjectsByType('doorSensor', this.map, 'fxLayer');
    this.doorSensor = this.foregroundLayer.add(new AdslJumper.DoorSensor(this.game, tempArray[0].x, tempArray[0].y + 24));


};

// HANDLERS

// void
AdslJumper.playGameState.prototype.coinsHandler = function (player, coin) {

    // play sound and animation, then kill
    coin.disableBodyAndKill();

    this.collectedCoins++;
    this.currentScore += 10;

    this.doorSensor.frame = Math.ceil(9 * this.collectedCoins/this.totalLevelCoins);

    if (this.collectedCoins >= this.totalLevelCoins) {
        this.doorSensor.animations.play("default");
        this.canCheckOverlapExitDoor = true;
        this.exitDoor.open();
    }
};

// main trap handler method.
// void
AdslJumper.playGameState.prototype.trapHandler = function (player, trap) {
    var handler = this.trapHandlerCollection[trap.tag];
    if (handler !== undefined) {
        handler.call(this, player, trap);
    } else {
        console.error("handled not found for " + trap.tag);
    }
};

// void
AdslJumper.playGameState.prototype.thornHandler = function (player, trap) {
    var offsetX = 0;
    var offsetY = 0;

    if (trap.tag == "movableThorn") {
        if (!trap.isDangerous()) {
            return;
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

    this.gameOver(offsetX, offsetX, true);
};

// void
AdslJumper.playGameState.prototype.mineHandler = function (player, mine) {
    mine.blow();
    this.gameOver(0, 0, false);
};


// объект содерживт все обработчики с ловушками
AdslJumper.playGameState.prototype.trapHandlerCollection = {
    "mine": AdslJumper.playGameState.prototype.mineHandler,
    "movableThorn": AdslJumper.playGameState.prototype.thornHandler,
    "thorn": AdslJumper.playGameState.prototype.thornHandler
}

//void
AdslJumper.playGameState.prototype.exitDoorHandler = function (player, door) {
    if (door.isOpen) {
        // запретить управление пользователем
        this.player.canInput = false;
        this.player.comeIn();

        // Скрыть игрока
        this.player.kill();
        door.animations.play("close");

        // save score
        AdslJumper.data.score = this.currentScore;

        // camera
        this.game.camera.follow(door,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);

        // TODO проиграть анимация захода персонажа в дверь
        this.game.camera.fade(0x000000, this.options.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(function() {

            AdslJumper.data.level = door.nextLevel;
            this.game.state.start(this.game.state.current);
        }, this);
    }
};


// SPECIAL

AdslJumper.playGameState.prototype.gameOver = function (offsetX, offsetY, isPlaySound) {
    this.game.camera.unfollow();
    
    // player dies
    player.pendingDestroy = true;

    // play sound
    if (isPlaySound) {
        this.soundManager.playPlayerDeath();
    }
    

    // start blood
    this.blood.x = player.x + offsetX;
    this.blood.y = player.y + offsetY;
    this.blood.start(true, 2200, 20, 128, 100);

    // meatBlow sprite animation
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
}

// move background image
// image Phaser.Sprite
// paralax effect
// AdslJumper.playGameState.prototype.moveBackGround = function () {
//     this.background.cameraOffset = {x: Math.round(this.options.paralacsFactor.x * this.game.camera.x), y: Math.round(this.options.paralacsFactor.y  * this.game.camera.y)};
// };

// Создаёт объекты
AdslJumper.playGameState.prototype.createObjects = {
    "ThornUp": function (x, y) {
        return new AdslJumper.Thorn(this.game, x, y, "up");
    },
    "ThornDown": function (x, y) {

    },
    "ThornLeft": function (x, y) {

    },
    "ThornRight": function (x, y) {

    },
    "MovableThorn": function (x, y, properties) {
        return new AdslJumper.MovableThorn(this.game, x, y, properties.period, properties.direction);
    },
    "Mine": function (x, y) {
        return new AdslJumper.Mine(this.game, this.soundManager, this.explosionSprite, x, y + 18);
    },
    "Error01": function (x, y) {
        return new AdslJumper.Error01(this.game, x, y);
    }
}