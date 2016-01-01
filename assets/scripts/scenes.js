Crafty.scene('loading', function() {
    dump('Rendering: loading');

    Crafty.background('#000');
    loading = Crafty.e('2D, DOM, Text')
        .attr({
            w: CONFIG.canvas.width,
            h: 20,
            x: 0,
            y: CONFIG.canvas.height/2
        })
        .text("Loading...")
        .css({"text-align": "center"});


    Crafty.load(CONFIG.assets,
        function() { // when loaded
            dump('Loaded complete');
            Crafty.scene('pallet');
            Crafty.viewport.follow(CONFIG.player, 0, 0);
        },
        function(e) {
            dump('Loading... '+e.percent+'%');
            loading.text('Loading... '+e.percent+'%');
            //console.log(e);
        },
        function(e) {
            dump('Error loading asset: '+getFilename(e.src));
            //console.log(e);
        }
    );
});

Crafty.scene('route_1', function () {
    dump('Rendering Map: route_1');
    Crafty.e('2D, Canvas, TiledMapBuilder')
        .setMapDataSource(MAPS.route_1)
        .createWorld(renderMap);

    player = renderPlayer(12, 41);
});

Crafty.scene('pallet', function () {
    dump('Rendering Map: pallet');
    Crafty.e('2D, Canvas, TiledMapBuilder')
        .setMapDataSource(MAPS.pallet)
        .createWorld(renderMap);


    player = renderPlayer(11, 9);
});
