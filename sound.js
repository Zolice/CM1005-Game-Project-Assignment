var soundObject

function soundSetup() {
    soundObject = {
        length: 0,
        loadedCount: 0,
        loaded: false,
        soundLoaded: function () {
            this.loadedCount++
            if (this.loadedCount == this.length) {
                this.loaded = true
            }
        },
        addSound: function (sound) {
            this[sound.name] = sound
            this.length++
        },
        sound: []
    }

    console.log(soundObject)
}