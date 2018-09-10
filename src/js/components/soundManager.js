/**
 * sound manager
 * @param {Phaser.Game} game
 * @constructor
 */
AdslJumper.SoundManager = function (game) {

    /** @type {number} */
    this.MUSICVOLUMEDEFAULT = 0.7;
    /** @type {number} */
    this.SFXVOLUMEDEFAULT = 0.9;

    /** @type {number} */
    this.sfxVolume = 0.7;
    /** @type {number} */
    this.musicVolume = 0.3;

    /** @type {Phaser.Game} */
    this.game = game;

    /** @type {Phaser.Sound} */
    this.jump = this.game.add.audio('jump');
    this.jump.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.pickUp = this.game.add.audio('pickUp');
    this.pickUp.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.doubleJump = this.game.add.audio('doubleJump');
    this.doubleJump.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.step01 = this.game.add.audio("step01");
    this.step01.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.step02 = this.game.add.audio("step02");
    this.step02.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.openDoor2 = this.game.add.sound("openDoor2");
    this.openDoor2.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.openDoor = this.game.add.audio('openDoor');
    this.openDoor.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.coin = this.game.add.sound("getCoin");
    this.coin.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.playerDeath = this.game.add.sound("playerDeath");
    this.playerDeath.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.punch = this.game.add.sound("punch");
    this.punch.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.explosion = this.game.add.sound("explosion");
    this.explosion.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.menuSelect0 = this.game.add.sound("menu_select_0");
    this.menuSelect0.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.menuSelect1 = this.game.add.sound("menu_select_1");
    this.menuSelect1.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.playerRespawn = this.game.add.audio('playerRespawn');
    this.playerRespawn.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.skyNetEyes = this.game.add.audio('skyNetEyes');
    this.skyNetEyes.volume = this.sfxVolume;

    /** @type {Phaser.Sound} */
    this.jumpForce = this.game.add.audio('jumpForce');
    this.jumpForce.volume = this.sfxVolume;

    // music
    /** @type {Phaser.Sound} */
    this.currentTrack = null;
    /** @type {Phaser.Sound} */
    this.tempTrack = null;
};

AdslJumper.SoundManager.prototype.constructor = AdslJumper.SoundManager;

/**
 * set music volume
 * @param {number} value
 */
AdslJumper.SoundManager.prototype.setMusicVolume = function (value) {
    // TODO logic here
};

/**
 * set sfx volume
 * @param {number} value
 */
AdslJumper.SoundManager.prototype.setSFXVolume = function (value) {
    // TODO logic here
};

/**
 * play music
 */
AdslJumper.SoundManager.prototype.playTrack = function () {
    if (!this.tempTrack) {
        console.warn("set track first");
        return;
    }

    this.currentTrack = this.tempTrack;
    this.currentTrack.loopFull(this.musicVolume);
    this.tempTrack = null;
};

/**
 * set this.currentTrack
 * @param {Phaser.Sound} audio
 */
AdslJumper.SoundManager.prototype.setTrack = function (audio) {
  this.tempTrack = audio;
};

/**
 * stop play music and reset this.currentTrack
 */
AdslJumper.SoundManager.prototype.resetMusic = function () {
  if (this.currentTrack) {
      this.currentTrack.stop();
  }
  this.currentTrack = null;
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
AdslJumper.SoundManager.prototype.playOpenDoor2 = function () {
    if (!this.openDoor2.isPlaying) {
        this.openDoor2.play();
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
AdslJumper.SoundManager.prototype.playPickUp= function () {
    if (!this.pickUp.isPlaying) {
        this.pickUp.play();
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
AdslJumper.SoundManager.prototype.playPlayerRespawn = function () {
    if (!this.playerRespawn.isPlaying) {
        this.playerRespawn.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playSkyNetEyes = function () {
    if (!this.skyNetEyes.isPlaying) {
        this.skyNetEyes.play();
    }
};

// void
AdslJumper.SoundManager.prototype.playJumpForce = function () {
    if (!this.jumpForce.isPlaying) {
        this.jumpForce.play();
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