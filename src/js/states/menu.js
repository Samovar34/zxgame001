AdslJumper.menuState = function (game) {};

AdslJumper.menuState.prototype = {
    create: function () {
        this.gameObjectFactory = AdslJumper.modules.gameObjectFactory;
        this.soundManager = AdslJumper.modules.soundManager;
        this.input = new AdslJumper.Input(this.game);

        // variables
        this.menuX = 272;
        this.munuY = 220;
        this.menuOffsetY = 20;
        this.menuItems = 3;
        this.curItem = 0;
        this.currentState;
        this.canInput = true;

        // background image or WebGL Shader
        this.background = this.gameObjectFactory.createBackGround01();

        var logo = this.game.add.sprite(160, 10, "atlas_1", "logo.png");
        logo.scale.setTo(0.5);


        this.newGame = this.game.add.sprite(this.menuX, this.munuY + this.menuOffsetY*0, "atlas_1", "menu_items7.png");
        this.continue = this.game.add.sprite(this.menuX, munuY + this.menuOffsetY*1, "atlas_1", "menu_items9.png");
        this.options = this.game.add.sprite(this.menuX, this.munuY + this.menuOffsetY*2, "atlas_1", "menu_items10.png");
        this.about = this.game.add.sprite(this.menuX, this.munuY + this.menuOffsetY*3, "atlas_1", "menu_items11.png");
        this.game.add.sprite(this.menuX+25, 340, "atlas_1", "menu_items13.png");

        this.arrow = this.game.add.sprite(250, this.munuY + this.menuOffsetY*0, "atlas_1", "arrow.png");

        this.game.camera.flash(0x000000, 300);
        this.currentState = this.topMenu;
    },
    
    update: function () {
        this.currentState();
        // update bg
        this.background._filter.update();
    }    
};

AdslJumper.menuState.prototype.updateMenu = function () {
    if (this.input.jumpIsJustDown() && this.canInput) {
        this.setMenu("down");
    } else if(this.input.downIsJustDown() && this.canInput) {
        this.setMenu("up");
    } else if (this.input.selectButtonIsJustDown() && this.canInput) {
        this.soundManager.playMenuSelect(1);
        if (this.curItem === 0) {
            this.game.camera.fade(0x000000, 800);
            this.continue.kill();
            this.options.kill();
            this.about.kill();
            this.game.camera.onFadeComplete.addOnce(function() {
                this.soundManager.currentTrack.stop();
                this.soundManager.currentTrack = null;
                // play
                this.game.state.start("play");
            }, this);
        } 
    }
}

// void
AdslJumper.menuState.prototype.setMenu = function (val) {
    if (val === "down") {
        this.curItem--;
        if (this.curItem < 0) {
            this.curItem = this.menuItems;
        }
        this.arrow.y =this.munuY + this.menuOffsetY*this.curItem;
        this.soundManager.playMenuSelect(0);
    } else if (val === "up") {
        this.curItem++;
        if (this.curItem > this.menuItems) {
            this.curItem = 0;
        }
        this.arrow.y = this.munuY + this.menuOffsetY*this.curItem;
        this.soundManager.playMenuSelect(0);
    }
}

// void
AdslJumper.menuState.prototype.topMenu = function () {
    this.updateMenu();
}