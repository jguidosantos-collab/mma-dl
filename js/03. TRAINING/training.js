class Training {
    constructor() {
        this.trainingTypes = {
            strength: { attribute: 'strength', gain: 1.5, cost: 100 },
            cardio: { attribute: 'stamina', gain: 1.2, cost: 80 },
            technique: { attribute: 'technique', gain: 1.0, cost: 120 },
            defense: { attribute: 'defense', gain: 1.3, cost: 100 },
            wrestling: { attribute: 'wrestling', gain: 1.2, cost: 110 },
            striking: { attribute: 'striking', gain: 1.2, cost: 110 },
            boxing: { attribute: 'striking', gain: 0.8, cost: 90 },
            conditioning: { attribute: 'stamina', gain: 1.5, cost: 100 }
        };
    }

    train(player, trainingType) {
        if (!player.canTrain()) {
            return { success: false, message: 'Player cannot train right now' };
        }

        const training = this.trainingTypes[trainingType];
        if (!training) {
            return { success: false, message: 'Unknown training type' };
        }

        // Reduz saúde
        player.health = Math.max(30, player.health - 5);

        // Ganha experiência
        const experienceGain = 50;
        player.addExperience(experienceGain);

        // Melhora atributo
        const attributeGain = training.gain * player.development.getImprovementRate();
        player.attributes.train(training.attribute, attributeGain);

        EventSystem.emit('playerTrained', { type: trainingType, attribute: training.attribute, gain: attributeGain });

        return { success: true, message: `Trained ${trainingType}` };
    }

    rest(player) {
        player.health = Math.min(100, player.health + 20);
        EventSystem.emit('playerRested', player.health);
        return { success: true, message: 'Player rested and recovered' };
    }

    getTrainingTypes() {
        return Object.keys(this.trainingTypes);
    }
}

const TrainingSystem = new Training();
