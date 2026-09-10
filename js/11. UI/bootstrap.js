class Bootstrap {
    static init() {
        console.log('🎮 Initializing MMA LIFE DYNASTY...');
        
        GameEngine.init();
        FightersDatabase.generateDefaultFighters();
        ManagersSystem.generateManagers();
        RankingsSystem.updateRankings('Elite');
        RankingsSystem.updateRankings('Internacional');
        RankingsSystem.updateRankings('Nacional');
        RankingsSystem.updateRankings('Regional');
        RankingsSystem.updateRankings('Amateur');

        console.log('✅ Game initialized successfully!');
    }
}
