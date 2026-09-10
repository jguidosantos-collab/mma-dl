class FinancesScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const netWorth = BusinessSystem.getTotalNetWorth(player);
        const assets = BusinessSystem.playerAssets[player.id] || {};

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>💰 Finances</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Net Worth</div>
                        <div class="card-content">
                            <p><strong>Cash:</strong> $${player.money.toLocaleString()}</p>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${Math.min(100, (player.money / 100000) * 100)}%;"></div>
                            </div>
                            <p style="margin-top: 10px;"><strong>Total Assets:</strong> $${Object.values(assets).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                            <p><strong>Total Net Worth:</strong> $${netWorth.toLocaleString()}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Tax Information</div>
                        <div class="card-content">
                            <p><strong>Country:</strong> ${player.country}</p>
                            <p><strong>Tax Rate:</strong> ${(BusinessSystem.taxRates[player.country] * 100).toFixed(1)}%</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Assets</div>
                        <div class="card-content">
                            ${Object.entries(assets).length === 0 ? `
                                <p>No assets yet</p>
                                <input type="text" id="asset-name" placeholder="Asset name">
                                <input type="number" id="asset-value" placeholder="Asset value">
                                <button id="btn-add-asset" class="success">ADD ASSET</button>
                            ` : `
                                ${Object.entries(assets).map(([name, value]) => `
                                    <p><strong>${name}:</strong> $${value.toLocaleString()}</p>
                                `).join('')}
                                <button id="btn-add-asset" class="secondary" style="width: 100%; margin-top: 10px;">ADD ASSET</button>
                            `}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Income Sources</div>
                        <div class="card-content">
                            <p>💰 Fight Purses</p>
                            <p>📜 Contracts</p>
                            <p>🎯 Sponsorships</p>
                            <p>📱 Media Deals</p>
                        </div>
                    </div>
                </div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        if (document.getElementById('btn-add-asset')) {
            document.getElementById('btn-add-asset').addEventListener('click', () => {
                const assetName = document.getElementById('asset-name')?.value;
                const assetValue = parseInt(document.getElementById('asset-value')?.value || 0);
                
                if (!assetName || assetValue <= 0) {
                    alert('Enter valid asset information!');
                    return;
                }

                BusinessSystem.addAsset(player.id, assetName, assetValue);
                alert(`✅ Asset "${assetName}" added for $${assetValue.toLocaleString()}`);
                FinancesScreenUI.show();
            });
        }

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
