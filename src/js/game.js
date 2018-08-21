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
	var _level = 0;
    /** @global
     * 	@type {number}
     * */
	var _score = 0;
    /**
	 * 	@global
     * 	@type {string}
     * */
	var _lang = "ru";
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

    /** @global
	 * @type {Phaser.Game}
	 * */
    var _game;

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
	 * loaded game components, such Input, SoundManager
     * @type {{}}
     */
    AdslJumper.modules = {};

    //@@include('./include.js')

    /**
	 * init game, create states and run boot state
     */
	AdslJumper.init = function () {
        _game = new Phaser.Game(
            {
                width: 960, // 1136 1024
                height: 540, // 640  576
                renderer: Phaser.AUTO,
                enableDebug: true,
                antialias: false
            }
        );
        _game.state.add("boot", AdslJumper.bootState);
        _game.state.add("preload", AdslJumper.preloadState);
        _game.state.add("story", AdslJumper.storyState);
        _game.state.add("menu", AdslJumper.menuState);
        _game.state.add("waitDecodeAudio", AdslJumper.waitDecodeAudio);
        _game.state.add("level1", AdslJumper.level1);
        _game.state.add("level2", AdslJumper.level2);

        _game.state.start("boot");
	};

	return AdslJumper;
})();

window.onload = AdslJumper.init;




