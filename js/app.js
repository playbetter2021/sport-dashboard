import DataProvider from './data_provider.js';
import { renderRankingTable } from './components/ranking.js';
import { renderComparison } from './components/comparison.js';

// Globale variabele voor de grafiek om deze te kunnen vernieuwen
let currentRadarChart = null;

async function initDashboard() {
    // 1. Haal alle spelers op uit de JSON database
    const players = await DataProvider.getAllPlayers();
    if (players.length === 0) return;

    // UI Elementen ophalen
    const playerSelector = document.getElementById('playerSelector');
    const compSelect1 = document.getElementById('compareSelect1');
    const compSelect2 = document.getElementById('compareSelect2');

    // 2. Vul alle dropdowns met spelers uit de database
    players.forEach(player => {
        const name = player.bio.name;
        playerSelector.add(new Option(name, player.id));
        compSelect1.add(new Option(name, player.id));
        compSelect2.add(new Option(name, player.id));
    });

    // Selecteer standaard de tweede speler in de tweede vergelijking-box
    if (players.length > 1) compSelect2.selectedIndex = 1;

    // 3. De Hoofd-update functie (voor de profielkaart en radar chart)
    const updateMainProfile = (playerId) => {
        const player = players.find(p => p.id === playerId);
        
        // Update Profiel Teksten
        document.getElementById('playerName').innerText = player.bio.name;
        document.getElementById('playerRole').innerText = `${player.bio.role} (${player.sport})`;
        document.getElementById('playerPhoto').src = player.bio.photo;
        document.getElementById('playerStatus').innerText = player.status;
        document.getElementById('playerNumber').innerText = player.bio.number;

        // Update Radar Chart
        updateRadarChart(player);
        
        // Update de Ranking Tabel (bijv. gebaseerd op de eerste metric van deze speler)
        const firstMetric = Object.keys(player.stats)[0];
        renderRankingTable(player.sport, firstMetric);
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
 * Tekent of ververst de Radar Chart met Chart.js
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
                label: `Skills: ${player.bio.name}`,
                data: dataValues,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#374151' },
                    grid: { color: '#374151' },
                    pointLabels: { color: '#9ca3af', font: { size: 12 } },
                    ticks: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Start het dashboard
initDashboard();
