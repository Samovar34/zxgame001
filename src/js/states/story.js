AdslJumper.storyState = function (game) {};

AdslJumper.storyState.prototype = {
    create: function () {
        // set level -1
        _level = -1;

        // variables
        this.isRunning = false;
        this.flashTime = 500;
        this.fadeTime = 500;
        this.stateTime = 1500;
        this.longStateTime = 6000;

        this.textOffestX = 360;

        this.chooseLangComplete = false;


        this.currentState = this.chooseLang;

        // display layers
        this.imagesLayer = this.game.add.group();
        this.textLayer = this.game.add.group();

        // // music
        // if (SoundManager.currentTrack) {
        //     SoundManager.playTrack();
        // } else {
        //     console.error("story state without music!");
        // }
    },
    update: function () {
        Input.update();
        this.currentState();

        // skip
        if (Input.dz === 1) {
            if (this.currentState === this.chooseLang && !this.chooseLangComplete) {
                this.chooseLangComplete = true;
                if (this.arrow.position.y === 280) {
                    _lang = "en";
                } else {
                    _lang = "ru";
                }

                SoundManager.playMenuSelect(1);

                this.game.camera.fade(0x000000, this.fadeTime);
                this.game.camera.onFadeComplete.addOnce(this.afterChooseLang, this);

                return;
            }

            if (this.currentState !== this.showSlide0 && this.currentState !== this.showSlide1) {

                // remove all callbacks
                this.camera.onFadeComplete.removeAll();
                this.camera.onFadeComplete.removeAll();
                this.game.state.start("menu");
            }

        }
    }
};

AdslJumper.storyState.prototype.chooseLang = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        this.arrow = this.game.add.sprite(320, 220, "atlas_1", "arrow.png");
        this.arrow.smoothed = false;
        this.arrow.scale.setTo(_scaleFactor);

        var langRuImg = this.imagesLayer.add(this.make.image(370, 220, "atlas_1", "lang_ru.png"));
        langRuImg.smoothed = false;
        langRuImg.scale.setTo(_scaleFactor);

        var langEnImg = this.imagesLayer.add(this.make.image(370, 280, "atlas_1", "lang_en.png"));
        langEnImg.smoothed = false;
        langEnImg.scale.setTo(_scaleFactor);
    } else {
        if (Input.dy === 1) {
            if (this.arrow.position.y === 280) {
                this.arrow.position.y = 220;
            } else {
                this.arrow.position.y = 280;
            }

            SoundManager.playMenuSelect(0);
        } else if (Input.dy === -1) {
            if (this.arrow.position.y === 280) {
                this.arrow.position.y = 220;
            } else {
                this.arrow.position.y = 280;
            }

            SoundManager.playMenuSelect(0);
        }
    }
};

AdslJumper.storyState.prototype.afterChooseLang = function() {

    this.currentState = this.showSlide0;
    this.clearLayers();
    this.arrow.kill();
    this.isRunning = false;

    // music
    try {
        SoundManager.playTrack();
    } catch (err) {
        console.error("Story state music error " + err.message);
    }
};

// screen 1 logo
AdslJumper.storyState.prototype.showSlide0 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        // add image to display
        var image1 = this.imagesLayer.add(this.game.make.image(290, 180, "atlas_1", "vendor.png"));
        image1.smoothed = false;
        image1.scale.setTo(_scaleFactor);

        var image2 = this.imagesLayer.add(this.game.make.image(448, 500, "atlas_1", "year.png"));
        image2.smoothed = false;
        image2.scale.setTo(_scaleFactor);

        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide0, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide0 = function () {
    this.game.time.events.add(this.stateTime, this.afterSlide0, this);
};

AdslJumper.storyState.prototype.afterSlide0 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide1;
    }, this);
};

// screen 2 vendors
AdslJumper.storyState.prototype.showSlide1 = function () {
    if (!this.isRunning) {
        this.isRunning = true;

        var image1 = this.imagesLayer.add(this.game.make.image(200, 190, "atlas_1", "phaser_logo.png"));
        image1.smoothed = false;
        image1.scale.setTo(_scaleFactor);

        var image2 = this.imagesLayer.add(this.game.make.image(652, 210, "atlas_1", "icon_html5.png"));
        image2.smoothed = false;
        image2.scale.setTo(_scaleFactor);

        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide1, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide1 = function () {
    this.game.time.events.add(this.stateTime, this.afterSlide1, this);
};

AdslJumper.storyState.prototype.afterSlide1 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;

        this.currentState = this.showSlide2;
    }, this);
};

// screen 3 town
AdslJumper.storyState.prototype.showSlide2 = function () {
    if (!this.isRunning) {
        this.isRunning = true;

        var image = this.imagesLayer.add(this.game.make.image(64, 144, "atlas_1", "town.png"));
        image.smoothed = false;
        image.scale.setTo(_scaleFactor);
        


        if (_lang === "ru") {

            // skip button
            this.game.add.sprite(840, 516, "atlas_1", "menu_items15.png");
            // text ru
            this.stringToSprite(this.textOffestX, 144, "Это самый обычный вечер.");
            this.stringToSprite(this.textOffestX, 144 + 30, "Народ сидит в интернете");
            this.stringToSprite(this.textOffestX, 144 + 30 * 2, "либо перед телеком.");
            this.stringToSprite(this.textOffestX, 144 + 30 * 3  , "И все счастливы.");
        } else {

            // skip button
            this.game.add.sprite(900, 516, "atlas_1", "menu_items14.png");
            // text en
            this.stringToSprite(this.textOffestX, 144, "It was the most normal of evenings.");
            this.stringToSprite(this.textOffestX, 144 + 30, "People were sat at home,");
            this.stringToSprite(this.textOffestX, 144 + 30 * 2, "browsing the internet or watching TV.");
            this.stringToSprite(this.textOffestX, 144 + 30 * 3  , "Everyone was just happy.");
        }


        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide2, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide2 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide2, this);
};

AdslJumper.storyState.prototype.afterSlide2 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide3;
    }, this);
};

// screen 4 but
AdslJumper.storyState.prototype.showSlide3 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        var image = this.imagesLayer.add( this.game.make.image(464, 252, "atlas_1", "menu_items12.png"));
        image.smoothed = false;
        image.scale.setTo(_scaleFactor);

        if (_lang === "en") {
            image.frameName = "menu_items6.png";
        }

        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide3, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide3 = function () {
    this.game.time.events.add(this.longStateTime/2, this.afterSlide3, this);
};

AdslJumper.storyState.prototype.afterSlide3 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide4;
    }, this);
};

// screen 5 lag
AdslJumper.storyState.prototype.showSlide4 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        
        var image = this.imagesLayer.add(this.make.image(32, 90, "atlas_1", "lag.png"));
        image.smoothed = false;
        image.scale.setTo(_scaleFactor);

        if (_lang === "ru") {
            // text ru
            this.stringToSprite(this.textOffestX, 144,  "Из внешнего мира появился");
            this.stringToSprite(this.textOffestX, 144 + 30, "злодей по имени ЛАГ. Он");
            this.stringToSprite(this.textOffestX, 144 + 60, "похитил интернет!");
        } else {
            // text en
            this.stringToSprite(this.textOffestX, 144,  "From the real world emerged a villain,");
            this.stringToSprite(this.textOffestX, 144 + 30, "he name was LAG! He kidnapped");
            this.stringToSprite(this.textOffestX, 144 + 60, "the internet!");
        }


        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide4, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide4 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide4, this);
};

AdslJumper.storyState.prototype.afterSlide4 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide5;
    }, this);
};

// screen 6 no internet
AdslJumper.storyState.prototype.showSlide5 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        
        var image = this.imagesLayer.add(this.game.make.image(54, 144, "atlas_1", "no_internet.png"));
        image.smoothed = false;
        image.scale.setTo(_scaleFactor);


        if (_lang === "ru") {
            // text ru
            this.stringToSprite(this.textOffestX, 144,  "Перестал работать интернет.");
            this.stringToSprite(this.textOffestX, 144 + 30, "Жизнь остановилась...");
            this.stringToSprite(this.textOffestX, 144 + 60, "а люди стали несчастными!");
        } else {
            // text en
            this.stringToSprite(this.textOffestX, 144,  "The internet stopped working.");
            this.stringToSprite(this.textOffestX, 144 + 30, "Life had stopped...");
            this.stringToSprite(this.textOffestX, 144 + 60, "and the people became miserable!");
        }


        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide5, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide5 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide5, this);
};

AdslJumper.storyState.prototype.afterSlide5 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide6;
    }, this);
};

// screen 7 hero
AdslJumper.storyState.prototype.showSlide6 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        
        var image = this.imagesLayer.add(this.game.make.image(32, 122, "atlas_1", "hero.png"));
        image.smoothed = false;
        image.scale.setTo(_scaleFactor);

        if (_lang === "ru") {
            // text ru
            this.stringToSprite(this.textOffestX, 144,      "Единственный кто может");
            this.stringToSprite(this.textOffestX, 144 + 30, "спасти интернет это ");
            this.stringToSprite(this.textOffestX, 144 + 60, "бравый мастер местного ");
            this.stringToSprite(this.textOffestX, 144 + 90, "провайдера! ");
        } else {
            // text en
            this.stringToSprite(this.textOffestX, 144,      "The only one who could save the");
            this.stringToSprite(this.textOffestX, 144 + 30, "internet was a brave repairman from");
            this.stringToSprite(this.textOffestX, 144 + 60, "a local provider.");
        }


        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide6, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide6 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide6, this);
};

AdslJumper.storyState.prototype.afterSlide6 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide7;
    }, this);
};

// screen 7 bitcoins
AdslJumper.storyState.prototype.showSlide7 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        var image = this.imagesLayer.add(this.game.make.image(42, 90, "atlas_1", "drop_bitcoins.png"));
        image.smoothed = false;
        image.scale.setTo(_scaleFactor);

        if (_lang === "ru") {
            // text ru
            this.stringToSprite(this.textOffestX, 144,      "Интернет верит что его");
            this.stringToSprite(this.textOffestX, 144 + 30, "спасут. По этому он");
            this.stringToSprite(this.textOffestX, 144 + 60, "раскидал по пути биткоины");
            this.stringToSprite(this.textOffestX, 144 + 90, "что бы его смогли найти.");
        } else {
            // text en
            this.stringToSprite(this.textOffestX, 144,      "The internet believes that it will");
            this.stringToSprite(this.textOffestX, 144 + 30, "be saved. Thats why it has dropped");
            this.stringToSprite(this.textOffestX, 144 + 60, "bitcoins along the path, leading");
            this.stringToSprite(this.textOffestX, 144 + 90, "to its rescue.");
        }


        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide7, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide7 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide7, this);
};

AdslJumper.storyState.prototype.afterSlide7 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {
       
        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide8;
    }, this);
};

// screen 8 hero run
AdslJumper.storyState.prototype.showSlide8 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        
        var image = this.imagesLayer.add(this.game.add.image(48, 90, "atlas_1", "hero_run.png"));
        image.smoothed = false;
        image.scale.setTo(_scaleFactor);

        if (_lang === "ru") {
            // text ru
            this.stringToSprite(this.textOffestX, 144,  "Ничто его не остановит!");
            this.stringToSprite(this.textOffestX, 144 + 30, "Ведь счастье людей в");
            this.stringToSprite(this.textOffestX, 144 + 60, "его руках. Только вперед.");
        } else {
            // text en
            this.stringToSprite(this.textOffestX, 144,      "Nothing will stop the brave repairman!");
            this.stringToSprite(this.textOffestX, 144 + 30, "As the peoples happiness is in his hands.");
            this.stringToSprite(this.textOffestX, 144 + 60, "Lets go!");
        }


        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide8, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide8 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide8, this);
};

AdslJumper.storyState.prototype.afterSlide8 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.game.state.start("menu");
    }, this);
};

// utils
AdslJumper.storyState.prototype.clearLayers = function () {
    this.imagesLayer.removeAll(true, true);
    this.textLayer.removeAll(true, true);
};

// FONT WORKER
AdslJumper.storyState.prototype.stringToSprite = function (x, y, line) {
    for (var i = 0; i < line.length; i++) {
        this.textLayer.add(this.game.make.sprite(x + 14 * i, y, "atlas_1", this.codeToImg[line[i].charCodeAt()]));
    }
};

var fontName = "font_frame";
AdslJumper.storyState.prototype.codeToImg = {
    "32": fontName + "34.png", // space
    "33": fontName + "121.png", // !
    "46": fontName + "133.png", // .
    "44": fontName + "134.png", // .
    
    // en lowercase
    "97": fontName + "68.png",
    "98": fontName + "69.png",
    "99": fontName + "70.png",
    "100": fontName + "71.png",
    "101": fontName + "72.png",
    "102": fontName + "73.png",
    "103": fontName + "74.png",
    "104": fontName + "75.png",
    "105": fontName + "76.png",
    "106": fontName + "77.png",
    "107": fontName + "78.png",
    "108": fontName + "79.png",
    "109": fontName + "80.png",
    "110": fontName + "81.png",
    "111": fontName + "82.png",
    "112": fontName + "83.png",
    "113": fontName + "84.png",
    "114": fontName + "85.png",
    "115": fontName + "86.png",
    "116": fontName + "87.png",
    "117": fontName + "88.png",
    "118": fontName + "89.png",
    "119": fontName + "90.png",
    "120": fontName + "91.png",
    "121": fontName + "92.png",
    "122": fontName + "93.png",

    // en uppercase
    "65": fontName + "94.png",
    "66": fontName + "95.png",
    "67": fontName + "96.png",
    "68": fontName + "97.png",
    "69": fontName + "98.png",
    "70": fontName + "99.png",
    "71": fontName + "100.png",
    "72": fontName + "101.png",
    "73": fontName + "102.png",
    "74": fontName + "103.png",
    "75": fontName + "104.png",
    "76": fontName + "105.png",
    "77": fontName + "106.png",
    "78": fontName + "107.png",
    "79": fontName + "108.png",
    "80": fontName + "109.png",
    "81": fontName + "110.png",
    "82": fontName + "111.png",
    "83": fontName + "112.png",
    "84": fontName + "113.png",
    "85": fontName + "114.png",
    "86": fontName + "115.png",
    "87": fontName + "116.png",
    "88": fontName + "117.png",
    "89": fontName + "118.png",
    "90": fontName + "119.png",

    // rus lowercase
    "1072": fontName + "1.png",
    "1073": fontName + "2.png",
    "1074": fontName + "3.png",
    "1075": fontName + "4.png",
    "1076": fontName + "5.png",
    "1077": fontName + "6.png",
    "1105": fontName + "7.png",
    "1078": fontName + "8.png",
    "1079": fontName + "9.png",
    "1080": fontName + "10.png",
    "1081": fontName + "11.png",
    "1082": fontName + "12.png",
    "1083": fontName + "13.png",
    "1084": fontName + "14.png",
    "1085": fontName + "15.png",
    "1086": fontName + "16.png",
    "1087": fontName + "17.png",
    "1088": fontName + "18.png",
    "1089": fontName + "19.png",
    "1090": fontName + "20.png",
    "1091": fontName + "21.png",
    "1092": fontName + "22.png",
    "1093": fontName + "23.png",
    "1094": fontName + "24.png",
    "1095": fontName + "25.png",
    "1096": fontName + "26.png",
    "1097": fontName + "27.png",
    "1098": fontName + "28.png",
    "1099": fontName + "29.png",
    "1100": fontName + "30.png",
    "1101": fontName + "31.png",
    "1102": fontName + "32.png",
    "1103": fontName + "33.png",

    // rus uppercase
    "1040": fontName + "35.png",
    "1041": fontName + "36.png",
    "1042": fontName + "37.png",
    "1043": fontName + "38.png",
    "1044": fontName + "39.png",
    "1045": fontName + "40.png",
    "1025": fontName + "41.png",
    "1046": fontName + "42.png",
    "1047": fontName + "43.png",
    "1048": fontName + "44.png",
    "1049": fontName + "45.png",
    "1050": fontName + "46.png",
    "1051": fontName + "47.png",
    "1052": fontName + "48.png",
    "1053": fontName + "49.png",
    "1054": fontName + "50.png",
    "1055": fontName + "51.png",
    "1056": fontName + "52.png",
    "1057": fontName + "53.png",
    "1058": fontName + "54.png",
    "1059": fontName + "55.png",
    "1060": fontName + "56.png",
    "1061": fontName + "57.png",
    "1062": fontName + "58.png",
    "1063": fontName + "59.png",
    "1064": fontName + "60.png",
    "1065": fontName + "61.png",
    "1066": fontName + "62.png",
    "1067": fontName + "63.png",
    "1068": fontName + "64.png", //Ь
    "1069": fontName + "65.png",
    "1070": fontName + "66.png",
    "1071": fontName + "67.png"
};