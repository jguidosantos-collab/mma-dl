class Rankings {
    constructor() {
        this.rankings = {};
    }

    updateRankings(level) {
        const fighters = FightersDatabase.fighters.filter(f => f.careerLevel === level);
        const sorted = fighters.sort((a, b) => b.getOverall() - a.getOverall());

        this.rankings[level] = sorted.map((fighter, index) => ({
            rank: index + 1,
            fighter: fighter,
            overall: fighter.getOverall(),
            record: { wins: fighter.recordWins, losses: fighter.recordLosses }
        }));
    }

    getRankings(level) {
        if (!this.rankings[level]) {
            this.updateRankings(level);
        }
        return this.rankings[level];
    }

    getPlayerRank(playerId, level) {
        const rankings = this.getRankings(level);
        const playerRank = rankings.find(r => r.fighter.id === playerId);
        return playerRank ? playerRank.rank : null;
    }

    getTopFighters(level, limit = 10) {
        return this.getRankings(level).slice(0, limit);
    }
}

const RankingsSystem = new Rankings();
