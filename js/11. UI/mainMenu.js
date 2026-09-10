class MainMenuScreen {
    static show() {
        Layout.createMainLayout();
        HUDScreen.hide();
        Layout.clearScreens();

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div class="main-menu">
                <div class="main-menu-title">🥊 MMA LIFE DYNASTY 🥊</div>
                <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 14px;">
                    Build your legendary MMA career and create a dynasty
                </p>
                
                <div class="main-menu-buttons">
                    <button id="btn-new-game" class="success">NEW GAME</button>
                    ${SaveSystem.hasSave() ? '<button id="btn-load-game" class="info">LOAD GAME</button>' : ''}
                    <button id="btn-settings" class="secondary">SETTINGS</button>
                </div>

                <p style="color: var(--text-secondary); margin-top: 50px; font-size: 12px;">
                    v1.0 | Early Access
                </p>
            </div>
        `;

        const container = Layout.getScreenContainer();
        container.appendChild(screen);

        document.getElementById('btn-new-game').addEventListener('click', () => {
            CharacterCreationScreen.show();
        });

        if (SaveSystem.hasSave()) {
            document.getElementById('btn-load-game').addEventListener('click', () => {
                if (SaveSystem.loadGame()) {
                    HUDScreen.show();
                    UIScreens.showDashboard();
                }
            });
        }

        document.getElementById('btn-settings').addEventListener('click', () => {
            SettingsScreen.show();
        });
    }
}
