class UIScreens {
    static showMainMenu() {
        Layout.createMainLayout();
        Layout.clearScreens();

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div class="main-menu">
                <div class="main-menu-title">MMA LIFE DYNASTY</div>
                <div class="main-menu-buttons">
                    <button id="btn-new-game">NEW GAME</button>
                    <button id="btn-load-game">LOAD GAME</button>
                    <button id="btn-settings">SETTINGS</button>
                </div>
            </div>
        `;

        const container = Layout.getScreenContainer();
        container.appendChild(screen);

        document.getElementById('btn-new-game').addEventListener('click', () => {
            UIScreens.showCharacterCreation();
        });

        document.getElementById('btn-load-game').addEventListener('click', () => {
            SaveSystem.loadGame();
            UIScreens.showDashboard();
        });

        document.getElementById('btn-settings').addEventListener('click', () => {
            UIScreens.showSettings();
        });
    }

    static showCharacterCreation() {
        Layout.clearScreens();
        
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div class="character-creation">
                <h2>Create Your Fighter</h2>
                
                <div class="form-group">
                    <label>Fighter Name</label>
                    <input type="text" id="input-name" placeholder="Enter your fighter name">
                </div>

                <div class="form-group">
                    <label>Country</label>
                    <select id="input-country">
                        <option>USA</option>
                        <option>Brazil</option>
                        <option>UK</option>
                        <option>Canada</option>
                        <option>Australia</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Gender</label>
                    <select id="input-gender">
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Attributes (0-100)</label>
                    <div class="attribute-grid">
                        <div class="attribute-input">
                            <label>Strength</label>
                            <input type="range" id="attr-strength" min="0" max="100" value="50">
                            <span id="attr-strength-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Speed</label>
                            <input type="range" id="attr-speed" min="0" max="100" value="50">
                            <span id="attr-speed-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Stamina</label>
                            <input type="range" id="attr-stamina" min="0" max="100" value="50">
                            <span id="attr-stamina-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Technique</label>
                            <input type="range" id="attr-technique" min="0" max="100" value="50">
                            <span id="attr-technique-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Defense</label>
                            <input type="range" id="attr-defense" min="0" max="100" value="50">
                            <span id="attr-defense-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Chin</label>
                            <input type="range" id="attr-chin" min="0" max="100" value="50">
                            <span id="attr-chin-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Wrestling</label>
                            <input type="range" id="attr-wrestling" min="0" max="100" value="50">
                            <span id="attr-wrestling-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Striking</label>
                            <input type="range" id="attr-striking" min="0" max="100" value="50">
                            <span id="attr-striking-value">50</span>
                        </div>
                    </div>
                </div>

                <button id="btn-create-fighter">CREATE FIGHTER</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        // Update attribute values
        const attributes = ['strength', 'speed', 'stamina', 'technique', 'defense', 'chin', 'wrestling', 'striking'];
        attributes.forEach(attr => {
            const slider = document.getElementById(`attr-${attr}`);
            const display = document.getElementById(`attr-${attr}-value`);
            slider.addEventListener('input', (e) => {
                display.textContent = e.target.value;
            });
        });

        document.getElementById('btn-create-fighter').addEventListener('click', () => {
            const name = document.getElementById('input-name').value;
            const country = document.getElementById('input-country').value;
            const gender = document.getElementById('input-gender').value;

            const attributes = {
                strength: parseInt(document.getElementById('attr-strength').value),
                speed: parseInt(document.getElementById('attr-speed').value),
                stamina: parseInt(document.getElementById('attr-stamina').value),
                technique: parseInt(document.getElementById('attr-technique').value),
                defense: parseInt(document.getElementById('attr-defense').value),
                chin: parseInt(document.getElementById('attr-chin').value),
                wrestling: parseInt(document.getElementById('attr-wrestling').value),
                striking: parseInt(document.getElementById('attr-striking').value)
            };

            const player = new Player({
                name: name,
                country: country,
                gender: gender,
                attributes: attributes,
                birthYear: TimeSystem.currentYear - 20
            });

            window.currentPlayer = player;
            FamilySystem.createFamily(player.id);
            LifeSystem.initializeLife(player.id);

            UIScreens.showDashboard();
        });
    }

    static showDashboard() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        if (!player) return;

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>Dashboard</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Fighter Stats</div>
                        <div class="card-content">
                            <p><strong>Name:</strong> ${player.name}</p>
                            <p><strong>Age:</strong> ${player.getAge()}</p>
                            <p><strong>Overall:</strong> ${player.getOverall()}</p>
                            <p><strong>Country:</strong> ${player.country}</p>
                            <p><strong>Career Level:</strong> ${player.careerLevel}</p>
                            <p><strong>Record:</strong> ${player.recordWins}W - ${player.recordLosses}L</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Resources</div>
                        <div class="card-content">
                            <p><strong>Money:</strong> $${player.money.toLocaleString()}</p>
                            <p><strong>Fame:</strong> ${player.fame}</p>
                            <p><strong>Health:</strong> ${player.health}%</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-actions">
                    <button id="btn-train">TRAIN</button>
                    <button id="btn-rest">REST</button>
                    <button id="btn-fight">FIND FIGHT</button>
                    <button id="btn-career">CAREER</button>
                    <button id="btn-profile">PROFILE</button>
                    <button id="btn-save">SAVE GAME</button>
                </div>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);
        UI.updateHUD(player);

        document.getElementById('btn-train').addEventListener('click', () => {
            UIScreens.showTrainingScreen();
        });

        document.getElementById('btn-rest').addEventListener('click', () => {
            TrainingSystem.rest(player);
            alert('Player rested!');
            UIScreens.showDashboard();
        });

        document.getElementById('btn-fight').addEventListener('click', () => {
            UIScreens.showFightsScreen();
        });

        document.getElementById('btn-career').addEventListener('click', () => {
            UIScreens.showCareerScreen();
        });

        document.getElementById('btn-profile').addEventListener('click', () => {
            UIScreens.showProfileScreen();
        });

        document.getElementById('btn-save').addEventListener('click', () => {
            SaveSystem.saveGame(player);
            alert('Game saved!');
        });
    }

    static showTrainingScreen() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>Training</h2>
                <div class="dashboard-actions">
                    ${TrainingSystem.getTrainingTypes().map(type => 
                        `<button class="btn-training" data-type="${type}">${type.toUpperCase()}</button>`
                    ).join('')}
                </div>
                <button id="btn-back">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.querySelectorAll('.btn-training').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                const result = TrainingSystem.train(player, type);
                alert(result.message);
                UIScreens.showDashboard();
            });
        });

        document.getElementById('btn-back').addEventListener('click', () => {
            UIScreens.showDashboard();
        });
    }

    static showFightsScreen() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const opponent = FightersDatabase.getRandomFighter(player);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>Fight Setup</h2>
                
                <div class="fight-arena">
                    <div class="fighter-corner">
                        <div class="fighter-avatar">🥊</div>
                        <div><strong>${player.name}</strong></div>
                        <div>OVR: ${player.getOverall()}</div>
                    </div>
                    <div class="fighter-corner">
                        <div class="fighter-avatar">🥋</div>
                        <div><strong>${opponent.name}</strong></div>
                        <div>OVR: ${opponent.getOverall()}</div>
                    </div>
                </div>

                <div style="margin-top: 30px; text-align: center;">
                    <h3>Choose Your Strategy</h3>
                    <div class="dashboard-actions">
                        <button id="btn-aggressive">AGGRESSIVE</button>
                        <button id="btn-balanced">BALANCED</button>
                        <button id="btn-defensive">DEFENSIVE</button>
                    </div>
                </div>

                <button id="btn-back">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const strategies = {
            aggressive: { aggressiveness: 70, focus: false },
            balanced: { aggressiveness: 50, focus: true },
            defensive: { aggressiveness: 30, focus: true }
        };

        Object.keys(strategies).forEach(key => {
            document.getElementById(`btn-${key}`).addEventListener('click', () => {
                const result = FightsSystem.simulateFight(player, opponent, strategies[key]);
                
                let message = `\n${result.winner.name} wins!\n\n`;
                message += `Round Results:\n`;
                result.rounds.forEach((round, i) => {
                    message += `Round ${i + 1}: ${round.winner === 'player' ? player.name : opponent.name} wins\n`;
                });

                alert(message);
                MediaSystem.generateFightNews(result);
                CareerSystem.checkPromotion(player);
                UIScreens.showDashboard();
            });
        });

        document.getElementById('btn-back').addEventListener('click', () => {
            UIScreens.showDashboard();
        });
    }

    static showCareerScreen() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>Career</h2>
                
                <div class="card">
                    <div class="card-title">Current Status</div>
                    <div class="card-content">
                        <p><strong>Level:</strong> ${player.careerLevel}</p>
                        <p><strong>Record:</strong> ${player.recordWins}W - ${player.recordLosses}L</p>
                        <p><strong>Ranking:</strong> ${RankingsSystem.getPlayerRank(player.id, player.careerLevel) || 'N/A'}</p>
                    </div>
                </div>

                <div id="opportunities-container"></div>

                <button id="btn-back">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const opportunities = CareerSystem.getOpportunities(player);
        const opportunitiesContainer = document.getElementById('opportunities-container');

        opportunities.forEach((opp, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-title">${opp.title}</div>
                <div class="card-content">
                    <p>Reward: $${opp.reward}</p>
                    <button data-opp-index="${index}">Accept</button>
                </div>
            `;
            opportunitiesContainer.appendChild(card);
        });

        document.getElementById('btn-back').addEventListener('click', () => {
            UIScreens.showDashboard();
        });
    }

    static showProfileScreen() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const family = FamilySystem.getFamily(player.id);
        const attributes = player.attributes.getAll();

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>${player.name} - Profile</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Basic Info</div>
                        <div class="card-content">
                            <p><strong>Age:</strong> ${player.getAge()}</p>
                            <p><strong>Country:</strong> ${player.country}</p>
                            <p><strong>Gender:</strong> ${player.gender}</p>
                            <p><strong>Height:</strong> 6'0"</p>
                            <p><strong>Weight:</strong> 185 lbs</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Attributes</div>
                        <div class="card-content">
                            ${Object.entries(attributes).map(([key, value]) => 
                                `<div>${key}: <strong>${value}</strong></div>`
                            ).join('')}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Family</div>
                        <div class="card-content">
                            <p><strong>Spouse:</strong> ${family?.spouse?.name || 'None'}</p>
                            <p><strong>Children:</strong> ${family?.children?.length || 0}</p>
                        </div>
                    </div>
                </div>

                <button id="btn-back">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.getElementById('btn-back').addEventListener('click', () => {
            UIScreens.showDashboard();
        });
    }

    static showSettings() {
        Layout.clearScreens();
        
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div class="main-menu">
                <h2>Settings</h2>
                <button id="btn-back-menu">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        document.getElementById('btn-back-menu').addEventListener('click', () => {
            UIScreens.showMainMenu();
        });
    }
}
