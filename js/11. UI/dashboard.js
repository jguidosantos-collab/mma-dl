class DashboardScreen {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        if (!player) return;

        HUDScreen.update(player);
        HUDScreen.show();

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>📊 Dashboard</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Fighter Stats</div>
                        <div class="card-content">
                            <p><strong>Name:</strong> ${player.name}</p>
                            <p><strong>Age:</strong> ${player.getAge()} years old</p>
                            <p><strong>Overall:</strong> ${player.getOverall()}</p>
                            <p><strong>Country:</strong> ${player.country}</p>
                            <p><strong>Career Level:</strong> ${player.careerLevel}</p>
                            <p><strong>Record:</strong> ${player.recordWins}W - ${player.recordLosses}L</p>
                            ${player.injury ? `<p style="color: var(--danger-color);"><strong>Injury:</strong> ${player.injury} (${player.injuryWeeksLeft} weeks)</p>` : ''}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Resources</div>
                        <div class="card-content">
                            <p><strong>Money:</strong> $${player.money.toLocaleString()}</p>
                            <p><strong>Fame:</strong> ${player.fame}</p>
                            <p><strong>Health:</strong> ${player.health}%</p>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${player.health}%;"></div>
                            </div>
                            <p style="margin-top: 10px;"><strong>Experience:</strong> ${player.development.experiencePoints}</p>
                            <p><strong>Level:</strong> ${player.development.level}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Attributes</div>
                        <div class="card-content">
                            ${Object.entries(player.attributes.getAll()).map(([key, value]) => `
                                <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                                    <span>${key}:</span>
                                    <strong style="color: var(--accent-color);">${Math.round(value)}</strong>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="dashboard-actions">
                    <button id="btn-train" class="success">TRAIN</button>
                    <button id="btn-rest" class="info">REST</button>
                    <button id="btn-fight" class="danger">FIND FIGHT</button>
                    <button id="btn-career" class="secondary">CAREER</button>
                    <button id="btn-training-screen" class="secondary">TRAINING PLAN</button>
                    <button id="btn-family" class="secondary">FAMILY</button>
                    <button id="btn-finances" class="secondary">FINANCES</button>
                    <button id="btn-media" class="secondary">MEDIA</button>
                    <button id="btn-rankings" class="secondary">RANKINGS</button>
                    <button id="btn-save" class="success">SAVE GAME</button>
                    <button id="btn-main-menu" class="danger">MAIN MENU</button>
                </div>

                <div style="margin-top: 30px;">
                    <button id="btn-advance-week" class="success" style="width: 100%; padding: 15px; font-size: 16px;">ADVANCE WEEK ➜</button>
                </div>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.getElementById('btn-train').addEventListener('click', () => {
            TrainingScreenUI.show();
        });

        document.getElementById('btn-rest').addEventListener('click', () => {
            TrainingSystem.rest(player);
            alert('✅ Player rested and recovered!');
            DashboardScreen.show();
        });

        document.getElementById('btn-fight').addEventListener('click', () => {
            FightsScreenUI.show();
        });

        document.getElementById('btn-career').addEventListener('click', () => {
            CareerScreenUI.show();
        });

        document.getElementById('btn-training-screen').addEventListener('click', () => {
            TrainingScreenUI.show();
        });

        document.getElementById('btn-family').addEventListener('click', () => {
            FamilyScreenUI.show();
        });

        document.getElementById('btn-finances').addEventListener('click', () => {
            FinancesScreenUI.show();
        });

        document.getElementById('btn-media').addEventListener('click', () => {
            MediaScreenUI.show();
        });

        document.getElementById('btn-rankings').addEventListener('click', () => {
            RankingsScreenUI.show();
        });

        document.getElementById('btn-save').addEventListener('click', () => {
            SaveSystem.saveGame(player);
            alert('💾 Game saved successfully!');
        });

        document.getElementById('btn-main-menu').addEventListener('click', () => {
            MainMenuScreen.show();
        });

        document.getElementById('btn-advance-week').addEventListener('click', () => {
            GameEngine.advanceWeek();
            player.recoverFromInjury();
            
            // Paga contratos
            const contractPay = ContractsSystem.payPlayer(player.id);
            if (contractPay > 0) {
                player.addMoney(contractPay);
            }

            alert(`⏰ Week ${TimeSystem.getWeek()} advanced!\nContract Payment: $${contractPay}`);
            DashboardScreen.show();
        });
    }
}
