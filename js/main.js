$(function () {
  // Update the UI
  $.update();

  // Update the subset
  sensei.updateSubset();

  // Pick the first kana
  sensei.next();
});
