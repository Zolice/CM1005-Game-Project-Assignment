var ui_debug = true

var frameRateVar = 60

var uiDefaultFontColor = [0, 0, 0]
var timer = 0

var uiGameLostBackground = [0, 0, 0, 75]
var uiGameLostFontColor = [255, 255, 255]

function uiSetup() {
    timer = 0
    frameRate(frameRateVar)
}

function uiDraw() {
    if (player.plummeting) {
        uiGameLost()
    }

    fill(uiDefaultFontColor)
    textSize(12)

    text("Time: " + Math.floor(timer) + "s",
        20, 20)

    text("Score: " + Math.floor(player.score),
        96, 20)

    if (!player.plummeting) {
        if (frameRate() > 0) { // Prevents 1 / 0
            timer += (1 / frameRate())
        }
    }

    if (ui_debug) {
        text("FPS: " + Math.floor(frameRate()), 20, 40)
    }
}

function uiGameLost() {
    fill(uiGameLostBackground)
    rect(0, 0, width, height)
    fill(uiGameLostFontColor)
    textSize(128)
    textAlign(CENTER, CENTER)
    text("You fell!", width / 2, height / 2)
    textSize(32)
    text("Press R to restart", width / 2, height / 2 + 64)

    textSize(24)
    text("Time: " + Math.floor(timer) + "s",
        width / 2, height / 2 + 128)
    text("Score: " + Math.floor(player.score),
        width / 2, height / 2 + 160)

    textAlign(LEFT, TOP)
}