var debug_anchor = true

var floorY = 400;
var translation = 0;

function setup() { // This function is called only once
	createCanvas(1200, 600)
	translation = 0

	// debuggingSketch()
	
	characterSetup()
	sceneSetup()
	uiSetup()
	console.log("Setup complete")
}

function draw() // This function is ran per frame
{
	sceneDraw()
	characterDraw()
	uiDraw()
}

function keyPressed() { // Reload the page when R is pressed
	if(keyCode == 82) {
		setup()
	}

	characterKeyPressed(keyCode)
}

function keyReleased() {
	characterKeyReleased(keyCode)
}

function debuggingSketch() {
	background(255)

	stroke(100)
	strokeWeight(1)
	noFill()
	rect(20, 60, 50, 80)
	noStroke()
	fill(0)
	text("1. standing front facing", 20, 160)

	player.x = 45
	player.y = 137
	player.jumping = false
	player.direction = "front"
	drawPlayer(player)

	//Jumping facing forwards
	strokeWeight(1)
	stroke(100)
	noFill()
	rect(220, 60, 50, 80)
	noStroke()
	fill(0)
	text("2. jumping facing forwards", 220, 160)

	player.x = 245
	player.y = 137 - 10
	player.jumping = true
	drawPlayer(player)

	//Walking, turned left
	strokeWeight(1)
	stroke(100)
	noFill()
	rect(20, 260, 50, 80)
	noStroke()
	fill(0)
	text("3. Walking left", 20, 360)

	player.x = 45
	player.y = 337
	//Add your code here ...
	player.jumping = false
	player.direction = "left"
	drawPlayer(player)


	//Walking, turned right
	strokeWeight(1)
	stroke(100)
	noFill()
	rect(220, 260, 50, 80)
	noStroke()
	fill(0)
	text("4. Walking right", 220, 360)

	player.x = 245
	player.y = 337
	//Add your code here ...
	player.jumping = false
	player.direction = "right"
	drawPlayer(player)


	//Jumping right
	strokeWeight(1)
	stroke(100)
	noFill()
	rect(20, 460, 50, 80)
	noStroke()
	fill(0)
	text("5. Jumping to the right", 20, 560)

	player.x = 45
	player.y = 537 - 10
	//Add your code here ...
	player.jumping = true
	player.direction = "right"
	drawPlayer(player)


	//Jumping to the left
	strokeWeight(1)
	stroke(100)
	noFill()
	rect(220, 460, 50, 80)
	noStroke()
	fill(0)
	text("6. Jumping to the left", 220, 560)

	player.x = 245
	player.y = 537 - 10
	//Add your code here ...
	player.jumping = true
	player.direction = "left"
	drawPlayer(player)
}