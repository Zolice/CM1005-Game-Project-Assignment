class Ui {
    constructor() {
        this.frameRate = applyFrameRate
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
            this.drawEndGame("You ran out of Lives!")
        }

        if (player.gameWon) {
            this.drawEndGame("You won!")
        }

        textAlign(LEFT, TOP)
        fill(this.defaultFontColor)
        textSize(12)

        text("Score: " + this.getScoreRatio(),
            20, 20)

        text("Time: " + this.getTimeInMinuteAndSeconds(),
            128, 20)

        text("Lives: " + player.lives, 20, 40)

        text("Distance: " + Math.floor(player.getDistance()),
            128, 40)

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

    drawEndGame(content) {
        fill(this.background)
        rect(0, 0, width, height)
        fill(this.fontColour)
        textSize(128)
        textAlign(CENTER, CENTER)
        text(content, width / 2, height / 2)
        textSize(32)
        text("Press R to restart", width / 2, height / 2 + 80)

        textSize(24)
        text("Time: " + this.getTimeInMinuteAndSeconds(),
            width / 2, height / 2 + 128)
        text("Score: " + this.getScoreRatio(),
            width / 2, height / 2 + 160)
        text("Distance Travelled: " + Math.floor(player.getDistance()),
            width / 2, height / 2 + 192)
    }

    getTimeInMinuteAndSeconds() {
        let minutes = Math.floor(this.timer / 60)
        let seconds = Math.floor(this.timer % 60)

        return (minutes == 0 ? "" : (minutes + "min ")) + seconds + "s"
    }

    getScoreRatio() {
        return `${Math.floor(player.score)} / ${Math.floor(scene.collectables.length)}`
    }

    keyPressed(keyCode) {
        if ((keyCode == 82 && player.plummeting) || (keyCode == 82 && player.gameWon)) {
            resetGame()
            this.timer = 0
        }
    }

    setFrameRate(fps) {
        console.log("Attempting to set frame rate to " + fps) 
        frameRate(fps) // The FPS cap doesn't seem to apply on certain platforms. Not enough equipment to investigate further.
    }
}