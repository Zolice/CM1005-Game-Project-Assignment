class Scene {
    constructor() {
        this.backgroundColor = random(this.backgroundColor)
        this.floorColor = random(this.floorColor)

        floorY = height * 0.7
        translation = 0

        this.chunkSize = 1000
        this.chunkCount = 10

        this.setup()
    }

    setup() {
        this.chunkStart = this.chunkCount / 2 * this.chunkSize * -1
        this.chunkEnd = this.chunkCount / 2 * this.chunkSize

        this.trees = []
        this.clouds = []
        this.mountains = []
        this.canyons = []
        this.collectables = []
        this.checkpoints = []

        this.trees.push(new Tree(200, floorY))
        this.clouds.push(new Cloud(100))
        this.mountains.push(new Mountain(300, floorY))
        this.canyons.push(Canyon.setup(400, floorY))
        this.checkpoints.push(new Checkpoint(500, floorY))

    }

    backgroundColor = [
        color(178, 235, 242),
        color(128, 222, 234),
        color(179, 229, 252),
        color(129, 212, 250),
        color(187, 222, 251),
        color(144, 202, 249),
        color(197, 202, 233),
        color(159, 168, 218)
    ]

    floorColor = [
        color(27, 94, 32),
        color(46, 125, 50),
        color(56, 142, 60),
        color(130, 119, 23),
        color(51, 105, 30),
        color(85, 139, 47),
        color(104, 159, 56),
        color(76, 175, 80),
        color(67, 160, 71)
    ]

    move() {
        this.canyons.forEach(canyon => canyon.checkCollision())
        this.clouds.forEach(cloud => cloud.move())
        this.checkpoints.forEach(checkpoint => checkpoint.checkCollision())
        this.checkpoints.forEach(checkpoint => checkpoint.moveFlag())
    }

    draw() {
        background(this.backgroundColor)
        fill(this.floorColor)
        noStroke()
        rect(0, floorY, width, height - floorY)

        push()
        translate(translation, 0)

        this.trees.forEach(tree => tree.draw())

        this.clouds.forEach(cloud => cloud.draw())

        // this.mountains.forEach(mountain => mountain.draw())

        this.canyons.forEach(canyon => canyon.draw())

        this.collectables.forEach(collectable => collectable.draw())

        this.checkpoints.forEach(checkpoint => checkpoint.draw())

        pop()
    }
}