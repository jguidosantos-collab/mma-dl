document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 MMA LIFE DYNASTY Loading...');
    
    UIIndex.init();
    Bootstrap.init();
    
    // Event listeners
    EventSystem.on('weekPassed', (week) => {
        console.log(`Week ${week} passed`);
    });

    EventSystem.on('playerInjured', (data) => {
        console.log(`Player injured: ${data.injury} for ${data.weeks} weeks`);
    });

    EventSystem.on('fightEnded', (result) => {
        console.log(`Fight ended: ${result.winner.name} wins!`);
    });

    console.log('✅ MMA LIFE DYNASTY Ready!');
});
