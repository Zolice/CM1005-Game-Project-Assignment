var player

var characterColorScheme = {
	body: [26, 35, 126],
	arm: [9, 14, 67],
	eyeSocket: [255, 255, 255],
	eye: [0, 0, 0],
	nose: [245, 124, 0],
	leg: [245, 127, 23]
}

function characterSetup() {
	player = createCharacter(random(0, width * 0.3), floorY, 60, "front", false, false, true)
	translation = width * 0.5 - player.displayX
	player.displayX += translation
}

function characterDraw() {

	moveCharacter(player)
	drawCharacter(player)
}

function createCharacter(x, y, width, direction, plummeting, jumping, alive) {
	var characterVar = {
		x: x,
		y: y,
		displayX: x,
		displayY: y,
		height: 0, // height actually scales off the width
		width: width,
		direction: direction,
		plummeting: plummeting,
		jumping: jumping,
		alive: alive,
		xSpeed: 0,
		ySpeed: 0,
		score: 0,
		lives: 3,
		lastCheckpoint: x, 
		gameWon: false
	}
	return characterVar
}

function characterKeyPressed(keyCode) {
	if (keyCode == 37) {
		player.direction = "left"
		player.xSpeed = -10
	}
	else if (keyCode == 39) {
		player.direction = "right"
		player.xSpeed = 10
	}
	if ((keyCode == 38 || keyCode == 32) && !player.jumping) {
		player.jumping = true
		player.ySpeed = -15
	}
}

function characterKeyReleased() {
	if (keyCode == 37) {
		if (keyIsDown(39)) {
			player.xSpeed = 10

			player.direction = "right"
		}
		else {
			player.xSpeed = 0

			player.direction = "front"
		}
	}
	else if (keyCode == 39) {
		if (keyIsDown(37)) {
			player.xSpeed = -10
			player.direction = "left"
		}
		else {
			player.xSpeed = 0

			player.direction = "front"
		}
	}
}

function moveCharacter(characterVar) {
	// Plummeting
	if (characterVar.plummeting) {
		characterVar.jumping = true
		characterVar.y += 10
		characterVar.displayY += 10

		// Reset Character
		resetCharacter(characterVar)
	} else {
		// Move Character Left and Right
		characterVar.x += characterVar.xSpeed
		characterVar.displayX += characterVar.xSpeed

		// if ((characterVar.displayX - width * 0.5) < 10 && (characterVar.displayX - width * 0.5) > -10) {
		translation -= characterVar.displayX - width * 0.5
		characterVar.displayX = width * 0.5
		// }
		// else if (characterVar.displayX > width * 0.5) {
		// 	translation -= 10
		// 	characterVar.displayX -= 10
		// }
		// else if (characterVar.displayX < width * 0.5) {
		// 	translation += 10
		// 	characterVar.displayX += 10
		// }

		// Handle ySpeed
		if (characterVar.jumping) {
			characterVar.ySpeed += 1 // Gravity

			characterVar.y += characterVar.ySpeed
			characterVar.displayY += characterVar.ySpeed
		}

		// Gravity
		if (characterVar.jumping) {
			if (characterVar.y > floorY) {
				characterVar.jumping = false
				characterVar.y = floorY
				characterVar.displayY = floorY
			}
		}
	}
}

function resetCharacter(characterVar) {
	console.log("Resetting Character, Lives left = " + characterVar.lives)
	if (characterVar.y >= height && characterVar.alive) {
		// Character hit the floor
		// Bring Character to safe checkpoint
		characterVar.lives -= 1
		if (characterVar.lives <= 0) {
			characterVar.alive = false
		}
		else {
			var checkpointLocation = characterVar.x - characterVar.lastCheckpoint
			characterVar.x -= checkpointLocation
			characterVar.displayX -= checkpointLocation
			characterVar.y = floorY
			characterVar.displayY = floorY

			characterVar.plummeting = false
		}
	}
}

function drawCharacter(characterVar) {
	// Calculate Height
	characterVar.height = characterVar.width * 1.3

	// Draw legs
	stroke(characterColorScheme.leg[0], characterColorScheme.leg[1], characterColorScheme.leg[2])
	strokeWeight(characterVar.width / 5)
	var legYStart = characterVar.displayY - characterVar.width / 10
	var legYEnd = characterVar.displayY

	if (characterVar.jumping) {
		legYEnd = characterVar.displayY + characterVar.width / 10
	}
	// Left Leg
	if (characterVar.direction != "right") {
		var legXStart = characterVar.displayX - characterVar.width / 5
		var legXEnd = characterVar.displayX - characterVar.width / 3
		if (characterVar.jumping) {
			legXEnd = characterVar.displayX - characterVar.width / 4
		}
		line(legXStart, legYStart, legXEnd, legYEnd)
	}

	// Right Leg
	if (characterVar.direction != "left") {
		var legXStart = characterVar.displayX + characterVar.width / 5
		var legXEnd = characterVar.displayX + characterVar.width / 3
		if (characterVar.jumping) {
			legXEnd = characterVar.displayX + characterVar.width / 4
		}
		line(legXStart, legYStart, legXEnd, legYEnd)
	}


	// Draw Arms
	if (characterVar.direction == "front") {
		stroke(characterColorScheme.arm[0], characterColorScheme.arm[1], characterColorScheme.arm[2])
		strokeWeight(characterVar.width / 5)
		var armYStart = characterVar.displayY - characterVar.height + (characterVar.width / 2)
		var armYEnd = characterVar.displayY - characterVar.height + (characterVar.width * 3 / 4)

		// Left Arm
		var armXStart = characterVar.displayX - characterVar.width / 2
		var armXEnd = characterVar.displayX - characterVar.width / 2
		if (characterVar.jumping) {
			armXEnd = characterVar.displayX - characterVar.width * 7 / 10
		}
		line(armXStart, armYStart, armXEnd, armYEnd)

		// Right Arm
		armXStart = characterVar.displayX + characterVar.width / 2
		armXEnd = characterVar.displayX + characterVar.width / 2
		if (characterVar.jumping) {
			armXEnd = characterVar.displayX + characterVar.width * 7 / 10
		}
		line(armXStart, armYStart, armXEnd, armYEnd)
	}

	// Draw the body
	stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2]) // Dark Blue?
	strokeWeight(characterVar.width)
	line(characterVar.displayX, characterVar.displayY - (characterVar.width / 2), characterVar.displayX, characterVar.displayY - (characterVar.width * 0.8))

	// Draw the Chin (side)
	if (characterVar.direction != "front") {
		if (characterVar.direction == "left") {
			var chinStart = 0
			var chinEnd = PI / 2
			var chinX = characterVar.displayX - characterVar.width / 2
		}
		else if (characterVar.direction == "right") {
			var chinStart = PI / 2
			var chinEnd = PI
			var chinX = characterVar.displayX + characterVar.width / 2
		}
		strokeWeight(0.5)
		stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])
		fill(characterColorScheme.eyeSocket[0], characterColorScheme.eyeSocket[1], characterColorScheme.eyeSocket[2])
		arc(chinX, characterVar.displayY - characterVar.height + (characterVar.width / 2), characterVar.width * 2 / 3, characterVar.width * 7 / 10, chinStart, chinEnd, PIE)
	}


	// Draw the Eye Socket
	if (characterVar.direction != "front") {
		strokeWeight(1)
		stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])

		if (characterVar.direction == "left") {
			var socketX = characterVar.displayX - characterVar.width / 3
		}
		else if (characterVar.direction == "right") {
			var socketX = characterVar.displayX + characterVar.width / 3
		}
		var socketY = characterVar.displayY - characterVar.height + (characterVar.width / 2)
		strokeWeight(1)
		// stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])
		noStroke()
		fill(characterColorScheme.eyeSocket[0], characterColorScheme.eyeSocket[1], characterColorScheme.eyeSocket[2])
		ellipse(socketX, socketY, characterVar.width / 3, characterVar.width / 2)
	}
	else {
		// Left Eye Socket
		strokeWeight(1)
		stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])
		fill(characterColorScheme.eyeSocket[0], characterColorScheme.eyeSocket[1], characterColorScheme.eyeSocket[2])
		ellipse(characterVar.displayX - (characterVar.width / 4), characterVar.displayY - characterVar.height + (characterVar.width / 2), characterVar.width / 2, characterVar.width / 2)
		// Right Eye Socket
		strokeWeight(1)
		stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])
		fill(characterColorScheme.eyeSocket[0], characterColorScheme.eyeSocket[1], characterColorScheme.eyeSocket[2])
		ellipse(characterVar.displayX + (characterVar.width / 4), characterVar.displayY - characterVar.height + (characterVar.width / 2), characterVar.width / 2, characterVar.width / 2)
	}

	// Draw chin (front)
	if (characterVar.direction == "front") {
		strokeWeight(1)
		stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])
		fill(characterColorScheme.eyeSocket[0], characterColorScheme.eyeSocket[1], characterColorScheme.eyeSocket[2])
		arc(characterVar.displayX, characterVar.displayY - characterVar.height + (characterVar.width / 2), characterVar.width, characterVar.width, 0, PI)
	}

	// Draw the Eyes
	if (characterVar.direction != "front") {
		if (characterVar.direction == "left") {
			var eyeX = characterVar.displayX - characterVar.width / 3
		}
		else if (characterVar.direction == "right") {
			var eyeX = characterVar.displayX + characterVar.width / 3
		}
		var eyeY = characterVar.displayY - characterVar.height + (characterVar.width / 2)
		noStroke();
		stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])
		fill(characterColorScheme.eye[0], characterColorScheme.eye[1], characterColorScheme.eye[2])
		ellipse(eyeX, eyeY, characterVar.width / 9, characterVar.width / 9)
	}
	else {
		// Left Eye
		noStroke()
		fill(characterColorScheme.eye[0], characterColorScheme.eye[1], characterColorScheme.eye[2])
		ellipse(characterVar.displayX - (characterVar.width / 4), characterVar.displayY - characterVar.height + (characterVar.width / 2) + characterVar.width / 16, characterVar.width / 9, characterVar.width / 9)
		// Right Eye
		noStroke()
		fill(characterColorScheme.eye[0], characterColorScheme.eye[1], characterColorScheme.eye[2])
		ellipse(characterVar.displayX + (characterVar.width / 4), characterVar.displayY - characterVar.height + (characterVar.width / 2) + characterVar.width / 16, characterVar.width / 9, characterVar.width / 9)
	}

	// Draw nose
	if (characterVar.direction != "front") {
		if (characterVar.direction == "left") {
			var noseX = characterVar.displayX - characterVar.width / 2
		}
		else if (characterVar.direction == "right") {
			var noseX = characterVar.displayX + characterVar.width / 2
		}
		var noseY = characterVar.displayY - characterVar.height + (characterVar.width / 2) + characterVar.width / 8
		noStroke()
		fill(characterColorScheme.nose[0], characterColorScheme.nose[1], characterColorScheme.nose[2])
		ellipse(noseX, noseY, characterVar.width / 9, characterVar.width / 9)
	}
	else {
		noStroke()
		fill(characterColorScheme.nose[0], characterColorScheme.nose[1], characterColorScheme.nose[2])
		triangle(characterVar.displayX, characterVar.displayY - characterVar.height + (characterVar.width / 2) + characterVar.width / 8, characterVar.displayX - characterVar.width / 16, characterVar.displayY - characterVar.height + (characterVar.width / 2) + characterVar.width / 6 + characterVar.width / 16, characterVar.displayX + characterVar.width / 16, characterVar.displayY - characterVar.height + (characterVar.width / 2) + characterVar.width / 6 + characterVar.width / 16)
	}

	// Draw Arms
	stroke(characterColorScheme.arm[0], characterColorScheme.arm[1], characterColorScheme.arm[2])
	strokeWeight(characterVar.width / 5)
	var armYStart = characterVar.displayY - characterVar.height + (characterVar.width / 2)
	var armYEnd = characterVar.displayY - characterVar.height + (characterVar.width * 3 / 4)

	// Draw side arms (if facing side)
	if (characterVar.direction != "front") {
		var armXStart = characterVar.displayX
		var armXEnd = characterVar.displayX
		if (characterVar.jumping) {
			if (characterVar.direction == "left") {
				armXEnd = characterVar.displayX + characterVar.width * 2 / 10
			}
		}
		line(armXStart, armYStart, armXEnd, armYEnd)
	}

	strokeWeight(1)

	// Draw an anchor
	if (debug_anchor) {
		stroke(125)
		strokeWeight(1)
		fill(255, 0, 0)
		ellipse(characterVar.displayX, characterVar.displayY, 5, 5)
	}
}