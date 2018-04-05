// level specific create functions
AdslJumper.gameFunc.create ={
    "2": function () {
        this.flyingThorn1 = this.traps.getByName("flyingThorn1");
        this.flyingThorn2 = this.traps.getByName("flyingThorn2");  
    },

    "3": function () {
        this.platforms = this.game.add.group();

        this.platforms.add(this.gameObjectFactory.PlatformA.call(this, 180, 176, 0.7, true));
        this.platforms.add(this.gameObjectFactory.PlatformA.call(this, 340, 168, 0.9, false));
        this.platforms.add(this.gameObjectFactory.PlatformA.call(this, 500, 176, 1, true));

        this.flyingThorn = this.traps.getByName("flyingThorn");

    }
};