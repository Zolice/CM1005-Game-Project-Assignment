var collectableColorScheme = {
    mainBody: [255, 255, 255],
    stroke: [0, 0, 0],
    star: [255, 235, 59]
}

function createCollectable(x, y, size) {
    var collectableVar = {
        x: x,
        y: y,
        size: size,
        collected: false
    }
    return collectableVar
}

function drawCollectable(collectableVar) {
    // Check if collectable is collectable
    collectableCheck(collectableVar)

    if (collectableVar.collected == false) {
        strokeWeight(collectableVar.size / 30)
        stroke(collectableColorScheme.stroke) // Black
        fill(collectableColorScheme.mainBody)
        ellipse(collectableVar.x, collectableVar.y, collectableVar.size, collectableVar.size);

        fill(collectableColorScheme.star)
        beginShape();
        vertex(collectableVar.x, collectableVar.y - collectableVar.size * 5 / 12);
        vertex(collectableVar.x - collectableVar.size / 6, collectableVar.y - collectableVar.size / 12); // mid
        vertex(collectableVar.x - collectableVar.size * 5 / 12, collectableVar.y - collectableVar.size / 12);
        vertex(collectableVar.x - collectableVar.size * 13 / 60, collectableVar.y + collectableVar.size / 6); // mid
        vertex(collectableVar.x - collectableVar.size * 13 / 60, collectableVar.y + collectableVar.size * 5 / 12);
        vertex(collectableVar.x, collectableVar.y + collectableVar.size / 4); // mid
        vertex(collectableVar.x + collectableVar.size * 13 / 60, collectableVar.y + collectableVar.size * 5 / 12);
        vertex(collectableVar.x + collectableVar.size * 13 / 60, collectableVar.y + collectableVar.size / 6); // mid
        vertex(collectableVar.x + collectableVar.size * 5 / 12, collectableVar.y - collectableVar.size / 12);
        vertex(collectableVar.x + collectableVar.size / 6, collectableVar.y - collectableVar.size / 12); // mid
        vertex(collectableVar.x, collectableVar.y - collectableVar.size * 5 / 12);

        endShape();
    }
    if (debug_anchor) {
        fill(255, 0, 0)
        ellipse(collectableVar.x, collectableVar.y, 5, 5)
    }
}

function collectableCheck(collectableVar) {
    var d = dist(player.x, player.y, collectableVar.x, collectableVar.y)
    if (d < collectableVar.size) {
        collectableVar.collected = true
    }
}