$.update = function () {
    $('#system, #modifiers, #theme').children().hide();
    $('#gojuuon td').children().hide();

    $('#system .' + lS.system).show();

    $('#modifiers .' + lS.system + '.' + lS.modifiers).show();

    $('#gojuuon td .' + lS.system).show();

    $('#theme .' + lS.theme).show();

    $('body').attr('class', lS.theme);
};

// Events

$('#input').keyup(function (e) {
    if (e.keyCode == 13) {
        if ($('#input').val().toLowerCase().trim() == sensei.romaji)
            $('#output').attr('class', 'success');
        else
            $('#output').attr('class', 'failure');

        $('#output').html(sensei.currentKana + ' is <em>' + sensei.romaji + '</em>');

        $('#output').stop().css('opacity', 1);

        clearTimeout($.outputFadeTimeout);

        $.outputFadeTimeout = setTimeout(function () {
            $('#output').fadeTo(3000, 0);
        }, 10000);

        $('#input').val('');

        sensei.next();
    }
});

$('#system').click(function (e) {
    if (lS.system == 'hiragana')
        lS.system = 'katakana';
    else
        lS.system = 'hiragana';

    $.update();

    sensei.update();

    sensei.next();

    e.preventDefault();
});

$('#modifiers').click(function (e) {
    if (lS.modifiers == 'none')
        lS.modifiers = 'dakuten';
    else if (lS.modifiers == 'dakuten')
        lS.modifiers = 'youon';
    else
        lS.modifiers = 'none';

    $.update();

    sensei.update();

    sensei.next();

    e.preventDefault();
});

$('#showGojuuon').click(function (e) {
    if ($('#gojuuon').is(':hidden'))
        $('#gojuuon').fadeIn(1000);
    else
        $('#gojuuon').hide();

    e.preventDefault();
});

$('#theme').click(function (e) {
    if (lS.theme == 'light')
        lS.theme = 'dark';
    else
        lS.theme = 'light';

    $.update();

    e.preventDefault();
});
