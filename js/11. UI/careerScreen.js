class CareerScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const rank = RankingsSystem.getPlayerRank(player.id, player.careerLevel);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>🏆 Career</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Current Status</div>
                        <div class="card-content">
                            <p><strong>Level:</strong> ${player.careerLevel}</p>
                            <p><strong>Record:</strong> ${player.recordWins}W - ${player.recordLosses}L</p>
                            <p><strong>Ranking:</strong> ${rank || 'Unranked'}</p>
                            <p><strong>Overall:</strong> ${player.getOverall()}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Next Milestone</div>
                        <div class="card-content">
                            ${this.getNextMilestone(player)}
                        </div>
                    </div>
                </div>

                <div id="opportunities-container" style="margin-top: 20px;"></div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const opportunities = CareerSystem.getOpportunities(player);
        const opportunitiesContainer = document.getElementById('opportunities-container');

        if (opportunities.length === 0) {
            const noOpp = document.createElement('div');
            noOpp.className = 'card';
            noOpp.innerHTML = '<div class="card-content">No opportunities available this week</div>';
            opportunitiesContainer.appendChild(noOpp);
        } else {
            opportunities.forEach((opp, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-title">${opp.title}</div>
                    <div class="card-content">
                        <p>${opp.description || 'Accept this opportunity?'}</p>
                        <p style="margin-top: 10px;"><strong>Reward: $${opp.reward.toLocaleString()}</strong></p>
                        <button class="btn-accept-opp success" data-opp-index="${index}">Accept</button>
                    </div>
                `;
                opportunitiesContainer.appendChild(card);
            });

            document.querySelectorAll('.btn-accept-opp').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = e.target.dataset.oppIndex;
                    const opp = opportunities[index];
                    player.addMoney(opp.reward);
                    alert(`✅ Opportunity accepted!\n💰 +$${opp.reward.toLocaleString()}`);
                    CareerScreenUI.show();
                });
            });
        }

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }

    static getNextMilestone(player) {
        const stages = ['Amateur', 'Regional', 'Nacional', 'Internacional', 'Elite'];
        const currentIndex = stages.indexOf(player.careerLevel);

        if (currentIndex === stages.length - 1) {
            return '<p>✅ You are at the Elite level!</p>';
        }

        const nextStage = stages[currentIndex + 1];
        let requirements = '';

        if (player.careerLevel === 'Amateur') {
            requirements = `<p>Wins needed: ${Math.max(0, 5 - player.recordWins)}</p>
                           <p>Overall needed: ${Math.max(0, 60 - player.getOverall())}</p>`;
        } else if (player.careerLevel === 'Regional') {
            requirements = `<p>Wins needed: ${Math.max(0, 12 - player.recordWins)}</p>
                           <p>Overall needed: ${Math.max(0, 70 - player.getOverall())}</p>`;
        } else if (player.careerLevel === 'Nacional') {
            requirements = `<p>Wins needed: ${Math.max(0, 20 - player.recordWins)}</p>
                           <p>Overall needed: ${Math.max(0, 78 - player.getOverall())}</p>`;
        } else if (player.careerLevel === 'Internacional') {
            requirements = `<p>Wins needed: ${Math.max(0, 30 - player.recordWins)}</p>
                           <p>Overall needed: ${Math.max(0, 85 - player.getOverall())}</p>`;
        }

        return `<p><strong>Next Level: ${nextStage}</strong></p>${requirements}`;
    }
}
