var debug_anchor = false

var floorY
var translation = 0;

function setup() { // This function is called only once
	console.log("Starting setup...")
	createCanvas(windowWidth, windowHeight - 32)
	floorY = height * 0.7
	translation = 0
	
	uiSetup()
	characterSetup()
	sceneSetup()
	console.log("Setup complete")
}

function draw() // This function is ran per frame
{
	sceneDraw()
	characterDraw()
	uiDraw()
}

function keyPressed() { // Reload the page when R is pressed
	if(keyCode == 82 && player.plummeting) {
		setup()
	}

	characterKeyPressed(keyCode)
}

function keyReleased() {
	characterKeyReleased(keyCode)
}