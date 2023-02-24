class Enemy {
    constructor(
        x,
        y,
        size = 30,
        distance = 100,
        speed = 3,
        color
    ) {
        this.x = x
        this.y = y
        this.size = size
        this.distance = distance
        this.speed = speed
        if (color) this.color = color

        this.startX = x - distance / 2
        this.endX = x + distance / 2
    }

    color = color(255, 0, 0)

    draw() {
        fill(this.color)
        noStroke()
        ellipse(this.x, this.y, this.size, this.size)

        if (debug_anchor) {
            noStroke()
            fill(255, 0, 0)
            ellipse(this.x, this.y, 5, 5)
        }
    }

    move() {
        if (this.x >= this.endX || this.x <= this.startX) {
            this.speed = -this.speed
        }

        this.x += this.speed
    }

    checkCollision(x, y, width, height) {
        if (x + width / 2 > this.x - this.size / 2 && x - width / 2 < this.x + this.size / 2) {
            if (y > this.y - this.size / 3 && y - height < this.y + this.size / 3)
                player.setPlummeting()
        }
    }
}