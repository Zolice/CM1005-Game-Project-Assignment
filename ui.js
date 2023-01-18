// Toggle for Frame Rate Counter
var ui_debug = true

var frameRateVar = 60

var uiDefaultFontColor = [0, 0, 0]
var timer = 0

var uiBackground = [0, 0, 0, 75]
var uiFontColour = [255, 255, 255]

function uiSetup() {
    timer = 0
    frameRate(frameRateVar)
}

function uiDraw() {
    if (!player.alive) {
        uiGameLost()
    }

    if (player.gameWon) {
        uiGameWon()
    }

    fill(uiDefaultFontColor)
    textSize(12)

    text("Time: " + Math.floor(timer) + "s",
        20, 20)

    text("Score: " + Math.floor(player.score),
        96, 20)

    text("Lives: " + player.lives, 20, 40)

    if (player.alive && !player.gameWon) {
        if (frameRate() > 0) { // Prevents 1 / 0
            timer += (1 / frameRate())
        }
    }

    if (ui_debug) {
        text("FPS: " + Math.floor(frameRate()), 20, 60)
    }
}

function uiGameLost() {
    fill(uiBackground)
    rect(0, 0, width, height)
    fill(uiFontColour)
    textSize(128)
    textAlign(CENTER, CENTER)
    text("You ran out of Lives!", width / 2, height / 2)
    textSize(32)
    text("Press R to restart", width / 2, height / 2 + 80)

    textSize(24)
    text("Time: " + Math.floor(timer) + "s",
        width / 2, height / 2 + 128)
    text("Score: " + Math.floor(player.score),
        width / 2, height / 2 + 160)

    textAlign(LEFT, TOP)
}

function uiGameWon() {
    fill(uiBackground)
    rect(0, 0, width, height)
    fill(uiFontColour)
    textSize(128)
    textAlign(CENTER, CENTER)
    text("You won!", width / 2, height / 2)
    textSize(32)
    text("Press R to restart", width / 2, height / 2 + 64)

    textSize(24)
    text("Time: " + Math.floor(timer) + "s",
        width / 2, height / 2 + 128)
    text("Score: " + Math.floor(player.score),
        width / 2, height / 2 + 160)
    text("Lives: " + Math.floor(player.lives),
        width / 2, height / 2 + 192)

    textAlign(LEFT, TOP)
}