AdslJumper.playGameState = function (game) {};

// TODO убрать из глобальной видимости
var level = 1;
var score = 0;
var currentTrack;
var test;
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

        test = this.background = this.gameObjectFactory.createBackGround01();

        this.blow = this.game.add.sprite(128, 256, "blow");
        this.blow.animations.add("blow", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
        this.blow.kill();

        this.mine = this.game.add.sprite(424, 434, "mine");
        this.mine.animations.add("default", [0, 1], 1, true);
        this.mine.animations.play("default");
        this.game.physics.arcade.enable(this.mine);
        this.mine.body.setSize(12, 6, 2, 8);

        // game objects
        this.map = game.add.tilemap("map" + level, 32, 32);
        this.map.addTilesetImage("world_tilemap", "tilemap");
        // create layers

        this.bacgroundLayer = this.map.createLayer("backgroundLayer");
        this.collisionLayer = this.map.createLayer("collisionLayer");
        
        this.map.setCollisionBetween(0, 2000, true, this.collisionLayer);

        // game layers
        this.game.layers = {
            player: this.game.add.group(),
            foreground: this.game.add.group(),
            fx: this.game.add.group(),
            ui: this.game.add.group()
        };
        
        // resize game world to match layer dimensions
        this.collisionLayer.resizeWorld();
        this.bacgroundLayer.resizeWorld();

        // create coins group and add to game world
        // this.createCoins();
        // this.createDoors();
        this.createTraps();
        this.createFx();

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

        this.game.layers.fx.add(this.blow);
        this.game.layers.fx.add(this.mine);

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
        game.physics.arcade.overlap(this.player, this.mine, function() {
            this.mine.kill();
            this.blow.revive();
            this.blow.x = this.mine.x-64 + 16;
            this.blow.y = this.mine.y-96;
            this.blow.animations.play("blow", 24, false, true); 
            this.soundManager.playExplosion();
            this.gameOver(0, 0, false);
        }, null, this);
        
        // if player collected all coins check overlap or check overlap with coins
        if (this.canCheckOverlapExitDoor == true) {
            this.game.physics.arcade.overlap(this.player, this.exitDoor, this.playerExitDoorHandler, null, this);
        } else {
            game.physics.arcade.overlap(this.player, this.coins, this.playerCoinsHandler, null, this);
        }

        // move bg
        this.moveBackGround();
        this.background._filter.update();
    },

    render: function () {

        //this.game.debug.text("up: " + this.player.body.blocked.up, 12, 12, "#ffffff");
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

    AdslJumper.utils.findObjectsByType("coin", this.map, "objectsLayer").forEach(function (element) {
        this.coins.add(new AdslJumper.Coin(this.game, AdslJumper.modules.soundManager, element.x, element.y));
    }, this);

    // play animation
    this.coins.callAll("animations.play", "animations", "rotate");

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

// move background image
// image Phaser.Sprite
// paralax effect
AdslJumper.playGameState.prototype.moveBackGround = function () {
    this.background.cameraOffset = {x: Math.round(this.options.paralacsFactor.x * this.game.camera.x), y: Math.round(this.options.paralacsFactor.y  * this.game.camera.y)};
};

AdslJumper.playGameState.prototype.playerCoinsHandler = function (player, coin) {

    // play sound and animation, then kill
    coin.disableBodyAndKill();

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

AdslJumper.playGameState.prototype.createTraps = function () {
    this.thorns = this.game.add.group();

    var thorns = AdslJumper.utils.findObjectsByType('thornUp', this.map, 'objectsLayer');
    var curThorn;
    for (var i = 0; i < thorns.length; i++) {
        this.thorns.add(new AdslJumper.Thorn(this.game, thorns[i].x, thorns[i].y, "up"));
    }

    thorns = AdslJumper.utils.findObjectsByType('thornDown', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        this.thorns.add(new AdslJumper.Thorn(this.game, thorns[i].x, thorns[i].y, "down"));
    }

    thorns = AdslJumper.utils.findObjectsByType('thornLeft', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        this.thorns.add(new AdslJumper.Thorn(this.game, thorns[i].x, thorns[i].y, "left"));
    }

    thorns = AdslJumper.utils.findObjectsByType('thornRight', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        this.thorns.add(new AdslJumper.Thorn(this.game, thorns[i].x, thorns[i].y, "right"));
    }

    thorns = AdslJumper.utils.findObjectsByType('movableThornRight', this.map, 'objectsLayer');
    for (i = 0; i < thorns.length; i++) {
        this.thorns.add(new AdslJumper.MovableThorn(this.game, thorns[i].x, thorns[i].y, 0));
    }
};

AdslJumper.playGameState.prototype.createFx = function () {
    var tempArray = AdslJumper.utils.findObjectsByType('ledYellow', this.map, 'fxLayer');

    // create Leds
    for (i = 0; i < tempArray.length; i++) {
        // y + 26 => поправка к у координате из за особенностей импорта из Tiled
        this.game.layers.fx.add(new AdslJumper.Led(this.game, tempArray[i].x, tempArray[i].y + 26, "yellow"));
    }
}

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
        this.game.camera.fade(0x000000, this.options.cameraFadeTime);
        this.game.camera.onFadeComplete.addOnce(function() {
            // TODO level global variable
            // set AdslJumper variable
            level = door.nextLevel;
            this.game.state.start(this.game.state.current);
        }, this);
    }
};

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
    this.blood.start(true, 2200, 20, 64, 100);

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