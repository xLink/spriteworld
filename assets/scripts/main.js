

window.onload = function() {
    CONFIG.canvas.element = jQuery('#game');
    WIDTH = CONFIG.canvas.element.data('width') ;
    HEIGHT = CONFIG.canvas.element.data('height');

    dump('Board Size: '+WIDTH+' x '+HEIGHT);

    Crafty.init(WIDTH* CONFIG.tile.width, HEIGHT* CONFIG.tile.height, CONFIG.canvas.element.get(0));
    Crafty.canvas.init();
    Crafty.timer.FPS(CONFIG.fps);

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

    Crafty.scene('loading');

};
