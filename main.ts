namespace SpriteKind {
    export const Sword = SpriteKind.create()
    export const Spectre = SpriteKind.create()
    export const Text = SpriteKind.create()
    export const Building = SpriteKind.create()
    export const Bat = SpriteKind.create()
}
function moveBats () {
    for (let value of sprites.allOfKind(SpriteKind.Bat)) {
        if (value.vx != 0 || value.vy != 0) {
            value.setVelocity(0, 0)
        } else if (Math.percentChance(33)) {
            value.setVelocity(randint(-1, 1) * 20, 0)
        } else if (Math.percentChance(33)) {
            value.setVelocity(0, randint(-1, 1) * 20)
        }
    }
}
function ghostChangeDirectionOnWallHit (sprite: Sprite) {
    this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(sprite)
    this_ghost_facing = ghost_facing[this_ghost_index]
    console.log("Wall Hit: index" + sprites.allOfKind(SpriteKind.Spectre).indexOf(sprite) + " facing " + ghost_facing[this_ghost_index] + " grtf " + ghost_ready_to_fire[this_ghost_index])
    if (sprite.isHittingTile(CollisionDirection.Top)) {
        ghost_facing[this_ghost_index] = randint(1, 3)
    } else if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        while (ghost_facing[this_ghost_index] == 1) {
            ghost_facing[this_ghost_index] = randint(0, 3)
        }
    } else if (sprite.isHittingTile(CollisionDirection.Left)) {
        while (ghost_facing[this_ghost_index] == 2) {
            ghost_facing[this_ghost_index] = randint(0, 3)
        }
    } else {
        ghost_facing[this_ghost_index] = randint(0, 2)
    }
    console.log("Wall Hit: index" + sprites.allOfKind(SpriteKind.Spectre).indexOf(sprite) + " new facing " + ghost_facing[this_ghost_index] + " grtf " + ghost_ready_to_fire[this_ghost_index] + "call moveGhost")
    moveGhost(sprite, this_ghost_index)
}
function playerGotHit () {
    if (player_invincible == false) {
        player_invincible = true
        info.changeLifeBy(-1)
        for (let index2 = 0; index2 < 10; index2++) {
            mySprite.setFlag(SpriteFlag.Invisible, true)
            mySpriteBodyAndHead.setFlag(SpriteFlag.Invisible, true)
            pause(50)
            mySprite.setFlag(SpriteFlag.Invisible, false)
            mySpriteBodyAndHead.setFlag(SpriteFlag.Invisible, false)
            pause(50)
        }
        player_invincible = false
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bat, function (sprite, otherSprite) {
    playerGotHit()
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = 0
})
function declareValues () {
    static_image_ghost = [img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fdd111111ddf......
        ......fbdd1dd1ddbf......
        ......fcdd1bb1ddcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....ff1fffbfbffff1ff....
        ....f1b1ffffffff1b1f....
        ....fbfbffffffffbfbf....
        .........ffffff.........
        ..........ffff..........
        ........................
        ........................
        ........................
        ........................
        `, img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, img`
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f1111111dbf......
        ......fd1111111ddf......
        ......fd111111dddf......
        ......fd111ddddddf......
        ......fd111ddddddf......
        ......fd1dddddddbf......
        ......fd1dfbddbbff......
        ......fbddfcdbbcf.......
        .....ffffccddbfff.......
        ....fcb1bbbfcffff.......
        ....f1b1dcffffffff......
        ....fdfdf..ffffffffff...
        .....f.f.....ffffff.....
        ........................
        ........................
        ........................
        ........................
        ........................
        `, img`
        ........................
        ........................
        ........................
        ........................
        ..........fffff.........
        ........ff11111f........
        .......fb111111bf.......
        ......fbd1111111f.......
        ......fddd111111df......
        ......fdddd11111df......
        ......fddddddd11df......
        ......fddddddd111f......
        ......fddddddcf11f......
        .......fbdddb1111bf.....
        ........fffcfdb1b1f.....
        .......ffffffffbfbf.....
        ....ff.fffffffffff......
        .....ffffffff...........
        .....ffffffb1b1f........
        ......ffffffbfbf........
        ........................
        ........................
        ........................
        ........................
        `]
    static_image_hero = [img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `, img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `]
    static_image_hero_feet = [img`
        . . . . . e e e e e e . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f . . . f f . . . . . 
        `, img`
        . . . . . e 4 4 4 4 e . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . 4 4 5 5 4 4 . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f . . . f f . . . . . 
        `, img`
        . . . . . 4 4 4 e e f . . . . . 
        . . . . . 2 2 e d d 4 . . . . . 
        . . . . . 2 2 e d d e . . . . . 
        . . . . . 5 4 f e e f . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . f f f f . . . . . . 
        `, img`
        . . . . . f e e 4 4 4 . . . . . 
        . . . . . 4 d d e 2 2 . . . . . 
        . . . . . e d d e 2 2 . . . . . 
        . . . . . f e e f 4 5 . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . f f f . . . . . . 
        `]
    static_image_hero_body = [img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e . . . . . . e f . . . 
        . . e 4 f . . . . . . f 4 e . . 
        . . 4 d f . . . . . . f d 4 . . 
        . . 4 4 f . . . . . . f 4 4 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e . . . . . . e f . . . 
        . . e 4 f . . . . . . f 4 e . . 
        . . 4 d f . . . . . . f d 4 . . 
        . . 4 4 f . . . . . . f 4 4 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e . . . . . . f . . . . 
        . . . f 2 . . . . . . . . . . . 
        . . . f 2 . . . . . . . . . . . 
        . . . f 5 . . . . . . . . . . . 
        . . . . f . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f . . . . . . e f . . . 
        . . . . . . . . . . . 2 f . . . 
        . . . . . . . . . . . 2 f . . . 
        . . . . . . . . . . . 5 f . . . 
        . . . . . . . . . . . f . . . . 
        . . . . . . . . . . . . . . . . 
        `]
    static_image_sword = [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b . . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        `, img`
        . . . . 4 4 b 1 b . . . . . . . 
        . . . . 4 4 b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . b 1 b . . . . . . . 
        . . . . . . . b . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . b b b b b b b b b b b b 
        . . . b 1 1 1 1 1 1 1 1 1 1 1 1 
        . . . . b b b b b b b b b b b b 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        b b b b b b b b b b b b . . . . 
        1 1 1 1 1 1 1 1 1 1 1 1 b . . . 
        b b b b b b b b b b b b . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `]
    animation_ghost = [[img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbddddddddbf......
        ......fcd1dddd1dcf......
        .......fb111111bf.......
        ......ff1cdb1bd1fff.....
        ....fc111cbfbfc111cf....
        .....11111ffff11111.....
        .....ffbffffffbfbff.....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbddddddddbf......
        ......fcd11dd11dcf......
        .......fb1111111fff.....
        ......ff1cdb1bc111cf....
        ....fc111cbfbf11111.....
        .....11111ffffbfbff.....
        .....ffbfffffff.........
        .........fffff..........
        ..........fff...........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddddddddddf......
        ......fbddddddddbf......
        ......fcd11dd11dcf......
        .......fb111111bf.......
        ......ff1cdb1bd1fff.....
        ....fc111cbfbfc111cf....
        .....11111ffff11111.....
        .....ffbffffffbfbff.....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbddddddddbf......
        ......fc11dddd11cf......
        .....fff111dd11bf.......
        ....fc111cdb1bd1ff......
        .....1111cbfbfc111cf....
        .....ffbfbffff11111.....
        .........fffffffbff.....
        ..........fffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `], [img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111ffff.....
        ......fffcdb1bc111cf....
        ....fc111cbfbf1b1b1f....
        ....f1b1b1ffffbfbfbf....
        ....fbfbfffffff.........
        .........fffff..........
        ..........fff...........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .....ffff111111bf.......
        ....fc111cdb1bdfff......
        ....f1b1bcbfbfc111cf....
        ....fbfbfbffff1b1b1f....
        .........fffffffbfbf....
        ..........fffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `], [img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f1111111df.......
        ......fd1111111ddf......
        ......fd111111dddf......
        ......fd111ddddddf......
        ......fd1dfbddddbf......
        ......fbddfcdbbbcf......
        .......f11111bbcf.......
        .......f1b1fffff........
        .......fbfc111bf........
        ........ff1b1bff........
        .........fbfbfff.f......
        ..........ffffffff......
        ............fffff.......
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        .........fffff..........
        ........f11111ff........
        .......fb111111bf.......
        .......f1111111dbf......
        ......fd111111dddf......
        ......fd11111ddddf......
        ......fd11dddddddf......
        ......f111dddddddf......
        ......f11fcddddddf......
        .....fb1111bdddbf.......
        .....f1b1bdfcfff........
        .....fbfbffffffff.......
        ......fffffffffff.ff....
        ...........ffffffff.....
        ........f1b1bffffff.....
        ........fbfbffffff......
        ........................
        ........................
        ........................
        ........................
        `], [img`
        ........................
        ........................
        ........................
        ........................
        ..........fffff.........
        ........ff11111f........
        .......fb111111bf.......
        ......fbd1111111f.......
        ......fddd111111df......
        ......fdddd11111df......
        ......fddddddd11df......
        ......fddddddd111f......
        ......fddddddcf11f......
        .......fbdddb1111bf.....
        ........fffcfdb1b1f.....
        .......ffffffffbfbf.....
        ....ff.fffffffffff......
        .....ffffffff...........
        .....ffffffb1b1f........
        ......ffffffbfbf........
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......fd1111111f.......
        ......fdd1111111df......
        ......fddd111111df......
        ......fdddddd111df......
        ......fbddddbfd1df......
        ......fcbbbdcfddbf......
        .......fcbb11111f.......
        ........fffff1b1f.......
        ........fb111cfbf.......
        ........ffb1b1ff........
        ......f.fffbfbf.........
        ......ffffffff..........
        .......fffff............
        ........................
        ........................
        ........................
        ........................
        `]]
    static_image_bat = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `
    animation_Bat = [[img`
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f c b b c f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f c b b c f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f c b b c f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f c b b c f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f c b b c f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f b b f c b b c f b b f f . 
        . . . f c f c b b c f c f . . . 
        . . . . f f c c c c f f . . . . 
        . . . . . . f f f f . . . . . . 
        `], [img`
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f 2 b b 2 f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f 2 b b 2 f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f 2 b b 2 f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f 2 b b 2 f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . . f b f . . . . f b f . . . 
        . . f b c b f . . f b c b f . . 
        . . f c c b f f f f b c c f . . 
        . . f f c f c b b c f c f f . . 
        . . f . f f 2 b b 2 f f . f . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f . . . . f f . . . . 
        . . f f b b f . . f b b f f . . 
        f f b c c c f f f f c c c b f f 
        . f f f b f c b b c f b f f f . 
        . . . f c f 2 b b 2 f c f . . . 
        . . . f f f c c c c f f f . . . 
        . . . . . . f f f f . . . . . . 
        `], [img`
        . . . . . . . . . f f . . . . . 
        . . . . . . . . . f b f . . . . 
        . . . . . . . . f b c b f . . . 
        . . . . . . f f f b c c f . . . 
        . . . . . f c b c f c f f . . . 
        . . . . . f b 2 b c f . f . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . f f . . . . . 
        . . . . . . . . . f b f . . . . 
        . . . . . . . . f b c b f . . . 
        . . . . . . f f f b c c f . . . 
        . . . . . f c b c f c f f . . . 
        . . . . . f b 2 b c f . f . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . . f b f . . . . 
        . . . . . . . . f b c b f . . . 
        . . . . . . f f f b c c f . . . 
        . . . . . f c b c f c f f . . . 
        . . . . . f b 2 b c f . f . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . . f b f . . . . 
        . . . . . . . . f b c b f . . . 
        . . . . . . f f f b c c f . . . 
        . . . . . f c b c f c f f . . . 
        . . . . . f b 2 b c f . f . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . . f b f . . . . 
        . . . . . . . . f b c b f . . . 
        . . . . . . f f f b c c f . . . 
        . . . . . f c b c f c f f . . . 
        . . . . . f b 2 b c f . f . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f . . . . . 
        . . . . . . . . f b b f f . . . 
        . . . . . . f f f c c c b f f . 
        . . . . . f c b c f b f f f . . 
        . . . . . f b 2 b f c f . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `], [img`
        . . . . . f f . . . . . . . . . 
        . . . . f b f . . . . . . . . . 
        . . . f b c b f . . . . . . . . 
        . . . f c c b f f f . . . . . . 
        . . . f f c f c b c f . . . . . 
        . . . f . f c b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . f f . . . . . . . . . 
        . . . . f b f . . . . . . . . . 
        . . . f b c b f . . . . . . . . 
        . . . f c c b f f f . . . . . . 
        . . . f f c f c b c f . . . . . 
        . . . f . f c b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . . f b f . . . . . . . . . 
        . . . f b c b f . . . . . . . . 
        . . . f c c b f f f . . . . . . 
        . . . f f c f c b c f . . . . . 
        . . . f . f c b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . . f b f . . . . . . . . . 
        . . . f b c b f . . . . . . . . 
        . . . f c c b f f f . . . . . . 
        . . . f f c f c b c f . . . . . 
        . . . f . f c b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . . f b f . . . . . . . . . 
        . . . f b c b f . . . . . . . . 
        . . . f c c b f f f . . . . . . 
        . . . f f c f c b c f . . . . . 
        . . . f . f c b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f . . . . . . . . . 
        . . . f f b b f . . . . . . . . 
        . f f b c c c f f f . . . . . . 
        . . f f f b f c b c f . . . . . 
        . . . . f c f b 2 b f . . . . . 
        . . . . . f c c c c f . . . . . 
        . . . . . . f f f f . . . . . . 
        `]]
    // 0: can be set to randomly fire on GhostMove
    // 1: ready to fire on next ghostMove
    // 2: do not set to fire on ghostMove
    ghost_ready_to_fire = []
    ghost_facing = []
    ghost_movement_interval = 1000
    ghost_shoot_interval = 500
    facing = 1
    swingingSword = false
    kill_count = 0
    player_dead = false
    player_invincible = false
    info.setLife(3)
    info.setScore(0)
    facing = 1
    hasSword = 0
}
function distanceBetween2Sprites (sprite1: Sprite, sprite2: Sprite) {
    return Math.sqrt((sprite1.x - sprite2.x) * (sprite1.x - sprite2.x) + (sprite1.y - sprite2.y) * (sprite1.y - sprite2.y))
}
function playerStabsSpectre (sprite: Sprite) {
    sprite.setVelocity(0, 0)
    index = sprites.allOfKind(SpriteKind.Spectre).indexOf(sprite)
    ghost_facing.removeAt(index)
    ghost_ready_to_fire.removeAt(index)
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(100)
    kill_count += 1
    if (kill_count != 0 && kill_count % 5 == 0) {
        spawnHeart()
    }
}
function initializePlayer () {
    mySprite = sprites.create(static_image_hero_feet[1], SpriteKind.Player)
    mySpriteBodyAndHead = sprites.create(static_image_hero_body[1], SpriteKind.Player)
    sword = sprites.create(static_image_sword[4], SpriteKind.Sword)
    mySpriteBodyAndHead.bottom = mySprite.top + 6
    mySpriteBodyAndHead.x = mySprite.x
    mySpriteBodyAndHead.setFlag(SpriteFlag.GhostThroughWalls, true)
    mySprite.z += 30
    mySpriteBodyAndHead.z += 30
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 1))
    scene.cameraFollowSprite(mySprite)
    sword.top = mySprite.bottom - 4
    sword.x = mySprite.x
    controller.moveSprite(mySprite, 80, 80)
    mySprite.setFlag(SpriteFlag.GhostThroughSprites, true)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    swingSword()
})
scene.onOverlapTile(SpriteKind.Player, tiles.util.door0, function (sprite, location) {
    if (sprite == mySprite) {
        tiles.loadConnectedMap(ConnectionKind.Door1)
        roomChange(tiles.util.door0)
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (controller.left.isPressed()) {
        facing = 2
    } else if (controller.right.isPressed()) {
        facing = 3
    } else if (controller.up.isPressed()) {
        facing = 0
    }
})
function playerStabsBat (sprite: Sprite) {
    sprite.setVelocity(0, 0)
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(20)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = 2
})
function ghostFireSpit () {
    for (let this_ghost of sprites.allOfKind(SpriteKind.Spectre)) {
        this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(this_ghost)
        if (ghost_ready_to_fire[this_ghost_index] == 1) {
            console.log("ghostFireSpit index" + sprites.allOfKind(SpriteKind.Spectre).indexOf(this_ghost) + " facing " + ghost_facing[this_ghost_index] + " grtf " + ghost_ready_to_fire[this_ghost_index])
            this_ghost_facing = ghost_facing[this_ghost_index]
            if (this_ghost_facing == 0) {
                projectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . c c . . . . . . 
                    . . . . . c a a a a . . . . . . 
                    . . . . . a a f f b a . . . . . 
                    . . . . c a b f f c b . . . . . 
                    . . . . c b b b a f c b . . . . 
                    . . . . c b a c a b b b . . . . 
                    . . . . . b b f f a a c . . . . 
                    . . . . . . a a b b c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, this_ghost, 0, -100)
            } else if (this_ghost_facing == 1) {
                projectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . c c . . . . . . 
                    . . . . . c a a a a . . . . . . 
                    . . . . . a a f f b a . . . . . 
                    . . . . c a b f f c b . . . . . 
                    . . . . c b b b a f c b . . . . 
                    . . . . c b a c a b b b . . . . 
                    . . . . . b b f f a a c . . . . 
                    . . . . . . a a b b c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, this_ghost, 0, 100)
            } else if (this_ghost_facing == 2) {
                projectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . c c . . . . . . 
                    . . . . . c a a a a . . . . . . 
                    . . . . . a a f f b a . . . . . 
                    . . . . c a b f f c b . . . . . 
                    . . . . c b b b a f c b . . . . 
                    . . . . c b a c a b b b . . . . 
                    . . . . . b b f f a a c . . . . 
                    . . . . . . a a b b c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, this_ghost, -100, 0)
            } else {
                projectile = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . c c . . . . . . 
                    . . . . . c a a a a . . . . . . 
                    . . . . . a a f f b a . . . . . 
                    . . . . c a b f f c b . . . . . 
                    . . . . c b b b a f c b . . . . 
                    . . . . c b a c a b b b . . . . 
                    . . . . . b b f f a a c . . . . 
                    . . . . . . a a b b c . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, this_ghost, 100, 0)
            }
            projectile.setFlag(SpriteFlag.DestroyOnWall, true)
            if (Math.percentChance(90)) {
                ghost_ready_to_fire[this_ghost_index] = 2
            }
            console.log("ghostSpitFire index " + this_ghost_index + "facing " + ghost_facing[this_ghost_index] + " new grtf" + ghost_ready_to_fire[this_ghost_index])
            pause(randint(0, 100))
        }
    }
    ghost_shoot_interval = randint(400, 700)
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (controller.left.isPressed()) {
        facing = 2
    } else if (controller.up.isPressed()) {
        facing = 0
    } else if (controller.down.isPressed()) {
        facing = 1
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (controller.right.isPressed()) {
        facing = 3
    } else if (controller.up.isPressed()) {
        facing = 0
    } else if (controller.down.isPressed()) {
        facing = 1
    }
})
function makeGhost () {
    ghost = sprites.create(static_image_ghost[1], SpriteKind.Spectre)
    tiles.placeOnRandomTile(ghost, sprites.castle.tilePath5)
    while (distanceBetween2Sprites(mySprite, ghost) < 64) {
        tiles.placeOnRandomTile(ghost, sprites.castle.tilePath5)
        if (player_dead == true) {
            break;
        }
    }
    this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(ghost)
    ghost_ready_to_fire[this_ghost_index] = 2
    ghost_facing[this_ghost_index] = randint(0, 3)
    ghost.setBounceOnWall(false)
    console.log("makeGhost: " + "index " + sprites.allOfKind(SpriteKind.Spectre).indexOf(ghost) + "facing " + ghost_facing[sprites.allOfKind(SpriteKind.Spectre).indexOf(ghost)] + " grtf " + ghost_ready_to_fire[sprites.allOfKind(SpriteKind.Spectre).indexOf(ghost)] + "call moveGhost")
    moveGhost(ghost, this_ghost_index)
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    chestLocation = location
    treasureChest()
})
function roomChange (doorType: Image) {
    DestroyAllTheThings()
    tiles.placeOnRandomTile(mySprite, doorType)
    if (tiles.getLoadedMap() == map_field) {
        scene.setBackgroundColor(7)
        mySprite.y += 16
        tiles.coverAllTiles(tiles.util.door0, assets.tile`myTile25`)
    } else if (tiles.getLoadedMap() == map_cave1) {
        scene.setBackgroundColor(15)
        makeBats()
        mySprite.y += -16
        tiles.coverAllTiles(tiles.util.door0, assets.tile`myTile9`)
        if (hasSword == 1) {
            tiles.replaceAllTiles(sprites.dungeon.chestClosed, sprites.dungeon.chestOpen)
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = 3
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    playerGotHit()
})
function makeBats () {
    for (let index2 = 0; index2 < 10; index2++) {
        bat = sprites.create(static_image_bat, SpriteKind.Bat)
        tiles.placeOnRandomTile(bat, assets.tile`myTile10`)
        bat.setBounceOnWall(true)
        while (distanceBetween2Sprites(mySprite, bat) < 64) {
            tiles.placeOnRandomTile(bat, assets.tile`myTile10`)
            if (player_dead == true) {
                break;
            }
        }
        animation.runImageAnimation(
        bat,
        animation_Bat[1],
        randint(180, 220),
        true
        )
    }
}
function youDied () {
    if (player_dead != true) {
        controller.moveSprite(mySprite, 0, 0)
        mySprite2 = sprites.create(img`
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................2222............................................................................................................................................
            .....222........2222............................................................................................................................................
            .....2222......22222...................2222................................................................................................222..................
            .....2222.....22222..........222222....22222........222....................................................................................222..................
            .....2222....222222..........22222222..22222........222.....................................222............................................222..................
            ......222....222222.........222222222...2222........222.............22222222222.............222...22222222................................2222..................
            ......222...22222.2.......222222222222..2222........222.............222222222222............222...2222222222222222...222222................222..................
            ......222..22222.........2222222..2222..2222........222.............222222222222............222...2222222222222222...22222222..............222..................
            ......222..22222........22222222..22222..222........222.............222..2..222222..........222...222..22222222222...2222222222............222..................
            ......222222222........222222..2...2222..222........222.............222..2...222222.........222...222....22.....2....22222222222...........222..................
            ......222222222.......222222.......2222..222.......2222.............222..2..2.222222........222...222...........2....2222..2222222.........222..................
            ......22222222........2222.2........222..222.......2222.............222.....2..22222........222...222...........2....2222...2222222........222..................
            ......22222222.......22222.2........222..222........222.............222.........22222.......222...222.................222..22.222222.......222..................
            .....222222222......22222..2........222..2222.......222.............222.........222222......222...222.................222...2..222222......2222.................
            .....2.222222.......2222...........2222..2222.......222.............2222.........22222......222...222.................222.......22222......2222.................
            .......2222222.....22222...........2222..2222.......222.............2222..........2222......222...222.................222........22222.....2222.................
            ........222222.....22222...........2222...222.......222.............2222...........2222.....222...222222222222222.....222.........22222.....222.................
            ..........2222.....22222...........2222...222.......222..............222...........2222.....222...222222222222222.....222.........22222.....222.................
            ..........2222.....222.2...........2222...222.......222..............222............222....2222...222222222222222.....222.........22222.....222.................
            ..........2222.....2222............2222...222.......222..............222............222....2222...222..2....2...2.....222.........2.222.....2222................
            ..........222......2222............2222...222.......222..............222............222....2222...222..2....2.........222........22.222.....2222................
            ..........222......2222...........22222...222.......222..............222............222....222....222.......2.........222...........222.....222.................
            ..........222.....22222...........22222...222.......222..............222...........2222....222....222......22.........222...........222.....222.................
            ..........222.....222222..........2222....2222.....2222..............222.........222222....222.2..222.................222..........2222.....222.................
            ..........222.....2.2222..........2222....2222.....2222..............2222.......222222.....222....222.................222..........2222.....222.................
            ..........222.....2222222.........2222....22222...22222..............2222.....22222222.....2222...222.................222.........22222.....2222................
            ..........222.....2.22222........2222......222222222222..............2222..2222222222......2222...222.................222.......222222......2222................
            ..........222........22222.......2222......222222222222...............222222222222..2......2222...22222222222222222...2222....22222222......2222................
            ..........222........222222.....22222.......222222222.2...............2222222222....2.......222...22222222222222222...2222..22222222............................
            .........2222........222222222.222222.......2..22222.22...............22222222..........222.222...22222222222222222....2222222222222............................
            .........2222..........222222222222.2......22........2...............22222..................2.....222222....2..........2222222222..2........2222................
            .........2222............2222222222.2......22........2...............2..............................2..2....2..........22222222.....2.......2222................
            .........2222............2.2222222..2................................22.............................2..2......................2....22.......2222................
            .........2222............2............................................2.............................2.........................2..............2..................
            .........2222............2....2.....................................................................22..........................................................
            ..........222.................2......................................................................2..........................................................
            ..........222...................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            ................................................................................................................................................................
            `, SpriteKind.Text)
        mySprite2.setPosition(scene.cameraProperty(CameraProperty.X) + 8, scene.cameraProperty(CameraProperty.Y) - 46)
    }
    player_dead = true
    timer.after(10, function () {
        game.over(false)
    })
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (controller.left.isPressed()) {
        facing = 2
    } else if (controller.right.isPressed()) {
        facing = 3
    } else if (controller.down.isPressed()) {
        facing = 1
    }
})
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Spectre, function (sprite, otherSprite) {
    playerStabsSpectre(otherSprite)
})
function swingSword () {
    if (hasSword == 1 && !(swingingSword)) {
        swingingSword = true
        sword.setImage(static_image_sword[facing])
        pause(200)
        sword.setImage(static_image_sword[4])
    } else if (hasSword == 0) {
        mySprite.say("I have no weapon", 800)
    }
}
function moveGhost (this_ghost1: Sprite, this_ghost_index1: number) {
    this_ghost_facing = ghost_facing[this_ghost_index1]
    this_ghost1.setImage(static_image_ghost[this_ghost_facing])
    animation.runImageAnimation(
    this_ghost1,
    animation_ghost[this_ghost_facing],
    250,
    true
    )
    if (this_ghost_facing == 0) {
        this_ghost1.setVelocity(0, -50)
    } else if (this_ghost_facing == 1) {
        this_ghost1.setVelocity(0, 50)
    } else if (this_ghost_facing == 2) {
        this_ghost1.setVelocity(-50, 0)
    } else {
        this_ghost1.setVelocity(50, 0)
    }
    console.log("moveGhost: index " + this_ghost_index1 + " facing " + ghost_facing[this_ghost_index1] + " started movement")
    ghost_facing[this_ghost_index1] = randint(0, 3)
    console.log("moveGhost: index " + this_ghost_index1 + " next facing " + ghost_facing[this_ghost_index1])
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    facing = 1
})
info.onLifeZero(function () {
    youDied()
})
function spawnHeart () {
    heart = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . c 2 2 . 2 2 2 . . . . . . 
        . . c 2 2 2 2 2 2 4 2 . . . . . 
        . . c 2 2 2 2 2 4 2 2 . . . . . 
        . . c 2 2 2 2 2 2 2 2 . . . . . 
        . . . c 2 2 2 2 2 2 . . . . . . 
        . . . c 2 2 2 2 2 2 . . . . . . 
        . . . . c 2 2 2 2 . . . . . . . 
        . . . . . c 2 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnRandomTile(heart, sprites.castle.tilePath5)
    while (distanceBetween2Sprites(mySprite, heart) < 64) {
        tiles.placeOnRandomTile(heart, sprites.castle.tilePath5)
        if (player_dead == true) {
            break;
        }
    }
}
function initializeTilemaps () {
    map_field = tiles.createMap(tilemap`level3`)
    map_cave1 = tiles.createMap(tilemap`level9`)
    tiles.connectMapById(map_field, map_cave1, ConnectionKind.Door1)
    tiles.loadMap(map_field)
    tiles.coverAllTiles(tiles.util.door0, assets.tile`myTile25`)
    scene.setBackgroundColor(7)
}
scene.onHitWall(SpriteKind.Spectre, function (sprite, location) {
    ghostChangeDirectionOnWallHit(sprite)
})
function controlGhosts () {
    for (let this_ghost of sprites.allOfKind(SpriteKind.Spectre)) {
        this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(this_ghost)
        this_ghost_ready_to_fire = ghost_ready_to_fire[this_ghost_index]
        if (this_ghost_ready_to_fire == 1) {
            console.log("controlGhosts pass: facing" + ghost_facing[this_ghost_index])
        } else if (Math.percentChance(60) || this_ghost_ready_to_fire == 2) {
            if (this_ghost_ready_to_fire == 2) {
                ghost_ready_to_fire[this_ghost_index] = 0
                console.log("controlGhosts: index " + this_ghost_index + " just set grtf " + ghost_ready_to_fire[this_ghost_index] + "call moveGhost")
            }
            moveGhost(this_ghost, this_ghost_index)
        } else {
            this_ghost.setVelocity(0, 0)
            if (Math.percentChance(50)) {
                ghost_ready_to_fire[this_ghost_index] = 1
                console.log("controlGhosts: index " + this_ghost_index + " stopped now set to fire grtf " + ghost_ready_to_fire[this_ghost_index] + " facing" + ghost_facing[this_ghost_index])
            }
            ghost_facing[this_ghost_index] = randint(0, 3)
            console.log("controlGhosts: index " + this_ghost_index + " facing set " + ghost_facing[this_ghost_index])
            this_ghost.setImage(static_image_ghost[ghost_facing[this_ghost_index]])
            animation.runImageAnimation(
            this_ghost,
            animation_ghost[ghost_facing[this_ghost_index]],
            250,
            true
            )
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spectre, function (sprite, otherSprite) {
    playerGotHit()
})
function DestroyAllTheThings () {
    tiles.destroySpritesOfKind(SpriteKind.Spectre)
    tiles.destroySpritesOfKind(SpriteKind.Building)
    tiles.destroySpritesOfKind(SpriteKind.Projectile)
    tiles.destroySpritesOfKind(SpriteKind.Text)
    tiles.destroySpritesOfKind(SpriteKind.Bat)
}
function setPlayerFacing () {
    if (facing == 0) {
        sword.bottom = mySpriteBodyAndHead.top - 1
        sword.x = mySprite.x
    } else if (facing == 1) {
        sword.top = mySprite.bottom - 5
        sword.x = mySprite.x
    } else if (facing == 2) {
        sword.right = mySprite.left + 4
        sword.y = mySprite.y - 4
    } else if (facing == 3) {
        sword.left = mySprite.right - 4
        sword.y = mySprite.y - 4
    }
    mySprite.setImage(static_image_hero[facing])
    mySprite.setImage(static_image_hero_feet[facing])
    mySpriteBodyAndHead.setImage(static_image_hero_body[facing])
    mySpriteBodyAndHead.bottom = mySprite.top + 6
    mySpriteBodyAndHead.x = mySprite.x
    if (sword.image != static_image_sword[4]) {
        sword.setImage(static_image_sword[facing])
    }
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Bat, function (sprite, otherSprite) {
    playerStabsBat(otherSprite)
})
function treasureChest () {
    if (hasSword == 0 && tiles.getLoadedMap() == map_cave1) {
        hasSword = 1
        mySprite2 = sprites.create(img`
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            .........................................................................................fffffff..............
            .....................................................................................ffff1111111fffff.........
            .................................................................................ffff11111111111119f..........
            ............................................................................fffff11111111111111199f...........
            ........................................................................ffff11111111111111111119ff............
            ...................................................................fffff11111111111111111111999f..............
            ...............................................................ffff11111111111fff11111119999fff...............
            ...............................f...........................ffff111111111111fff1111119999ffff..................
            ..............................ff......................fffff111111111111ffff111119999ffff......................
            .............................fbbf.................ffff111111111111fffff111119999ffff..........................
            ...........................ffbbbf............fffff111111111111ffff1111119999ffff..............................
            ..........................fbbbbbbf.......ffff111111111111fffff1111119999ffff..................................
            ..........................fbbbfbbf...ffff11111111111fffff11111119999ffff......................................
            ..........................fbbbbbbbfff11111111111ffff111111119999ffff..........................................
            ...........................fbbbbbbf11111111fffff111111119999ffff..............................................
            ...........................fbbbbbbbf111ffff1111111119999ffff..................................................
            ..........................fffbbbfbbffff1111111119999ffff......................................................
            ......................ffffeefbbbbbbbf11111119999ffff..........................................................
            ...................fffeefeeeefbbbbbbf1119999ffff..............................................................
            ...............fffffeeeeefeeefbbbbbbbf99ffff..................................................................
            .............fffeeeefeeeeefeefbbbbfbbfff......................................................................
            ..........ffffeefeeeefeeeeefeefbbbbbbbf.......................................................................
            ..........fefeeeefeeeefeeeeefefbbbbbbbf.......................................................................
            ..........feefeeeefeeeefeeeeffffbbbbbbbf......................................................................
            ..........ffeeffeeefeeffffff...fbbbbfbbf......................................................................
            ...........feeeeffffff..........fbbbbbbbf.....................................................................
            ...........fffff................fbbbbbbbf.....................................................................
            .................................fffffffff....................................................................
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            ..............................................................................................................
            `, SpriteKind.Text)
        tiles.setTileAt(chestLocation, sprites.dungeon.chestOpen)
        mySprite2.setPosition(scene.cameraProperty(CameraProperty.X) + 8, scene.cameraProperty(CameraProperty.Y) - 46)
        game.splash("A sword!", "It's not very sharp..")
        mySprite2.destroy()
    }
}
let this_ghost_ready_to_fire = 0
let heart: Sprite = null
let mySprite2: Sprite = null
let bat: Sprite = null
let map_cave1: tiles.WorldMap = null
let map_field: tiles.WorldMap = null
let chestLocation: tiles.Location = null
let ghost: Sprite = null
let projectile: Sprite = null
let sword: Sprite = null
let index = 0
let hasSword = 0
let player_dead = false
let kill_count = 0
let swingingSword = false
let ghost_shoot_interval = 0
let ghost_movement_interval = 0
let animation_Bat: Image[][] = []
let static_image_bat: Image = null
let animation_ghost: Image[][] = []
let static_image_sword: Image[] = []
let static_image_hero_body: Image[] = []
let static_image_hero_feet: Image[] = []
let static_image_hero: Image[] = []
let static_image_ghost: Image[] = []
let facing = 0
let mySpriteBodyAndHead: Sprite = null
let mySprite: Sprite = null
let player_invincible = false
let ghost_ready_to_fire: number[] = []
let ghost_facing: number[] = []
let this_ghost_facing = 0
let this_ghost_index = 0
declareValues()
initializeTilemaps()
initializePlayer()
game.onUpdate(function () {
    setPlayerFacing()
})
forever(function () {
    if (tiles.getLoadedMap() == map_field) {
        if (sprites.allOfKind(SpriteKind.Spectre).length < 10) {
            makeGhost()
        }
    }
    pause(ghost_shoot_interval)
    ghostFireSpit()
    pause(ghost_shoot_interval)
    ghostFireSpit()
    controlGhosts()
    moveBats()
})
game.onUpdateInterval(300, function () {
    swingingSword = false
})
