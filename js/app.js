import DataProvider from './data_provider.js';
import { renderRankingTable } from './components/ranking.js';
import { renderComparison } from './components/comparison.js';

// Globale variabele voor de grafiek om deze te kunnen vernieuwen
let currentRadarChart = null;

async function initDashboard() {
    // 1. Haal alle spelers op uit de JSON database
    const players = await DataProvider.getAllPlayers();
    if (players.length === 0) {
        console.error("Geen spelers gevonden in de database.");
        return;
    }

    // UI Elementen ophalen
    const playerSelector = document.getElementById('playerSelector');
    const compSelect1 = document.getElementById('compareSelect1');
    const compSelect2 = document.getElementById('compareSelect2');

    // 2. Vul alle dropdowns met spelers uit de database
    players.forEach(player => {
        const name = player.bio.name.toUpperCase(); // Luxe uitstraling (hoofdletters)
        playerSelector.add(new Option(name, player.id));
        compSelect1.add(new Option(name, player.id));
        compSelect2.add(new Option(name, player.id));
    });

    // Selecteer standaard de tweede speler in de tweede vergelijking-box
    if (players.length > 1) compSelect2.selectedIndex = 1;

    // 3. De Hoofd-update functie (voor de profielkaart en radar chart)
    const updateMainProfile = (playerId) => {
        const player = players.find(p => p.id === playerId);
        if (!player) return;
        
        // Update Profiel Teksten (Luxe styling)
        document.getElementById('playerName').innerText = player.bio.name;
        document.getElementById('playerRole').innerText = `${player.bio.role} | ${player.sport.toUpperCase()}`;
        document.getElementById('playerPhoto').src = player.bio.photo;
        document.getElementById('playerStatus').innerText = player.status.toUpperCase();
        document.getElementById('playerNumber').innerText = player.bio.number;

        // Update Radar Chart met Elite Gold visuals
        updateRadarChart(player);
        
        // Update de Ranking Tabel (gebaseerd op de eerste beschikbare metric)
        const metrics = Object.keys(player.stats);
        if (metrics.length > 0) {
            renderRankingTable(player.sport, metrics[0]);
        }
    };

    // 4. Luister naar veranderingen in de dropdowns
    playerSelector.addEventListener('change', (e) => updateMainProfile(e.target.value));
    
    // Vergelijking luisteraars
    const handleComparison = () => renderComparison(compSelect1.value, compSelect2.value);
    compSelect1.addEventListener('change', handleComparison);
    compSelect2.addEventListener('change', handleComparison);

    // 5. Initialiseer de eerste weergave
    updateMainProfile(players[0].id);
    handleComparison();
}

/**
 * Tekent of ververst de Radar Chart met Elite Gold Styling
 */
function updateRadarChart(player) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    if (currentRadarChart) {
        currentRadarChart.destroy();
    }

    const labels = Object.keys(player.stats);
    const dataValues = Object.values(player.stats);

    currentRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: `ELITE ASSET: ${player.bio.name}`,
                data: dataValues,
                // LUXE GOLD STYLING
                backgroundColor: 'rgba(212, 175, 55, 0.15)', // Transparant goud
                borderColor: '#D4AF37', // Metallic Goud
                borderWidth: 3,
                pointBackgroundColor: '#F9E272', // Licht goud punt
                pointBorderColor: '#0a0a0a', // Obsidian zwarte rand om punt
                pointHoverRadius: 7,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(212, 175, 55, 0.2)' }, // Gouden lijnen
                    grid: { color: 'rgba(212, 175, 55, 0.1)' },
                    pointLabels: { 
                        color: '#9ca3af', 
                        font: { 
                            size: 11, 
                            family: 'ui-sans-serif', 
                            weight: '700' 
                        } 
                    },
                    ticks: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false } // Geen legenda voor een cleaner uiterlijk
            }
        }
    });
}

// Start het Elite Dashboard
initDashboard();
