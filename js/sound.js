class Sound {
    constructor() {
        this.sound = {}
        this.length = 0
        this.loadedCount = 0
        this.loaded = false
    }

    static setup() {
        let x = new Sound()
        x.addSound("jump", loadSound("assets/sound/jump.mp3", () => sound.soundLoaded()))
        x.addSound("checkpoint", loadSound("assets/sound/checkpoint.mp3", () => sound.soundLoaded()))
        x.addSound("plummeting", loadSound("assets/sound/plummeting.mp3", () => sound.soundLoaded()))
        x.addSound("win", loadSound("assets/sound/win.mp3", () => sound.soundLoaded()))
        x.addSound("point", loadSound("assets/sound/point.mp3", () => sound.soundLoaded()))
        x.addSound("fireworks", loadSound("assets/sound/fireworks.mp3", () => sound.soundLoaded()))
        return x
    }

    soundLoaded() {
        this.loadedCount++
        if (this.loadedCount >= this.length) {
            this.loaded = true
        }
        else {
            this.loaded = false
        }
    }

    addSound(name, sound) {
        this.sound[name] = sound
        this.length++
        this.loaded = false
    }

    playSound(name) {
        if (this.sound[name]) this.sound[name].play()
    }

    stopSound(name) {
        if (this.sound[name]) this.sound[name].stop()
    }
}