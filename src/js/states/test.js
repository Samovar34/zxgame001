AdslJumper.testState = function (game) {};

var gameObject;
var menuX = 272;
var munuY = 220;
var menuOffsetY = 20;
var menuItems = 3;
var curItem = 0;
AdslJumper.testState.prototype = {
    preload: function () {
        game.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.xml');
    },
    create: function () {
        // get modules
        this.input = new AdslJumper.Input(this.game);
        this.soundManager = AdslJumper.modules.soundManager;
        this.gameObjectFactory = AdslJumper.modules.gameObjectFactory;

        this.tg = this.game.add.group();

        this.tg.add(new AdslJumper.Thorn(this.game, 10, 10, "up"));
        this.tg.add(new AdslJumper.Thorn(this.game, 52, 10, "right"));
        this.tg.add(new AdslJumper.Thorn(this.game, 94, 10, "down"));
        this.tg.add(new AdslJumper.Thorn(this.game, 136, 10, "left"));

        this.tg.add(new AdslJumper.MovableThorn(this.game, 190, 10, 0, "right"));
        this.tg.add(new AdslJumper.MovableThorn(this.game, 300, 10, 0, "left"));
        this.tg.add(new AdslJumper.MovableThorn(this.game, 190, 50, 1, "right"));
        this.tg.add(new AdslJumper.MovableThorn(this.game, 300, 50, 1, "left"));

        this.p = new AdslJumper.Platform01(this.game, 356, 50);
        this.p.revival();
    },

    update: function () {
        //this.game.physics.arcade.collide(this.player, this.testGroup);

    },
    
    render: function () {
        this.game.debug.body(this.p);
        this.game.debug.physicsGroup(this.tg);
    }
};


