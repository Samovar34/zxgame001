AdslJumper.menuState = {
    create: function () {
        AdslJumper.gameObjectFactory.init(this);

        // variables
        this.menuX = 272;
        this.munuY = 150;
        this.menuOffsetY = 20;
        this.menuItems = 3;
        this.curItem = 0;
        this.currentState;
        this.canInput = true;

        var logo = this.game.add.sprite(0, 0, "atlas_1", "logo.png");
        logo.scale.setTo(1);
        logo.alpha = 0.4;


        this.newGame = this.game.add.sprite(this.menuX, this.munuY + this.menuOffsetY*0, "atlas_1", "menu_items7.png");
        this.continue = this.game.add.sprite(this.menuX, this.munuY + this.menuOffsetY*1, "atlas_1", "menu_items9.png");
        this.options = this.game.add.sprite(this.menuX, this.munuY + this.menuOffsetY*2, "atlas_1", "menu_items10.png");
        this.about = this.game.add.sprite(this.menuX, this.munuY + this.menuOffsetY*3, "atlas_1", "menu_items11.png");
        this.game.add.sprite(this.menuX+25, 340, "atlas_1", "menu_items13.png");

        this.arrow = this.game.add.sprite(250, this.munuY + this.menuOffsetY*0, "atlas_1", "arrow.png");

        this.game.camera.flash(0x000000, 300);
        this.currentState = this.topMenu;
    },
    
    update: function () {
        Input.update();
        this.currentState();
    },

    updateMenu: function () {
        if (Input.jumpIsJustDown() && this.canInput) {
            this.setMenu("down");
        } else if (Input.downIsJustDown() && this.canInput) {
            this.setMenu("up");
        } else if (Input.selectButtonIsJustDown() && this.canInput) {
            SoundManager.playMenuSelect(1);

            // start new game
            if (this.curItem === 0) {
                this.game.camera.fade(0x000000, 800);
                this.continue.kill();
                this.options.kill();
                this.about.kill();
                this.game.camera.onFadeComplete.addOnce(function () {
                    SoundManager.currentTrack.stop();
                    SoundManager.currentTrack = null;

                    // clear cache
                    this.game.cache.removeTextureAtlas("atlas_1");
                    this.game.cache.removeSound("intro");

                    _level = 1;

                    // play
                    this.game.state.start("waitDecodeAudio");
                }, this);
            } else if (this.curItem === 1) {
                console.log("начать с того места где остановился");
            } else if (this.curItem === 2) {
                console.log("показать настройки");
            } else {
                console.log("тут будет о игре");
            }
        }
    },

    setMenu: function (val) {
        if (val === "down") {
            this.curItem--;
            if (this.curItem < 0) {
                this.curItem = this.menuItems;
            }
            this.arrow.y =this.munuY + this.menuOffsetY*this.curItem;
            SoundManager.playMenuSelect(0);
        } else if (val === "up") {
            this.curItem++;
            if (this.curItem > this.menuItems) {
                this.curItem = 0;
            }
            this.arrow.y = this.munuY + this.menuOffsetY*this.curItem;
            SoundManager.playMenuSelect(0);
        }
    },

    topMenu: function () {
        this.updateMenu();
    }
};