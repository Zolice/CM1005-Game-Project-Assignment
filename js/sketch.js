var debug_anchor = true // Toggle for anchor points
var debug_ui = false // Displays FPS Counter

var floorY
var translation = 0;

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

	console.log("Starting setup...")
	createCanvas(windowWidth, windowHeight - 32)

	scene = new Scene()
	player = Character.setup()
	console.log("Setup complete")
}

function resetGame() {
	scene = new Scene()
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