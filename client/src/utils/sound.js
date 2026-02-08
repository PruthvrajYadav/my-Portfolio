const soundFiles = {
    hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    theme: 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'
};

class SoundManager {
    constructor() {
        this.enabled = true;
        this.sounds = {};

        Object.keys(soundFiles).forEach(key => {
            this.sounds[key] = new Audio(soundFiles[key]);
            this.sounds[key].volume = 0.2;
        });
    }

    play(name) {
        if (!this.enabled || !this.sounds[name]) return;

        // Reset and play
        this.sounds[name].currentTime = 0;
        this.sounds[name].play().catch(() => {
            // Browser might block sound if user hasn't interacted yet
            console.log("Sound playback blocked by browser");
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

export const soundManager = new SoundManager();
