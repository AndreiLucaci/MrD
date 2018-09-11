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

    var hardCore = $('#hardcore');
    
    var playGame = $("#playGame");

    var win = $('#win');
    var lose = $('#lose');
        
    var timer = $('#timer');
    var stats = $('#stats');
    
    var doc = $(document);

    var isGameOn = false;
    var maxSeconds = 60;    
    var seconds = maxSeconds;
    var hits = 0, currentHits = 0, maxHits = 450, maxHardCoreHits = 1500;

    var isAnimating = false;

    var isPlaying = false;
    
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
        if (hardCore.is(':checked')){
            currentHits = maxHardCoreHits
        } else {
            currentHits = maxHits;
        }

        randomisePlayers();
        laugh.get(0).play();
        menu.fadeOut('slow');
        game.fadeIn(4000);
        startTimer();
        displayStats();
    });
    
    function badGuyCollision(ev, el) {
        if ($(this).hasClass('obstacle')){
            ev.preventDefault();
            return;
        }
        
        $(".overlap").remove();
        var result = protestatar.collision( ".obstacle" );
        
        if (result.length && !isAnimating){
            var newPosition = randomisePosition();
            move(badGuy, newPosition);
            playPunchSound();
        }
    }
    
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

    function incrementStats(){
        hits = hits + 1;

        if (hits >= currentHits){
            isGameOn = false;
        }

        $('[data-role="hits"]').empty().html(hits);
    }

    function displayStats(){
        stats.empty();
        hits = 0;
        var maxDosare = $("<div>").html("Numărul maxim de dosare necesare: " + currentHits);
        var dosare = $("<p>").html("Dosare: <span data-role='hits'></span>");

        stats.append(maxDosare)
             .append(dosare);
    }
    
    function playPunchSound() {
        if (punch.get(0).paused) {
            punch.get(0).play();
        } else {
            punch.get(0).currentTime = 0
            incrementStats();
        }
    }
    
    function move(player, position) {
        player.stop().animate({
            "left": position.x + "px",
            "top": position.y + "px",
            start: function(){
                isAnimating = true;
            },
            done: function(){
                isAnimating = false;
            }
        });
    }

    function randomisePlayers(){
        var badGuyRandomPosition = randomisePosition();
        move(badGuy, badGuyRandomPosition);

        var playerRandomPositions = randomisePosition();
        move(protestatar, playerRandomPositions);
    }

    function end() {
        return maxSeconds - seconds;
    }
    
    function startTimer(){
        timer.empty();      
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
        var seconds = end();

        game.fadeOut("slow");
        gameOver.fadeIn();

        if (hits >= currentHits){
            outcome = true;
        }

        if (outcome){
            win.show();
            lose.hide();
        } else {
            win.hide();
            lose.show();
        }

        $("[data-role='seconds']").html(seconds);
    }

    $('#restart-game').on('click', function(){
        menu.fadeIn();
        gameOver.fadeOut();
        win.hide();
        lose.hide();
        seconds = maxSeconds;
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