(function ($) {
    var protestatarGif = './assets/img/protestatar-64.gif';
    var protestatarStatic = './assets/img/protestatar-static-64.png';
    
    var gameZone = $('#gameZone');
    var game = $("#game");
    var menu = $("#menu");
    var gameOver = $('#game-over');
    
    var protestatar = $('#protestatar');
    var badGuy = $('#badGuy');
    
    var imn = $("#imn");
    var laugh = $("#laugh");
    var punch = $("#punch");
    var mute = $("#mute");
    
    var playGame = $("#playGame");

    var win = $('#win');
    var lose = $('#lose');
        
    var timer = $('#timer');
    
    var doc = $(document);
    
    doc.on('ready', function () {
        protestatar.draggable({
            containment: "parent",
            start: function (event, el) {
                protestatar.attr('src', protestatarGif);
            },
            stop: function (event, el) {
                protestatar.attr('src', protestatarStatic);
            },
            tolerance: "touch",
        });
        
        $( ".draggable" ).each(function(){$(this).bind("dragstart",badGuyCollision);})
        $( ".draggable" ).each(function(){$(this).bind("dragstop", badGuyCollision);})
        $( ".draggable" ).each(function(){$(this).bind("drag",     badGuyCollision);})
        
        setGameZoneBoundaries(gameZone, doc);
    });
    
    $('#agree-btn').on('click', function () {
        $('#overlay').hide();
    });
    
    playGame.on('click', function () {
        laugh.get(0).play();
        menu.fadeOut('slow');
        game.fadeIn(4000);
        startTimer();
    });
    
    function badGuyCollision(ev, el) {
        if ($(this).hasClass('obstacle')){
            ev.preventDefault();
            return;
        }
        
        $(".overlap").remove();
        var result = protestatar.collision( ".obstacle" );
        
        if (result.length){
            var newPosition = randomisePosition();
            moveBadGuy(newPosition);
            playPunchSound();
        }
    }
    
    var isPlaying = false;
    mute.on('click', function () {
        var muteClass = 'glyphicon-volume-off';
        var onClass = 'glyphicon-volume-up';
        
        if (isPlaying) {
            imn.get(0).pause();
        } else {
            imn.get(0).play();
        }
        
        isPlaying = !isPlaying;
        
        mute.find('span').toggleClass(muteClass);
        mute.find('span').toggleClass(onClass);
    })
    
    function playPunchSound() {
        if (punch.get(0).paused) {
            punch.get(0).play();
        } else {
            punch.get(0).currentTime = 0
        }
    }
    
    function moveBadGuy(position) {
        badGuy.stop().animate({
            "left": position.x + "px",
            "top": position.y + "px"
        });
    }

    var startTime, endTime;
    function start() {
        startTime = new Date();
    };

    function end() {
        endTime = new Date();
        var timeDiff = endTime - startTime;
        timeDiff /= 1000;

        var seconds = Math.round(timeDiff);
        return seconds;
    }
    
    var isGameOn = false;
    function startTimer(){
        timer.empty();      
        var seconds = 10;
        isGameOn = true;
        function tick() {
            seconds--;
            timer.html($('<h2>').html("0:" + (seconds < 10 ? "0" : "") + String(seconds)));
            if( seconds > 0) {
                if (isGameOn) {
                    setTimeout(tick, 1000);
                } else {
                    endGame(true);
                }
            } else {
                endGame(false);
            }
        }
        tick();
    }

    function endGame(outcome) {
        isGameOn = false;

        game.fadeOut("slow");
        gameOver.fadeIn();

        if (outcome){
            win.show();
            lose.hide();
        } else {
            lose.show();
            win.hide();
        }
    }

    $('#restart-game').on('click', function(){
        menu.fadeIn();
        gameOver.fadeOut();
        win.hide();
        lose.hide();
    });

    function randomisePosition() {
        return {
            x: Math.floor(Math.random() * (game.width() - 100)),
            y: Math.floor(Math.random() * (game.height() - 100))
        };
    }
    
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
        gameOver.css(cssObj);
    }
})(jQuery);