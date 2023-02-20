var soundObject = {
    length: 0,
    loadedCount: 0,
    loaded: false,
    soundLoaded: function () {
        this.loadedCount++
        console.log(`Sound loading ${Math.ceil(this.loadedCount / this.length * 100)}% : ` + this.loadedCount + ' / ' + this.length) 
        if (this.loadedCount >= this.length) {
            this.loaded = true
        }
        else {
            this.loaded = false
        }
    },
    addSound: function (name, sound) {
        this.sound[name] = sound
        this.length++
        this.loaded = false
    },
    getSound: function (name) {
        return this.sound[name]
    },
    playSound: function (name) {
        this.sound[name].play()
    },
    stopSound: function (name) {
        this.sound[name].stop()
    },
    sound: {}
}


function soundSetup() {
    soundObject.addSound("jump", loadSound("assets/sound/jump.mp3",() => soundObject.soundLoaded()))
    soundObject.addSound("checkpoint", loadSound("assets/sound/checkpoint.mp3", () => soundObject.soundLoaded()))
    soundObject.addSound("plummeting", loadSound("assets/sound/plummeting.mp3", () => soundObject.soundLoaded()))
    soundObject.addSound("win", loadSound("assets/sound/win.mp3", () => soundObject.soundLoaded()))
    soundObject.addSound("point", loadSound("assets/sound/point.mp3", () => soundObject.soundLoaded()))
}