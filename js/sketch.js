// Configurable Constants
// debug_anchor adds a red dot/anchor point to the origin x,y of each object
const debug_anchor = true

// debug_ui adds a FPS counter to the top left of the screen
const debug_ui = true

// applyFrameRate sets the frame rate of the game. 
// The FPS cap doesn't seem to apply on certain platforms. Not enough equipment to investigate further.
const applyFrameRate = 60

// chunkCount sets the number of chunks that will be generated. Half will be generated on the left, half on the right.
// recommended value: 10
const chunkCount = 10

var floorY
var translation

var sound
var ui
var scene


function preload() {
	sound = Sound.setup()
}

function setup() {
	ui = Ui.setup()
	while (!sound.loaded) {
		ui.drawLoading()
	}

	createCanvas(windowWidth, windowHeight - 32)
	scene = new Scene()
	scene.setup()
	player = Character.setup()
}

function resetGame() {
	scene = new Scene()
	scene.setup()
	player = Character.setup()
}

function draw() {
	scene.move()
	scene.draw()
	player.move()
	player.draw()
	ui.draw()
}

function keyPressed() {
	if (player) player.keyPressed(keyCode)
	if (ui) ui.keyPressed(keyCode)
}

function keyReleased() {
	if (player) player.keyReleased(keyCode)
}