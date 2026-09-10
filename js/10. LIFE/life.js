class Life {
    constructor() {
        this.playerLife = {};
    }

    initializeLife(playerId) {
        this.playerLife[playerId] = {
            happiness: 50,
            motivation: 75,
            sponsor: null,
            publicImage: 'Unknown'
        };
    }

    getLifeStatus(playerId) {
        return this.playerLife[playerId] || null;
    }

    updateMotivation(playerId, amount) {
        if (!this.playerLife[playerId]) {
            this.initializeLife(playerId);
        }

        this.playerLife[playerId].motivation = Math.max(0, Math.min(100, 
            this.playerLife[playerId].motivation + amount
        ));
    }

    updateHappiness(playerId, amount) {
        if (!this.playerLife[playerId]) {
            this.initializeLife(playerId);
        }

        this.playerLife[playerId].happiness = Math.max(0, Math.min(100, 
            this.playerLife[playerId].happiness + amount
        ));
    }

    retire(player) {
        EventSystem.emit('playerRetired', { player, week: TimeSystem.getWeek() });
    }
}

const LifeSystem = new Life();
