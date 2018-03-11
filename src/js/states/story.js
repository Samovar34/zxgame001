AdslJumper.storyState = function (game) {};

AdslJumper.storyState.prototype = {
    create: function () {
        // modules
        this.soundManager = AdslJumper.modules.soundManager;
        this.input = new AdslJumper.Input(this.game);

        // variables
        this.isRunning = false;
        this.flashTime = 500;
        this.fadeTime = 500;
        this.stateTime = 1500;
        this.longStateTime = 4500;

        this.currentState = this.showSlide0;

        // display layers
        this.imagesLayer = this.game.add.group();
        this.textLayer = this.game.add.group();

        // music
        if (this.soundManager.currentTrack) {
            this.soundManager.playTrack();
        } else {
            console.error("story state without music!");
        }
    },
    update: function () {
        this.currentState();

        if (this.input.selectButtonIsJustDown()) {
            if (this.currentState != this.showSlide0 && this.currentState != this.showSlide1)
            this.game.state.start("menu");
        }
    }
};

// screen 1 logo
AdslJumper.storyState.prototype.showSlide0 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        // add image to display
        this.imagesLayer.add(this.game.make.sprite(0, 0, "atlas_1", "samovar_screen.png"));
        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide0, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide0 = function () {
    this.game.time.events.add(this.stateTime, this.afterSlide0, this);
}

AdslJumper.storyState.prototype.afterSlide0 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide1;
    }, this);
}

// screen 2 vendors
AdslJumper.storyState.prototype.showSlide1 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        this.imagesLayer.add(this.game.make.sprite(134, 32, "atlas_1", "phaser_logo.png"));
        this.imagesLayer.add(this.game.make.sprite(274, 200, "atlas_1", "icon_html5.png"));
        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide1, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide1 = function () {
    this.game.time.events.add(this.stateTime, this.afterSlide1, this);
}

AdslJumper.storyState.prototype.afterSlide1 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide2;
    }, this);
}

// screen 3 town
AdslJumper.storyState.prototype.showSlide2 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        this.imagesLayer.add(this.game.make.sprite(32, 88, "atlas_1", "town.png"));
        
        // skip button
        this.game.add.sprite(540, 340, "atlas_1", "menu_items15.png");
        // text
        this.stringToSprite(280, 90, "Это самый обычный вечер.");
        this.stringToSprite(280, 112    , "Народ сидит в интернете");
        this.stringToSprite(280, 134    , "либо перед телеком. И");
        this.stringToSprite(280, 156    , "все счастливы!");

        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide2, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide2 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide2, this);
}

AdslJumper.storyState.prototype.afterSlide2 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide3;
    }, this);
}

// screen 4 but
AdslJumper.storyState.prototype.showSlide3 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        this.imagesLayer.add( this.game.make.sprite(310, 170, "atlas_1", "menu_items12.png"));
        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide3, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide3 = function () {
    this.game.time.events.add(this.longStateTime/2, this.afterSlide3, this);
}

AdslJumper.storyState.prototype.afterSlide3 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers()

        this.isRunning = false;
        this.currentState = this.showSlide4;
    }, this);
}

// screen 5 lag
AdslJumper.storyState.prototype.showSlide4 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        
        this.imagesLayer.add(this.game.make.sprite(-16, 0, "atlas_1", "lag.png"));

        // text
        this.stringToSprite(300, 90,  "Из внешнего мира");
        this.stringToSprite(300, 112, "появился злодей по");
        this.stringToSprite(300, 134, "имени ЛАГ! Он похи");
        this.stringToSprite(300, 156, "тил интернет!");

        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide4, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide4 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide4, this);
}

AdslJumper.storyState.prototype.afterSlide4 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide5;
    }, this);
}

// screen 6 no internet
AdslJumper.storyState.prototype.showSlide5 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        
        this.imagesLayer.add(this.game.make.sprite(2, 60, "atlas_1", "no_internet.png"));

        // text
        this.stringToSprite(270, 90,  "Перестал работать интернет.");
        this.stringToSprite(270, 112, "Жизнь остановилась...");
        this.stringToSprite(270, 134, "а люди стали несчастными!");

        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide5, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide5 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide5, this);
}

AdslJumper.storyState.prototype.afterSlide5 = function () {
    this.game.camera.fade(0x000000, this.fadeTime);
    this.game.camera.onFadeComplete.addOnce(function () {

        this.clearLayers();

        this.isRunning = false;
        this.currentState = this.showSlide6;
    }, this);
}

// screen 7 hero
AdslJumper.storyState.prototype.showSlide6 = function () {
    if (!this.isRunning) {
        this.isRunning = true;
        
        this.imagesLayer.add(this.game.make.sprite(-32, 0, "atlas_1", "hero.png"));

        // text
        this.stringToSprite(290, 90,  "Единственный кто может");
        this.stringToSprite(290, 112, "спасти интернет это ");
        this.stringToSprite(290, 134, "бравый мастер местного ");
        this.stringToSprite(290, 156, "провайдера! ");

        this.game.camera.flash(0x000000, this.flashTime);
        this.game.camera.onFlashComplete.addOnce(this.beforeSlide6, this);
    }
};

AdslJumper.storyState.prototype.beforeSlide6 = function () {
    this.game.time.events.add(this.longStateTime, this.afterSlide6, this);
}

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
        this.imagesLayer.add(this.game.make.sprite(-32, 0, "atlas_1", "drop_bitcoins.png"));
        // text
        this.stringToSprite(280, 90,  "Интернет верит что его");
        this.stringToSprite(280, 112, "спасут. По этому он");
        this.stringToSprite(280, 134, "раскидал по пути биткоины");
        this.stringToSprite(280, 156, "что бы его смогли найти.");

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
        
        this.imagesLayer.add(this.game.add.sprite(0, 0, "atlas_1", "hero_run.png"));

        // text
        this.stringToSprite(290, 90,  "Ничто его не остановит!");
        this.stringToSprite(290, 112, "Ведь счастье людей в");
        this.stringToSprite(290, 134, "его руках. Только вперед.");

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
}

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
    
    // en lowercase
    "97": fontName + "66.png",
    "98": fontName + "67.png",
    "99": fontName + "68.png",
    "100": fontName + "69.png",
    "101": fontName + "70.png",
    "102": fontName + "71.png",
    "103": fontName + "72.png",
    "104": fontName + "73.png",
    "105": fontName + "74.png",
    "106": fontName + "75.png",
    "107": fontName + "76.png",
    "108": fontName + "77.png",
    "109": fontName + "78.png",
    "110": fontName + "79.png",
    "111": fontName + "80.png",
    "112": fontName + "81.png",
    "113": fontName + "82.png",
    "114": fontName + "83.png",
    "115": fontName + "84.png",
    "116": fontName + "85.png",
    "117": fontName + "86.png",
    "118": fontName + "87.png",
    "119": fontName + "88.png",
    "120": fontName + "89.png",
    "121": fontName + "90.png",
    "122": fontName + "91.png",

    // en uppercase
    "97": fontName + "66.png",
    "98": fontName + "67.png",
    "99": fontName + "68.png",
    "100": fontName + "69.png",
    "101": fontName + "70.png",
    "102": fontName + "71.png",
    "103": fontName + "72.png",
    "104": fontName + "73.png",
    "105": fontName + "74.png",
    "106": fontName + "75.png",
    "107": fontName + "76.png",
    "108": fontName + "77.png",
    "109": fontName + "78.png",
    "110": fontName + "79.png",
    "111": fontName + "80.png",
    "112": fontName + "81.png",
    "113": fontName + "82.png",
    "114": fontName + "83.png",
    "115": fontName + "84.png",
    "116": fontName + "85.png",
    "117": fontName + "86.png",
    "118": fontName + "87.png",
    "119": fontName + "88.png",
    "120": fontName + "89.png",
    "121": fontName + "90.png",
    "122": fontName + "91.png",

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