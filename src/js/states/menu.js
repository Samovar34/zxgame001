AdslJumper.menuState = {
    create: function () {
        // set level
        _level = 0;

        AdslJumper.gameObjectFactory.init(this);

        // variables
        this.menuX = 440;
        this.munuY = 380;
        this.menuOffsetY = 24;
        this.menuItems = 3;
        this.curItem = 0;
        this.currentState;
        this.canInput = true;

        this.logo = this.game.add.sprite(160, 0, "atlas_1", "logo.png");
        this.logo.smoothed = false;
        this.logo.scale.setTo(_scaleFactor);
        //logo.alpha = 0.4;


        this.newGame = this.game.add.image(this.menuX, this.munuY, "atlas_1", "menu_items7.png");
        this.continue = this.game.add.image(this.menuX, this.munuY + this.menuOffsetY, "atlas_1", "menu_items9.png");
        this.options = this.game.add.image(this.menuX, this.munuY + this.menuOffsetY*2, "atlas_1", "menu_items10.png");
        this.about = this.game.add.image(this.menuX, this.munuY + this.menuOffsetY*3, "atlas_1", "menu_items11.png");
        this.game.add.image(this.menuX+25, 520, "atlas_1", "menu_items13.png");

        if (_lang === "en") {
            this.newGame.frameName = "menu_items1.png";
            this.continue.frameName = "menu_items3.png";
            this.options.frameName = "menu_items4.png";
            this.about.frameName = "menu_items5.png";
        }

        this.arrow = this.game.add.image(this.menuX - 20, this.munuY, "atlas_1", "arrow.png");

        this.game.camera.flash(0x000000, 300);

        this.currentState = this.topMenu;
    },
    
    update: function () {
        Input.update();
        this.currentState();
    },

    updateMenu: function () {
        if (Input.dy === 1 && this.canInput) {
            this.setMenu("down");
        } else if (Input.dy === -1 && this.canInput) {
            this.setMenu("up");
        } else if (Input.dz === 1 && this.canInput) {
            SoundManager.playMenuSelect(1);

            // start new game
            if (this.curItem === 0) {
                this.canInput = false;
                this.game.camera.fade(0x000000, 800);
                this.continue.kill();
                this.options.kill();
                this.about.kill();
                this.game.camera.onFadeComplete.addOnce(function () {

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
                this.logo.alpha = 0.4;
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