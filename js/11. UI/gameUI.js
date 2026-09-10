class GameUI {
    static createButton(text, onClick, className = '') {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.addEventListener('click', onClick);
        return button;
    }

    static createCard(title, content) {
        const card = document.createElement('div');
        card.className = 'card';
        
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = title;
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.innerHTML = content;
        
        card.appendChild(cardTitle);
        card.appendChild(cardContent);
        
        return card;
    }

    static createProgressBar(current, max, label = '') {
        const container = document.createElement('div');
        
        if (label) {
            const labelEl = document.createElement('div');
            labelEl.style.fontSize = '12px';
            labelEl.style.marginBottom = '5px';
            labelEl.textContent = label;
            container.appendChild(labelEl);
        }
        
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        fill.style.width = (current / max * 100) + '%';
        fill.textContent = Math.round(current) + ' / ' + max;
        
        bar.appendChild(fill);
        container.appendChild(bar);
        
        return container;
    }

    static createModal(title, content, buttons = []) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const header = document.createElement('div');
        header.className = 'modal-header';
        header.textContent = title;
        
        const body = document.createElement('div');
        body.className = 'modal-body';
        body.innerHTML = content;
        
        const footer = document.createElement('div');
        footer.className = 'modal-footer';
        
        buttons.forEach(btn => {
            footer.appendChild(this.createButton(btn.text, btn.onClick, btn.className));
        });
        
        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modalContent.appendChild(footer);
        modal.appendChild(modalContent);
        
        return modal;
    }

    static updateHUD(player) {
        const hudContainer = document.getElementById('hud');
        if (!hudContainer) return;

        hudContainer.innerHTML = `
            <div class="hud-left">
                <div class="hud-stat">
                    <div class="hud-stat-label">Week</div>
                    <div class="hud-stat-value">${TimeSystem.getWeek()}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Year</div>
                    <div class="hud-stat-value">${TimeSystem.getYear()}</div>
                </div>
            </div>
            <div class="hud-center">
                <div class="hud-stat">
                    <div class="hud-stat-label">${player.name}</div>
                    <div class="hud-stat-value">${player.getOverall()} OVR</div>
                </div>
            </div>
            <div class="hud-right">
                <div class="hud-stat">
                    <div class="hud-stat-label">Money</div>
                    <div class="hud-stat-value">$${player.money.toLocaleString()}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Fame</div>
                    <div class="hud-stat-value">${player.fame}</div>
                </div>
                <div class="hud-stat">
                    <div class="hud-stat-label">Health</div>
                    <div class="hud-stat-value">${player.health}%</div>
                </div>
            </div>
        `;
    }
}

const UI = GameUI;
