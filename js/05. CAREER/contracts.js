class Contracts {
    constructor() {
        this.activeContracts = [];
    }

    createContract(player, promotion, salary, duration) {
        const contract = {
            id: 'contract_' + Date.now(),
            player: player,
            promotion: promotion,
            salary: salary,
            duration: duration, // em semanas
            startWeek: TimeSystem.getWeek(),
            endWeek: TimeSystem.getWeek() + duration,
            active: true
        };

        this.activeContracts.push(contract);
        EventSystem.emit('contractSigned', contract);

        return contract;
    }

    getActiveContracts(playerId) {
        return this.activeContracts.filter(c => c.player.id === playerId && c.active);
    }

    payPlayer(playerId) {
        const contracts = this.getActiveContracts(playerId);
        let totalPay = 0;

        contracts.forEach(contract => {
            if (TimeSystem.getWeek() >= contract.endWeek) {
                contract.active = false;
            } else {
                totalPay += contract.salary;
            }
        });

        return totalPay;
    }

    negotiateContract(player, promotion, baseOffer) {
        const playerFame = player.fame;
        const playerOverall = player.getOverall();

        const negotiatedSalary = baseOffer * (1 + (playerFame / 100) * 0.5) * (playerOverall / 50);

        return Math.round(negotiatedSalary);
    }
}

const ContractsSystem = new Contracts();
