class Tree {
    constructor(
        x,
        y = floorY,
        treeHeight = random(width * 0.1, width * 0.2),
        logHeight = random(treeHeight * 0.3, treeHeight * 0.5),
        logWidth = random(logHeight * 0.15, logHeight * 0.2),
        leafHeight = treeHeight - logHeight,
        leafWidth = random(leafHeight * 0.5, leafHeight * 0.7)
    ) {
        this.x = x;
        this.y = y;
        this.height = treeHeight;
        this.logHeight = logHeight;
        this.logWidth = logWidth;
        this.leafHeight = leafHeight;
        this.leafWidth = leafWidth;

        this.logColor = random(this.logColor)
        this.leafColor1 = random(this.leafColor)
        this.leafColor2 = random(this.leafColor)
        this.leafColor3 = random(this.leafColor)
    }

    logColor = [
        color(62, 39, 35),
        color(78, 52, 46),
        color(93, 64, 55),
        color(109, 76, 65)
    ]

    leafColor = [
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

    draw() {
        // Draw the Log
        noStroke()
        fill(this.logColor)
        rect(this.x - this.logWidth / 2, this.y, this.logWidth, -this.logHeight)
        triangle(this.x - this.logWidth * 3 / 4, this.y, this.x + this.logWidth * 3 / 4, this.y, this.x, this.y - this.leafHeight)
        triangle(this.x - this.logWidth, this.y, this.x + this.logWidth, this.y, this.x, this.y - this.leafHeight / 3)

        // Draw the Leaves
        fill(this.leafColor1)
        triangle(this.x - this.leafWidth / 2, this.y - this.logHeight, this.x + this.leafWidth / 2, this.y - this.logHeight, this.x, this.y - this.logHeight - this.leafHeight * 3 / 5)

        fill(this.leafColor2)
        triangle(this.x - this.leafWidth / 3, this.y - this.logHeight - this.leafHeight * 1.5 / 5, this.x + this.leafWidth / 3, this.y - this.logHeight - this.leafHeight * 1.5 / 5, this.x, this.y - this.logHeight - this.leafHeight * 4 / 5)

        fill(this.leafColor3)
        triangle(this.x - this.leafWidth / 5, this.y - this.logHeight - this.leafHeight * 3 / 5, this.x + this.leafWidth / 5, this.y - this.logHeight - this.leafHeight * 3 / 5, this.x, this.y - this.logHeight - this.leafHeight)

        if (debug_anchor) {
            fill(255, 0, 0)
            ellipse(this.x, this.y, 5, 5)
        }
    }

}

class Cloud {
    constructor(
        x,
        y = random(height * 0.1, height * 0.3)
    ) {
        this.x = x;
        this.y = y;
        this.width = 55
        this.speed = random(0.5, 1.5)
        this.color = random(this.cloudColor)
    }

    cloudColor = [
        color(238, 238, 238),
        color(245, 245, 245),
        color(224, 224, 224),
        color(189, 189, 189),
        color(158, 158, 158),
        color(141, 110, 99),
        color(176, 190, 197),
        color(120, 144, 156),
        color(236, 239, 241)
    ]
    move() {

        this.x += this.speed
        if (this.x - this.width >= scene.chunkEnd) {
            this.x = scene.chunkStart - this.width
            this.speed = random(0.5, 1.5)
            this.color = random(this.cloudColor)
        }
    }

    draw() {
        fill(this.color)
        noStroke()
        ellipse(this.x, this.y, 70, 70) // Center

        ellipse(this.x - 30, this.y, 50, 50)
        ellipse(this.x, this.y - 20, 50, 50)
        ellipse(this.x + 30, this.y, 50, 50)
        ellipse(this.x - 15, this.y + 25, 35, 30)
        ellipse(this.x + 15, this.y + 25, 35, 30)

        if (debug_anchor) {
            fill(255, 0, 0)
            ellipse(this.x, this.y, 5, 5)
        }
    }
}

class Mountain {
    constructor(
        x,
        y,
        mountWidth = random(height * 0.5, height * 0.7),
        mountHeight = random(height * 0.3, height * 0.5)
    ) {
        this.x = x;
        this.y = y;
        this.width = mountWidth;
        this.height = mountHeight;
        this.color1 = random(this.mountainColor)
        this.color2 = random(this.mountainColor)
        this.color3 = random(this.mountainColor)
        this.snowColor = random(this.snowColor)
    }

    mountainColor = [
        color(62, 39, 35),
        color(78, 52, 46),
        color(93, 64, 55),
        color(109, 76, 65),
        color(121, 85, 72),
        color(141, 110, 99),
        color(66, 66, 66),
        color(97, 97, 97),
        color(117, 117, 117)
    ]

    snowColor = [
        color(238, 238, 238),
        color(245, 245, 245),
        color(224, 224, 224),
        color(189, 189, 189),
        color(158, 158, 158),
        color(141, 110, 99),
        color(176, 190, 197),
        color(120, 144, 156),
        color(236, 239, 241)
    ]

    draw() {
        fill(this.color1)
        noStroke()
        triangle(this.x - this.width * 1.5 / 5, this.y, this.x + this.width * 1.5 / 5, this.y, this.x, this.y - this.height)
        fill(this.snowColor)
        triangle(this.x - this.width * 0.24, this.y - this.height * 1 / 5, this.x + this.width * 0.06, this.y - this.height * 4 / 5, this.x, this.y - this.height)

        fill(this.color2)
        noStroke()
        triangle(this.x - this.width * 2.5 / 5, this.y, this.x + this.width * 0.5 / 5, this.y, this.x - this.width * 1 / 5, this.y - this.height * 0.8)

        fill(this.color3)
        noStroke()
        triangle(this.x - this.width * 0.5 / 5, this.y, this.x + this.width * 2.5 / 5, this.y, this.x + this.width * 1 / 5, this.y - this.height * 0.8)

        if (debug_anchor) {
            fill(255, 0, 0)
            ellipse(this.x, this.y, 5, 5)
        }
    }
}

class Canyon {
    constructor(
        x,
        y = floorY,
        width = random(100, 150),
        canyonHeight = height - floorY
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = canyonHeight;
        this.color = random(this.canyonColor)
    }

    static setup(
        x,
        y = floorY,
        canyonWidth = random(100, 150),
        canyonHeight = height - floorY
    ) {
        // canyons.forEach((canyon) => {
        //     // If canyon is too close to the other canyon, move it to the right
        //     if (x + canyonWidth / 2 >= canyon.x - canyon.width / 2 && x - canyonWidth / 2 <= canyon.x + canyon.width / 2) {
        //         x = canyon.x + canyon.width + canyonWidth
        //     }
        // })
        return new Canyon(x, y, canyonWidth, canyonHeight)
    }

    canyonColor = [
        color(38, 50, 56),
        color(33, 33, 33),
        color(62, 39, 35),
        color(55, 71, 79),
        color(66, 66, 66),
    ]

    checkCollision() {
        if (player.pos.x + player.width / 2 <= this.x + this.width / 2 && player.pos.x - player.width / 2 >= this.x - this.width / 2 && player.pos.y == floorY) {
            player.setPlummeting(true)
        }
    }

    draw() {
        fill(this.color)
        noStroke()
        rect(this.x - this.width / 2, this.y, this.width, this.height)
        if (debug_anchor) {
            fill(255, 0, 0)
            ellipse(this.x, this.y, 5, 5)
        }
    }
}

class Checkpoint {
    constructor(
        x,
        y = floorY,
        lastFlag = false
    ) {
        this.x = x;
        this.y = y;
        this.flagY = y;
        this.lastFlag = lastFlag
        this.width = height * 0.2
        this.height = height * 0.45
        this.flagHeight = this.height * 0.3

        if (lastFlag) {
            this.width = height * 0.45
            this.height = height * 0.35
        }
        this.color = lastFlag ? color(253, 216, 53) : color(229, 57, 53) // Yellow : Red

        this.reached = false
        this.poleWidth = 5
        this.particleEmitter = []
        this.clusterSummoned = false
    }

    poleColor = color(189, 189, 189)

    checkCollision() {
        if (!this.reached && abs(player.pos.x - this.x) <= this.poleWidth * 2) {
            this.reached = true

            if (this.lastFlag) {
                player.setGameWon()
                this.color = color(67, 160, 71)
            }
            else {
                player.setCheckpoint(this.x)
            }

            this.summonFireworks()
        }
    }

    summonFireworks(cluster = false) {
        if (!cluster) {
            this.particleEmitter.push(new ParticleEmitter(this.x + 150, this.y - this.height, "spread", 3, 500, 100, 30, 10, true, []))
            this.particleEmitter.push(new ParticleEmitter(this.x - 150, this.y - this.height, "spread", 3, 500, 100, 30, 10, true, []))
            soundObject.playSound("fireworks")
        }
        else{
            for(let i = this.x-500; i <= this.x+500; i+=200){
                let y = this.flagY + random(-50, 100)
                console.log(`Spawning fireworks at ${i}, ${y}`)
                this.particleEmitter.push(new ParticleEmitter(i, y, "spread", 5, 400, 100, 25, 10, true, []))
                // soundObject.playSound("fireworks")
                this.clusterSummoned = true
            }
        }


    }

    moveFlag() {
        if (this.reached) {
            this.flagY = max(this.flagY - 4, this.y - this.height + this.flagHeight)
        }

        if (this.flagY == this.y - this.height + this.flagHeight && !this.clusterSummoned) {
            this.summonFireworks(true)
        }
    }

    draw() {
        fill(this.color)
        noStroke()
        triangle(this.x, this.flagY, this.x + this.width, this.flagY - this.flagHeight * 0.5, this.x, this.flagY - this.flagHeight)
        fill(this.poleColor)
        rect(this.x - this.poleWidth * 0.5, this.y, this.poleWidth, -this.height)

        if (debug_anchor) {
            fill(255, 0, 0)
            ellipse(this.x, this.y, 5, 5)
        }

        this.particleEmitter.forEach((emitter) => {
            emitter.spawnParticles()
            emitter.updateParticles()
            emitter.drawParticles()
            if (!emitter.isAlive())
                this.particleEmitter.splice(this.particleEmitter.indexOf(emitter), 1)
        })
    }
}
