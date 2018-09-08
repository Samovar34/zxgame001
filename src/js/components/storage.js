/**
 * storage component
 * @type {{save: AdslJumper.storage.save, load: AdslJumper.storage.load, crypt: AdslJumper.storage.crypt, decrypt: AdslJumper.storage.decrypt}}
 */
AdslJumper.storage = {

    /**
     * time in ms
     * @param {number} time
     * @returns {boolean}
     */
    save: function (time) {
        if (localStorage) {
            //00
            localStorage.setItem("save", this.crypt(time));
            return true;
        } else {
            return false;
        }

    },

    load: function () {
        // TODO add check
        this.decrypt(localStorage.getItem("save"));

    },

    crypt: function (val) {
        var temp = "";
        var result = "";
        var i = 0;

        if (_level <= 9) {
            temp = "0" + _level
        } else {
            temp = _level + "";
        }

        // level
        for (i = 0; i < temp.length; i++) {
            result += this.cryptTable[temp[i]];
        }

        temp = "";

        // score
        if (_score <= 9) {
            temp = "00" + _score;
        } else if (_score >= 10 && _score <= 99) {
            temp = "0" + _score;
        } else {
            temp = _score + "";
        }

        for (i = 0; i < temp.length; i++) {
            result += this.cryptTable[temp[i]];
        }

        temp = "";

        // time
        if (val <= 9) {
            temp = "000" + val;
        } else if (val >= 10 && val <= 99) {
            temp = "00" + val;
        } else if (val >= 100 && val <= 999) {
            temp = "0" + val;
        } else {
            temp = val + "";
        }

        for (i = 0; i < temp.length; i++) {
            result += this.cryptTable[temp[i]];
        }

        return result;
    },

    /**
     *
     * @param {string} val - save code
     * @returns {boolean}
     */
    decrypt: function (val) {
        val += "";

        if (val.length !== 18) {
            return false;
        }

        for (var i = 0; i < val.length; i += 2) {
            if (typeof this.decryptTable[val[i] + val[i+1]] === undefined) {
                return false;
            }
        }

        var level, score, time;

        level = parseInt(this.decryptTable[val[0] + val[1]] + this.decryptTable[val[2] + val[3]]);
        score = parseInt(
            this.decryptTable[val[4] + val[5]] +
            this.decryptTable[val[6] + val[7]] +
            this.decryptTable[val[8] + val[9]]
        );
        time = parseInt(
            this.decryptTable[val[10] + val[11]] +
            this.decryptTable[val[12] + val[13]] +
            this.decryptTable[val[14] + val[15]] +
            this.decryptTable[val[16] + val[17]]
        );

        return true;


    },

    cryptTable: {
        "0": "a0",
        "1": "z1",
        "2": "by",
        "3": "yb",
        "4": "cz",
        "5": "xf",
        "6": "d2",
        "7": "wx",
        "8": "e5",
        "9": "vz"
    },

    decryptTable: {
        "a0": "0",
        "z1": "1",
        "by": "2",
        "yb": "3",
        "cz": "4",
        "xf": "5",
        "d2": "6",
        "wx": "7",
        "e5": "8",
        "vz": "9"
    }
};