
/*
Once the page had loaded and all the JS is ready to go...
*/
window.onload = function() {
    // find the canvas & get the dimensions
    CONFIG.canvas.element = jQuery('#game');
    WIDTH = CONFIG.canvas.element.data('width') ;
    HEIGHT = CONFIG.canvas.element.data('height');
    dump('Board Size: '+WIDTH+' x '+HEIGHT);

    // init the game engine
    Crafty.init(WIDTH* CONFIG.tile.width, HEIGHT* CONFIG.tile.height, CONFIG.canvas.element.get(0));
    Crafty.canvas.init();
    Crafty.timer.FPS(CONFIG.fps);

    // show fps info when debug is on
    if(CONFIG.debug !== 0) {
        stats = new Stats();
        jQuery('#stats').append(stats.domElement);

        Crafty.bind('EnterFrame', function (eventData) {
            stats.begin();
        });
        Crafty.bind('ExitFrame', function (eventData) {
            stats.end();
        });
    }

    // jump directly to the loading screen
    Crafty.scene('loading');

};
