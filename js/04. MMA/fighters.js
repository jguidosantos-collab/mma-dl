class Fighters {
    constructor() {
        this.fighters = [];
        this.generateDefaultFighters();
    }

    generateDefaultFighters() {
        const names = [
            'Anderson Silva', 'Jon Jones', 'Jose Aldo', 'Georges St-Pierre',
            'Conor McGregor', 'Nate Diaz', 'Rafael dos Anjos', 'Tyron Woodley',
            'Max Holloway', 'Dominick Cruz', 'Dominick Reyes', 'Francis Ngannou'
        ];

        for (let i = 0; i < names.length; i++) {
            const fighter = new Player({
                name: names[i],
                birthYear: TimeSystem.currentYear - Math.floor(Math.random() * 15 + 25),
                country: 'USA',
                attributes: {
                    strength: Math.random() * 50 + 40,
                    speed: Math.random() * 50 + 40,
                    stamina: Math.random() * 50 + 40,
                    technique: Math.random() * 50 + 40,
                    defense: Math.random() * 50 + 40,
                    chin: Math.random() * 50 + 40,
                    wrestling: Math.random() * 50 + 40,
                    striking: Math.random() * 50 + 40
                }
            });
            this.fighters.push(fighter);
        }
    }

    getFighterByName(name) {
        return this.fighters.find(f => f.name === name);
    }

    getFightersByLevel(level) {
        return this.fighters.filter(f => f.careerLevel === level);
    }

    getRandomFighter(excludePlayer = null) {
        const available = this.fighters.filter(f => f.id !== excludePlayer?.id);
        return available[Math.floor(Math.random() * available.length)];
    }

    addFighter(fighter) {
        this.fighters.push(fighter);
    }

    removeFighter(fighterId) {
        this.fighters = this.fighters.filter(f => f.id !== fighterId);
    }
}

const FightersDatabase = new Fighters();
