class Layout {
    static createMainLayout() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="hud" class="hud"></div>
            <div class="container">
                <div id="screens-container"></div>
            </div>
        `;
    }

    static getScreenContainer() {
        return document.getElementById('screens-container');
    }

    static clearScreens() {
        const container = this.getScreenContainer();
        if (container) {
            container.innerHTML = '';
        }
    }

    static addScreen(screenId, screenElement) {
        const container = this.getScreenContainer();
        if (container) {
            screenElement.id = screenId;
            screenElement.className = 'screen';
            container.appendChild(screenElement);
        }
    }

    static showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }
}
