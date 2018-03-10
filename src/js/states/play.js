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

        // testing game with low fps
        // this.game.time.advancedTiming = true;
        // this.game.time.desiredFps = 24;
        // this.game.time.slowMotion = 1.2;

        // get score
        this.currentScore = AdslJumper.data.score;
        
        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.gameObjectFactory;

        // music
        if (!this.soundManager.currentTrack) {
            this.soundManager.setTrack("track01");
            this.soundManager.playTrack();
        }

        // background image or WebGL Shader
       // this.background = this.gameObjectFactory.createBackGround01();
        
        // game world
        this.map = this.game.add.tilemap("map" + AdslJumper.data.level, 32, 32);
        this.map.addTilesetImage("adsl_world_tilemap", "adslWorldTilemap");
       
        // create layers
        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        this.collisionLayer = this.map.createLayer("collisionLayer");

        // cache tilemap layers
        this.bacgroundLayer.cacheAsBitmap = true;
        this.collisionLayer.cacheAsBitmap = true;
        
        // collision
        this.map.setCollisionBetween(0, 2000, true, this.collisionLayer);
        
        // resize game world to match layer dimensions
        this.collisionLayer.resizeWorld();
        this.bacgroundLayer.resizeWorld();

        // enter and exit doors
        this.createDoors();

        // foreground layer for FX
        this.foregroundLayer = this.game.add.group();

        // create Fx GameObjects and Particles
        this.explosionSprite = this.gameObjectFactory.createExplosionSprite.call(this);

        // blood
        this.blood = this.gameObjectFactory.createBloodParticles.call(this);

        // sprite when playe die
        this.meatBlowSprite = this.gameObjectFactory.createMeatBlowSprite.call(this, 0, 0);


        // create Game Objects
        // create coins group and add to game world
        this.createCoins();
        this.createTraps();
        this.createFx();

        // create player
        var playerStartPosition = AdslJumper.utils.findObjectsByType('playerStart', this.map, 'objectsLayer');
        this.player = new AdslJumper.Player(game, this.input, playerStartPosition[0].x + 16,  playerStartPosition[0].y + 15);
        this.player.canInput = false;

        // show secret ways
        this.hiddenLayer = this.map.createLayer("hiddenLayer");

        // самый верхний слой для визуальных эффектов
        this.topLayer = this.game.add.group();

        // add fx and particals to topLayer
        this.topLayer.add(this.blood);
        this.topLayer.add(this.meatBlowSprite);
        this.topLayer.add(this.explosionSprite);
        this.topLayer.killAll();


        // camera
        this.game.camera.follow(this.player,  this.game.camera.FOLLOW_PLATFORMER, 0.2, 0.2);
        this.game.camera.flash(0x000000, this.options.cameraFlashTime);

        // level without learning
        if (AdslJumper.data.level > 3) {
            this.game.camera.onFlashComplete.addOnce(function () {
                this.player.canInput = true;
            }, this);
        } else {
            this.showMessage();
        }
    },

    update: function () {

        if (this.isShowMessage) {
            this.updateMessage();
        } 

        // // physics
        this.game.physics.arcade.collide(this.player, this.collisionLayer);
        this.game.physics.arcade.overlap(this.player, this.traps, this.trapHandler, null, this);
        
        // if player collected all coins check overlap or check overlap with coins
        if (this.canCheckOverlapExitDoor === true) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.exitDoorHandler, null, this);
        } else {
            this.game.physics.arcade.overlap(this.player, this.coins, this.coinsHandler, null, this);
        }

        // update bg
        //this.background._filter.update();
    },

    render: function () {

        // this.game.debug.text("room: " + AdslJumper.data.level, 8, 12, "#00ff00");
        // this.game.debug.text("coins: " + this.collectedCoins + "/" + this.totalLevelCoins, 8, 27, "#00ff00");
        // this.game.debug.text("score: " + this.currentScore, 8, 42, "#00ff00");
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
    this.enterDoor = this.game.add.sprite(
        enterDoorTiledObject[0].x,
        enterDoorTiledObject[0].y - 28,
        "atlas_2",
        "door1.png"
    );
    this.enterDoor.animations.add("default", ["door1.png", "door2.png"], 2, true);
    this.enterDoor.animations.play("default");
    

    //this.soundManager.playCloseDoor();

    // create exit Door
    this.exitDoor = new AdslJumper.ExitDoor(
        this.game,
        exitDoorTiledObject[0].x,
        exitDoorTiledObject[0].y - 28,
        exitDoorTiledObject[0].properties.nextLevel
    );
};

// void
AdslJumper.playGameState.prototype.createTraps = function () {
    this.traps = this.game.add.group();

    var elements = AdslJumper.utils.findObjectsByType('trap', this.map, 'objectsLayer');
    var currentFunction = null;
    for (var i = 0; i < elements.length; i++) {
        currentFunction = AdslJumper.gameObjectFactory[elements[i].name];
        if (currentFunction !== undefined) {
            this.traps.add(currentFunction.call(this, elements[i].x, elements[i].y, elements[i].properties));
        } else {
            console.error(elements[i].name, "not found");
        }

    }

    // play animation
    this.traps.callAll("animations.play", "animations", "default");
};

// void
AdslJumper.playGameState.prototype.createFx = function () {
    var elements = AdslJumper.utils.findObjectsByType('fx', this.map, 'fxLayer');
    var currentFunction = null;

    for (var i = 0; i < elements.length; i++) {
        currentFunction = AdslJumper.gameObjectFactory[elements[i].name];
        if (currentFunction !== undefined) {
            this.foregroundLayer.add(currentFunction.call(this, elements[i].x, elements[i].y, elements[i].properties));
        } else {
            console.error(elements[i].name, "not found");
        }
    }

    // play animation
    this.foregroundLayer.callAll("animations.play", "animations", "default");
};

// void
AdslJumper.playGameState.prototype.showMessage = function () {
    this.isShowMessage = true;
    if (AdslJumper.data.level === 0) {
        this.msg = AdslJumper.gameObjectFactory.createMessage1.call(this);
    } else if (AdslJumper.data.level === 1) {
        this.msg = AdslJumper.gameObjectFactory.createMessage2.call(this);
    } else if (AdslJumper.data.level === 2) {
        this.msg = AdslJumper.gameObjectFactory.createMessage3.call(this);
    } else {
        this.isShowMessage = false;
        this.player.canInput = true;
    }
    

    // if (AdslJumper.data.level === 2){
    //     this.msg.position.y = 264;
    // }
};

AdslJumper.playGameState.prototype.updateMessage = function () {
    if (this.input.jumpIsJustDown()) {
        this.player.canInput = true;
        this.isShowMessage = false;
        this.msg.kill();
    }
}

// HANDLERS

// void
AdslJumper.playGameState.prototype.coinsHandler = function (player, coin) {

    // play sound and animation, then kill
    coin.disableBodyAndKill();

    this.collectedCoins++;
    this.currentScore += 10;

    if (this.collectedCoins >= this.totalLevelCoins) {
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
    mine.body.enable = false;
    mine.kill();
    this.explosionSprite.revive();
    this.explosionSprite.x = mine.x - 48;
    this.explosionSprite.y = mine.y - 116;
    this.soundManager.playExplosion();
    this.explosionSprite.animations.play("default", 24, false, true);
    this.gameOver(0, 0, false);
};


// объект содерживт все обработчики с ловушками
AdslJumper.playGameState.prototype.trapHandlerCollection = {
    "mine": AdslJumper.playGameState.prototype.mineHandler,
    "movableThorn": AdslJumper.playGameState.prototype.thornHandler,
    "thorn": AdslJumper.playGameState.prototype.thornHandler
};

//void
AdslJumper.playGameState.prototype.exitDoorHandler = function (player, door) {
    if (door.isOpen) {
        // запретить управление пользователем
        this.player.canInput = false;

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
    this.player.pendingDestroy = true;

    // play sound
    if (isPlaySound) {
        this.soundManager.playPlayerDeath();
    }
    
    // start blood
    this.blood.x = this.player.x + offsetX;
    this.blood.y = this.player.y + offsetY;
    this.blood.start(true, 2200, 20, 128, 100);

    // meatBlow sprite animation
    this.meatBlowSprite.position.setTo(this.player.x + offsetX, this.player.y + offsetY);
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