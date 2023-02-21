class Scene {
    constructor() {
        this.backgroundColor = random(this.backgroundColor)
        this.floorColor = random(this.floorColor)

        floorY = height * 0.7
        translation = 0

        this.chunkSize = 1000
        this.chunkCount = 10
        this.checkpointGap = 2

        this.setup()
    }

    setup() {
        this.chunkStart = this.chunkCount / 2 * this.chunkSize * -1 - this.chunkSize / 2
        this.chunkEnd = this.chunkCount / 2 * this.chunkSize + this.chunkSize / 2
        this.chunkStartCount = this.chunkCount / 2 * -1
        this.chunkEndCount = this.chunkCount / 2

        this.trees = []
        this.clouds = []
        this.mountains = []
        this.canyons = []
        this.collectables = []
        this.checkpoints = []

        this.checkpoints.push(new Checkpoint(0, floorY, false, true))
        this.checkpoints.push(new Checkpoint(this.chunkStart, floorY, true))
        this.checkpoints.push(new Checkpoint(this.chunkEnd, floorY, true))

        for(var i = this.chunkStartCount; i < this.chunkEndCount; i++) {
            this.setupChunk(i * this.chunkSize)
            if(i % this.checkpointGap == 0 && i != 0) {
                this.checkpoints.push(new Checkpoint(i * this.chunkSize, floorY))
            }
        }
    }

    setupChunk(startX, y = floorY, chunkSize = 1000) {
        var treeCount = random(Math.floor(chunkSize / 200), Math.floor(chunkSize / 100))
        for (var j = 0; j < treeCount; j++) {
            var treeX = random(startX, startX + chunkSize)
            this.trees.push(new Tree(treeX, y))
        }

        var mountainCount = random(Math.floor(chunkSize / 600), Math.floor(chunkSize / 300))
        for (var j = 0; j < mountainCount; j++) {
            var mountainX = random(startX, startX + chunkSize)
            this.mountains.push(new Mountain(mountainX, y))
        }

        var canyonCount = random(Math.floor(chunkSize / 750), Math.floor(chunkSize / 500))
        for (var j = 0; j < canyonCount; j++) {
            var canyonX = random(startX + chunkSize * 0.25, startX + chunkSize * 0.75)
            this.canyons.push(Canyon.setup(canyonX, y))
        }

        var cloudCount = random(Math.floor(chunkSize / 300), Math.floor(chunkSize / 150))
        for (var j = 0; j < cloudCount; j++) {
            var cloudX = random(startX, startX + chunkSize)
            this.clouds.push(new Cloud(cloudX))
        }

        var collectableCount = random(Math.floor(chunkSize / 500), Math.floor(chunkSize / 300))
        for (var j = 0; j < collectableCount; j++) {
            var collectableX = random(startX, startX + chunkSize)
            this.collectables.push(new Collectable(collectableX, y - 40, 50))
        }
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
        this.collectables.forEach(collectable => collectable.checkCollision())
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

        this.mountains.forEach(mountain => mountain.draw())

        this.trees.forEach(tree => tree.draw())

        this.canyons.forEach(canyon => canyon.draw())

        this.checkpoints.forEach(checkpoint => checkpoint.draw())

        this.collectables.forEach(collectable => collectable.draw())

        this.clouds.forEach(cloud => cloud.draw())

        this.checkpoints.forEach(checkpoint => checkpoint.drawFireworks())

        pop()
    }
}