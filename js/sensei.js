var sensei = {
  subset: {},
  kana: '',
  romaji: '',
  lastKanas: [],
  updateSubset: function () {
    // Scope.
    var that = this;

    // Clear the subset
    this.subset = {};

    $.each(kana, function (key, character) {
      // If the writing system doesn't match
      if (character.system != lS.system) {
        return;
      }

      // Unwanted modifier
      var order = ['none', 'dakuten', 'youon'];
      if (order.indexOf(character.modifiers) > order.indexOf(lS.modifiers)) {
        return;
      }

      // Add to subset
      that.subset[key] = character;
    });
  },
  next: function () {
    // Retrieve all kanas
    var kanas = Object.keys(this.subset);

    do {
      this.kana = kanas[Math.floor(Math.random() * kanas.length)]; // Pick a random kana
    } while (this.lastKanas.indexOf(this.kana) != -1); // That hasn't been used recently

    // Store the kana's romaji
    this.romaji = this.subset[this.kana].romaji;

    // Store in the last used list
    this.lastKanas.push(this.kana);

    // Cap the last used list
    if (this.lastKanas.length > 15) {
      this.lastKanas.shift();
    }

    // Display the kana
    $('#kana').html(this.kana);
  }
};
