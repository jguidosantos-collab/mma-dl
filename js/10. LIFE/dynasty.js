class Dynasty {
    constructor() {
        this.generations = {};
    }

    startGeneration(playerId, playerData) {
        if (!this.generations[playerId]) {
            this.generations[playerId] = [];
        }

        this.generations[playerId].push({
            generationNumber: this.generations[playerId].length + 1,
            player: playerData,
            startWeek: TimeSystem.getWeek()
        });
    }

    createHeir(parentPlayer) {
        const family = FamilySystem.getFamily(parentPlayer.id);
        const adultChildren = FamilySystem.getAdultChildren(parentPlayer.id);

        if (adultChildren.length === 0) {
            return null;
        }

        const heir = adultChildren[0];
        const inheritedMoney = parentPlayer.money * 0.7; // 70% após impostos

        const newPlayer = new Player({
            name: heir.name,
            birthYear: TimeSystem.currentYear - (Math.floor((TimeSystem.getWeek() - heir.birthWeek) / 52)),
            country: parentPlayer.country,
            gender: heir.gender,
            money: inheritedMoney,
            fame: 0, // Fama não é herdada
            attributes: {
                strength: parentPlayer.attributes.strength * 0.8 + RNG.randomInt(0, 20),
                speed: parentPlayer.attributes.speed * 0.8 + RNG.randomInt(0, 20),
                stamina: parentPlayer.attributes.stamina * 0.8 + RNG.randomInt(0, 20),
                technique: parentPlayer.attributes.technique * 0.8 + RNG.randomInt(0, 20),
                defense: parentPlayer.attributes.defense * 0.8 + RNG.randomInt(0, 20),
                chin: parentPlayer.attributes.chin * 0.8 + RNG.randomInt(0, 20),
                wrestling: parentPlayer.attributes.wrestling * 0.8 + RNG.randomInt(0, 20),
                striking: parentPlayer.attributes.striking * 0.8 + RNG.randomInt(0, 20)
            },
            parentData: {
                parentName: parentPlayer.name,
                parentOverall: parentPlayer.getOverall(),
                recordWins: parentPlayer.recordWins,
                recordLosses: parentPlayer.recordLosses
            }
        });

        // Bônus de começar em nível superior com bom empresário
        const manager = ManagersSystem.getPlayerManager(parentPlayer.id);
        if (manager && manager.quality >= 80) {
            newPlayer.careerLevel = 'Regional';
        }

        return newPlayer;
    }

    getGenerationHistory(playerId) {
        return this.generations[playerId] || [];
    }
}

const DynastySystem = new Dynasty();
