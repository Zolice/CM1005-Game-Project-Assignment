// Toggle for anchor points
var debug_anchor = true

var floorY
var translation = 0;

function setup() {
	console.log("Starting setup...")
	createCanvas(windowWidth, windowHeight - 32)
	floorY = height * 0.7
	translation = 0

	uiSetup()
	characterSetup()
	sceneSetup()
	console.log("Setup complete")
}

function draw() {
	sceneDraw()
	characterDraw()
	uiDraw()
}

function keyPressed() {
	if (keyCode == 82 && player.plummeting) {
		setup()
	}

	characterKeyPressed(keyCode)
}

function keyReleased() {
	characterKeyReleased(keyCode)
}