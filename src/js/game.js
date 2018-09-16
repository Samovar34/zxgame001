var test = null;
var game = (function () {
    /** @global
	 * 	@type object
	 * */
	var AdslJumper = {};

	// global game variables
    /** @global
     * 	@type {number}
     * */
	var _level = 0; // -1 - story; 0 - menu

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
    var START_TIME = 0; // значение задается в waitAudioDecode

    /**
     * elapsed time in sec after
     * @global
     * @type {number}
     */
    var ELAPSED_TIME = 0; // время в секундаx после загрузки

    //@@include('./include.js')

    /**
	 * init game, create states and run boot state
     */
	AdslJumper.init = function () {
        Game = new Phaser.Game(
            {
                width: 960, //  960  720
                height: 540, // 540  540
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
        Game.state.add("level6", AdslJumper.level6);
        Game.state.add("level7", AdslJumper.level7);
        Game.state.add("level8", AdslJumper.level8);
        Game.state.add("level9", AdslJumper.level9);
        Game.state.add("level10", AdslJumper.level10);

        Game.state.start("boot");
	};

	// TODO delete degub methods
    return {
        init: AdslJumper.init,

        restart: function () {
            Game.state.restart(Game.state.current);
        },

        setBitCoins: function (val) {
            _score = val;
            Game.state.getCurrentState().gui.setScore(_score);
        },

        setLvl: function (val) {
            _level = val;
            Game.state.start("level" + _level);
        },

        getState: function () {
            return Game.state.getCurrentState();
        },

        etElapsedTime: function (val) {
            ELAPSED_TIME = val;
        },

        resetStartTime: function () {
            START_TIME = (new Date).getTime();
        },

        setLang: function(val) {
            _lang = val;
        }
    }
})();

window.onload = game.init;




