class FamilyScreenUI {
    static show() {
        Layout.clearScreens();
        
        const player = window.currentPlayer;
        const family = FamilySystem.getFamily(player.id);
        const adultChildren = FamilySystem.getAdultChildren(player.id);

        const screen = document.createElement('div');
        screen.className = 'screen active';
        screen.innerHTML = `
            <div style="margin-top: 80px;">
                <h2>👨‍👩‍👧‍👦 Family</h2>
                
                <div class="grid dashboard-grid">
                    <div class="card">
                        <div class="card-title">Spouse</div>
                        <div class="card-content">
                            ${family.married ? `
                                <p><strong>Name:</strong> ${family.spouse.name}</p>
                                <p><strong>Married Since:</strong> Week ${family.marriageDate}</p>
                                <button id="btn-divorce" class="danger">DIVORCE</button>
                            ` : `
                                <p>Not married</p>
                                <input type="text" id="spouse-name-input" placeholder="Enter spouse name">
                                <button id="btn-marry" class="success">MARRY</button>
                            `}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-title">Children (${family.children.length})</div>
                        <div class="card-content">
                            ${family.children.length === 0 ? `
                                <p>No children yet</p>
                                <input type="text" id="child-name-input" placeholder="Child name">
                                <select id="child-gender-input">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                <button id="btn-have-baby" class="success">HAVE BABY</button>
                            ` : `
                                <ul>
                                    ${family.children.map(child => `
                                        <li>
                                            <strong>${child.name}</strong> (${FamilySystem.getChildAge(child)} years old)
                                            <br><small>Potential: ${child.potential}%</small>
                                        </li>
                                    `).join('')}
                                </ul>
                                ${family.children.length < 5 ? `
                                    <button id="btn-have-baby" class="success" style="width: 100%; margin-top: 10px;">HAVE ANOTHER BABY</button>
                                ` : ''}
                            `}
                        </div>
                    </div>

                    ${adultChildren.length > 0 ? `
                        <div class="card">
                            <div class="card-title">Dynasty Heirs</div>
                            <div class="card-content">
                                <p>Your adult children can become your heirs:</p>
                                ${adultChildren.map(child => `
                                    <div style="margin: 10px 0; padding: 10px; background-color: var(--primary-color); border-radius: 4px;">
                                        <p><strong>${child.name}</strong> - Age ${FamilySystem.getChildAge(child)}</p>
                                        <p>Potential: ${child.potential}%</p>
                                        <button class="btn-create-heir success" data-child-id="${child.id}">CREATE HEIR</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <button id="btn-back-dashboard" class="secondary" style="width: 100%; margin-top: 20px;">BACK</button>
            </div>
        `;

        Layout.getScreenContainer().appendChild(screen);

        if (document.getElementById('btn-marry')) {
            document.getElementById('btn-marry').addEventListener('click', () => {
                const spouseName = document.getElementById('spouse-name-input').value;
                if (!spouseName) {
                    alert('Enter a spouse name!');
                    return;
                }
                FamilySystem.marry(player.id, spouseName);
                alert(`✅ ${player.name} married ${spouseName}!`);
                FamilyScreenUI.show();
            });
        }

        if (document.getElementById('btn-divorce')) {
            document.getElementById('btn-divorce').addEventListener('click', () => {
                if (confirm('Are you sure you want to divorce?')) {
                    family.married = false;
                    family.spouse = null;
                    alert('❌ Divorce complete');
                    FamilyScreenUI.show();
                }
            });
        }

        if (document.getElementById('btn-have-baby')) {
            document.getElementById('btn-have-baby').addEventListener('click', () => {
                const childName = document.getElementById('child-name-input').value;
                const childGender = document.getElementById('child-gender-input').value;
                
                if (!childName) {
                    alert('Enter a child name!');
                    return;
                }

                const baby = FamilySystem.haveBaby(player.id, childName, childGender);
                alert(`👶 Baby ${childName} born! (Potential: ${baby.potential}%)`);
                FamilyScreenUI.show();
            });
        }

        document.querySelectorAll('.btn-create-heir').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const childId = e.target.dataset.childId;
                const child = family.children.find(c => c.id === childId);
                
                const heir = DynastySystem.createHeir(player);
                if (heir) {
                    window.currentPlayer = heir;
                    alert(`✅ Dynasty continued!\n${heir.name} is your new player!\nInherited: $${heir.money.toLocaleString()}`);
                    DashboardScreen.show();
                } else {
                    alert('❌ Could not create heir');
                }
            });
        });

        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            DashboardScreen.show();
        });
    }
}
