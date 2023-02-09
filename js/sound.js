var soundObject

function soundSetup() {
    soundObject = {
        length: 0,
        loadedCount: 0,
        loaded: false,
        soundLoaded: () => {
            console.log('Sound loaded')
            soundObject.loadedCount++
            if (soundObject.loadedCount >= this.length) {
                soundObject.loaded = true
            }
            else{
                soundObject.loaded = false
            }
            console.log(soundObject)
        },
        addSound: function (name, sound) {
            soundObject[name] = sound
            // soundObject.sound.push(sound)
            soundObject.length++
            soundObject.loaded = false
        },
        sound: {}
    }
}

function loadGameSounds() {
    soundObject.addSound(loadSound("assets/jump.wav", soundObject.soundLoaded))
    // soundObject.addSound(new Sound("land", "assets/sounds/land.wav"))
    // soundObject.addSound(new Sound("plummet", "assets/sounds/plummet.wav"))
    // soundObject.addSound(new Sound("win", "assets/sounds/win.wav"))
    // soundObject.addSound(new Sound("lose", "assets/sounds/lose.wav"))
    // soundObject.addSound(new Sound("music", "assets/sounds/music.wav"))
    // soundObject.addSound(new Sound("music2", "assets/sounds/music2.wav"))
    // soundObject.addSound(new Sound("music3", "assets/sounds/music3.wav"))

    console.log(soundObject)
}