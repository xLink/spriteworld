var stats;

var MAPS = {/*
list below will keep us upto date with places that have been setup?
    MAP_PALLET 100% ✓
        MAP_HERO_HOUSE
        MAP_RIVAL_HOUSE
        MAP_PROF_LAB

    MAP_ROUTE1 98% ✓
*/};
var CONFIG = {
    debug: 1,
    toConsole: 1,
    fps: 60,
    player: null,
    canvas: {
        element: null,
        height: 0,
        width: 0,
    },

    tile: {
        height: 32,
        width: 32,
    },

    assets: {
        "images": [
            'assets/tiles/Outside (Hoenn).png'
        ]
    }
};

