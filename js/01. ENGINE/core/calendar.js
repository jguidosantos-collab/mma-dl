class Calendar {
    constructor() {
        this.events = [];
        this.seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    }

    getSeason() {
        const week = TimeSystem.getWeek();
        return this.seasons[Math.floor(week / 13)];
    }

    scheduleEvent(week, eventName, eventData) {
        this.events.push({
            week: week,
            name: eventName,
            data: eventData
        });
    }

    getEventsForWeek(week) {
        return this.events.filter(e => e.week === week);
    }

    clearPastEvents() {
        this.events = this.events.filter(e => e.week >= TimeSystem.getWeek());
    }
}

const CalendarSystem = new Calendar();
