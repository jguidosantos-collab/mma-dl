class SettingsScreen {
    static show() {
        Layout.clearScreens();
        
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div class="main-menu">
                <h2>⚙️ Settings</h2>
                
                <div class="card" style="max-width: 500px; margin: 20px auto;">
                    <div class="card-title">Game Settings</div>
                    <div class="card-content">
                        <div class="form-group">
                            <label>Sound Volume</label>
                            <input type="range" id="volume-slider" min="0" max="100" value="100">
                            <span id="volume-value">100%</span>
                        </div>

                        <div class="form-group">
                            <label>Difficulty</label>
                            <select id="difficulty-select">
                                <option value="easy">Easy</option>
                                <option value="normal" selected>Normal</option>
                                <option value="hard">Hard</option>
                                <option value="extreme">Extreme</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="auto-save-checkbox" checked>
                                Auto-save every week
                            </label>
                        </div>

                        <div class="form-group">
                            <label>
                                <input type="checkbox" id="notifications-checkbox" checked>
                                Enable notifications
                            </label>
                        </div>
                    </div>
                </div>

                <div class="dashboard-actions" style="max-width: 500px; margin: 20px auto;">
                    <button id="btn-save-settings" class="success">SAVE SETTINGS</button>
                    <button id="btn-delete-save" class="danger">DELETE SAVE</button>
                    <button id="btn-back-menu" class="secondary">BACK</button>
                </div>

                <p style="color: var(--text-secondary); margin-top: 50px; font-size: 12px; text-align: center;">
                    v1.0 | Made with ❤️
                </p>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.getElementById('volume-slider').addEventListener('input', (e) => {
            document.getElementById('volume-value').textContent = e.target.value + '%';
        });

        document.getElementById('btn-save-settings').addEventListener('click', () => {
            const settings = {
                volume: document.getElementById('volume-slider').value,
                difficulty: document.getElementById('difficulty-select').value,
                autoSave: document.getElementById('auto-save-checkbox').checked,
                notifications: document.getElementById('notifications-checkbox').checked
            };
            localStorage.setItem('mma_dl_settings', JSON.stringify(settings));
            alert('✅ Settings saved!');
        });

        document.getElementById('btn-delete-save').addEventListener('click', () => {
            if (confirm('⚠️ Are you sure? This will delete your save game!')) {
                SaveSystem.deleteSave();
                alert('❌ Save deleted');
                MainMenuScreen.show();
            }
        });

        document.getElementById('btn-back-menu').addEventListener('click', () => {
            MainMenuScreen.show();
        });
    }
}
