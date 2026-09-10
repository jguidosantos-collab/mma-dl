class FightsScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const opponent = FightersDatabase.getRandomFighter(player);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>🥊 Fight Setup</h2>
                
                <div class="fight-arena">
                    <div class="fighter-corner">
                        <div class="fighter-avatar">🥊</div>
                        <div><strong>${player.name}</strong></div>
                        <div>OVR: <strong style="color: var(--accent-color);">${player.getOverall()}</strong></div>
                        <div>Record: ${player.recordWins}W - ${player.recordLosses}L</div>
                        <div>Health: ${player.health}%</div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: center;">
                        <div style="font-size: 24px; font-weight: bold; color: var(--accent-color);">VS</div>
                    </div>

                    <div class="fighter-corner">
                        <div class="fighter-avatar">🥋</div>
                        <div><strong>${opponent.name}</strong></div>
                        <div>OVR: <strong style="color: var(--accent-color);">${opponent.getOverall()}</strong></div>
                        <div>Record: ${opponent.recordWins}W - ${opponent.recordLosses}L</div>
                        <div>Country: ${opponent.country}</div>
                    </div>
                </div>

                <div style="margin-top: 30px; text-align: center;">
                    <h3>Choose Your Strategy</h3>
                    <div class="dashboard-actions">
                        <button id="btn-aggressive" class="danger">AGGRESSIVE</button>
                        <button id="btn-balanced" class="info">BALANCED</button>
                        <button id="btn-defensive" class="success">DEFENSIVE</button>
                    </div>
                </div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const strategies = {
            aggressive: { aggressiveness: 70, focus: false },
            balanced: { aggressiveness: 50, focus: true },
            defensive: { aggressiveness: 30, focus: true }
        };

        Object.keys(strategies).forEach(key => {
            document.getElementById(`btn-${key}`).addEventListener('click', () => {
                const result = FightsSystem.simulateFight(player, opponent, strategies[key]);
                
                let message = `\n🏆 ${result.winner.name} WINS!\n\n`;
                message += `💰 Prize: $${result.winner.id === player.id ? 5000 : 2000}\n`;
                message += `📈 Fame Gained: ${result.winner.id === player.id ? '+20' : '+10'}\n\n`;
                message += `ROUND RESULTS:\n`;
                result.rounds.forEach((round, i) => {
                    message += `Round ${i + 1}: ${round.winner === 'player' ? player.name : opponent.name} wins\n`;
                });

                alert(message);
                MediaSystem.generateFightNews(result);
                CareerSystem.checkPromotion(player);
                
                setTimeout(() => {
                    DashboardScreen.show();
                }, 500);
            });
        });

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
