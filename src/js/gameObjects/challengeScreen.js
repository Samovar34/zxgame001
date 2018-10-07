/**
 * Challenge screen game object class
 * @param {Phaser.Game} game
 * @param {number} x
 * @param {number} y
 * @constructor
 */
AdslJumper.ChallengeScreen = function (game, x, y) {
    // extend
    Phaser.Sprite.call(this, game, x * _scaleFactor, (y - 14) * _scaleFactor, "atlas_2", "screenChallenge1.png");
    this.game = game;

    this.smoothed = false;
    this.scale.setTo(_scaleFactor);

    this.challengeSpeed = 24;

    this.idleAnim = this.animations.add
    (
        'idle',
        ['screenChallenge1.png', 'screenChallenge2.png'],
        1
    );

    this.loadingAnim = this.animations.add('loading',
        [
            'screenChallenge3.png',
            'screenChallenge4.png',
            'screenChallenge5.png',
            'screenChallenge4.png',
            'screenChallenge3.png',
            'screenChallenge4.png',
            'screenChallenge5.png',
            'screenChallenge6.png',
            'screenChallenge7.png'
        ]
    );

    this.challengeAnim = this.animations.add('challenge', [
        'screenChallenge9.png',
        'screenChallenge10.png',
        'screenChallenge11.png',
        'screenChallenge12.png',
        'screenChallenge13.png',
        'screenChallenge14.png',
        'screenChallenge15.png',
        'screenChallenge16.png',
        'screenChallenge17.png',
        'screenChallenge18.png',
        'screenChallenge19.png',
        'screenChallenge18.png',
        'screenChallenge17.png',
        'screenChallenge16.png',
        'screenChallenge15.png',
        'screenChallenge14.png',
        'screenChallenge13.png',
        'screenChallenge12.png',
        'screenChallenge11.png',
        'screenChallenge10.png'
    ]);

    this.loadingAnim.onComplete.add(this.playChallengeAnim, this);

    this.badChoiceAnim = this.animations.add('bad', [
        'screenChallenge20.png',
        'screenChallenge20.png',
        'screenChallenge20.png'
    ]);

    this.badChoiceAnim.onComplete.add(this.playIdleAnim, this);

    this.playIdleAnim();
};

AdslJumper.ChallengeScreen.prototype = Object.create(Phaser.Sprite.prototype);
AdslJumper.ChallengeScreen.prototype.constructor = AdslJumper.Timer;


AdslJumper.ChallengeScreen.prototype.playChallengeAnim = function () {
    this.challengeAnim.play(this.challengeSpeed, true);
};

AdslJumper.ChallengeScreen.prototype.playIdleAnim = function () {
    this.idleAnim.play(2, true);
};

AdslJumper.ChallengeScreen.prototype.checkInput = function () {
  if (
      this.frameName === 'screenChallenge13.png' ||
      this.frameName === 'screenChallenge14.png' ||
      this.frameName === 'screenChallenge15.png'
  ) {
      this.challengeAnim.stop(true);
      this.frameName = 'screenChallenge21.png';
      return true;
  } else {
      this.badChoiceAnim.play(1);
      return false;
  }
};
