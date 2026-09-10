class Bootstrap {
    static init() {
        console.log('🎮 Initializing MMA LIFE DYNASTY...');
        
        GameEngine.init();
        FightersDatabase.generateDefaultFighters();
        ManagersSystem.generateManagers();
        RankingsSystem.updateRankings('Elite');

        UI.init();
        UIScreens.showMainMenu();

        console.log('✅ Game initialized!');
    }
}
