class Platform {
    constructor(x, y, width) {
        this.x = x
        this.y = y
        this.width = width
        this.height = 20
        this.color = color(255, 255, 255)
        this.stroke = color(0, 0, 0)
    }

    static checkCollision(x, y, width) {
        // Get an array of all the platforms the player is above
        let height = []
        scene.platforms.forEach(platform => {
            if (x + width / 2 > platform.x - platform.width / 2 && x - width / 2 < platform.x + platform.width / 2 && y <= platform.y) {
                height.push(platform.y)
            }
        })

        // Find the highest one from the array
        let finalHeight = floorY
        height.forEach(height => {
            if (height < finalHeight) {
                finalHeight = height
            }
        })
        return finalHeight
    }

    draw() {
        fill(this.color)
        stroke(this.stroke)
        rect(this.x - this.width / 2, this.y, this.width, this.height)

        if (debug_anchor) {
            noStroke()
            fill(255, 0, 0)
            ellipse(this.x, this.y, 5, 5)
        }
    }
}