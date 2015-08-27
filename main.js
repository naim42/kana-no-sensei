'use strict';

//
// UI object
//

var ui = {
  body:        document.body,
  ribbonDark:  $('#ribbonDark'),
  ribbonLight: $('#ribbonLight'),
  hiragana:    $('#hiragana'),
  dakuten:     $('#dakuten'),
  youon:       $('#youon'),
  score:       $('#score'),
  rights:      $('#rights'),
  total:       $('#total'),
  wtf:         $('#wtf'),
  day:         $('#day'),
  symbol:      $('#symbol'),
  input:       $('#input'),
  output:      $('#output'),
  about:       $('#about'),
  update: function () {
    // Hiragana/katakana
    if (JSON.parse(localStorage.hiragana) == true) {
      this.hiragana.firstChild.style.display = '';
      this.hiragana.lastChild.style.display  = 'none';
    } else {
      this.hiragana.firstChild.style.display = 'none';
      this.hiragana.lastChild.style.display  = '';
    }

    // Dakuten
    if (JSON.parse(localStorage.dakuten) == true) {
      this.dakuten.style.textDecoration = 'none';
    } else {
      this.dakuten.style.textDecoration = 'line-through';
    }

    // Yoon
    if (JSON.parse(localStorage.youon) == true) {
      this.youon.style.textDecoration = 'none';
    } else {
      this.youon.style.textDecoration = 'line-through';
    }

    // Score
    this.rights.innerHTML = JSON.parse(localStorage.rights);
    this.total.innerHTML  = JSON.parse(localStorage.total);

    // Day/night
    if (JSON.parse(localStorage.day) == true) {
      this.body.style.backgroundColor = 'white';
      this.body.style.color           = 'black';

      this.ribbonDark.style.display  = '';
      this.ribbonLight.style.display = 'none';

      this.day.firstChild.style.display = '';
      this.day.lastChild.style.display  = 'none';
    } else {
      this.body.style.backgroundColor = 'black';
      this.body.style.color           = 'white';

      this.ribbonLight.style.display = '';
      this.ribbonDark.style.display  = 'none';

      this.day.firstChild.style.display = 'none';
      this.day.lastChild.style.display  = '';
    }
  }
};

//
// Kana object
//

var kana = {
  characters: {},
  subset: {},
  symbol: '',
  info: {},
  lastUsed: [],
  updateSubset: function () {
    this.subset = {};

    for (var i in this.characters) {
      // If the character set doesn't match
      if (this.characters[i].hiragana != JSON.parse(localStorage.hiragana))
        continue;

      // If unwanted dakuten
      if (JSON.parse(localStorage.dakuten) == false && this.characters[i].dakuten == true)
        continue;

      // If unwanted youon
      if (JSON.parse(localStorage.youon) == false && this.characters[i].youon == true)
        continue;

      // Add to subset
      this.subset[i] = this.characters[i];
    }
  },
  next: function () {
    // Update the subset first
    this.updateSubset();

    // Retrieve all kanas
    var symbols = Object.keys(this.subset);

    do {
      // Pick a random kana
      this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
    } while (this.lastUsed.indexOf(this.symbol) != -1); // Musn't have been used recently

    // Store the kana's information
    this.info = this.subset[this.symbol];

    // Store in the last used list
    this.lastUsed.push(this.symbol);

    // Cap the last used list
    if (this.lastUsed.length > 15)
      this.lastUsed.shift();

    // Display the kana
    ui.symbol.innerHTML = this.symbol;
  }
};

//
// Event listeners
//

// On submit
ui.input.on('keydown', function (e) {
  if (e.keyCode == 13) {

    if (ui.input.value.toLowerCase().trim() == kana.info.romaji) {
      ui.output.className = 'success';
      localStorage.rights++;
    } else {
      ui.output.className = 'failure';
    }
    ui.output.innerHTML = kana.symbol + ' is ' + kana.info.romaji;

    // Fade the output away after some time
    clearTimeout(ui.output.timeout);
    ui.output.classList.remove('hidden');
    ui.output.timeout = setTimeout(function () {
      ui.output.classList.add('hidden');
    }, 3000);

    // Clear the input
    ui.input.value = '';

    // Update the counter
    localStorage.total++;

    // Update the UI
    ui.update();

    // Next kana!
    kana.next();
  }
});

ui.hiragana.on('click', function (e) {
  if (JSON.parse(localStorage.hiragana) == true)
    localStorage.hiragana = false;
  else
    localStorage.hiragana = true;

  // Update the UI
  ui.update();

  // Next kana!
  kana.next();

  e.preventDefault();
});

ui.dakuten.on('click', function (e) {
  if (JSON.parse(localStorage.dakuten) == true)
    localStorage.dakuten = false;
  else
    localStorage.dakuten = true;

  // Update the UI
  ui.update();

  // Next kana!
  kana.next();

  e.preventDefault();
});

ui.youon.on('click', function (e) {
  if (JSON.parse(localStorage.youon) == true)
    localStorage.youon = false;
  else
    localStorage.youon = true;

  // Update the UI
  ui.update();

  // Next kana!
  kana.next();

  e.preventDefault();
});

ui.score.on('click', function (e) {
  localStorage.rights = 0;
  localStorage.total  = 0;

  // Update the UI
  ui.update();

  e.preventDefault();
});

ui.wtf.on('click', function (e) {
  // Hide or show the about paragraph
  ui.about.classList.toggle('hidden');

  e.preventDefault();
});

ui.day.on('click', function (e) {
  if (JSON.parse(localStorage.day) == true)
    localStorage.day = false;
  else
    localStorage.day = true;

  // Update the UI
  ui.update();

  e.preventDefault();
});

//
// Initialization
//

// Fill local storage with default values
localStorage.hiragana = localStorage.hiragana || true;
localStorage.dakuten  = localStorage.dakuten  || false;
localStorage.youon    = localStorage.youon    || false;
localStorage.day      = localStorage.day      || true;
localStorage.rights   = localStorage.rights   || 0;
localStorage.total    = localStorage.total    || 0;

// Update the UI
ui.update();

// Retreive the kana object from file
var req = new XMLHttpRequest();
req.open('GET', 'kana.json', true);
req.send(null);

req.onreadystatechange = function () {
  if (req.readyState == 4 && req.status == 200) {
    // Load characters into the object
    kana.characters = JSON.parse(req.responseText);

    // Yeeha!
    kana.next();
  }
};
