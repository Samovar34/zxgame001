AdslJumper.preloadState = function (game) {};

AdslJumper.preloadState.prototype = {
    preload: function () {
        // load assets
        for (var i = 0; i <= 1; i++) {
            this.game.load.tilemap('map' + i, 'assets/levels/level' + i + ".json", null, Phaser.Tilemap.TILED_JSON);
        }

        // test atlas
        this.game.load.atlas("atlas_1", 'assets/images/atlas1/atlas.png', 'assets/images/atlas1/atlas.json'); 
        this.game.load.atlas("atlas_2", 'assets/images/atlas2/atlas.png', 'assets/images/atlas2/atlas.json'); 

        // audio
        this.load.audio('jump', 'assets/audio/jump.wav');
        this.load.audio('openDoor', 'assets/audio/openDoor.mp3');
        this.load.audio('closeDoor', 'assets/audio/closeDoor.mp3');
        this.load.audio('getCoin', 'assets/audio/coin.wav');
        this.load.audio('doubleJump', 'assets/audio/doubleJump.wav');
        this.load.audio('playerDeath', 'assets/audio/playerDeath.wav');
        this.load.audio('step01', 'assets/audio/step01.wav');
        this.load.audio('step02', 'assets/audio/step02.wav');
        this.load.audio('punch', 'assets/audio/punch.wav');
        this.load.audio('explosion', 'assets/audio/explosion.wav');
        this.load.audio('menu_select_0', 'assets/audio/menu_select_0.wav');
        this.load.audio('menu_select_1', 'assets/audio/menu_select_1.wav');


        // music
        this.load.audio('intro', 'assets/audio/intro.mp3');   
        this.load.audio('track01', 'assets/audio/track01.ogg');
        //this.load.audio('track02', 'assets/audio/track02.mp3');

        // shaders
        this.game.load.shader('testShader', 'assets/shaders/test.frag');
    },

    create: function () {
        // init game components
        AdslJumper.modules.soundManager = new AdslJumper.SoundManager(this.game);
        AdslJumper.modules.inputManager = new AdslJumper.Input(this.game);
        AdslJumper.modules.gameObjectFactory = new AdslJumper.GameObjectFactory(this.game);

        AdslJumper.data = {
            level: 0,
            score: 0
        };

        // Create bitmapData which will use as a image texture
        var tileMapImage = game.add.bitmapData(1024, 1024);
        tileMapImage.draw(this.game.make.image(0, 0, "atlas_2", "adsl_world_tilemap.png"));
        
        //	Put the bitmapData into the cache. For tileMap.
        this.game.cache.addBitmapData('tileMapImage', tileMapImage);

        //this.game.state.start("story");
        // // TODO delete
        this.game.state.start("play");
    }
}