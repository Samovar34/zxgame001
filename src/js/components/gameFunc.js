/**
 * object with common game functions (namespace)
 * @namespace
 * @type {{}}
 */
AdslJumper.gameFunc = {};

/**
 * player's collision with the platform
 * @param {AdslJumper.Player} layer
 * @param {Phaser.Sprite} collider
 */
AdslJumper.gameFunc.playerCollideHandler = function (player, collider) {
    player.customTouchUp = player.body.touching.up;
    player.customTouchRight = player.body.touching.right;
    player.customTouchDown = player.body.touching.down;
    player.customTouchLeft = player.body.touching.left;
};

/**
 * player's overlap with the trigger
 * @param player
 * @param trigger
 * @this {Phaser.State}
 */
AdslJumper.gameFunc.playerTriggerHandler = function (player, trigger) {
    player.inTrigger = true;
    try {
        this[trigger._event](player, trigger);
    } catch (err) {
        console.warn("no handler for " + trigger._event);
    }

};

/**
 * player's overlap with the trap
 * @param player
 * @param {AdslJumper.Player} trap
 * @param {Phaser.Sprite} trap
 * @this {Phaser.State}
 */
AdslJumper.gameFunc.playerTrapHandler = function (player, trap) {

    var handler = AdslJumper.gameFunc.trapHandlerCollection[trap.tag];
    if (handler !== undefined) {
        handler.call(this, player, trap);
    } else {
        AdslJumper.utils.warn(player.game.state.current, "handler not found for", trap.tag);
    }
};

/**
 * player's overlap with bonus
 * @param {AdslJumper.Player} player
 * @param {Phaser.Sprite} bonus
 */
AdslJumper.gameFunc.playerBonusHandler = function (player, bonus) {
    // TODO delete
    AdslJumper.utils.info(player.game.state.current, "bonus tag", bonus.tag);

    if (player.canInput) {
        try {
            AdslJumper.gameFunc[bonus.tag + "Handler"].call(this, player, bonus);
        } catch (err) {
            AdslJumper.utils.warn(player.game.state.current, "BONUS handler not found for", bonus.tag);
        }
    }
};

// столкновение игрока с миной
// this = Phaser.State
AdslJumper.gameFunc.mineHandler = function (player, mine) {
    // disable physics body and destroy
    mine.body.enable = false;
    mine.pendingDestroy = true;

    // explosion
    AdslJumper.gameFunc.makeExplosion.call(this, mine.x, mine.y);

    // blood particals
    this.blood.x = player.x;
    this.blood.y = player.y;
    this.blood.start(true, 2200, 20, 64, 100);

    // gameOver
    AdslJumper.gameFunc.gameOver.call(this);
};

// столкновение игрока с шипом
// this = Phaser.State
AdslJumper.gameFunc.thornHandler = function (player, thorn) {

    // play sound
    SoundManager.playPlayerDeath();

    // blood particals
    this.blood.x = player.x;
    this.blood.y = player.y;
    this.blood.start(true, 2200, 20, 64, 100);

    // gameOver
    AdslJumper.gameFunc.gameOver.call(this);
};

// столкновение игрока с подвижным шипом
// this = Phaser.State
AdslJumper.gameFunc.movableThornHandler = function (player, thorn) {
    if (!thorn.isDangerous()) {
        return;
    }

    this.blood.x = player.x;
    this.blood.y = player.y;
    this.blood.start(true, 2200, 20, 64, 100);

    AdslJumper.gameFunc.gameOver.call(this);
};

// столкновение игрока со взрывом
// this = Phaser.State
AdslJumper.gameFunc.explosionHandler = function (player, explosion) {
    if (explosion.frameName === "blow1.png" ||
        explosion.frameName === "blow2.png" ||
        explosion.frameName === "blow3.png" ||
        explosion.frameName === "blow4.png" ||
        explosion.frameName === "blow5.png") {
            this.blood.x = player.x;
            this.blood.y = player.y;
            this.blood.start(true, 2200, 20, 64, 100);
            AdslJumper.gameFunc.gameOverMine.call(this);
    }
};


/**
 * game over function
 * @param {AdslJumper.Player} player
 * @param {Phaser.Sprite} other
 */
AdslJumper.gameFunc.gameOver = function (player, other, playSound) {

    playSound = typeof playSound === "boolean" ? playSound : true;

    // что бы быть уверенным что функция вызывается один раз
    if (this.player.canInput) {
        this.player.canInput = false;



        // play player death sound
        if (playSound) {
            SoundManager.playPlayerDeath();
        }

        _levelDeaths++;
        _deaths++;

        this.player.body.stop();
        this.player.body.gravity.y = -300;
        this.player.animations.play("death");

        // TODO убрать биткойн
        // score -1 after death
        if (_score > 0) {
            _score -= 1;
            this.gui.flash();
        } else {
            // continue state
            alert("ГАМОВЕР");
        }

        this.gui.setScore(_score);

        this.game.camera.shake(0.01, 500);
    }

};

/**
 * on player's death animation complete function
 */
AdslJumper.gameFunc.onPlayerDeathComplete = function () {
    this.player.body.gravity.y = 0;
    this.player.body.stop();
    this.player.reset((this.map.player.x + 16) *_scaleFactor, (this.map.player.y - 16) *_scaleFactor);
    this.player.restoreDefault();
    this.player.animations.play("respawn");
    // play player respawn sound
    SoundManager.playPlayerRespawn();
};

/**
 *
 */
AdslJumper.gameFunc.onPlayerRespawnComplete = function () {
    this.player.body.gravity.y = this.player.options.gravity;
    this.player.canInput = true;
    this.player.body.velocity.y = 0;
};

/**
 *  restart level after camera shake
 */
AdslJumper.gameFunc.onShakeCompleteFunction = function() {

    // this.game.camera.fade(0x000000, 500);
    // this.game.camera.onFadeComplete.addOnce(AdslJumper.gameFunc.restartLevel, this);
};

AdslJumper.gameFunc.restartLevel = function () {
    this.game.state.restart(this.game.state.current);
};

/**
 * on camera flash complete function
 */
AdslJumper.gameFunc.onFlashCompleteFunction = function() {
    this.player.canInput = true;
};

// PLAY FX

// TODO move to world function
AdslJumper.gameFunc.makeExplosion = function (x, y) {
    var explosion = this.explosionSprites.getFirstDead();
    explosion.x = x - 64;
    explosion.y = y - 64;
    explosion.revive();
    explosion.animations.play("default", 24, false, true);
    SoundManager.playExplosion();
};

/**
 * player coin overlap handler
 * @param {AdslJumper.Player} player
 * @param {AdslJumper.Coin} coin
 * @this {Phaser.State}
 * @returns {boolean}
 */
AdslJumper.gameFunc.coinHandler = function (player, coin) {
    coin.disableBodyAndKill();
    SoundManager.playCoin();
    _score += 1;
    this.gui.setScore(_score);

    return false;
};

AdslJumper.gameFunc.cardHandler = function (player, card) {
    // play special sound
    SoundManager.playPickUp();

    card.body.enable = false;
    card.pendingDestroy = true;

    player.hasCard = true;

    if (this.onCardFunction) {
        this.onCardFunction();
    } else {
        AdslJumper.utils.info(this.game.state.current, "onCardFunction not exist");
    }
};

// END BONUS

/**
 * prepare for new level
 * @param {AdslJumper.Player} player
 * @param {AdslJumper.ExitDoor} door
 * @this {Phaser.State}
 */
AdslJumper.gameFunc.nextLevel = function (player, door) {
    // запретить управление пользователем
    player.canInput = false;

    // Скрыть игрока
    player.kill();
    player.pendingDestroy = true;
    door.animations.play("close");

    // reset levelDeaths
    //_levelDeaths = 0;

    // set next level
    _level = door.nextLevel;

    // camera
    this.game.camera.follow(door,  this.game.camera.FOLLOW_PLATFORMER, 0.1, 0.1);

    this.game.camera.fade(0x000000, AdslJumper.gameOptions.cameraFadeTime);
    this.game.camera.onFadeComplete.addOnce(AdslJumper.gameFunc.startNewLevelState, this);
};

/**
 * start new level
 */
AdslJumper.gameFunc.startNewLevelState = function () {
    this.game.state.start("level" + _level);
};