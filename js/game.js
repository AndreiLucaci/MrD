(function ($) {
    var protestatarGif = './assets/img/protestatar-64.gif';
    var protestatarStatic = './assets/img/protestatar-static-64.png';

    var gameZone = $('#gameZone');
    var game = $("#game");
    var menu = $("#menu");

    var protestatar = $('#protestatar');
    var dragnea = $('#dragnea');

    var imn = $("#imn");
    var laugh = $("#laugh");
    var punch = $("#punch");
    var mute = $("#mute");

    var playGame = $("#playGame");

    var doc = $(document);

    doc.on('ready', function () {
        $(protestatar).draggable({
            containment: "parent",
            start: function (event, el) {
                protestatar.attr('src', protestatarGif);
            },
            stop: function (event, el) {
                protestatar.attr('src', protestatarStatic);
            }
        });

        setGameZoneBoundaries(gameZone, doc);
    });

    $('#agree-btn').on('click', function(){
        $('#overlay').hide();
    });

    playGame.on('click', function () {
        laugh.get(0).play();
        menu.fadeOut('slow');
        game.fadeIn(4000);
    });

    var randomisePosition = function () {

    }

    var isPlaying = false;
    mute.on('click', function(){
        var muteClass = 'glyphicon-volume-off';
        var onClass = 'glyphicon-volume-up';
        
        if (isPlaying){
            imn.get(0).pause();
        } else {
            imn.get(0).play();
        }
        isPlaying = !isPlaying;

        mute.find('span').toggleClass(muteClass);
        mute.find('span').toggleClass(onClass);
    })

    function setGameZoneBoundaries() {
        var cssObj = {
            width: (doc.width() * 8) / 10,
            height: (doc.height() * 8) / 10,
            left: doc.width() / 10,
            'margin-top': doc.height() / 10
        };

        gameZone.css(cssObj);
        game.css(cssObj);
        menu.css(cssObj);
    }

})(jQuery);