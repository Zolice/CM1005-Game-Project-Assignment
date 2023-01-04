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
var trackEndX = 0

function sceneSetup() {
    backgroundColor = random(backgroundColorScheme)
    floorColor = random(floorColorScheme)
    fill(floorColor)
    rect(0, floorY, width, height - floorY)

    // Calculate how many scene sections
    // Please set an even number.
    // sceneSectionCount = random(3, 5)
    sceneSectionCount = 30
    trackEndX = sceneSectionCount * 0.5 * width
    trackStartX = sceneSectionCount * -0.5 * width

    // Reset arrays
    trees = []
    treesX = []
    clouds = []
    mountains = []
    canyons = []
    collectables = []



    for (var i = sceneSectionCount * -0.5; i < sceneSectionCount * 0.5; i++) {
        // Create Trees
        var treeCount = random(Math.floor(width / 200), Math.floor(width / 100))
        for (var j = 0; j < treeCount; j++) {
            var tree = createTree(random(0, width) + i * width, floorY, random(50, 100), random(20, 30), random(75, 120), random(70, 120))
            trees.push(tree)
            treesX.push(tree.x)
        }

        // Create Mountains
        var mountainCount = random(Math.floor(width / 500), Math.floor(width / 300))
        for (var j = 0; j < mountainCount; j++) {
            var mountain = createMountain(random(0, width) + i * width, floorY, random(200, 400), random(100, 300))
            mountains.push(mountain)
        }

        // Create Canyons
        var canyonCount = random(Math.floor(width / 750), Math.floor(width / 500))
        for (var j = 0; j < canyonCount; j++) {
            var canyon = createCanyon(random(width * 0.3, width) + i * width, floorY, random(100, 150))
            canyons.push(canyon)
        }

        // Create Collectables
        var collectableCount = random(Math.floor(width / 500), Math.floor(width / 300))
        for (var j = 0; j < collectableCount; j++) {
            var collectable = createCollectable(random(0, width) + i * width, floorY - 30, 40)
            collectables.push(collectable)
        }

        // Create Clouds
        var cloudCount = random(Math.floor(width / 300), Math.floor(width / 150))
        for (var j = 0; j < cloudCount; j++) {
            var cloud = createCloud(random(0, width) + i * width, random(0.25 * floorY, 0.6 * floorY), trackStartX, trackEndX)
            clouds.push(cloud)
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
    for (let i = 0; i < trees.length; i++) {
        drawTree(treesX[i], trees[i])
    }

    // Draw Canyons
    canyons.forEach(canyon => drawCanyon(canyon))

    // Draw Collectables
    collectables.forEach(collectable => drawCollectable(collectable))

    // Draw Clouds
    clouds.forEach(cloud => drawClouds(cloud))

    pop()
}