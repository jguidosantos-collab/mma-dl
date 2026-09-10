class Managers {
    constructor() {
        this.managers = [];
        this.generateManagers();
        this.playerManagers = {};
    }

    generateManagers() {
        const managerNames = [
            'Joe Silva', 'Ali Abdelaziz', 'Audie Attar', 'James Toney',
            'Greg Jackson', 'John Kavanagh', 'Rafael Cordeiro'
        ];

        managerNames.forEach(name => {
            this.managers.push({
                id: 'manager_' + Date.now() + Math.random(),
                name: name,
                commission: RNG.randomInt(15, 25),
                reputation: RNG.randomInt(70, 95),
                quality: RNG.randomInt(70, 95) // Qual é a qualidade do empresário
            });
        });
    }

    hireManager(playerId, managerId) {
        const manager = this.managers.find(m => m.id === managerId);
        if (!manager) return false;

        this.playerManagers[playerId] = manager;
        EventSystem.emit('managerHired', { playerId, manager });

        return true;
    }

    getPlayerManager(playerId) {
        return this.playerManagers[playerId] || null;
    }

    getManagerImpact(playerId) {
        const manager = this.getPlayerManager(playerId);
        if (!manager) return 1; // Sem empresário = sem bônus/penalidade

        // Qualidade do empresário afeta chance de contratos melhores
        return manager.quality / 100;
    }

    getAvailableManagers() {
        return this.managers;
    }
}

const ManagersSystem = new Managers();
