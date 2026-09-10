class GameUI {
    static showAlert(message, type = 'info') {
        alert(message);
    }

    static showConfirm(message) {
        return confirm(message);
    }

    static showModal(title, content, buttons = []) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">${title}</div>
                <div class="modal-body">${content}</div>
                <div class="modal-footer">
                    ${buttons.map(btn => `
                        <button class="${btn.class}">${btn.text}</button>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    static hideModal(modal) {
        if (modal) {
            modal.remove();
        }
    }
}
