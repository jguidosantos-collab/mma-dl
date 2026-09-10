// CONFIGURAÇÃO CENTRAL DO JOGO
class GameConfig {
    static init() {
        console.log('🎮 Initializing Game Systems...');
        
        // Inicializar sistemas principais
        window.TimeSystem = new Time();
        window.CalendarSystem = new Calendar();
        window.EventSystem = EventSystem;
        window.GameEngine = new Engine();
        window.FightersDatabase = new Fighters();
        window.ManagersSystem = new Managers();
        window.TrainingSystem = new Training();
        window.FightsSystem = new Fights();
        window.CareerSystem = new Career();
        window.PromotionsSystem = new Promotions();
        window.RankingsSystem = new Rankings();
        window.ContractsSystem = new Contracts();
        window.FamilySystem = new Family();
        window.DynastySystem = new Dynasty();
        window.LifeSystem = new Life();
        window.BusinessSystem = new Business();
        window.MediaSystem = new Media();
        window.WorldSystem = new World();
        window.SaveSystem = SaveSystem;

        console.log('✅ All systems initialized!');
    }

    static reset() {
        TimeSystem.reset();
        EventSystem.clear();
        console.log('Game reset');
    }
}
