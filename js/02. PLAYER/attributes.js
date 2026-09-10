class Attributes {
    constructor(customAttributes = {}) {
        this.strength = customAttributes.strength || 50;
        this.speed = customAttributes.speed || 50;
        this.stamina = customAttributes.stamina || 50;
        this.technique = customAttributes.technique || 50;
        this.defense = customAttributes.defense || 50;
        this.chin = customAttributes.chin || 50;
        this.wrestling = customAttributes.wrestling || 50;
        this.striking = customAttributes.striking || 50;
    }

    getAll() {
        return {
            strength: this.strength,
            speed: this.speed,
            stamina: this.stamina,
            technique: this.technique,
            defense: this.defense,
            chin: this.chin,
            wrestling: this.wrestling,
            striking: this.striking
        };
    }

    getOverall() {
        const attrs = this.getAll();
        return Math.round(Object.values(attrs).reduce((a, b) => a + b) / Object.keys(attrs).length);
    }

    train(attribute, amount) {
        if (this[attribute] !== undefined) {
            this[attribute] = Math.min(this[attribute] + amount, 100);
        }
    }

    add(attribute, amount) {
        if (this[attribute] !== undefined) {
            this[attribute] += amount;
        }
    }

    getStrengths() {
        const attrs = this.getAll();
        return Object.entries(attrs)
            .filter(([_, value]) => value >= 75)
            .map(([key, _]) => key);
    }

    getWeaknesses() {
        const attrs = this.getAll();
        return Object.entries(attrs)
            .filter(([_, value]) => value <= 40)
            .map(([key, _]) => key);
    }
}
