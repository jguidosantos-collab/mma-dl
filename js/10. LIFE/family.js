class Family {
    constructor() {
        this.playerFamilies = {};
    }

    createFamily(playerId) {
        this.playerFamilies[playerId] = {
            spouse: null,
            children: [],
            married: false,
            marriageDate: null
        };
    }

    marry(playerId, spouseName) {
        if (!this.playerFamilies[playerId]) {
            this.createFamily(playerId);
        }

        this.playerFamilies[playerId].spouse = {
            name: spouseName,
            married: true
        };

        this.playerFamilies[playerId].married = true;
        this.playerFamilies[playerId].marriageDate = TimeSystem.getWeek();

        EventSystem.emit('playerMarried', { playerId, spouseName });
    }

    haveBaby(playerId, babyName, babyGender) {
        if (!this.playerFamilies[playerId]) {
            this.createFamily(playerId);
        }

        const baby = {
            id: 'child_' + Date.now(),
            name: babyName,
            gender: babyGender,
            birthWeek: TimeSystem.getWeek(),
            potential: RNG.randomInt(60, 90)
        };

        this.playerFamilies[playerId].children.push(baby);
        EventSystem.emit('babyBorn', { playerId, baby });

        return baby;
    }

    getFamily(playerId) {
        return this.playerFamilies[playerId] || null;
    }

    getChildren(playerId) {
        const family = this.getFamily(playerId);
        return family ? family.children : [];
    }

    getChildAge(child) {
        return Math.floor((TimeSystem.getWeek() - child.birthWeek) / 52);
    }

    getAdultChildren(playerId) {
        const children = this.getChildren(playerId);
        return children.filter(child => this.getChildAge(child) >= 18);
    }
}

const FamilySystem = new Family();
