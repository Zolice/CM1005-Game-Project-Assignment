var backgroundColorScheme = [
    [178, 235, 242],
    [128, 222, 234],
    [179, 229, 252],
    [129, 212, 250],
    [187, 222, 251],
    [144, 202, 249],
    [197, 202, 233],
    [159, 168, 218]
]

var floorColorScheme = [
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

var sceneSectionCount
var trees = []
var clouds = []
var mountains = []
var canyons = []
var collectables = []
var backgroundColor
var floorColor

function sceneSetup() {
    backgroundColor = random(backgroundColorScheme)
    floorColor = random(floorColorScheme)
    fill(floorColor)
    rect(0, floorY, width, height - floorY)

    // Calculate how many scene sections
    // sceneSectionCount = random(3, 5)
    sceneSectionCount = 50

    // Reset arrays
    trees = []
    clouds = []
    mountains = []
    canyons = []
    collectables = []

    // Create Clouds
    // Clouds stay on screen all the time, not affected by sections
    var cloudCount = random(Math.floor(width / 300), Math.floor(width / 100))
    for (var j = 0; j < cloudCount; j++) {
        var cloud = createCloud(random(0, width), random(0.25 * floorY, 0.6 * floorY), width)
        clouds.push(cloud)
    }

    for (var i = 0; i < sceneSectionCount; i++) {
        // Create Trees
        var treeCount = random(5, 10)
        for (var j = 0; j < treeCount; j++) {
            var tree = createTree(random(0, width) + i * width, floorY, random(50, 100), random(20, 30), random(75, 120), random(70, 120))
            trees.push(tree)
        }

        // Create Mountains
        var mountainCount = random(1, 3)
        for (var j = 0; j < mountainCount; j++) {
            var mountain = createMountain(random(0, width) + i * width, floorY, random(200, 400), random(100, 300))
            mountains.push(mountain)
        }

        // Create Canyons
        var canyonCount = random(1, 2)
        for (var j = 0; j < canyonCount; j++) {
            var canyon = createCanyon(random(width * 0.3, width) + i * width, floorY, random(100, 150))
            canyons.push(canyon)
        }

        // Create Collectables
        var collectableCount = random(2, 5)
        for (var j = 0; j < collectableCount; j++) {
            var collectable = createCollectable(random(0, width) + i * width, floorY - 30, 40)
            collectables.push(collectable)
        }
    }
}

function sceneDraw() {
    // Draw Background
    background(backgroundColor)
    fill(floorColor)
    rect(0, floorY, width, height - floorY)

    push()
    translate(translation, 0)

    // Draw Mountains
    mountains.forEach(mountain => drawMountain(mountain))

    // Draw Trees
    trees.forEach(tree => drawTree(tree))

    // Draw Canyons
    canyons.forEach(canyon => drawCanyon(canyon))

    // Draw Collectables
    collectables.forEach(collectable => drawCollectable(collectable))

    pop()

    // Clouds
    // Draw Clouds
    clouds.forEach(cloud => drawClouds(cloud))
}