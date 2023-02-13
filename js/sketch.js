// Toggle for anchor points
var debug_anchor = false

var floorY
var translation = 0;

function preload() {
	soundSetup()
}

function setup() {
	uiLoading()
	while (!soundObject.loaded) {
		console.log(soundObject.loaded)
	}


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
	if ((keyCode == 82 && player.plummeting) || (keyCode == 82 && player.gameWon)) {
		setup()
	}

	characterKeyPressed(keyCode)
}

function keyReleased() {
	characterKeyReleased(keyCode)
}