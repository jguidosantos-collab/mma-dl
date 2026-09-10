class TrainingScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>🏋️ Training</h2>
                
                <div class="card">
                    <div class="card-title">Current Status</div>
                    <div class="card-content">
                        <p><strong>Health:</strong> ${player.health}%</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${player.health}%;"></div>
                        </div>
                        ${player.injury ? `
                            <p style="color: var(--danger-color);"><strong>Injury:</strong> ${player.injury}</p>
                            <p style="color: var(--danger-color);"><strong>Weeks to Recover:</strong> ${player.injuryWeeksLeft}</p>
                        ` : ''}
                        <p style="margin-top: 10px;"><strong>Can Train:</strong> ${player.canTrain() ? '✅ Yes' : '❌ No'}</p>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <h3>Select Training Type</h3>
                    <div class="dashboard-actions">
                        ${TrainingSystem.getTrainingTypes().map(type => 
                            `<button class="btn-training secondary" data-type="${type}" ${!player.canTrain() ? 'disabled' : ''}>${type.toUpperCase()}</button>`
                        ).join('')}
                    </div>
                </div>

                <div class="dashboard-actions" style="margin-top: 20px;">
                    <button id="btn-rest-training" class="success" ${!player.canTrain() ? 'disabled' : ''}>REST</button>
                    <button id="btn-back-dashboard" class="secondary">BACK</button>
                </div>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.querySelectorAll('.btn-training').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                const result = TrainingSystem.train(player, type);
                alert(result.success ? `✅ ${result.message}!\nAttribute improved!` : `❌ ${result.message}`);
                TrainingScreenUI.show();
            });
        });

        document.getElementById('btn-rest-training').addEventListener('click', () => {
            TrainingSystem.rest(player);
            alert('✅ Player rested!');
            TrainingScreenUI.show();
        });

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
