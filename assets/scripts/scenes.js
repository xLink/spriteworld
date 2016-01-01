// load the assets up, whilst showing a loading screen
// could be a good time to play the opening intro 'movie' mebe?
Crafty.scene('loading', function() {
    dump('Rendering: loading');

    // give the canvas a black background and show "Loading"
    // in the center of the canvas
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

    // load the assets defined in the config.js
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

/*
Crafty sees levels as 'scenes', or atleast thats how im using them at the moment.

Each map is built using http://www.mapeditor.org/ and then exported to JSON.

For completeness i copy the JSON to a .js file & give it a MAPS.<name> variable that we can use to load it in.
TODO: Figure a better way to do this...
*/

Crafty.scene('pallet', function () {
    dump('Rendering Map: pallet');
    Crafty.e('2D, Canvas, TiledMapBuilder')
        .setMapDataSource(MAPS.pallet)
        .createWorld(renderMap);


    player = renderPlayer(11, 9);
});


Crafty.scene('route_1', function () {
    dump('Rendering Map: route_1');
    Crafty.e('2D, Canvas, TiledMapBuilder')
        .setMapDataSource(MAPS.route_1)
        .createWorld(renderMap);

    player = renderPlayer(12, 41);
});
