class PromotionScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const eligible = PromotionsSystem.getEligiblePromotions(player);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>🎯 Promotions</h2>
                
                <div class="card">
                    <div class="card-title">Current Promotion</div>
                    <div class="card-content">
                        <p><strong>Career Level:</strong> ${player.careerLevel}</p>
                        <p><strong>Overall Required for Next:</strong> ${this.getMinOverallForNext(player)}</p>
                    </div>
                </div>

                <div id="promotions-container" style="margin-top: 20px;"></div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const promotionsContainer = document.getElementById('promotions-container');

        eligible.forEach(promotion => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-title">${promotion.name}</div>
                <div class="card-content">
                    <p><strong>Level:</strong> ${promotion.level}</p>
                    <p><strong>Min Overall:</strong> ${promotion.minOverall}</p>
                    <p>Status: ${player.getOverall() >= promotion.minOverall ? '✅ Eligible' : '❌ Not Eligible'}</p>
                </div>
            `;
            promotionsContainer.appendChild(card);
        });

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }

    static getMinOverallForNext(player) {
        const stages = ['Amateur', 'Regional', 'Nacional', 'Internacional', 'Elite'];
        const requirements = [40, 55, 70, 78, 85];
        const currentIndex = stages.indexOf(player.careerLevel);
        return currentIndex 
        return requirements[Math.min(currentIndex + 1, requirements.length - 1)];
    }
}
