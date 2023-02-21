var player

class Character {
	constructor(x = 0, y = height * 0.7, charWidth) {
		this.pos = createVector(x, y)
		this.displayX = x
		this.height = charWidth * 1.3
		this.width = charWidth
		this.direction = "front"
		this.plummeting = false
		this.jumping = false
		this.alive = true
		this.movement = createVector(0, 0)
		this.score = 0
		this.lives = 3
		this.lastCheckpoint = x
		this.gameWon = false

		this.startX = x
		this.distance = 0

		this.spawn()
	}

	color = {
		body: color(26, 35, 126),
		arm: color(9, 14, 67),
		eyeSocket: color(255, 255, 255),
		eye: color(0, 0, 0),
		nose: color(245, 124, 0),
		leg: color(245, 127, 23)

	}

	gravity = createVector(0, 1)

	static setup() {
		return new Character(
			0,
			floorY,
			60)
	}

	spawn() {		
		translation = width * 0.5 - this.displayX
		this.displayX +=  translation
	}

	move() {
		if (this.plummeting) {
			this.movement.add(this.gravity)
			this.pos.add(this.movement)
			if (this.pos.y >= height && this.alive) {
				this.respawn()
			}
			return
		}

		this.movement.add(this.gravity)
		this.pos.add(this.movement)

		if (this.pos.y >= floorY) {
			this.pos.y = floorY
			this.movement.y = 0
			this.jumping = false
		}

		switch (this.direction) {
			case "left":
				this.pos.x -= 10
				translation += 10
				break
			case "right":
				this.pos.x += 10
				translation -= 10
			default: break
		}
	}

	setPlummeting(plummeting) {
		this.plummeting = plummeting
		sound.playSound("plummeting")
		console.log(`Player fell into a canyon! ${this.lives - 1} lives remaining.`)
	}

	setCheckpoint(checkpoint) {
		if(this.gameWon) return
		this.lastCheckpoint = checkpoint
		sound.playSound("checkpoint")
	}

	setGameWon() {
		this.gameWon = true
		sound.playSound("win")
	}

	addScore(score = 1) {
		if(this.gameWon) return
		this.score+= score
	}

	getDistance() {
		if(this.gameWon) return this.distance
		this.distance = abs(this.pos.x - this.startX)
		return this.distance
	}

	respawn() {
		if (this.lives > 1) {
			this.lives--
			translation += this.pos.x - this.lastCheckpoint

			this.pos.x = this.lastCheckpoint
			this.pos.y = floorY
			this.plummeting = false
		}
		else {
			this.alive = false
		}
	}

	jump(yVelocity = -15) {
		if (!this.plummeting && !this.jumping) {
			this.movement = createVector(0, yVelocity)
			this.jumping = true
			sound.playSound("jump")
		}
	}

	keyPressed(keyCode) {
		if ((keyCode == 32 || keyCode == 38)) {
			this.jump()
		}
		if (keyCode == 37) {
			this.direction = "left"
		}
		if (keyCode == 39) {
			this.direction = "right"
		}
	}

	keyReleased(keyCode) {
		if (keyCode == 37) {
			if (keyIsDown(39)) {
				player.direction = "right"
			}
			else {
				player.direction = "front"
			}
		}
		if (keyCode == 39) {
			if (keyIsDown(37)) {
				player.direction = "left"
			}
			else {
				player.direction = "front"
			}
		}
	}

	draw() {
		// Calculate Height
		this.height = this.width * 1.3

		// Draw legs
		stroke(this.color.leg)
		strokeWeight(this.width / 5)
		var legYStart = this.pos.y - this.width / 10
		var legYEnd = this.pos.y

		if (this.jumping) {
			legYEnd = this.pos.y + this.width / 10
		}
		// Left Leg
		if (this.direction != "right") {
			var legXStart = this.displayX - this.width / 5
			var legXEnd = this.displayX - this.width / 3
			if (this.jumping) {
				legXEnd = this.displayX - this.width / 4
			}
			line(legXStart, legYStart, legXEnd, legYEnd)
		}

		// Right Leg
		if (this.direction != "left") {
			var legXStart = this.displayX + this.width / 5
			var legXEnd = this.displayX + this.width / 3
			if (this.jumping) {
				legXEnd = this.displayX + this.width / 4
			}
			line(legXStart, legYStart, legXEnd, legYEnd)
		}


		// Draw Arms
		if (this.direction == "front") {
			stroke(this.color.arm)
			strokeWeight(this.width / 5)
			var armYStart = this.pos.y - this.height + (this.width / 2)
			var armYEnd = this.pos.y - this.height + (this.width * 3 / 4)

			// Left Arm
			var armXStart = this.displayX - this.width / 2
			var armXEnd = this.displayX - this.width / 2
			if (this.jumping) {
				armXEnd = this.displayX - this.width * 7 / 10
			}
			line(armXStart, armYStart, armXEnd, armYEnd)

			// Right Arm
			armXStart = this.displayX + this.width / 2
			armXEnd = this.displayX + this.width / 2
			if (this.jumping) {
				armXEnd = this.displayX + this.width * 7 / 10
			}
			line(armXStart, armYStart, armXEnd, armYEnd)
		}

		// Draw the body
		stroke(this.color.body) // Dark Blue?
		strokeWeight(this.width)
		line(this.displayX, this.pos.y - (this.width / 2), this.displayX, this.pos.y - (this.width * 0.8))

		// Draw the Chin (side)
		if (this.direction != "front") {
			if (this.direction == "left") {
				var chinStart = 0
				var chinEnd = PI / 2
				var chinX = this.displayX - this.width / 2
			}
			else if (this.direction == "right") {
				var chinStart = PI / 2
				var chinEnd = PI
				var chinX = this.displayX + this.width / 2
			}
			strokeWeight(0.5)
			stroke(this.color.body)
			fill(this.color.eyeSocket)
			arc(chinX, this.pos.y - this.height + (this.width / 2), this.width * 2 / 3, this.width * 7 / 10, chinStart, chinEnd, PIE)
		}


		// Draw the Eye Socket
		if (this.direction != "front") {
			strokeWeight(1)
			stroke(this.color.body)

			if (this.direction == "left") {
				var socketX = this.displayX - this.width / 3
			}
			else if (this.direction == "right") {
				var socketX = this.displayX + this.width / 3
			}
			var socketY = this.pos.y - this.height + (this.width / 2)
			strokeWeight(1)
			// stroke(characterColorScheme.body[0], characterColorScheme.body[1], characterColorScheme.body[2])
			noStroke()
			fill(this.color.eyeSocket)
			ellipse(socketX, socketY, this.width / 3, this.width / 2)
		}
		else {
			// Left Eye Socket
			strokeWeight(1)
			stroke(this.color.body)
			fill(this.color.eyeSocket)
			ellipse(this.displayX - (this.width / 4), this.pos.y - this.height + (this.width / 2), this.width / 2, this.width / 2)
			// Right Eye Socket
			strokeWeight(1)
			stroke(this.color.body)
			fill(this.color.eyeSocket)
			ellipse(this.displayX + (this.width / 4), this.pos.y - this.height + (this.width / 2), this.width / 2, this.width / 2)
		}

		// Draw chin (front)
		if (this.direction == "front") {
			strokeWeight(1)
			stroke(this.color.body)
			fill(this.color.eyeSocket)
			arc(this.displayX, this.pos.y - this.height + (this.width / 2), this.width, this.width, 0, PI)
		}

		// Draw the Eyes
		if (this.direction != "front") {
			if (this.direction == "left") {
				var eyeX = this.displayX - this.width / 3
			}
			else if (this.direction == "right") {
				var eyeX = this.displayX + this.width / 3
			}
			var eyeY = this.pos.y - this.height + (this.width / 2)
			noStroke();
			stroke(this.color.body)
			fill(this.color.eye)
			ellipse(eyeX, eyeY, this.width / 9, this.width / 9)
		}
		else {
			// Left Eye
			noStroke()
			fill(this.color.eye)
			ellipse(this.displayX - (this.width / 4), this.pos.y - this.height + (this.width / 2) + this.width / 16, this.width / 9, this.width / 9)
			// Right Eye
			noStroke()
			fill(this.color.eye)
			ellipse(this.displayX + (this.width / 4), this.pos.y - this.height + (this.width / 2) + this.width / 16, this.width / 9, this.width / 9)
		}

		// Draw nose
		if (this.direction != "front") {
			if (this.direction == "left") {
				var noseX = this.displayX - this.width / 2
			}
			else if (this.direction == "right") {
				var noseX = this.displayX + this.width / 2
			}
			var noseY = this.pos.y - this.height + (this.width / 2) + this.width / 8
			noStroke()
			fill(this.color.nose)
			ellipse(noseX, noseY, this.width / 9, this.width / 9)
		}
		else {
			noStroke()
			fill(this.color.nose)
			triangle(this.displayX, this.pos.y - this.height + (this.width / 2) + this.width / 8, this.displayX - this.width / 16, this.pos.y - this.height + (this.width / 2) + this.width / 6 + this.width / 16, this.displayX + this.width / 16, this.pos.y - this.height + (this.width / 2) + this.width / 6 + this.width / 16)
		}

		// Draw Arms
		stroke(this.color.arm)
		strokeWeight(this.width / 5)
		var armYStart = this.pos.y - this.height + (this.width / 2)
		var armYEnd = this.pos.y - this.height + (this.width * 3 / 4)

		// Draw side arms (if facing side)
		if (this.direction != "front") {
			var armXStart = this.displayX
			var armXEnd = this.displayX
			if (this.jumping) {
				if (this.direction == "left") {
					armXEnd = this.displayX + this.width * 2 / 10
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
			ellipse(this.displayX, this.pos.y, 5, 5)
		}
	}
}