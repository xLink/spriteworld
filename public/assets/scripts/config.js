var stats;

var MAPS = {/*
list below will keep us upto date with places that have been setup?
    MAP_PALLET 100% ✓
        MAP_HERO_HOUSE_FLOOR1 100% ✓
        MAP_HERO_HOUSE_FLOOR2 100% ✓
        MAP_RIVAL_HOUSE_FLOOR1
        MAP_RIVAL_HOUSE_FLOOR2
        MAP_PROF_LAB

    MAP_ROUTE1 98% ✓
*/};
var CONFIG = {
    debug: 1,
    toScreen: 0,
    toConsole: 1,
    fps: 60,
    player: null,
    canvas: {
        element: null,
        height: 0,
        width: 0
    },
    render: {
        world: '2D, Canvas, TiledMapBuilder',
        player: '2D, DOM, Color, Collision, player, SpriteAnimation, Keyboard, Fourway'
    },

    tile: {
        height: 32,
        width: 32
    },

    assets: {
        "images": [
            'assets/tiles/Outside (Hoenn).png',
            'assets/tiles/All Inner Extended.png',
            'assets/tiles/characters.png'
        ]
    }
};

