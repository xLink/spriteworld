function renderMap(tiledmap) {
    // collisions
    if (tiledmap.getEntitiesInLayer('collision').length) {
        for (var idx = 0; idx < tiledmap.getEntitiesInLayer('collision').length; idx++){
            tiledmap.getEntitiesInLayer('collision')[idx]
                .addComponent('Collision')
                .collision();
        }
    }

    // ledges
    /*
        gotta handle this one little differently, you can run down em
        but not up em
    */

    // interactables
    /*
        such as HM01 bushes/trees
        signs
        npcs
        ???
    */

    // warps
    if (tiledmap.isLayer('warps')) {

        warps = tiledmap.getLayerFromSource('warps').properties || {};
        // console.log(warps);

        // loop the entities
        for (var idx = 0; idx < tiledmap.getEntitiesInLayer('warps').length; idx++) {
            tile = tiledmap.getEntitiesInLayer('warps')[idx];

            // convert the position of the tile to grid co-ords
            coords = getGridCoords(tile.x, tile.y).join(':');

            // check if we have a warp assigned to that tile
            if (warps.hasOwnProperty(coords)) {
                warp = getWarpDetails(coords);

                // if we do - assign the warp
                tile
                    .addComponent('Warp')
                    .addComponent('Color')
                    .color('red')
                    .attr({'load': warp.mapName});

                // dump('[WARP] Adding Warp to: '+coords+' for '+warp.mapName);
            } else {
                dump('[WARP] Warp not found for '+coords+'');
            }
        }
    }

}

// Render a player object to the canvas, has some collision stuff in there too
function spawnPlayer(x, y) {
    Crafty.e(CONFIG.render.player)
        .attr({
            x: (x * CONFIG.tile.width),
            y: (y * CONFIG.tile.height),
            w: CONFIG.tile.width ,
            h: CONFIG.tile.height
        })
        .fourway(2)
        .color('pink')
        .reel('walk_left', 500, 0, 1, 4)
        .reel('walk_right', 500, 0, 2, 4)
        .reel('walk_up', 500, 0, 3, 4)
        .reel('walk_down', 500, 0, 0, 4)
        .bind('EnterFrame', function(e) {
            if (this.hit('Collision')) {
                this.pauseAnimation();
                return;
            }

            if(this.isDown('LEFT_ARROW')) {
                if (!this.isPlaying('walk_left')){
                    this.pauseAnimation().animate('walk_left', 10);
                }
            } else if(this.isDown('RIGHT_ARROW')) {
                if (!this.isPlaying('walk_right')){
                    this.pauseAnimation().animate('walk_right', 10);
                }
            } else if(this.isDown('UP_ARROW')) {
                if (!this.isPlaying('walk_up')){
                    this.pauseAnimation().animate('walk_up', 10);
                }
            } else if(this.isDown('DOWN_ARROW')) {
                if (!this.isPlaying('walk_down')){
                    this.pauseAnimation().animate('walk_down', 10);
                }
            }
        }).bind('KeyUp', function(e) {
            this.pauseAnimation();
        })

        .checkHits('Collision')
        .bind('Moved', function(from) {
            if(this.hit('Collision')){
                this.attr({x: from.x, y:from.y});
            }

            // when the player hits a warp tile
            if (this.hit('Warp')) {
                // console.warn('WARP HIT');
                // figure out /which/ tile they hit
                coords = getGridCoords(from.x, from.y).join(':');

                // see if theres actually a warp on there
                if (warps.hasOwnProperty(coords)) {
                    // grab the map & position we want to warp them to
                    info = getWarpDetails(coords);

                    // dump('[WARP] Warping player to: '+info.mapName
                    //     +'@'+info.place_character.x
                    //     +':'+info.place_character.y);
                    // and profit...ish
                    Crafty.scene(info.mapName);
                    player = spawnPlayer(info.place_character.x, info.place_character.y);
                }
            }
        });
    CONFIG.player = Crafty('player');
    Crafty.viewport.follow(CONFIG.player, 0, 0);

    return CONFIG.player;
}

