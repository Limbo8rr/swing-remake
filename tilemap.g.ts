// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`0a00070001010101010101010101010202020202020202010102020202020202020101020202020202020201010202020202020202010102020202020202020101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.builtin.forestTiles0,sprites.castle.tilePath5], TileScale.Sixteen);
            case "level2":
            case "level2":return tiles.createTilemap(hex`14000e00010101010101010101010101010101010101010101020606060606060606060606060606060605010108070909090907070707070709090909070a0101080a0101010108070707070701010101080a010108070606060607070707070706060606070a010108070707070709090909090907070707070a010108070707070701010101010108070707070a010108070707070701010101010108070707070a010108070707070706060606060607070707070a010108070909090907070707070709090909070a0101080a0101010108070707070701010101080a010108070606060607070707070706060606070a0101030909090909090909090909090909090904010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 . . 2 2 2 2 . . . . . . 2 2 2 2 . . 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . 2 2 2 2 2 2 . . . . . . 2 
2 . . . . . . 2 2 2 2 2 2 . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 . . 2 2 2 2 . . . . . . 2 2 2 2 . . 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 . . . . . . . . . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,sprites.builtin.forestTiles0,sprites.castle.tilePath1,sprites.castle.tilePath7,sprites.castle.tilePath9,sprites.castle.tilePath3,sprites.castle.tilePath2,sprites.castle.tilePath5,sprites.castle.tilePath4,sprites.castle.tilePath8,sprites.castle.tilePath6], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
