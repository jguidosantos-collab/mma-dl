class World {
    constructor() {
        this.countries = [
            'USA', 'Brazil', 'UK', 'Canada', 'Australia', 'Russia',
            'Mexico', 'Japan', 'South Korea', 'Thailand', 'Netherlands'
        ];

        this.globalEvents = [];
    }

    getCountries() {
        return this.countries;
    }

    addGlobalEvent(event) {
        this.globalEvents.push({
            id: 'event_' + Date.now(),
            description: event,
            week: TimeSystem.getWeek()
        });

        EventSystem.emit('globalEvent', event);
    }

    getLatestEvents(limit = 5) {
        return this.globalEvents.slice(-limit).reverse();
    }
}

const WorldSystem = new World();
