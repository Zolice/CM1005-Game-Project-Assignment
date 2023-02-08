var treeLeafColorScheme = [
    [27, 94, 32],
    [46, 125, 50],
    [56, 142, 60],
    [130, 119, 23],
    [51, 105, 30],
    [85, 139, 47],
    [104, 159, 56],
    [76, 175, 80],
    [67, 160, 71]
]

var treeLogColorScheme = [
    [62, 39, 35],
    [78, 52, 46],
    [93, 64, 55],
    [109, 76, 65]
]

var cloudColorScheme = [
    [238, 238, 238],
    [245, 245, 245],
    [224, 224, 224],
    [189, 189, 189],
    [158, 158, 158],
    [141, 110, 99],
    [176, 190, 197],
    [120, 144, 156],
    [236, 239, 241]
]

var mountainColorScheme = [
    [62, 39, 35],
    [78, 52, 46],
    [93, 64, 55],
    [109, 76, 65],
    [121, 85, 72],
    [141, 110, 99],
    [66, 66, 66],
    [97, 97, 97],
    [117, 117, 117]
]

var mountainSnowColorScheme = [
    [238, 238, 238],
    [245, 245, 245],
    [224, 224, 224],
    [189, 189, 189],
    [158, 158, 158],
    [141, 110, 99],
    [176, 190, 197],
    [120, 144, 156],
    [236, 239, 241]
]

var canyonColorScheme = [
    [38, 50, 56],
    [33, 33, 33],
    [62, 39, 35],
    [55, 71, 79],
    [66, 66, 66],
    [78, 52, 46]
]

function createTree(x, y, logHeight, logWidth, leafHeight, leafWidth) {
    var treeVar = {
        x: x,
        y: y,
        logHeight: logHeight,
        logWidth: logWidth,
        leafHeight: leafHeight,
        leafWidth: leafWidth,
        logColor: random(treeLogColorScheme),
        leafColor1: random(treeLeafColorScheme),
        leafColor2: random(treeLeafColorScheme),
        leafColor3: random(treeLeafColorScheme)
    }
    return treeVar
}

function drawTree(treeXValue, treeVar) {
    // Draw the Log
    noStroke()
    fill(treeVar.logColor)
    rect(treeXValue - treeVar.logWidth / 2, treeVar.y, treeVar.logWidth, -treeVar.logHeight)
    triangle(treeXValue - treeVar.logWidth * 3 / 4, treeVar.y, treeXValue + treeVar.logWidth * 3 / 4, treeVar.y, treeXValue, treeVar.y - treeVar.leafHeight)
    triangle(treeXValue - treeVar.logWidth, treeVar.y, treeXValue + treeVar.logWidth, treeVar.y, treeXValue, treeVar.y - treeVar.leafHeight / 3)

    // Draw the Leaves
    fill(treeVar.leafColor1)
    triangle(treeXValue - treeVar.leafWidth / 2, treeVar.y - treeVar.logHeight, treeXValue + treeVar.leafWidth / 2, treeVar.y - treeVar.logHeight, treeXValue, treeVar.y - treeVar.logHeight - treeVar.leafHeight * 3 / 5)

    fill(treeVar.leafColor2)
    triangle(treeXValue - treeVar.leafWidth / 3, treeVar.y - treeVar.logHeight - treeVar.leafHeight * 1.5 / 5, treeXValue + treeVar.leafWidth / 3, treeVar.y - treeVar.logHeight - treeVar.leafHeight * 1.5 / 5, treeXValue, treeVar.y - treeVar.logHeight - treeVar.leafHeight * 4 / 5)

    fill(treeVar.leafColor3)
    triangle(treeXValue - treeVar.leafWidth / 5, treeVar.y - treeVar.logHeight - treeVar.leafHeight * 3 / 5, treeXValue + treeVar.leafWidth / 5, treeVar.y - treeVar.logHeight - treeVar.leafHeight * 3 / 5, treeXValue, treeVar.y - treeVar.logHeight - treeVar.leafHeight)

    if (debug_anchor) {
        fill(255, 0, 0)
        ellipse(treeXValue, treeVar.y, 5, 5)
    }
}

function createCloud(x, y, minX, maxX) {
    var cloudVar = {
        x: x,
        y: y,
        minX: minX,
        maxX: maxX,
        xSpeed: random(0.5, 1.5),
        cloudColor: random(cloudColorScheme),
        width: 55
    }
    return cloudVar
}

function drawClouds(cloudVar) {
    moveCloud(cloudVar)

    fill(cloudVar.cloudColor)
    noStroke()
    ellipse(cloudVar.x, cloudVar.y, 70, 70) // Center

    ellipse(cloudVar.x - 30, cloudVar.y, 50, 50)
    ellipse(cloudVar.x, cloudVar.y - 20, 50, 50)
    ellipse(cloudVar.x + 30, cloudVar.y, 50, 50)
    ellipse(cloudVar.x - 15, cloudVar.y + 25, 35, 30)
    ellipse(cloudVar.x + 15, cloudVar.y + 25, 35, 30)

    if (debug_anchor) {
        fill(255, 0, 0)
        ellipse(cloudVar.x, cloudVar.y, 5, 5)
    }
}

function moveCloud(cloudVar) {
    cloudVar.x += cloudVar.xSpeed

    // Recreate the cloud if cloud is off the screen
    if (cloudVar.x - cloudVar.width >= cloudVar.maxX) {
        cloudVar.x = cloudVar.minX - cloudVar.width
        cloudVar.xSpeed = random(0.5, 1.5)
        cloudVar.cloudColor = random(cloudColorScheme)
    }
}

function createMountain(x, y, width, height) {
    var mountainVar = {
        x: x,
        y: y,
        width: width,
        height: height,
        mountainColor1: random(mountainColorScheme),
        mountainColor2: random(mountainColorScheme),
        mountainColor3: random(mountainColorScheme),
        snowColor: random(mountainSnowColorScheme)
    }
    return mountainVar
}

function drawMountain(mountainVar) {
    fill(mountainVar.mountainColor1)
    noStroke()
    triangle(mountainVar.x - mountainVar.width * 1.5 / 5, mountainVar.y, mountainVar.x + mountainVar.width * 1.5 / 5, mountainVar.y, mountainVar.x, mountainVar.y - mountainVar.height)
    fill(mountainVar.snowColor)
    triangle(mountainVar.x - mountainVar.width * 0.24, mountainVar.y - mountainVar.height * 1 / 5, mountainVar.x + mountainVar.width * 0.06, mountainVar.y - mountainVar.height * 4 / 5, mountainVar.x, mountainVar.y - mountainVar.height)

    fill(mountainVar.mountainColor2)
    noStroke()
    triangle(mountainVar.x - mountainVar.width * 2.5 / 5, mountainVar.y, mountainVar.x + mountainVar.width * 0.5 / 5, mountainVar.y, mountainVar.x - mountainVar.width * 1 / 5, mountainVar.y - mountainVar.height * 0.8)

    fill(mountainVar.mountainColor3)
    noStroke()
    triangle(mountainVar.x - mountainVar.width * 0.5 / 5, mountainVar.y, mountainVar.x + mountainVar.width * 2.5 / 5, mountainVar.y, mountainVar.x + mountainVar.width * 1 / 5, mountainVar.y - mountainVar.height * 0.8)

    if (debug_anchor) {
        fill(255, 0, 0)
        ellipse(mountainVar.x, mountainVar.y, 5, 5)
    }
}

function createCanyon(x, y, width) {

    var canyonVar = {
        x: checkValidCanyonX(x, width),
        y: y,
        width: width,
        height: height - floorY,
        canyonColor: random(canyonColorScheme)
    }
    return canyonVar
}

function checkValidCanyonX(x, width) {
    // Check if canyon is too close to the other canyons
    canyons.forEach((canyon) => {
        // If canyon is too close to the other canyon, move it to the right
        if (x + width / 2 >= canyon.x - canyon.width / 2 && x - width / 2 <= canyon.x + canyon.width / 2) {
            x = canyon.x + canyon.width + width
        }
    })
    return x
}

function drawCanyon(canyonVar) {
    canyonCheck(canyonVar)
    fill(canyonVar.canyonColor)
    noStroke()
    rect(canyonVar.x - canyonVar.width / 2, canyonVar.y, canyonVar.width, canyonVar.height)
    if (debug_anchor) {
        fill(255, 0, 0)
        ellipse(canyonVar.x, canyonVar.y, 5, 5)
    }
}

function canyonCheck(canyonVar) {
    // Check if Player is in the canyon
    if (player.x + player.width / 2 <= canyonVar.x + canyonVar.width / 2 && player.x - player.width / 2 >= canyonVar.x - canyonVar.width / 2 && player.y == floorY) {
        player.plummeting = true
    }
}

function createFlag(x, y, height, lastFlag) {
    var flagVar = {
        x: x,
        y: y,
        flagWidth: height * 0.35,
        flagHeight: height * 0.25,
        flagY: y,
        flagColor: lastFlag ? [253, 216, 53] : [229, 57, 53], // Yellow : Red
        flagPoleColor: [189, 189, 189], // Silver
        poleWidth: 5,
        height: height,
        flagReached: false,
        lastFlag: lastFlag
    }
    return flagVar
}

function drawFlag(flagVar) {
    flagCheck(flagVar)
    fill(flagVar.flagColor)
    noStroke()
    // rect(flagVar.x, flagVar.flagY, flagVar.flagWidth, -flagVar.flagHeight)
    triangle(flagVar.x, flagVar.flagY, flagVar.x + flagVar.flagWidth, flagVar.flagY - flagVar.flagHeight * 0.5, flagVar.x, flagVar.flagY - flagVar.flagHeight)
    fill(flagVar.flagPoleColor)
    rect(flagVar.x - flagVar.poleWidth * 0.5, flagVar.y, flagVar.poleWidth, -flagVar.height)

    if (debug_anchor) {
        fill(255, 0, 0)
        ellipse(flagVar.x, flagVar.y, 5, 5)
    }
}

function flagCheck(flagVar) {
    // Check if Player is on the flag

    if (abs(player.x - flagVar.x) <= flagVar.poleWidth * 2) {
        player.lastCheckpoint = flagVar.x
        flagVar.flagReached = true
        flagVar.flagColor = flagVar.lastFlag ? [253, 216, 53] : [67, 160, 71]
        if(flagVar.lastFlag){
            player.gameWon = true
        }
    }

    // Move the flag up
    if (flagVar.flagReached) {
        flagVar.flagY = max(flagVar.flagY - 5, flagVar.y - flagVar.height + flagVar.flagHeight)
    }
}