class Business {
    constructor() {
        this.playerAssets = {};
        this.taxRates = {
            'USA': 0.30,
            'Brazil': 0.35,
            'UK': 0.25,
            'Canada': 0.28,
            'Australia': 0.32
        };
    }

    addAsset(playerId, assetName, value) {
        if (!this.playerAssets[playerId]) {
            this.playerAssets[playerId] = {};
        }

        this.playerAssets[playerId][assetName] = value;
        EventSystem.emit('assetAdded', { playerId, assetName, value });
    }

    getTotalNetWorth(player) {
        const assets = this.playerAssets[player.id] || {};
        const assetsTotal = Object.values(assets).reduce((a, b) => a + b, 0);
        return player.money + assetsTotal;
    }

    calculateTax(player, income) {
        const taxRate = this.taxRates[player.country] || 0.30;
        return income * taxRate;
    }

    payTax(player, income) {
        const tax = this.calculateTax(player, income);
        player.addMoney(-tax);
        return tax;
    }

    transferWealth(fromPlayer, toPlayer, amount, country) {
        const tax = this.calculateTax(fromPlayer, amount);
        const afterTax = amount - tax;

        fromPlayer.addMoney(-amount);
        toPlayer.addMoney(afterTax);

        return { grossAmount: amount, tax: tax, netAmount: afterTax };
    }
}

const BusinessSystem = new Business();
