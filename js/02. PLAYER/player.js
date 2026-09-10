class Player {
    constructor(data = {}) {
        this.id = data.id || 'player_' + Date.now();
        this.name = data.name || 'Unknown Fighter';
        this.birthYear = data.birthYear || 0;
        this.country = data.country || 'USA';
        this.gender = data.gender || 'Male';
        
        this.attributes = new Attributes(data.attributes);
        this.development = new Development();
        
        this.health = 100;
        this.injury = null;
        this.injuryWeeksLeft = 0;
        
        this.money = data.money || 1000;
        this.fame = data.fame || 0;
        this.ranking = null;
        
        this.careerLevel = 'Amateur'; // Amateur, Regional, Nacional, Internacional, Elite
        this.careerStage = 'Amateur';
        this.recordWins = 0;
        this.recordLosses = 0;
        
        this.parentData = data.parentData || null; // Para herança dinástica
    }

    getAge() {
        return TimeSystem.getAge(this.birthYear);
    }

    getOverall() {
        return this.attributes.getOverall();
    }

    getStats() {
        return {
            name: this.name,
            age: this.getAge(),
            country: this.country,
            overall: this.getOverall(),
            health: this.health,
            money: this.money,
            fame: this.fame,
            wins: this.recordWins,
            losses: this.recordLosses,
            careerLevel: this.careerLevel
        };
    }

    setInjury(injury, weeks) {
        this.injury = injury;
        this.injuryWeeksLeft = weeks;
        this.health = Math.max(0, this.health - 30);
        EventSystem.emit('playerInjured', { injury, weeks });
    }

    recoverFromInjury() {
        if (this.injuryWeeksLeft > 0) {
            this.injuryWeeksLeft--;
            this.health = Math.min(100, this.health + 10);
            
            if (this.injuryWeeksLeft === 0) {
                this.injury = null;
                this.health = 100;
                EventSystem.emit('playerRecovered');
            }
        }
    }

    canTrain() {
        return !this.injury && this.injuryWeeksLeft === 0 && this.health > 50;
    }

    addMoney(amount) {
        this.money += amount;
        EventSystem.emit('moneyChanged', this.money);
    }

    addFame(amount) {
        this.fame += amount;
        EventSystem.emit('fameChanged', this.fame);
    }

    addWin() {
        this.recordWins++;
        this.addExperience(100);
    }

    addLoss() {
        this.recordLosses++;
        this.addExperience(50);
    }

    addExperience(amount) {
        this.development.addExperience(amount);
    }

    serialize() {
        return {
            id: this.id,
            name: this.name,
            birthYear: this.birthYear,
            country: this.country,
            gender: this.gender,
            attributes: this.attributes.getAll(),
            health: this.health,
            injury: this.injury,
            injuryWeeksLeft: this.injuryWeeksLeft,
            money: this.money,
            fame: this.fame,
            careerLevel: this.careerLevel,
            recordWins: this.recordWins,
            recordLosses: this.recordLosses,
            development: {
                potential: this.development.potential,
                experiencePoints: this.development.experiencePoints,
                level: this.development.level
            },
            parentData: this.parentData
        };
    }

    static deserialize(data) {
        const player = new Player(data);
        player.attributes = new Attributes(data.attributes);
        if (data.development) {
            player.development.potential = data.development.potential;
            player.development.experiencePoints = data.development.experiencePoints;
            player.development.level = data.development.level;
        }
        return player;
    }
}
