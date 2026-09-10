class Engine {
    constructor() {
        this.isRunning = false;
        this.isPaused = false;
    }

    init() {
        console.log('🎮 Engine initialized');
        this.isRunning = true;
    }

    update() {
        if (!this.isRunning || this.isPaused) return;
        
        // Update logic here
        EventSystem.emit('update', TimeSystem.getWeek());
    }

    pause() {
        this.isPaused = true;
        EventSystem.emit('gamePaused');
    }

    resume() {
        this.isPaused = false;
        EventSystem.emit('gameResumed');
    }

    advanceWeek() {
        TimeSystem.advance();
        this.update();
    }

    reset() {
        TimeSystem.reset();
        this.isRunning = false;
    }
}

const GameEngine = new Engine();
