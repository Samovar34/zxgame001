// creates game objects
AdslJumper.GameObjectFactory = function (game) {
    this.game = game;
    this.options = AdslJumper.gameOptions.getGameObjectOptions();
};

AdslJumper.GameObjectFactory.prototype.createFartParticles = function () {
    // particles
    var gameObject = this.game.add.emitter(0, 0, 10);
    gameObject.makeParticles("sparks", [1, 2]);
    gameObject.setYSpeed(this.options.fartParticlesSpeed.minY, this.options.fartParticlesSpeed.maxY);
    gameObject.setXSpeed(this.options.fartParticlesSpeed.minX, this.options.fartParticlesSpeed.maxX);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.alpha = 0.4;

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createBackGround01 = function () {

    var gameObject = this.game.add.sprite(0, 0, "bg001")
    gameObject.width = 1000;
    gameObject.height = 600;
    gameObject.fixedToCamera = true;


    var child;

    gameObject._filter = new Phaser.Filter(game, null, game.cache.getShader('testShader'));

    gameObject._filter.setResolution(640, 360);

    child = gameObject.addChild(this.game.make.sprite(0, 0, "bg001"));
    child.width = 640;
    child.height = 360;
    child.smoothed = false;
    child.scale.setTo(1);
    child.alpha = 0.1;
    child.filters = [gameObject._filter];

    //child = gameObject.addChild(this.game.make.sprite(0, 0, "bg001"));
    
    
    // child = gameObject.addChild(this.game.make.sprite(454, 198, "killHuman"));
    // child.smoothed = false;
    // child.animations.add("default", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 9, 10, 9, 10, 9], 2, true);
    // child.animations.play("default");

    // // 1-1
    // child = gameObject.addChild(this.game.make.sprite(224, 84, "led"));
    // child.animations.add("default", [0, 1, 0, 0, 0, 1, 0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(232, 84, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(224, 100, "led"));
    // child.animations.add("default", [1, 0], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(232, 100, "led"));
    // child.animations.add("default", [1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // 1-2
    // child = gameObject.addChild(this.game.make.sprite(288, 84, "led"));
    // child.animations.add("default", [0, 1, 0, 0, 0, 1, 0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(296, 84, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 1, 0, 1, 0, 1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(288, 100, "led"));
    // child.animations.add("default", [1, 0, 1, 1, 1, 0, 1, 0, 0 ,1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(296, 100, "led"));
    // child.animations.add("default", [1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // 1-3
    // child = gameObject.addChild(this.game.make.sprite(224, 148, "led"));
    // child.animations.add("default", [0, 1, 0, 0, 0, 1, 0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(232, 148, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(224, 164, "led"));
    // child.animations.add("default", [1, 0], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(232, 164, "led"));
    // child.animations.add("default", [1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // 1-4
    // child = gameObject.addChild(this.game.make.sprite(288, 148, "led"));
    // child.animations.add("default", [0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(296, 148, "led"));
    // child.animations.add("default", [1, 0], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(288, 164, "led"));
    // child.animations.add("default", [1, 0, 1, 1, 1, 0, 1, 0 ,1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(296, 164, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // 2-1
    // child = gameObject.addChild(this.game.make.sprite(736, 84, "led"));
    // child.animations.add("default", [0, 1, 0, 0, 0, 1, 0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(744, 84, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(736, 100, "led"));
    // child.animations.add("default", [1, 0], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(744, 100, "led"));
    // child.animations.add("default", [1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // 2-2
    // child = gameObject.addChild(this.game.make.sprite(800, 84, "led"));
    // child.animations.add("default", [0, 1, 0, 0, 0, 1, 0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(808, 84, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 1, 0, 1, 0, 1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(800, 100, "led"));
    // child.animations.add("default", [1, 0, 1, 1, 1, 0, 1, 0, 0 ,1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(808, 100, "led"));
    // child.animations.add("default", [1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // 2-3
    // child = gameObject.addChild(this.game.make.sprite(736, 148, "led"));
    // child.animations.add("default", [0, 1, 0, 0, 0, 1, 0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(744, 148, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(736, 164, "led"));
    // child.animations.add("default", [1, 0], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(744, 164, "led"));
    // child.animations.add("default", [1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // 2-4
    // child = gameObject.addChild(this.game.make.sprite(800, 148, "led"));
    // child.animations.add("default", [0, 1], 12, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(808, 148, "led"));
    // child.animations.add("default", [1, 0], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(800, 164, "led"));
    // child.animations.add("default", [1, 0, 1, 1, 1, 0, 1, 0 ,1], 24, true);
    // child.animations.play("default");

    // child = gameObject.addChild(this.game.make.sprite(808, 164, "led"));
    // child.animations.add("default", [1, 1, 0, 1, 0, 0, 1, 0], 12, true);
    // child.animations.play("default");

    // // green
    // child = gameObject.addChild(this.game.make.sprite(500, 472, "led"));
    // child.animations.add("default", [2, 1], 12, true);
    // child.animations.play("default");
    // child = gameObject.addChild(this.game.make.sprite(512, 472, "led"));
    // child.animations.add("default", [1, 2, 2, 1], 12, true);
    // child.animations.play("default");

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createMeatBlowSprite = function(x, y) {
    var gameObject = this.game.add.sprite(x, y, "player");
    gameObject.anchor.setTo(0.5);
    gameObject.animations.add("default", [15, 16, 17, 18, 19, 20], this.options.deathAnimationSpeed);
    gameObject.animations.getAnimation("default").killOnComplete = true;
    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createBloodParticles = function () {
    var gameObject = this.game.add.emitter(0, 0, 200);
    gameObject.makeParticles('blood', [0, 1, 2, 3]);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(this.options.bloodParticlesSpeed.minY, this.options.bloodParticlesSpeed.maxY);
    gameObject.setXSpeed(this.options.bloodParticlesSpeed.minX, this.options.bloodParticlesSpeed.maxX);
    gameObject.gravity = 900;

    return gameObject;
};

AdslJumper.GameObjectFactory.prototype.createSparks = function () {
    var gameObject = this.game.add.emitter(0, 0, 24);
    gameObject.makeParticles("sparks", [0, 1, 2, 3]);
    gameObject.minRotation = 0;
    gameObject.maxRotation = 0;
    gameObject.setYSpeed(this.options.sparksSpeed.minY, this.options.sparksSpeed.maxY);
    gameObject.setXSpeed(this.options.sparksSpeed.minX, this.options.sparksSpeed.maxX);
    gameObject.alpha = 1;
    gameObject.gravity = 0;

    return gameObject;
};