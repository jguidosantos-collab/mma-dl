class RankingsScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        RankingsSystem.updateRankings(player.careerLevel);
        const rankings = RankingsSystem.getRankings(player.careerLevel);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>📊 Rankings - ${player.careerLevel}</h2>
                
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--accent-color);">
                                <th style="padding: 10px; text-align: left;">Rank</th>
                                <th style="padding: 10px; text-align: left;">Fighter</th>
                                <th style="padding: 10px; text-align: center;">Overall</th>
                                <th style="padding: 10px; text-align: center;">Record</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rankings.slice(0, 20).map((rank, index) => `
                                <tr style="border-bottom: 1px solid var(--border-color); ${rank.fighter.id === player.id ? 'background-color: rgba(255, 107, 53, 0.2);' : ''}">
                                    <td style="padding: 10px;"><strong>#${rank.rank}</strong></td>
                                    <td style="padding: 10px;">${rank.fighter.name} ${rank.fighter.id === player.id ? '👈 (YOU)' : ''}</td>
                                    <td style="padding: 10px; text-align: center;">${rank.overall}</td>
                                    <td style="padding: 10px; text-align: center;">${rank.record.wins}W - ${rank.record.losses}L</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
