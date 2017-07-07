var sensei = {
    usedKanas: {},
    currentKana: '',
    romaji: '',
    lastKanas: [],
    update: function () {
        this.usedKanas = {};

        var that = this;
        $.each(kana, function (key, character) {
            if (character.system != lS.system)
                return;

            var modifiers = ['none', 'dakuten', 'youon'];
            if (modifiers.indexOf(character.modifiers) > modifiers.indexOf(lS.modifiers))
                return;

            that.usedKanas[key] = character;
        });
    },
    next: function () {
        var kanas = Object.keys(this.usedKanas);

        do {
            this.currentKana = kanas[Math.floor(Math.random() * kanas.length)];
        } while (this.lastKanas.indexOf(this.currentKana) != -1);

        this.romaji = this.usedKanas[this.currentKana].romaji;

        this.lastKanas.push(this.currentKana);

        if (this.lastKanas.length > 15)
            this.lastKanas.shift();

        $('#kana').html(this.currentKana);
    }
};
