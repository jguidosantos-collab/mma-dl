class RNGCore {
    random(min = 0, max = 1) {
        return Math.random() * (max - min) + min;
    }

    randomInt(min, max) {
        return Math.floor(this.random(min, max + 1));
    }

    roll(sides = 6) {
        return this.randomInt(1, sides);
    }

    chance(percentage) {
        return this.random(0, 100) < percentage;
    }

    weightedChoice(options) {
        const total = options.reduce((sum, opt) => sum + opt.weight, 0);
        let random = this.random(0, total);

        for (let option of options) {
            random -= option.weight;

            if (random <= 0) {
                return option.value;
            }
        }

        return options[options.length - 1].value;
    }

    shuffle(array) {
        const arr = [...array];

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }
}

const RNG = new RNGCore();
