class Fights {
    constructor() {
        this.history = [];
    }

    simulateFight(player, opponent, playerStrategy = {}) {
        const result = {
            player1: player,
            player2: opponent,
            rounds: [],
            winner: null,
            playerStrategy: playerStrategy,
            opponentStrategy: this.generateAIStrategy(opponent)
        };

        // 3 rounds padrão
        for (let round = 1; round <= 3; round++) {
            const roundResult = this.simulateRound(player, opponent, playerStrategy, result.opponentStrategy);
            result.rounds.push(roundResult);
        }

        // Determina vencedor
        result.winner = this.determineWinner(player, opponent, result.rounds);

        this.history.push(result);

        // Atualiza stats
        if (result.winner.id === player.id) {
            player.addWin();
            player.addMoney(Math.floor(5000 + Math.random() * 5000));
            player.addFame(Math.floor(10 + Math.random() * 20));
            opponent.addLoss();
        } else {
            player.addLoss();
            player.addMoney(Math.floor(2000 + Math.random() * 2000));
            opponent.addWin();
            opponent.addMoney(Math.floor(5000 + Math.random() * 5000));
            opponent.addFame(Math.floor(10 + Math.random() * 20));
        }

        EventSystem.emit('fightEnded', result);

        return result;
    }

    simulateRound(player, opponent, playerStrategy, opponentStrategy) {
        const playerOverall = player.getOverall();
        const opponentOverall = opponent.getOverall();

        let playerScore = playerOverall + (playerStrategy.aggressiveness || 50);
        let opponentScore = opponentOverall + (opponentStrategy.aggressiveness || 50);

        // Aplica estratégia
        if (playerStrategy.focus) {
            playerScore += 10;
        }

        const roundWinner = playerScore > opponentScore ? 'player' : 'opponent';

        return {
            number: 1,
            playerScore: playerScore,
            opponentScore: opponentScore,
            winner: roundWinner,
            events: this.generateRoundEvents(roundWinner)
        };
    }

    generateRoundEvents(winner) {
        const events = [];
        if (RNG.chance(50)) {
            events.push(winner + ' landed a big strike');
        }
        if (RNG.chance(30)) {
            events.push(winner + ' attempted a takedown');
        }
        return events;
    }

    determineWinner(player1, player2, rounds) {
        let player1Wins = 0;
        let player2Wins = 0;

        rounds.forEach(round => {
            if (round.winner === 'player') player1Wins++;
            else player2Wins++;
        });

        return player1Wins > player2Wins ? player1 : player2;
    }

    getLastFight(playerId) {
        const fights = this.history.filter(f => 
            f.player1.id === playerId || f.player2.id === playerId
        );
        return fights[fights.length - 1];
    }

    getRecord(playerId) {
        const wins = this.history.filter(f => f.winner.id === playerId).length;
        const losses = this.history.filter(f => 
            (f.player1.id === playerId || f.player2.id === playerId) && f.winner.id !== playerId
        ).length;
        return { wins, losses };
    }
}

const FightsSystem = new Fights();
