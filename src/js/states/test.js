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
        // this.testGroup = this.game.add.group();
        // gameObject = this.thorn = this.testGroup.add(new AdslJumper.MovableThorn(this.game, 128, 32, 0, "left"));
        // this.mine = this.game.add.sprite(20, 20, "mine");
        // this.mine.animations.add("default", [0, 1], 1, true);
        // this.mine.animations.play("default");
        // this.game.physics.arcade.enable(this.mine);
        // this.mine.body.setSize(12, 6, 2, 8);

        this.gameObjectFactory = AdslJumper.modules.gameObjectFactory;
        this.soundManager = AdslJumper.modules.soundManager;
        this.input = new AdslJumper.Input(this.game);

        // music
        if (!this.soundManager.currentTrack) {
            this.soundManager.setTrack("intro");
            this.soundManager.playTrack();
        }

        // background image or WebGL Shader
        this.background = this.gameObjectFactory.createBackGround01();

        var logo = this.game.add.sprite(160, 10, "atlas_1", "logo.png");
        logo.scale.setTo(0.5);


        this.game.add.sprite(menuX, munuY + menuOffsetY*0, "atlas_1", "menu_items7.png");
        this.game.add.sprite(menuX, munuY + menuOffsetY*1, "atlas_1", "menu_items9.png");
        this.game.add.sprite(menuX, munuY + menuOffsetY*2, "atlas_1", "menu_items10.png");
        this.game.add.sprite(menuX, munuY + menuOffsetY*3, "atlas_1", "menu_items11.png");
        this.game.add.sprite(menuX+25, 340, "atlas_1", "menu_items13.png");

        gameObject = this.game.add.sprite(250, munuY + menuOffsetY*0, "atlas_1", "arrow.png");

    },

    update: function () {
        //this.game.physics.arcade.collide(this.player, this.testGroup);
        this.updateMenu();
        // update bg
        this.background._filter.update();
    },
    
    render: function () {
    //     this.game.debug.body(gameObject);

    //     this.game.debug.text("isDangerous: " + this.thorn.isDangerous(), 12, 12, "#ffffff");
    //     //this.game.debug.body(this.player);
    }
};

AdslJumper.testState.prototype.updateMenu = function () {
    if (this.input.jumpIsJustDown()) {
        curItem--;
        if (curItem < 0) {
            curItem = menuItems;
        }
        gameObject.y =munuY + menuOffsetY*curItem;
        this.soundManager.playMenuSelect(0);
    } else if(this.input.downIsJustDown()) {
        curItem++;
        if (curItem > menuItems) {
            curItem = 0;
        }
        gameObject.y =munuY + menuOffsetY*curItem;
        this.soundManager.playMenuSelect(0);
    } else if (this.input.selectButtonIsJustDown()) {
        this.soundManager.playMenuSelect(1);
    }
}
