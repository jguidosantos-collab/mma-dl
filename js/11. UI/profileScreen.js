class ProfileScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const attributes = player.attributes.getAll();
        const strengths = player.attributes.getStrengths();
        const weaknesses = player.attributes.getWeaknesses();

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>👤 ${player.name} - Profile</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Basic Information</div>
                        <div class="card-content">
                            <p><strong>Age:</strong> ${player.getAge()} years old</p>
                            <p><strong>Country:</strong> ${player.country}</p>
                            <p><strong>Gender:</strong> ${player.gender}</p>
                            <p><strong>Height:</strong> 6'0"</p>
                            <p><strong>Weight:</strong> 185 lbs</p>
                            <p><strong>Career Level:</strong> ${player.careerLevel}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Career Stats</div>
                        <div class="card-content">
                            <p><strong>Record:</strong> ${player.recordWins}W - ${player.recordLosses}L</p>
                            <p><strong>Win Rate:</strong> ${((player.recordWins / (player.recordWins + player.recordLosses)) * 100 || 0).toFixed(1)}%</p>
                            <p><strong>Overall Rating:</strong> ${player.getOverall()}</p>
                            <p><strong>Fame:</strong> ${player.fame}</p>
                            <p><strong>Experience Points:</strong> ${player.development.experiencePoints}</p>
                            <p><strong>Level:</strong> ${player.development.level}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Attributes</div>
                        <div class="card-content">
                            ${Object.entries(attributes).map(([key, value]) => `
                                <div style="margin: 8px 0;">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                                        <span>${key}:</span>
                                        <strong style="color: var(--accent-color);">${Math.round(value)}</strong>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${value}%;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Strengths & Weaknesses</div>
                        <div class="card-content">
                            <p><strong>Strengths:</strong></p>
                            ${strengths.length > 0 ? strengths.map(s => `<p style="color: var(--success-color);">✅ ${s}</p>`).join('') : '<p>None</p>'}
                            <p style="margin-top: 10px;"><strong>Weaknesses:</strong></p>
                            ${weaknesses.length > 0 ? weaknesses.map(w => `<p style="color: var(--danger-color);">❌ ${w}</p>`).join('') : '<p>None</p>'}
                        </div>
                    </div>
                </div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.getElementById('btn-back----

## **js/11. UI/lifeOverviewScreen.js**
```javascript
class LifeOverviewScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const lifeStatus = LifeSystem.getLifeStatus(player.id);
        const family = FamilySystem.getFamily(player.id);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>🌍 Life Overview</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Life Status</div>
                        <div class="card-content">
                            <p><strong>Happiness:</strong> ${lifeStatus.happiness}%</p>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${lifeStatus.happiness}%; background: linear-gradient(90deg, #4caf50, #81c784);"></div>
                            </div>
                            <p style="margin-top: 10px;"><strong>Motivation:</strong> ${lifeStatus.motivation}%</p>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${lifeStatus.motivation}%;"></div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Family Status</div>
                        <div class="card-content">
                            <p><strong>Marital Status:</strong> ${family.married ? '✅ Married to ' + family.spouse.name : '❌ Single'}</p>
                            <p><strong>Children:</strong> ${family.children.length}</p>
                            ${family.children.length > 0 ? `
                                <ul>
                                    ${family.children.map(child => `
                                        <li>${child.name} (${FamilySystem.getChildAge(child)} years old)</li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Net Worth</div>
                        <div class="card-content">
                            <p><strong>Cash:</strong> $${player.money.toLocaleString()}</p>
                            <p><strong>Total Net Worth:</strong> $${BusinessSystem.getTotalNetWorth(player).toLocaleString()}</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Recent News</div>
                        <div class="card-content">
                            ${MediaSystem.getPlayerNews(player.id, 3).map(news => `
                                <p style="font-size: 12px; margin-bottom: 8px;"><strong>${news.title}</strong></p>
                            `).join('') || '<p>No recent news</p>'}
                        </div>
                    </div>
                </div>

                <div class="dashboard-actions">
                    <button id="btn-family" class="secondary">FAMILY</button>
                    <button id="btn-back-dashboard" class="secondary">BACK</button>
                </div>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.getElementById('btn-family').addEventListener('click', () => {
            FamilyScreenUI.show();
        });

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
