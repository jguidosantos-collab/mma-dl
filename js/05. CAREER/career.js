class Career {
    constructor() {
        this.stages = ['Amateur', 'Regional', 'Nacional', 'Internacional', 'Elite'];
    }

    getCareerStage(player) {
        return player.careerLevel;
    }

    promotePlayer(player, newStage) {
        const currentIndex = this.stages.indexOf(player.careerLevel);
        const newIndex = this.stages.indexOf(newStage);

        if (newIndex > currentIndex) {
            player.careerLevel = newStage;
            EventSystem.emit('playerPromoted', { player, newStage });
            return true;
        }

        return false;
    }

    checkPromotion(player) {
        const wins = player.recordWins;
        const overall = player.getOverall();

        if (player.careerLevel === 'Amateur' && wins >= 5 && overall >= 60) {
            this.promotePlayer(player, 'Regional');
        } else if (player.careerLevel === 'Regional' && wins >= 12 && overall >= 70) {
            this.promotePlayer(player, 'Nacional');
        } else if (player.careerLevel === 'Nacional' && wins >= 20 && overall >= 78) {
            this.promotePlayer(player, 'Internacional');
        } else if (player.careerLevel === 'Internacional' && wins >= 30 && overall >= 85) {
            this.promotePlayer(player, 'Elite');
        }
    }

    getOpportunities(player) {
        const opportunities = [];

        if (RNG.chance(30)) {
            const opponent = FightersDatabase.getRandomFighter(player);
            opportunities.push({
                type: 'fight',
                opponent: opponent,
                title: `Fight vs ${opponent.name}`,
                reward: 5000 + RNG.randomInt(0, 5000)
            });
        }

        if (player.careerLevel !== 'Elite' && RNG.chance(15)) {
            opportunities.push({
                type: 'promotion',
                title: `Promotion opportunity to next level`,
                reward: 0
            });
        }

        return opportunities;
    }
}

const CareerSystem = new Career();
