class Scene {
    trees = []
    clouds = []
    mountains = []
    canyons = []
    collectables = []
    checkpoints = []
    platforms = []
    enemies = []

    constructor() {
        this.backgroundColor = random(this.backgroundColor)
        this.floorColor = random(this.floorColor)

        floorY = height * 0.7
        translation = 0

        this.chunkSize = 1000
        this.chunkCount = chunkCount
        this.checkpointGap = 2
    }

    setup() {
        this.chunkStart = this.chunkCount / 2 * this.chunkSize * -1 - this.chunkSize
        this.chunkEnd = this.chunkCount / 2 * this.chunkSize + this.chunkSize
        this.chunkStartCount = this.chunkCount / 2 * -1
        this.chunkEndCount = this.chunkCount / 2

        this.checkpoints.push(new Checkpoint(0, floorY, false, true))

        for (var i = this.chunkStartCount; i < this.chunkEndCount; i++) {
            this.generateChunk(i * this.chunkSize)
            if (i % this.checkpointGap == 0 && i != 0) {
                this.checkpoints.push(new Checkpoint(i * this.chunkSize, floorY))
            }
        }

        this.addPlatform(this.chunkStartCount * this.chunkSize - this.chunkSize / 2, this.chunkStartCount * this.chunkSize, true)
        this.addPlatform(this.chunkEndCount * this.chunkSize, this.chunkEndCount * this.chunkSize + this.chunkSize / 2)
    }

    generateChunk(startX, y = floorY, chunkSize = 1000) {
        let treeCount = random(Math.floor(chunkSize / 200), Math.floor(chunkSize / 100))
        for (var j = 0; j < treeCount; j++) {
            var treeX = random(startX, startX + chunkSize)
            this.trees.push(new Tree(treeX, y))
        }

        let mountainCount = random(Math.floor(chunkSize / 600), Math.floor(chunkSize / 300))
        for (var j = 0; j < mountainCount; j++) {
            var mountainX = random(startX, startX + chunkSize)
            this.mountains.push(new Mountain(mountainX, y))
        }

        let canyonCount = 2
        if (random(0, 1) >= 0.5) { // 50% chance to generate an enemy
            this.enemies.push(new Enemy(random(startX + chunkSize * 0.3, startX + chunkSize * 0.7), y - 40, 30, 300))
            canyonCount = 1
        }

        for (var j = 0; j < canyonCount; j++) {
            var canyonX = random(startX + chunkSize * 0.3, startX + chunkSize * 0.7)
            this.canyons.push(Canyon.setup(canyonX, y))
        }

        let cloudCount = random(Math.floor(chunkSize / 300), Math.floor(chunkSize / 150))
        for (var j = 0; j < cloudCount; j++) {
            var cloudX = random(startX, startX + chunkSize)
            this.clouds.push(new Cloud(cloudX))
        }

        let collectableCount = random(Math.floor(chunkSize / 500), Math.floor(chunkSize / 300))
        for (var j = 0; j < collectableCount; j++) {
            var collectableX = random(startX, startX + chunkSize)
            this.collectables.push(new Collectable(collectableX, y - 40, 50))
        }
    }

    addPlatform(startX, endX, negative = false) {
        var platformCount = Math.floor(abs((startX - endX) / (100 + 50)))
        let platformGap = (abs(startX - endX) - (platformCount * 100)) / (platformCount - 1)

        for (var i = 0; i < platformCount; i++) {
            if (negative) {
                this.platforms.push(new Platform(startX - i * (100 + platformGap), floorY - (i + 1) * 75, 100))
            }
            else {
                this.platforms.push(new Platform(startX + i * (100 + platformGap), floorY - (i + 1) * 75, 100))
            }

            if (i == platformCount - 1) {
                if (negative) {

                    this.checkpoints.push(new Checkpoint(startX - i * (100 + platformGap), floorY - (i + 1) * 75, 100))
                }
                else {
                    this.checkpoints.push(new Checkpoint(startX + i * (100 + platformGap), floorY - (i + 1) * 75, true))
                }
            }
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
        if (this.canyons) this.canyons.forEach(canyon => canyon.checkCollision())
        if (this.clouds) this.clouds.forEach(cloud => cloud.move())
        if (this.collectables) this.collectables.forEach(collectable => collectable.checkCollision())
        if (this.checkpoints) this.checkpoints.forEach(checkpoint => {
            checkpoint.checkCollision()
            checkpoint.moveFlag()
        })
        if (this.enemies) this.enemies.forEach(enemy => {
            enemy.move()
            enemy.checkCollision(player.pos.x, player.pos.y, player.width, player.height)
        })

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
        this.platforms.forEach(platform => platform.draw())
        this.enemies.forEach(enemy => enemy.draw())

        pop()
    }
}