// компонент отвечает за все звуки в игре
// вызывать нужно один раз во время инициализации
// SoundManager Class
AdslJumper.SoundManager = function (game) {

    // options
    this.options = AdslJumper.gameOptions.getSoundOptions();
    this.game = game;

    // sounds
    this.jump = this.game.add.audio('jump');
    this.jump.volume = this.options.sfx * 0.75;

    this.doubleJump = this.game.add.audio('doubleJump');
    this.doubleJump.volume = this.options.sfx;

    this.step01 = this.game.add.audio("step01");
    this.step01.volume = this.options.sfx * 0.4;

    this.step02 = this.game.add.audio("step02");
    this.step02.volume = this.options.sfx * 0.4;

    this.closeDoor = this.game.add.sound("closeDoor");
    this.closeDoor.volume = this.options.sfx;

    this.openDoor = this.game.add.audio('openDoor');
    this.openDoor.volume = this.options.sfx;

    this.coin = this.game.add.sound("getCoin");
    this.coin.volume = this.options.sfx * 0.75;

    this.playerDeath = this.game.add.sound("playerDeath");
    this.playerDeath.volume = this.options.sfx;

    // music
    this.currentTrack = null;
    this.track01 = this.game.add.audio('track01');
};

// TODO подумать нужно ли это
AdslJumper.SoundManager.prototype.constructor = AdslJumper.SoundManager;

// void
AdslJumper.SoundManager.prototype.setMusicVolume = function (value) {

};

// void
AdslJumper.SoundManager.prototype.setSFXVolume = function (value) {
    
};

AdslJumper.SoundManager.prototype.setTrack = function (value) {
    if (this.currentTrack) {
        this.currentTrack.stop();
    }
    this.currentTrack = this[value];
}

// void
AdslJumper.SoundManager.prototype.playTrack = function () {
    if (this.currentTrack) {
        this.currentTrack.loopFull(this.options.musicVolume);
    }
};

// void
AdslJumper.SoundManager.prototype.playStep01 = function () {
    if (!this.step01.isPlaying) {
        this.step01.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playStep02 = function () {
    if (!this.step02.isPlaying) {
        this.step02.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playJump = function () {
    this.jump.play();
};

// void
AdslJumper.SoundManager.prototype.playCoin = function () {
    this.coin.play();
};

// void
AdslJumper.SoundManager.prototype.playCloseDoor = function () {
    if (!this.closeDoor.isPlaying) {
        this.closeDoor.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playOpenDoor = function () {
    if (!this.openDoor.isPlaying) {
        this.openDoor.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playDoubleJump = function () {
    if (!this.doubleJump.isPlaying) {
        this.doubleJump.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playPlayerDeath = function () {
    if (!this.playerDeath.isPlaying) {
        this.playerDeath.play();
    }
};


// boolean
AdslJumper.SoundManager.prototype.isMusicPlaying = function () {

};