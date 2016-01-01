function renderMap(tiledmap) {
    // collisions
    if (tiledmap.getEntitiesInLayer('collision').length) {
        for (var idx = 0; idx < tiledmap.getEntitiesInLayer('collision').length; idx++){
            tiledmap.getEntitiesInLayer('collision')[idx]
                .addComponent('Collision')
                .collision();
        }
    }

    // fences
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

        warps = tiledmap.getLayerFromSource('warps').properties;
        // console.log(warps);

        // loop the entities
        for (var idx = 0; idx < tiledmap.getEntitiesInLayer('warps').length; idx++){
            tile = tiledmap.getEntitiesInLayer('warps')[idx];

            // convert the position of the tile to grid co-ords
            x = tile.x / CONFIG.tile.width;
            y = tile.y / CONFIG.tile.height;
            coords = x+':'+y;

            // check if we have a warp assigned to that tile
            if (warps.hasOwnProperty(coords)) {
                // gives us MAPNAME, POSx:POSy
                val = warps[coords].split('=');
                // where we want to go?
                mapName = val[0];
                // where this tile should place the character
                placeChar = val[1].split(':');

                // if we do - assign the warp
                tile
                    .addComponent('Warp')
                    .addComponent('Color')
                    .color('red')
                    .attr({'load': mapName});

                dump('Adding Warp to: '+coords+' for '+mapName);
            } else {
                dump('Warp not found for '+coords+'');
            }
        }
    }

}

// Render a player object to the canvas, has some collision stuff in there too
function renderPlayer(x, y) {
    Crafty.e('2D, DOM, Color, Collision, player, Fourway')
        .attr({
            x: (x*CONFIG.tile.width),
            y: (y*CONFIG.tile.height),
            w: CONFIG.tile.width,
            h: CONFIG.tile.height
        })
        .color('blue')
        .fourway(5)
        .checkHits('Collision')
        .bind('Moved', function(from) {
            if(this.hit('Collision')){
                this.attr({x: from.x, y:from.y});
            }
            if(this.hit('Warp')){
                //this.attr({x: from.x, y:from.y});
                dump('Warp Hit: '+ from.x + ', ' + from.y);
                console.log(from);
            }
        });
    CONFIG.player = Crafty('player');

    return CONFIG.player;
}
