// Объект с игровыми функциями
AdslJumper.gameFunc = {
    
};

// PLAYER

// void
// context Phaser.State
AdslJumper.gameFunc.playerCollideHandler = function (player, collider) {
    this.player.customTouchUp = this.player.body.touching.up;
    this.player.customTouchRight = this.player.body.touching.right;
    this.player.customTouchDown = this.player.body.touching.down;
    this.player.customTouchLeft = this.player.body.touching.left;
};

// void
// context Phaser.State
AdslJumper.gameFunc.triggerHandler = function (player, trigger) {
    player.inTrigger = true;

    if (trigger._killOnOverlap) {
        trigger.kill();
    }

    if (typeof trigger._event === "string") {
        try {
            if (trigger._interactable) {
                player.isInteract = true;
                if (this.input.jumpIsJustDown()) {
                    this._events[trigger._event].call(this, trigger);
                }
            } else {
                this._events[trigger._event].call(this, trigger);
            }
            
        } catch (err) {
            // force disable body
            //trigger.body.enable = false;
            console.warn("Trigger handler error! Event '" + trigger._event + "' not found or not function!");
            console.error(err.toString());
        }
    }
};

// TRAP HANDLERS
// обработчик столкновений игрока с ловушками
// context Phaser.State
AdslJumper.gameFunc.trapHandler = function (player, trap) {
    console.log(trap.tag);
    var handler = AdslJumper.gameFunc.trapHandlerCollection[trap.tag];
    if (handler !== undefined) {
        handler.call(this, player, trap);
    } else {
        console.warn("handled not found for " + trap.tag);
    }
};

// столкновение игрока с миной
// context Phaser.State
AdslJumper.gameFunc.mineHandler = function (player, mine) {
    mine.body.enable = false;
    mine.pendingDestroy = true;
    AdslJumper.gameFunc.makeExplosion.call(this, mine.x, mine.y);
    this.blood.x = player.x;
    this.blood.y = player.y;
    this.blood.start(true, 2200, 20, 64, 100);
    AdslJumper.gameFunc.gameOverMine.call(this);
};

AdslJumper.gameFunc.thornHandler = function (player, thorn) {

    this.soundManager.playPlayerDeath();

    this.blood.x = player.x;
    this.blood.y = player.y;
    this.blood.start(true, 2200, 20, 64, 100);

    AdslJumper.gameFunc.gameOver.call(this);
};

AdslJumper.gameFunc.movableThornHandler = function (player, thorn) {
    if (!thorn.isDangerous()) {
        return;
    }

    this.soundManager.playPlayerDeath();

    this.blood.x = player.x;
    this.blood.y = player.y;
    this.blood.start(true, 2200, 20, 64, 100);

    AdslJumper.gameFunc.gameOver.call(this);
};

AdslJumper.gameFunc.explosionHandler = function (player, explosion) {
    console.log(explosion.frameName);
    if (explosion.frameName == "blow1.png" ||
        explosion.frameName == "blow2.png" ||
        explosion.frameName == "blow3.png" ||
        explosion.frameName == "blow4.png" ||
        explosion.frameName == "blow5.png") {
            this.blood.x = player.x;
            this.blood.y = player.y;
            this.blood.start(true, 2200, 20, 64, 100);
            AdslJumper.gameFunc.gameOverMine.call(this);
    }
};

// объект, который содержит в себе ссылки на обработчики ловушек
AdslJumper.gameFunc.trapHandlerCollection = {
    "mine": AdslJumper.gameFunc.mineHandler,
    "thorn": AdslJumper.gameFunc.thornHandler,
    "movableThorn": AdslJumper.gameFunc.movableThornHandler,
    "explosion": AdslJumper.gameFunc.explosionHandler
};

AdslJumper.gameFunc.gameOverMine = function () {
    tryCount++;
    AdslJumper.gameFunc.restartLevel.call(this);
};

AdslJumper.gameFunc.gameOver = function () {
    tryCount++;
    AdslJumper.gameFunc.restartLevel.call(this);
};

// context Phaser.State
AdslJumper.gameFunc.restartLevel = function () {
    this.game.camera.unfollow();

    // player dies
    this.player.pendingDestroy = true;

    this.game.camera.shake(0.01, 500);
    this.game.camera.onShakeComplete.addOnce(function() {
        // restart level after camera shake
        this.game.camera.fade(0x000000, 500);
        this.game.camera.onFadeComplete.addOnce(function() {
            // restart current state
            this.game.state.start(this.game.state.current);
        }, this);
      }, this);
};

// PLAY FX

// void
AdslJumper.gameFunc.makeExplosion = function (x, y) {
    var explosion = this.explosionSprites.getFirstDead();
    explosion.x = x - 64;
    explosion.y = y - 64;
    explosion.revive();
    explosion.animations.play("default", 24, false, true);
    this.soundManager.playExplosion();
};
