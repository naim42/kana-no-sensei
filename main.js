var $kana = document.querySelector('#kana');
var $input = document.querySelector('#input');
var $note = document.querySelector('#note');
var $switchHiraKata = document.querySelector('#switchHiraKata');
var $showTable = document.querySelector('#showTable');
var $about = document.querySelector('#about');
var $switchLights = document.querySelector('#switchLights');

var hiragana = [ { 'あ': 'a' }, { 'い': 'i' }, { 'う': 'u' }, { 'え': 'e' }, { 'お': 'o' }, { 'か': 'ka' }, { 'き': 'ki' }, { 'く': 'ku' }, { 'け': 'ke' }, { 'こ': 'ko' }, { 'さ': 'sa' }, { 'し': 'shi' }, { 'す': 'su' }, { 'せ': 'se' }, { 'そ': 'so' }, { 'た': 'ta' }, { 'ち': 'chi' }, { 'つ': 'tsu' }, { 'て': 'te' }, { 'と': 'to' }, { 'な': 'na' }, { 'に': 'ni' }, { 'ぬ': 'nu' }, { 'ね': 'ne' }, { 'の': 'no' }, { 'は': 'ha' }, { 'ひ': 'hi' }, { 'ふ': 'fu' }, { 'へ': 'he' }, { 'ほ': 'ho' }, { 'ま': 'ma' }, { 'み': 'mi' }, { 'む': 'mu' }, { 'め': 'me' }, { 'も': 'mo' }, { 'や': 'ya' }, { 'ゆ': 'yu' }, { 'よ': 'yo' }, { 'ら': 'ra' }, { 'り': 'ri' }, { 'る': 'ru' }, { 'れ': 're' }, { 'ろ': 'ro' }, { 'わ': 'wa' }, { 'を': 'wo' }, { 'ん': 'n' } ];
var katakana = [ { 'ア': 'a' }, { 'イ': 'i' }, { 'ウ': 'u' }, { 'エ': 'e' }, { 'オ': 'o' }, { 'カ': 'ka' }, { 'キ': 'ki' }, { 'ク': 'ku' }, { 'ケ': 'ke' }, { 'コ': 'ko' }, { 'サ': 'sa' }, { 'シ': 'shi' }, { 'ス': 'su' }, { 'セ': 'se' }, { 'ソ': 'so' }, { 'タ': 'ta' }, { 'チ': 'chi' }, { 'ツ': 'tsu' }, { 'テ': 'te' }, { 'ト': 'to' }, { 'ナ': 'na' }, { 'ニ': 'ni' }, { 'ヌ': 'nu' }, { 'ネ': 'ne' }, { 'ノ': 'no' }, { 'ハ': 'ha' }, { 'ヒ': 'hi' }, { 'フ': 'fu' }, { 'ヘ': 'he' }, { 'ホ': 'ho' }, { 'マ': 'ma' }, { 'ミ': 'mi' }, { 'ム': 'mu' }, { 'メ': 'me' }, { 'モ': 'mo' }, { 'ヤ': 'ya' }, { 'ユ': 'yu' }, { 'ヨ': 'yo' }, { 'ラ': 'ra' }, { 'リ': 'ri' }, { 'ル': 'ru' }, { 'レ': 're' }, { 'ロ': 'ro' }, { 'ワ': 'wa' }, { 'ヲ': 'wo' }, { 'ン': 'n' } ];

var usingHiragana = true;
var currentCharacterSet = hiragana;

var currentPosition = null;
var currentKana = null;
var currentRomaji = null;

var lastUsed = [];

var lightsOn = true;

$input.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    if ($input.value.toLowerCase() == currentRomaji) {
      $note.innerHTML = 'Right!';
      $note.style.color = '#2B8';
    } else {
      $note.innerHTML = 'Wrong! ' + currentKana + ' is ' + currentRomaji + ' ...';
      $note.style.color = '#B25';
    }

    $input.value = '';
    nextKana();
  }
});

$switchHiraKata.addEventListener('click', function (e) {
  usingHiragana = !usingHiragana;
  currentCharacterSet = usingHiragana ? hiragana : katakana;

  $switchHiraKata.innerHTML = usingHiragana ? 'カタカナ' : 'ひらがな';
  refreshKana();

  e.preventDefault();
});

$switchLights.addEventListener('click', function (e) {
  lightsOn = !lightsOn;

  document.body.style.backgroundColor = lightsOn ? 'white' : 'black';
  document.body.style.color = lightsOn ? 'black' : 'white';

  $switchLights.innerHTML = lightsOn ? '●' : '○';

  e.preventDefault();
});

function refreshKana() {
  var kana = currentCharacterSet[currentPosition];

  for (var key in kana) {
    currentKana = key;
    currentRomaji = kana[key];
  }

  $kana.innerHTML = currentKana;
}

function nextKana() {
  do {
    currentPosition = Math.floor(Math.random() * currentCharacterSet.length);
  } while (lastUsed.indexOf(currentPosition) != -1);

  lastUsed.push(currentPosition);
  if (lastUsed.length > 10)
    lastUsed.shift();

  refreshKana();
}

nextKana();
