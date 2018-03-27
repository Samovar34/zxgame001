// компонент отвечает за все звуки в игре
// вызывать нужно один раз во время инициализации
// SoundManager Class
AdslJumper.SoundManager = function (game) {

    this.MUSICVOLUMEDEFAULT = 0.7;
    this.SFXVOLUMEDEFAULT = 0.9;

    this.sfxVolume = 0.9;
    this.musicVolume = 0.0;

    this.game = game;

    // sounds
    this.jump = this.game.add.audio('jump');
    this.jump.volume = this.sfxVolume * 0.75;

    this.doubleJump = this.game.add.audio('doubleJump');
    this.doubleJump.volume = this.sfxVolume;

    this.step01 = this.game.add.audio("step01");
    this.step01.volume = this.sfxVolume * 0.4;

    this.step02 = this.game.add.audio("step02");
    this.step02.volume = this.sfxVolume * 0.4;

    this.closeDoor = this.game.add.sound("closeDoor");
    this.closeDoor.volume = this.sfxVolume;

    this.openDoor = this.game.add.audio('openDoor');
    this.openDoor.volume = this.sfxVolume;

    this.coin = this.game.add.sound("getCoin");
    this.coin.volume = this.sfxVolume * 0.75;

    this.playerDeath = this.game.add.sound("playerDeath");
    this.playerDeath.volume = this.sfxVolume;

    this.punch = this.game.add.sound("punch");
    this.punch.volume = this.sfxVolume;

    this.explosion = this.game.add.sound("explosion");
    this.explosion.volume = this.sfxVolume;
    
    this.menuSelect0 = this.game.add.sound("menu_select_0");
    this.menuSelect0.volume = this.sfxVolume;

    this.menuSelect1 = this.game.add.sound("menu_select_1");
    this.menuSelect1.volume = this.sfxVolume;

    // music
    this.currentTrack = null;
    this.tempTrack = null;
};

// TODO подумать нужно ли это
AdslJumper.SoundManager.prototype.constructor = AdslJumper.SoundManager;

// void
AdslJumper.SoundManager.prototype.setMusicVolume = function (value) {

};

// void
AdslJumper.SoundManager.prototype.setSFXVolume = function (value) {
    
};

// void
AdslJumper.SoundManager.prototype.playTrack = function () {
    if (this.currentTrack) {
        this.currentTrack.loopFull(this.musicVolume);
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

// void
AdslJumper.SoundManager.prototype.playPunch = function () {
    if (!this.punch.isPlaying) {
        this.punch.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playExplosion = function () {
    this.explosion.play();
};

// void
AdslJumper.SoundManager.prototype.playMenuSelect = function (val) {
    this["menuSelect"+ val].play();
};


// boolean
AdslJumper.SoundManager.prototype.isMusicPlaying = function () {

};