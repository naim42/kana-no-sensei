// main.js

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
