class Promotions {
    constructor() {
        this.promotions = [
            { id: 1, name: 'UFC', level: 'Elite', minOverall: 85 },
            { id: 2, name: 'Bellator', level: 'Internacional', minOverall: 78 },
            { id: 3, name: 'PFL', level: 'Internacional', minOverall: 78 },
            { id: 4, name: 'ONE', level: 'Internacional', minOverall: 75 },
            { id: 5, name: 'Local Promotion', level: 'Amateur', minOverall: 40 },
            { id: 6, name: 'Regional Federation', level: 'Regional', minOverall: 55 }
        ];
    }

    getPromotionsByLevel(level) {
        return this.promotions.filter(p => p.level === level);
    }

    getEligiblePromotions(player) {
        return this.promotions.filter(p => 
            p.level === player.careerLevel || this.canAscend(player, p)
        );
    }

    canAscend(player, promotion) {
        const currentLevelIndex = ['Amateur', 'Regional', 'Nacional', 'Internacional', 'Elite']
            .indexOf(player.careerLevel);
        const promotionLevelIndex = ['Amateur', 'Regional', 'Nacional', 'Internacional', 'Elite']
            .indexOf(promotion.level);

        return promotionLevelIndex > currentLevelIndex && player.getOverall() >= promotion.minOverall;
    }

    getPromotionById(id) {
        return this.promotions.find(p => p.id === id);
    }
}

const PromotionsSystem = new Promotions();
