var test = null;
var AdslJumper = (function () {
    /** @global
	 * 	@type object
	 * */
	var AdslJumper = {};

	// global game variables
    /** @global
     * 	@type {number}
     * */
	var _level = 0; // 0 - story
    /** @global
     * 	@type {number}
     * */
	var _score = 0;
    /**
	 * 	@global
     * 	@type {string}
     * */
	var _lang = "en"; // ru en de
    /** @global
     * 	@type {number}
     * */
    var _deaths = 0;
    /** @global
     * 	@type {number}
     * */
    var _levelDeaths = 0;

    /**
	 * @global
     * @type {number}
     */
    var _scaleFactor = 2;

    /**
     * Phaser.Game instance
     * @global
	 * @type {Phaser.Game}
	 * */
    var Game;

    /**
     * input manager instance
     * @global
     * @type {AdslJumper.Input}
     */
    var Input;

    /**
     * sound manager instance
     * @global
     * @type {AdslJumper.SoundManager}
     */
    var SoundManager;

    /**
     * start game time in ms
     * @global
     * @type {number}
     */
    var START_TIME = 0; // значение задается либо в 1уровне либо загружается из localStorage

    //@@include('./include.js')

    /**
	 * init game, create states and run boot state
     */
	AdslJumper.init = function () {
        Game = new Phaser.Game(
            {
                width: 960, // 1136 1024
                height: 540, // 640  576
                renderer: Phaser.AUTO,
                enableDebug: true,
                antialias: false
            }
        );
        Game.state.add("boot", AdslJumper.bootState);
        Game.state.add("preload", AdslJumper.preloadState);
        Game.state.add("story", AdslJumper.storyState);
        Game.state.add("menu", AdslJumper.menuState);
        Game.state.add("waitDecodeAudio", AdslJumper.waitDecodeAudio);

        // levels
        Game.state.add("level1", AdslJumper.level1);
        Game.state.add("level2", AdslJumper.level2);
        Game.state.add("level3", AdslJumper.level3);
        Game.state.add("level4", AdslJumper.level4);
        Game.state.add("level5", AdslJumper.level5);

        Game.state.start("boot");
	};

	return AdslJumper;
})();

window.onload = AdslJumper.init;




