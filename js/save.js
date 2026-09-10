class SaveSystem {
    static saveGame(player) {
        const gameData = {
            player: player.serialize(),
            week: TimeSystem.getWeek(),
            year: TimeSystem.getYear(),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('mma_dl_save', JSON.stringify(gameData));
        console.log('Game saved!');
    }

    static loadGame() {
        const saveData = localStorage.getItem('mma_dl_save');
        if (!saveData) {
            console.log('No save found');
            return false;
        }

        const data = JSON.parse(saveData);
        
        TimeSystem.currentWeek = data.week;
        TimeSystem.currentYear = data.year;

        window.currentPlayer = Player.deserialize(data.player);

        console.log('Game loaded!');
        return true;
    }

    static deleteSave() {
        localStorage.removeItem('mma_dl_save');
        console.log('Save deleted');
    }

    static hasSave() {
        return localStorage.getItem('mma_dl_save') !== null;
    }
}
