
/*
Crafty sees levels as 'scenes', or atleast thats how im using them at the moment.

Each map is built using http://www.mapeditor.org/ and then exported to JSON.

For completeness i copy the JSON to a .js file & give it a MAPS.<name> variable that we can use to load it in.
TODO: Figure a better way to do this...
*/



// load the assets up, whilst showing a loading screen
// could be a good time to play the opening intro 'movie' mebe?
Crafty.scene('loading', function() {
    dump('[INIT]: Loading Assets...');

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

        // fires when totally loaded
        function() {
            dump('[INIT]: Loaded complete');
            Crafty.scene('MAP_PALLET');
            spawnPlayer(2,2);
        },

        // fires once an asset has loaded, but still more to go
        function(e) {
            dump('[INIT]: Loading... '+e.percent.toFixed(0)+'%');
            loading.text('Loading... '+e.percent.toFixed(0)+'%');
        },

        // fires if an asset fails to load
        function(e) {
            dump('[INIT]: Error loading asset: '+getFilename(e.src));
        }
    );
});


// Towns
Crafty.scene('MAP_PALLET', function () {
    dump('Rendering Map: pallet');
    Crafty.e(CONFIG.render.world)
        .setMapDataSource(MAPS.pallet)
        .createWorld(renderMap);
});
    Crafty.scene('MAP_HERO_HOUSE_FLOOR1', function () {
        dump('Rendering Map: hero_house_floor1');
        Crafty.e(CONFIG.render.world)
            .setMapDataSource(MAPS.hero_house_floor1)
            .createWorld(renderMap);
    });
    Crafty.scene('MAP_HERO_HOUSE_FLOOR2', function () {
        dump('Rendering Map: hero_house_floor2');
        Crafty.e(CONFIG.render.world)
            .setMapDataSource(MAPS.hero_house_floor2)
            .createWorld(renderMap);
    });

// Routes
Crafty.scene('MAP_ROUTE1', function () {
    dump('Rendering Map: route1');
    Crafty.e(CONFIG.render.world)
        .setMapDataSource(MAPS.route_1)
        .createWorld(renderMap);
});


    // // run over each map that has been registered
    // for (name in MAPS){
    //     dump('[MAP_REGISTER]: '+name);
    //     map = 'MAP_' + name.toUpperCase();

    //     Crafty.scene(map, function () {
    //         dump('Loading Map: '+name);
    //         Crafty.e(CONFIG.render.world)
    //             .setMapDataSource(MAPS[name])
    //             .createWorld(renderMap);
    //     });
    // }
