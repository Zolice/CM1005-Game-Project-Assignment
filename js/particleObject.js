class ParticleEmitter {
    constructor(
        x,
        y,
        type = "spread",
        size,
        count,
        age = 100,
        spawnPerCycle = count,
        spawnDelay = 10,
        randomColour = false,
        colour = [color(0, 0, 0)]
    ) {

        this.pos = createVector(x, y)
        this.type = type
        this.size = size
        this.count = count
        this.colour = colour
        this.particleAge = age
        this.randomColour = randomColour
        this.remainder = count
        this.spawnPerCycle = spawnPerCycle
        this.spawnDelay = spawnDelay

        this.age = 0
        this.particles = []
        this.timer = 0
    }

    spawnParticles() {
        if (this.timer % this.spawnDelay == 0) {

            let spawnCount = min(this.spawnPerCycle, this.remainder)

            var applyColour

            for (let i = 0; i < spawnCount; i++) {
                if (this.randomColour) {
                    applyColour = color(random(0, 255), random(0, 255), random(0, 255))
                }
                else {
                    applyColour = random(this.colour)
                }
                this.particles.push(new Particle(this.pos.x, this.pos.y, this.size, applyColour, this.particleAge))
            }

            this.remainder -= spawnCount
        }
        this.timer += 1
    }


    updateParticles() {
        this.age += 1
        this.particles.forEach((particle) => {
            particle.update()
            if (!particle.alive) {
                this.particles.splice(this.particles.indexOf(particle), 1)
            }
        })
    }

    drawParticles() {
        this.particles.forEach((particle) => {
            particle.draw()
        })

        if(debug_anchor) {
            noStroke()
            fill(255, 0, 0)
            ellipse(this.pos.x, this.pos.y, 5, 5)
        }
    }

    isAlive() {
        return this.particles.length > 0
    }
}

class Particle {
    constructor(
        x, y,
        size,
        colour = color(0, 0, 0),
        particleAge = 100,
        direction = createVector(random(-1, 1), random(-1, 1))
    ) {
        this.pos = createVector(x, y)
        this.size = size
        this.colour = colour
        this.particleAge = particleAge
        this.direction = direction
        this.age = 0
        this.alive = true
    }

    update() {
        this.age += 1
        if (this.age >= this.particleAge && this.alive) {
            this.alive = false
            return 1
        }
        this.pos.add(this.direction)
    }

    draw() {
        if (!this.alive) return
        fill(this.colour)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.size, this.size)
    }
}