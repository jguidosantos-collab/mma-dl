class ContractsScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const contracts = ContractsSystem.getActiveContracts(player.id);
        const availablePromotions = PromotionsSystem.getEligiblePromotions(player);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>📜 Contracts & Sponsorships</h2>
                
                <div style="margin-bottom: 20px;">
                    <h3>Active Contracts</h3>
                    <div id="contracts-container"></div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3>Available Promotions</h3>
                    <div id="promotions-available"></div>
                </div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const contractsContainer = document.getElementById('contracts-container');
        const promotionsContainer = document.getElementById('promotions-available');

        if (contracts.length === 0) {
            const noContract = document.createElement('div');
            noContract.className = 'card';
            noContract.innerHTML = '<div class="card-content">❌ No active contracts</div>';
            contractsContainer.appendChild(noContract);
        } else {
            contracts.forEach(contract => {
                const card = document.createElement('div');
                card.className = 'card';
                const weeksRemaining = contract.endWeek - TimeSystem.getWeek();
                card.innerHTML = `
                    <div class="card-title">${contract.promotion}</div>
                    <div class="card-content">
                        <p><strong>Salary per Week:</strong> $${contract.salary.toLocaleString()}</p>
                        <p><strong>Weeks Remaining:</strong> ${weeksRemaining}</p>
                        <p><strong>End Date:</strong> Week ${contract.endWeek}</p>
                    </div>
                `;
                contractsContainer.appendChild(card);
            });
        }

        availablePromotions.forEach(promotion => {
            const card = document.createElement('div');
            card.className = 'card';
            const salary = ContractsSystem.negotiateContract(player, promotion, 1000);
            card.innerHTML = `
                <div class="card-title">${promotion.name}</div>
                <div class="card-content">
                    <p><strong>Level:</strong> ${promotion.level}</p>
                    <p><strong>Negotiated Salary:</strong> $${salary.toLocaleString()} per week</p>
                    <p><strong>Duration:</strong> 52 weeks</p>
                    <button class="btn-sign-contract success" data-promo-id="${promotion.id}">SIGN</button>
                </div>
            `;
            promotionsContainer.appendChild(card);
        });

        document.querySelectorAll('.btn-sign-contract').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const promoId = e.target.dataset.promoId;
                const promotion = PromotionsSystem.getPromotionById(promoId);
                const salary = ContractsSystem.negotiateContract(player, promotion, 1000);
                
                ContractsSystem.createContract(player, promotion.name, salary, 52);
                alert(`✅ Contract signed with ${promotion.name}!\n💰 $${salary.toLocaleString()} per week`);
                ContractsScreenUI.show();
            });
        });

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
