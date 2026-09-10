class CharacterCreationScreen {
    static show() {
        Layout.clearScreens();
        
        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div class="character-creation">
                <h2>🥊 Create Your Fighter 🥊</h2>
                
                <div class="form-group">
                    <label>Fighter Name</label>
                    <input type="text" id="input-name" placeholder="Enter your fighter name" maxlength="50">
                </div>

                <div class="form-group">
                    <label>Country</label>
                    <select id="input-country">
                        <option>USA</option>
                        <option>Brazil</option>
                        <option>UK</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>Russia</option>
                        <option>Mexico</option>
                        <option>Japan</option>
                        <option>Thailand</option>
                        <option>Netherlands</option>
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
                    <h3>Distribute Attribute Points (Total: 400)</h3>
                    <div id="points-remaining" style="font-size: 18px; color: var(--accent-color); margin-bottom: 15px;">
                        Points Remaining: <span id="points-left">400</span>
                    </div>
                    
                    <div class="attribute-grid">
                        <div class="attribute-input">
                            <label>Strength</label>
                            <input type="range" id="attr-strength" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-strength-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Speed</label>
                            <input type="range" id="attr-speed" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-speed-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Stamina</label>
                            <input type="range" id="attr-stamina" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-stamina-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Technique</label>
                            <input type="range" id="attr-technique" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-technique-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Defense</label>
                            <input type="range" id="attr-defense" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-defense-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Chin</label>
                            <input type="range" id="attr-chin" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-chin-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Wrestling</label>
                            <input type="range" id="attr-wrestling" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-wrestling-value">50</span>
                        </div>
                        <div class="attribute-input">
                            <label>Striking</label>
                            <input type="range" id="attr-striking" min="0" max="100" value="50" class="attribute-slider">
                            <span id="attr-striking-value">50</span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button id="btn-create-fighter" class="success">CREATE FIGHTER</button>
                    <button id="btn-back-menu" class="secondary">BACK</button>
                </div>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        const attributes = ['strength', 'speed', 'stamina', 'technique', 'defense', 'chin', 'wrestling', 'striking'];
        
        const updatePointsRemaining = () => {
            const total = attributes.reduce((sum, attr) => {
                return sum + parseInt(document.getElementById(`attr-${attr}`).value);
            }, 0);
            document.getElementById('points-left').textContent = 400 - total;
        };

        attributes.forEach(attr => {
            const slider = document.getElementById(`attr-${attr}`);
            const display = document.getElementById(`attr-${attr}-value`);
            
            slider.addEventListener('input', (e) => {
                display.textContent = e.target.value;
                updatePointsRemaining();
            });
        });

        document.getElementById('btn-create-fighter').addEventListener('click', () => {
            const name = document.getElementById('input-name').value.trim();
            const country = document.getElementById('input-country').value;
            const gender = document.getElementById('input-gender').value;

            if (!name) {
                alert('Please enter a fighter name!');
                return;
            }

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
                birthYear: TimeSystem.currentYear - 20,
                money: 5000
            });

            window.currentPlayer = player;
            FamilySystem.createFamily(player.id);
            LifeSystem.initializeLife(player.id);
            DynastySystem.startGeneration(player.id, player.serialize());

            UIScreens.showDashboard();
        });

        document.getElementById('btn-back-menu').addEventListener('click', () => {
            UIScreens.showMainMenu();
        });
    }
}
