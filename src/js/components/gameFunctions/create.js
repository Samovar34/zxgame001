// level specific create functions
AdslJumper.gameFunc.create ={
    "2": function () {
        this.flyingThorn1 = this.traps.getByName("flyingThorn1");
        this.flyingThorn2 = this.traps.getByName("flyingThorn2");  

        this.exitDoor.open(true);
    },

    "3": function () {
        this.platforms = this.game.add.group();

        this.platforms.add(this.gameObjectFactory.PlatformA.call(this, 180, 176, 0.7, true));
        this.platforms.add(this.gameObjectFactory.PlatformA.call(this, 340, 168, 0.9, false));
        this.platforms.add(this.gameObjectFactory.PlatformA.call(this, 500, 176, 1, true));

        this.flyingThorn = this.traps.getByName("flyingThorn");

        this.exitDoor.open(true);

    },

    "4": function () {
        this.game.world.setBounds(0, 0, 992, 512);

        this.exitDoor.open(true);

        this.platforms = this.game.add.group();
        this.curPlatformNumber = 0;

        // create platforms
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 200 , 380));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 400 , 380));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 600 , 380));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 748 , 334));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 590 , 280));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 432 , 248));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 264 , 210));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 368 , 140));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 564 , 158));
        this.platforms.add(this.gameObjectFactory.PlatformB.call(this, 774 , 164));

        // this.platforms.setAll("alive", false);
        // this.platforms.setAll("exists", false);
        // this.platforms.setAll("visible", false);  
        
        // // setAlive first element
        // this.platforms.getAt(0).revive();         
    },

    "5": function () {
        this.game.world.setBounds(0, 0, 640, 480);
        this.exitDoor.open(true);
    }
};