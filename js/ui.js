$.update = function () {
  // Hide everything
  $('#system, #modifiers, #theme').children().hide();
  $('#gojuuon td').children().hide();

  // Show the writing system
  $('#system .' + lS.system).show();

  // Show the modifiers
  $('#modifiers .' + lS.system + '.' + lS.modifiers).show();

  // Show the right characters in the gojuuon table
  $('#gojuuon td .' + lS.system).show();

  // Show the theme kanji
  $('#theme .' + lS.theme).show();

  // Update the theme
  $('body').attr('class', lS.theme);
};

// Events

$('#input').keyup(function (e) {
  if (e.keyCode == 13) {
    // Set the success/failure class
    if ($('#input').val().toLowerCase().trim() == sensei.romaji) {
      $('#output').attr('class', 'success');
    } else {
      $('#output').attr('class', 'failure');
    }

    // Write the solution
    $('#output').html(sensei.kana + ' is <em>' + sensei.romaji + '</em>');

    // Stop the fading animation and bring opacity to 1
    $('#output').stop().css('opacity', 1);

    // Clear the current timeout
    clearTimeout($.outputFadeTimeout);

    // Set a fade out timeout
    $.outputFadeTimeout = setTimeout(function () {
      $('#output').fadeTo(3000, 0);
    }, 10000);

    // Clear the input
    $('#input').val('');

    // Next kana!
    sensei.next();
  }
});

$('#system').click(function (e) {
  // Toggle the writing system
  if (lS.system == 'hiragana') {
    lS.system = 'katakana';
  } else {
    lS.system = 'hiragana';
  }

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
  if (lS.modifiers == 'none') {
    lS.modifiers = 'dakuten';
  } else if (lS.modifiers == 'dakuten') {
    lS.modifiers = 'youon';
  } else {
    lS.modifiers = 'none';
  }

  // Update the UI
  $.update();

  // Update the subset
  sensei.updateSubset();

  // Pick a new kana
  sensei.next();

  e.preventDefault();
});

$('#showGojuuon').click(function (e) {
  if ($('#gojuuon').is(':hidden')) {
    $('#gojuuon').fadeIn(1000);
  } else {
    $('#gojuuon').hide();
  }

  e.preventDefault();
});

$('#theme').click(function (e) {
  // Toggle the theme
  if (lS.theme == 'light') {
    lS.theme = 'dark';
  } else {
    lS.theme = 'light';
  }

  // Update the UI
  $.update();

  e.preventDefault();
});
