// Объект с игровыми функциями
AdslJumper.gameFunc = {
    
};

// TRAP HANDLERS
// обработчик столкновений игрока с ловушками
// context Phaser.State
AdslJumper.gameFunc.trapHandler = function (player, trap) {
    var handler = AdslJumper.gameFunc.trapHandlerCollection[trap.name];
    if (handler !== undefined) {
        handler.call(this, player, trap);
    } else {
        console.warn("handled not found for " + trap.name);
    }
};

// столкновение игрока с миной
// context Phaser.State
AdslJumper.gameFunc.mineHandler = function (player, mine) {
    mine.body.enable = false;
    mine.pendingDestroy = true;
    this.soundManager.playExplosion();
    AdslJumper.gameFunc.restartLevel.call(this);
};

// объект, который содержит в себе ссылки на обработчики ловушек
AdslJumper.gameFunc.trapHandlerCollection = {
    "mine": AdslJumper.gameFunc.mineHandler
};

AdslJumper.gameFunc.gameOverMine = function () {

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
