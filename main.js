//
// Storage
//

var lS = localStorage;

// Fill with default values
lS.system    = lS.system    || 'hiragana';
lS.modifiers = lS.modifiers || 'none';
lS.theme     = lS.theme     || 'light';

//
// User interface
//

$.update = function () {
  // Hide everything
  $('#system, #modifiers, #theme, #ribbon').children().hide();

  // Show the writing system
  $('#system .' + lS.system).show();

  // Show the modifiers
  $('#modifiers .' + lS.system + '.' + lS.modifiers).show();

  // Show the theme kanji
  $('#theme .' + lS.theme).show();

  // Show the right ribbon
  $('#ribbon .' + lS.theme).show();

  // Update the colors
  $('body').css('background-color', lS.theme == 'light' ? 'white' : 'black');
  $('body').css('color',            lS.theme == 'light' ? 'black' : 'white');
};

//
// Main object
//

var sensei = {
  characters: {},
  subset: {},
  kana: '',
  romaji: '',
  lastKanas: [],
  updateSubset: function () {
    // Scope.
    var that = this;

    // Clear the subset
    this.subset = {};

    $.each(this.characters, function (key, character) {
      // If the writing system doesn't match
      if (character.system != lS.system)
        return;

      // Unwanted modifier
      var order = ['none', 'dakuten', 'youon'];
      if (order.indexOf(character.modifiers) > order.indexOf(lS.modifiers))
        return;

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
    if (this.lastKanas.length > 15)
      this.lastKanas.shift();

    // Display the kana
    $('#kana').html(this.kana);
  }
};

//
// Events
//

// On submit
$('#input').keyup(function (e) {
  if (e.keyCode == 13) {
    // Set the success/failure class
    if ($('#input').val().toLowerCase().trim() == sensei.romaji)
      $('#output').attr('class', 'success');
    else
      $('#output').attr('class', 'failure');

    // Write the solution
    $('#output').html(sensei.kana + ' is ' + sensei.romaji);

    // Clear the current animation and bring opacity to 1
    $('#output').clearQueue().stop().fadeTo(0, 1);

    // Set a fade out delay
    $('#output').delay(5000).fadeTo(2000, 0);

    // Clear the input
    $('#input').val('');

    // Next kana!
    sensei.next();
  }
});

$('#system').click(function (e) {
  // Toggle the writing system
  if (lS.system == 'hiragana')
    lS.system = 'katakana';
  else
    lS.system = 'hiragana';

  // Update the UI
  $.update();

  // Update the subset
  sensei.updateSubset();

  // Pick a new kana
  sensei.next();

  e.preventDefault();
});

$('#modifiers').click(function (e) {
  // Toggle the modifiers
  if (lS.modifiers == 'none')
    lS.modifiers = 'dakuten';
  else if (lS.modifiers == 'dakuten')
    lS.modifiers = 'youon';
  else
    lS.modifiers = 'none';

  // Update the UI
  $.update();

  // Update the subset
  sensei.updateSubset();

  // Pick a new kana
  sensei.next();

  e.preventDefault();
});

$('#theme').click(function (e) {
  // Toggle the theme
  if (lS.theme == 'light')
    lS.theme = 'dark';
  else
    lS.theme = 'light';

  // Update the UI
  $.update();

  e.preventDefault();
});

$('#wtf').click(function (e) {
  if ($('#about').is(':hidden')) {
    // Fade the about paragraph in
    $('#about').fadeIn(800);

    // Smooth scroll to it
    $('body').animate({ scrollTop: $('#about').offset().top }, 800);
  } else
    $('#about').hide();

  e.preventDefault();
});

//
// Initialization
//

$(function () {
  // Update the UI
  $.update();

  // Retreive the kana object from file
  $.get('kana.json', function (data) {
    // Store them
    sensei.characters = data;

    // Update the subset
    sensei.updateSubset();

    // Pick the first kana
    sensei.next();
  }, 'json');
});
