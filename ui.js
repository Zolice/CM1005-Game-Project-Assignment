var uiColor = [0, 0, 0]
var timer = 0

function uiSetup() {
    timer = 0
    frameRate(60)
}

function uiDraw() {
    fill(uiColor)
    text("FPS: " + Math.floor(frameRate()), 20, 20)

    if (!player.plummeting) {
        // timer += 1 / getFrameRate() // not used due to infinity
        timer += 1 / 70 // For some reason the average FPS is 70?
    }

    text("Time: " + Math.floor(timer) + "s",
        20, 40)
}