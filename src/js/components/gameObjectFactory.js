// creates game objects
AdslJumper.GameObjectFactory = function (game) {
    this.game = game;
    this.options = AdslJumper.gameOptions.getGameObjectOptions();
};

AdslJumper.GameObjectFactory.prototype.createFartParticles = function () {
    // particles
    var gameObject = this.game.add.emitter(0, 0, 10);
    gameObject.makeParticles("sparks", [1]);
    gameObject.setYSpeed(this.options.fartParticlesSpeed.minY, this.options.fartParticlesSpeed.maxY);
    gameObject.setXSpeed(this.options.fartParticlesSpeed.minX, this.options.fartParticlesSpeed.maxX);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.minParticleScale = 1;
    gameObject.maxParticleScale = 5;
    gameObject.alpha = 0.4;

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createBackGround01 = function () {
    var gameObject = this.game.add.sprite(0, 0, "bg001");
    gameObject.smoothed = false;
    gameObject.fixedToCamera = true;

    var child = gameObject.addChild(this.game.make.sprite(454, 198, "killHuman"));
    child.smoothed = false;
    child.animations.add("default", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 9, 10, 9, 10, 9], 2, true);
    child.animations.play("default");

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createMeatBlowSprite = function(x, y) {
    var gameObject = this.game.add.sprite(x, y, "player");
    gameObject.anchor.setTo(0.5);
    gameObject.animations.add("default", [15, 16, 17, 18, 19, 20], this.options.deathAnimationSpeed);

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createBloodParticles = function () {
    var gameObject = this.game.add.emitter(0, 0, 200);
    gameObject.makeParticles('blood', [0, 1]);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.minParticleScale = 0.0625;
    gameObject.maxParticleScale = 0.5;
    gameObject.setYSpeed(this.options.bloodParticlesSpeed.minY, this.options.bloodParticlesSpeed.maxY);
    gameObject.setXSpeed(this.options.bloodParticlesSpeed.minX, this.options.bloodParticlesSpeed.maxX);
    gameObject.gravity = 1500;

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createSparks = function () {
    var gameObject = this.game.add.emitter(0, 0, 48);
    gameObject.makeParticles("sparks", [1]);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.minParticleScale = 1;
    gameObject.maxParticleScale = 2;
    gameObject.setYSpeed(this.options.sparksSpeed.minY, this.options.sparksSpeed.maxY);
    gameObject.setXSpeed(this.options.sparksSpeed.minX, this.options.sparksSpeed.maxX);

    return gameObject;
};