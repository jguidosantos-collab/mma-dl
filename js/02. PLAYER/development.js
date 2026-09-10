class Development {
    constructor() {
        this.potential = 75;
        this.experiencePoints = 0;
        this.level = 1;
    }

    addExperience(amount) {
        this.experiencePoints += amount;
        this.checkLevelUp();
    }

    checkLevelUp() {
        const experiencePerLevel = 1000;
        const newLevel = Math.floor(this.experiencePoints / experiencePerLevel) + 1;
        
        if (newLevel > this.level) {
            this.level = newLevel;
            EventSystem.emit('levelUp', this.level);
        }
    }

    setPotential(value) {
        this.potential = Math.min(value, 100);
    }

    getPotential() {
        return this.potential;
    }

    canImprove(currentOverall) {
        return currentOverall < this.potential;
    }

    getImprovementRate() {
        return Math.max(0.1, (this.potential / 100) * 0.5);
    }
}
