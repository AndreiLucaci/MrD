(function ($) {
    var gameZone = $('#gameZone');
    var protestatar = $('#protestatar');
    var dragnea = $('#dragnea');
    var doc = $(document);

    doc.on('ready', function () {
        setGameZoneBoundaries(gameZone, doc);


        gameZone.on('mousemove', function (e) {
            var left = (e.pageX - gameZone.offset().left);
            var top = (e.pageY - gameZone.offset().top);
            protestatar.css({
                left: left,
                top: top
            });
        });
    });

    var playGame = function () {

    }

    var randomisePosition = function () {

    }

    function setGameZoneBoundaries() {
        gameZone.css({
            width: (doc.width() * 8) / 10,
            height: (doc.height() * 8) / 10,
            left: doc.width() / 10,
            'margin-top': doc.height() / 10
        });
    }

})(jQuery);