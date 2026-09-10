// UTILITÁRIOS COMPARTILHADOS
class GameUtils {
    static formatMoney(amount) {
        return '$' + amount.toLocaleString();
    }

    static formatPercent(value) {
        return Math.round(value) + '%';
    }

    static getAttributeColor(value) {
        if (value >= 80) return 'var(--success-color)';
        if (value >= 60) return 'var(--accent-color)';
        if (value >= 40) return 'var(--text-secondary)';
        return 'var(--danger-color)';
    }

    static getCareerLevelIndex(level) {
        const levels = ['Amateur', 'Regional', 'Nacional', 'Internacional', 'Elite'];
        return levels.indexOf(level);
    }

    static getCareerLevelByIndex(index) {
        const levels = ['Amateur', 'Regional', 'Nacional', 'Internacional', 'Elite'];
        return levels[index] || 'Amateur';
    }

    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    static getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static calculateWinRate(wins, losses) {
        if (wins + losses === 0) return 0;
        return (wins / (wins + losses)) * 100;
    }

    static getRankDisplay(rank) {
        if (!rank) return 'Unranked';
        if (rank <= 5) return `#${rank} 🏆`;
        if (rank <= 10) return `#${rank} ⭐`;
        return `#${rank}`;
    }
}

class GameValidator {
    static isValidName(name) {
        return name && name.trim().length >= 2 && name.trim().length <= 50;
    }

    static isValidMoney(amount) {
        return amount >= 0 && !isNaN(amount);
    }

    static isValidAttribute(value) {
        return value >= 0 && value <= 100;
    }

    static isValidCountry(country) {
        const validCountries = [
            'USA', 'Brazil', 'UK', 'Canada', 'Australia', 'Russia',
            'Mexico', 'Japan', 'South Korea', 'Thailand', 'Netherlands'
        ];
        return validCountries.includes(country);
    }

    static isValidGender(gender) {
        return gender === 'Male' || gender === 'Female';
    }

    static validatePlayer(playerData) {
        const errors = [];
        
        if (!this.isValidName(playerData.name)) {
            errors.push('Invalid player name');
        }
        
        if (!this.isValidCountry(playerData.country)) {
            errors.push('Invalid country');
        }
        
        if (!this.isValidGender(playerData.gender)) {
            errors.push('Invalid gender');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
}
