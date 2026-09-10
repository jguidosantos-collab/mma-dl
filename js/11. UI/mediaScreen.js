class MediaScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const playerNews = MediaSystem.getPlayerNews(player.id, 20);
        const popularity = MediaSystem.getPopularity(player.id);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>📰 Media & News</h2>
                
                <div class="card">
                    <div class="card-title">Your Popularity</div>
                                <div style="margin-top: 20px;">
                <h3>Latest News</h3>
                <div id="news-container"></div>
            </div>

            <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
        </div>
    `;

    Layout.getScreenContainer().appendChild(screen);

    const newsContainer = document.getElementById('news-container');

    if (playerNews.length === 0) {
        const noNews = document.createElement('div');
        noNews.className = 'card';
        noNews.innerHTML = '<div class="card-content">No news about you yet. Keep fighting!</div>';
        newsContainer.appendChild(noNews);
    } else {
        playerNews.forEach(news => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-title">${news.title}</div>
                <div class="card-content">
                    <p>${news.description}</p>
                    <p style="font-size: 12px; color: var(--text-secondary); margin-top: 10px;">
                        Week ${news.week} | 👍 ${news.likes} likes
                    </p>
                </div>
            `;
            newsContainer.appendChild(card);
        });
    }

    document.getElementById('btn-back-dashboard').addEventListener('click', () => {
        DashboardScreen.show();
    });
}

static getPopularityRank(popularity) {
    if (popularity >= 500) return '⭐⭐⭐⭐⭐ International Star';
    if (popularity >= 300) return '⭐⭐⭐⭐ Celebrity';
    if (popularity >= 100) return '⭐⭐⭐ Popular';
    if (popularity >= 50) return '⭐⭐ Known';
    if (popularity >= 10) return '⭐ Rising Star';
    return 'Unknown';
}
  ---

## **js/11. UI/dynastyScreen.js**
```javascript
class DynastyScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const generations = DynastySystem.getGenerationHistory(player.id);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>👑 Dynasty</h2>
                
                <div class="card">
                    <div class="card-title">Dynasty Information</div>
                    <div class="card-content">
                        <p><strong>Current Generation:</strong> ${generations.length}</p>
                        <p><strong>Dynasty Started:</strong> Week ${generations.length > 0 ? generations[0].startWeek : 0}</p>
                        <p><strong>Current Fighter:</strong> ${player.name}</p>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <h3>Generation History</h3>
                    <div id="generations-container"></div>
                </div>

                <div class="card" style="margin-top: 20px;">
                    <div class="card-title">Dynasty Stats</div>
                    <div class="card-content">
                        <p><strong>Total Wins:</strong> ${player.recordWins}</p>
                        <p><strong>Total Losses:</strong> ${player.recordLosses}</p>
                        <p><strong>Highest Level:</strong> ${player.careerLevel}</p>
                        <p><strong>Total Wealth:</strong> $${BusinessSystem.getTotalNetWorth(player).toLocaleString()}</p>
                    </div>
                </div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const generationsContainer = document.getElementById('generations-container');

        if (generations.length === 0) {
            const noGen = document.createElement('div');
            noGen.className = 'card';
            noGen.innerHTML = '<div class="card-content">No generation history yet</div>';
            generationsContainer.appendChild(noGen);
        } else {
            generations.forEach((gen, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                const playerData = gen.player;
                card.innerHTML = `
                    <div class="card-title">Generation ${gen.generationNumber} - ${playerData.name}</div>
                    <div class="card-content">
                        <p><strong>Started:</strong> Week ${gen.startWeek}</p>
                        <p><strong>Record:</strong> ${playerData.recordWins}W - ${playerData.recordLosses}L</p>
                        <p><strong>Highest Level:</strong> ${playerData.careerLevel}</p>
                        <p><strong>Overall:</strong> ${playerData.attributes ? Math.round(Object.values(playerData.attributes).reduce((a, b) => a + b) / Object.keys(playerData.attributes).length) : 'N/A'}</p>
                    </div>
                `;
                generationsContainer.appendChild(card);
            });
        }

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
