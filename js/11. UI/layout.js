class Layout {
    static createMainLayout() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="screens-container" style="padding-top: 80px;">
            </div>
        `;
    }

    static getScreenContainer() {
        return document.getElementById('screens-container');
    }

    static clearScreens() {
        const container = this.getScreenContainer();
        if (!container) return;
        
        const screens = container.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.remove();
        });
    }
}
