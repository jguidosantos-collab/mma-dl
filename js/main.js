// CORRIGIR: main.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 MMA LIFE DYNASTY Loading...');
    
    try {
        // Inicializar todos os sistemas
        GameConfig.init();
        
        // Inicializar UI
        Layout.createMainLayout();
        Bootstrap.init();
        MainMenuScreen.show();
        
        // Event listeners globais
        EventSystem.on('weekPassed', (week) => {
            console.log(`📅 Week ${week} passed`);
        });

        EventSystem.on('playerInjured', (data) => {
            console.log(`🤕 Player injured: ${data.injury} for ${data.weeks} weeks`);
        });

        EventSystem.on('fightEnded', (result) => {
            console.log(`🥊 Fight ended: ${result.winner.name} wins!`);
            console.log(`   Round Details:`, result.rounds);
        });

        EventSystem.on('playerTrained', (data) => {
            console.log(`💪 Player trained: ${data.type} (+${data.gain.toFixed(1)} ${data.attribute})`);
        });

        EventSystem.on('levelUp', (level) => {
            console.log(`📈 LEVEL UP! New level: ${level}`);
        });

        EventSystem.on('playerPromoted', (data) => {
            console.log(`🏆 ${data.player.name} promoted to ${data.newStage}!`);
        });

        EventSystem.on('contractSigned', (contract) => {
            console.log(`📜 Contract signed: ${contract.promotion} - $${contract.salary}/week`);
        });

        EventSystem.on('babyBorn', (data) => {
            console.log(`👶 Baby born: ${data.baby.name} (Potential: ${data.baby.potential}%)`);
        });

        EventSystem.on('playerMarried', (data) => {
            console.log(`💍 ${data.playerId} married ${data.spouseName}`);
        });

        EventSystem.on('playerRetired', (data) => {
            console.log(`🏁 ${data.player.name} retired at week ${data.week}`);
        });

        console.log('✅ MMA LIFE DYNASTY Ready!');
        console.log('🎮 Version 1.0 - Early Access');
        
    } catch (error) {
        console.error('❌ Critical Error:', error);
        console.error('Stack:', error.stack);
        alert('❌ Error initializing game: ' + error.message);
    }
});
