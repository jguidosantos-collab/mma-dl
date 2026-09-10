class Time {
    constructor() {
        this.currentWeek = 0;
        this.currentYear = 0;
        this.weeksPerYear = 52;
    }

    advance() {
        this.currentWeek++;
        if (this.currentWeek >= this.weeksPerYear) {
            this.currentWeek = 0;
            this.currentYear++;
            EventSystem.emit('yearPassed', this.currentYear);
        }
        EventSystem.emit('weekPassed', this.currentWeek);
    }

    getWeek() {
        return this.currentWeek;
    }

    getYear() {
        return this.currentYear;
    }

    getAge(birthYear) {
        return this.currentYear - birthYear;
    }

    reset() {
        this.currentWeek = 0;
        this.currentYear = 0;
    }
}

const TimeSystem = new Time();
