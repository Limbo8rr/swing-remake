namespace SpriteKind {
    export const Sword = SpriteKind.create()
    export const Spectre = SpriteKind.create()
}
function ghostChangeDirectionOnWallHit (sprite: Sprite) {
    this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(sprite)
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
    moveGhost(sprite, this_ghost_index)
}
function playerGotHit (sprite: Sprite) {
    info.changeLifeBy(-1)
    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    for (let index2 = 0; index2 < 5; index2++) {
        sprite.setFlag(SpriteFlag.Invisible, true)
        pause(50)
        sprite.setFlag(SpriteFlag.Invisible, false)
        pause(50)
    }
    sprite.setFlag(SpriteFlag.GhostThroughSprites, false)
}
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
    static_image_sword = [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 . . . . . . . . 
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
        . . . . . . . 1 . . . . . . . . 
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
        . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 
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
        1 1 1 1 1 1 1 1 1 1 1 1 1 . . . 
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
    info.setLife(3)
    info.setScore(0)
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
    mySprite = sprites.create(static_image_hero[1], SpriteKind.Player)
    sword = sprites.create(static_image_sword[4], SpriteKind.Sword)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 1))
    scene.cameraFollowSprite(mySprite)
    sword.top = mySprite.bottom - 4
    sword.x = mySprite.x
    controller.moveSprite(mySprite)
    mySprite.setFlag(SpriteFlag.Ghost, false)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    swingSword()
})
function ghostFireSpit () {
    for (let this_ghost of sprites.allOfKind(SpriteKind.Spectre)) {
        this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(this_ghost)
        this_ghost_facing = ghost_facing[this_ghost_index]
        if (ghost_ready_to_fire[this_ghost_index] == 1) {
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
        }
        pause(randint(0, 100))
    }
}
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
    moveGhost(ghost, this_ghost_index)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    playerGotHit(sprite)
})
function controlGhostsOriginal () {
    for (let this_ghost of sprites.allOfKind(SpriteKind.Spectre)) {
        this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(this_ghost)
        if (ghost_ready_to_fire[this_ghost_index] != 1 && (Math.percentChance(60) || ghost_ready_to_fire[this_ghost_index] == 2)) {
            if (ghost_ready_to_fire[this_ghost_index] == 2) {
                ghost_ready_to_fire[this_ghost_index] = 0
            }
            moveGhost(this_ghost, this_ghost_index)
        } else {
            this_ghost.setVelocity(0, 0)
            if (ghost_ready_to_fire[this_ghost_index] == 0 && Math.percentChance(50)) {
                ghost_ready_to_fire[this_ghost_index] = 1
            }
            ghost_facing[this_ghost_index] = randint(0, 3)
            this_ghost.setImage(static_image_ghost[ghost_facing[this_ghost_index]])
        }
    }
    ghost_movement_interval = randint(800, 1200)
}
sprites.onOverlap(SpriteKind.Sword, SpriteKind.Spectre, function (sprite, otherSprite) {
    playerStabsSpectre(otherSprite)
})
function swingSword () {
    if (!(swingingSword)) {
        swingingSword = true
        sword.setImage(static_image_sword[facing])
    }
    pause(200)
    sword.setImage(static_image_sword[4])
}
function moveGhost (this_ghost1: Sprite, this_ghost_index1: number) {
    this_ghost1.setImage(static_image_ghost[ghost_facing[this_ghost_index1]])
    if (ghost_facing[this_ghost_index1] == 0) {
        this_ghost1.setVelocity(0, -50)
    } else if (ghost_facing[this_ghost_index1] == 1) {
        this_ghost1.setVelocity(0, 50)
    } else if (ghost_facing[this_ghost_index1] == 2) {
        this_ghost1.setVelocity(-50, 0)
    } else {
        this_ghost1.setVelocity(50, 0)
    }
    ghost_facing[this_ghost_index1] = randint(0, 3)
}
info.onLifeZero(function () {
    player_dead = true
    game.over(false)
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
scene.onHitWall(SpriteKind.Spectre, function (sprite, location) {
    ghostChangeDirectionOnWallHit(sprite)
})
function controlGhosts () {
    for (let this_ghost of sprites.allOfKind(SpriteKind.Spectre)) {
        this_ghost_index = sprites.allOfKind(SpriteKind.Spectre).indexOf(this_ghost)
        if (ghost_ready_to_fire[this_ghost_index] == 1) {
        	
        } else if (Math.percentChance(60) || ghost_ready_to_fire[this_ghost_index] == 2) {
            if (ghost_ready_to_fire[this_ghost_index] == 2) {
                ghost_ready_to_fire[this_ghost_index] = 0
            }
            moveGhost(this_ghost, this_ghost_index)
        } else {
            this_ghost.setVelocity(0, 0)
            if (Math.percentChance(50)) {
                ghost_ready_to_fire[this_ghost_index] = 1
            }
            ghost_facing[this_ghost_index] = randint(0, 3)
            this_ghost.setImage(static_image_ghost[ghost_facing[this_ghost_index]])
        }
    }
    ghost_movement_interval = randint(800, 1200)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 500)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spectre, function (sprite, otherSprite) {
    playerGotHit(sprite)
})
function setPlayerFacing () {
    if (mySprite.vy < 0) {
        facing = 0
        sword.bottom = mySprite.top
        sword.x = mySprite.x
    } else if (mySprite.vy > 0) {
        facing = 1
        sword.top = mySprite.bottom - 4
        sword.x = mySprite.x
    } else if (mySprite.vx < 0) {
        facing = 2
        sword.right = mySprite.left + 4
        sword.y = mySprite.y
    } else if (mySprite.vx > 0) {
        facing = 3
        sword.left = mySprite.right - 4
        sword.y = mySprite.y
    }
    mySprite.setImage(static_image_hero[facing])
    if (sword.image != static_image_sword[4]) {
        sword.setImage(static_image_sword[facing])
    }
}
let heart: Sprite = null
let ghost: Sprite = null
let projectile: Sprite = null
let this_ghost_facing = 0
let sword: Sprite = null
let mySprite: Sprite = null
let index = 0
let player_dead = false
let kill_count = 0
let swingingSword = false
let facing = 0
let ghost_shoot_interval = 0
let ghost_movement_interval = 0
let ghost_ready_to_fire: number[] = []
let static_image_sword: Image[] = []
let static_image_hero: Image[] = []
let static_image_ghost: Image[] = []
let ghost_facing: number[] = []
let this_ghost_index = 0
tiles.setTilemap(tilemap`level2`)
tiles.setTilemap(tilemap`level1`)
declareValues()
initializePlayer()
game.onUpdate(function () {
    setPlayerFacing()
})
forever(function () {
    if (sprites.allOfKind(SpriteKind.Spectre).length < 10) {
        makeGhost()
    }
    pause(ghost_movement_interval)
    controlGhosts()
})
forever(function () {
    pause(ghost_shoot_interval)
    ghostFireSpit()
})
game.onUpdateInterval(300, function () {
    swingingSword = false
})
