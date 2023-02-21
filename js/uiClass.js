class Ui {
    constructor() {
        this.frameRate = 60
        this.defaultFontColor = color(0, 0, 0)
        this.timer = 0
        this.background = color(0, 0, 0, 75)
        this.fontColour = color(255, 255, 255)

        this.setFrameRate(this.frameRate)
    }

    static setup() {
        return new Ui()
    }

    draw() {
        if (!player.alive) {
            this.drawGameLost()
        }

        if (player.gameWon) {
            this.drawGameWon()
        }

        textAlign(LEFT, TOP)
        fill(this.defaultFontColor)
        textSize(12)

        text("Time: " + Math.floor(this.timer) + "s",
            20, 20)

        text("Score: " + Math.floor(player.score),
            96, 20)

        text("Lives: " + player.lives, 20, 40)

        text("Distance: " + Math.floor(player.getDistance()),
            96, 40)

        if (player.alive && !player.gameWon) {
            if (frameRate() > 0) { // Prevents 1 / 0
                this.timer += (1 / frameRate())
            }
        }

        if (debug_ui) {
            text("FPS: " + Math.floor(frameRate()), 20, 60)
        }
    }

    drawLoading() {
        fill(this.background)
        rect(0, 0, width, height)
        fill(this.fontColour)
        textSize(128)
        textAlign(CENTER, CENTER)
        text("Loading...", width / 2, height / 2)
    }

    drawGameLost() {
        fill(this.background)
        rect(0, 0, width, height)
        fill(this.fontColour)
        textSize(128)
        textAlign(CENTER, CENTER)
        text("You ran out of Lives!", width / 2, height / 2)
        textSize(32)
        text("Press R to restart", width / 2, height / 2 + 80)

        textSize(24)
        text("Time: " + Math.floor(this.timer) + "s",
            width / 2, height / 2 + 128)
        text("Score: " + Math.floor(player.score),
            width / 2, height / 2 + 160)
        text("Distance Travelled: " + Math.floor(player.getDistance()),
            width / 2, height / 2 + 192)
    }

    drawGameWon() {
        fill(this.background)
        rect(0, 0, width, height)
        fill(this.fontColour)
        textSize(128)
        textAlign(CENTER, CENTER)
        text("You won!", width / 2, height / 2)
        textSize(32)
        text("Press R to restart", width / 2, height / 2 + 80)

        textSize(24)
        text("Time: " + Math.floor(this.timer) + "s",
            width / 2, height / 2 + 128)
        text("Score: " + Math.floor(player.score),
            width / 2, height / 2 + 160)
        text("Distance Travelled: " + Math.floor(player.getDistance()),
            width / 2, height / 2 + 192)
    }

    keyPressed(keyCode) {
        if ((keyCode == 82 && player.plummeting) || (keyCode == 82 && player.gameWon)) {
            resetGame()
        }
    }

    setFrameRate(fps) {
        console.log("Attempting to set frame rate to " + fps)
        frameRate(fps)
    }
}