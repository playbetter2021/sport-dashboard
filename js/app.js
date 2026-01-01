document.addEventListener('DOMContentLoaded', async () => {
    // 1. Data ophalen (GitHub API Ready)
    const response = await fetch('./data/players.json');
    const players = await response.json();

    const selector = document.getElementById('playerSelector');
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    let currentChart;

    // 2. Selector vullen
    players.forEach(p => {
        let opt = document.createElement('option');
        opt.value = p.id;
        opt.innerHTML = p.bio.name;
        selector.appendChild(opt);
    });

    // 3. Update Functie
    const updateDashboard = (playerId) => {
        const player = players.find(p => p.id === playerId);
        
        // Update UI
        document.getElementById('playerName').innerText = player.bio.name;
        document.getElementById('playerRole').innerText = `${player.bio.role} (${player.sport})`;
        document.getElementById('playerPhoto').src = player.bio.photo;
        document.getElementById('playerStatus').innerText = player.status;
        document.getElementById('playerNumber').innerText = player.bio.number;

        // Update Chart
        if (currentChart) currentChart.destroy();
        
        const labels = Object.keys(player.stats);
        const values = Object.values(player.stats);

        currentChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: player.bio.name,
                    data: values,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                }]
            },
            options: {
                scales: { r: { beginAtZero: true, grid: { color: '#374151' }, ticks: { display: false } } }
            }
        });
    };

    // Event listener
    selector.addEventListener('change', (e) => updateDashboard(e.target.value));

    // Initial load
    updateDashboard(players[0].id);
});
