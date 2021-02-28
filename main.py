@namespace
class SpriteKind:
    Sword = SpriteKind.create()
    Spectre = SpriteKind.create()
def declareValues():
    global static_image_ghost, static_image_hero, static_image_sword, ghost_ready_to_fire, ghost_facing, ghost_movement_interval, ghost_shoot_interval, facing
    static_image_ghost = [img("""
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
        """),
        img("""
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
        """),
        img("""
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
        """),
        img("""
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
        """)]
    static_image_hero = [img("""
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
        """),
        img("""
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
        """),
        img("""
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
        """),
        img("""
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
        """)]
    static_image_sword = [img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
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
        """),
        img("""
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
                    . . . . . . . b . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . b b b b b b b b b b 
                    . . . . . b 1 1 1 1 1 1 1 1 1 1 
                    . . . . . . b b b b b b b b b b 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    b b b b b b b b b b . . . . . . 
                    1 1 1 1 1 1 1 1 1 1 b . . . . . 
                    b b b b b b b b b b . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        img("""
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
        """)]
    # 0: can be set to randomly fire on GhostMove
    # 1: ready to fire on next ghostMove
    # 2: do not set to fire on ghostMove
    ghost_ready_to_fire = []
    ghost_facing = []
    ghost_movement_interval = 1000
    ghost_shoot_interval = 500
    facing = 1
def initializePlayer():
    global mySprite, sword
    mySprite = sprites.create(static_image_hero[1], SpriteKind.player)
    sword = sprites.create(static_image_sword[4], SpriteKind.Sword)
    controller.move_sprite(mySprite)
    tiles.place_on_tile(mySprite, tiles.get_tile_location(1, 1))
def ghostFireSpit(shooter: Sprite):
    shooter.say("bang")
def makeGhost():
    global ghost
    ghost = sprites.create(static_image_ghost[1], SpriteKind.Spectre)
def controlGhosts():
    pass
ghost: Sprite = None
sword: Sprite = None
mySprite: Sprite = None
facing = 0
ghost_shoot_interval = 0
ghost_movement_interval = 0
ghost_facing: List[number] = []
ghost_ready_to_fire: List[number] = []
static_image_sword: List[Image] = []
static_image_hero: List[Image] = []
static_image_ghost: List[Image] = []
tiles.set_tilemap(tilemap("""
    level1
"""))
declareValues()
initializePlayer()

def on_forever():
    if len(sprites.all_of_kind(SpriteKind.Spectre)) == 0:
        makeGhost()
    pause(ghost_movement_interval)
    controlGhosts()
forever(on_forever)

def on_forever2():
    pause(ghost_shoot_interval)
    for value in sprites.all_of_kind(SpriteKind.player):
        if ghost_ready_to_fire[sprites.all_of_kind(SpriteKind.player).index(value)] == 1:
            ghostFireSpit(value)
forever(on_forever2)
