class HUDScreen {
    static update(player) {
        let hudContainer = document.getElementById('hud');
        
        if (!hudContainer) {
            hudContainer = document.createElement('div');
            hudContainer.id = 'hud';
            hudContainer.className = 'hud';
            document.body.insertBefore(hudContainer, document.body.firstChild);
        }

        const manager = ManagersSystem.getPlayerManager(player.id);
        const managerName = manager ? manager.name : 'No Manager';

        hudContainer.innerHTML = `
            <div class="hud-left">
                <div class="hud-stat">
                    <div class="hud-stat-label">Week</div>
                    <div class="hud-stat-value">${TimeSystem.getWeek()}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Year</div>
                    <div class="hud-stat-value">${TimeSystem.getYear()}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Season</div>
                    <div class="hud-stat-value">${CalendarSystem.getSeason()}</div>
                </div>
            </div>

            <div class="hud-center">
                <div class="hud-stat">
                    <div class="hud-stat-label">${player.name}</div>
                    <div class="hud-stat-value">${player.getOverall()} OVR | Level: ${player.development.level}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Manager</div>
                    <div class="hud-stat-value">${managerName}</div>
                </div>
            </div>

            <div class="hud-right">
                <div class="hud-stat">
                    <div class="hud-stat-label">Money</div>
                    <div class="hud-stat-value">$${player.money.toLocaleString()}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Fame</div>
                    <div class="hud-stat-value">${player.fame}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Health</div>
                    <div class="hud-stat-value">${player.health}%</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Record</div>
                    <div class="hud-stat-value">${player.recordWins}W - ${player.recordLosses}L</div>
                </div>
            </div>
        `;
    }

    static hide() {
        const hudContainer = document.getElementById('hud');
        if (hudContainer) {
            hudContainer.style.display = 'none';
        }
    }

    static show() {
        const hudContainer = document.getElementById('hud');
        if (hudContainer) {
            hudContainer.style.display = 'flex';
        }
    }
}
