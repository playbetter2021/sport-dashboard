async function initDashboard() {
    // 1. Haal de data op
    const players = await DataProvider.getAllPlayers();
    
    // Debug: check in de console of er data binnenkomt
    console.log("Geladen spelers:", players);

    if (!players || players.length === 0) {
        document.getElementById('playerName').innerText = "GEEN DATA GEVONDEN";
        return;
    }

    const playerSelector = document.getElementById('playerSelector');
    
    // Maak de dropdown eerst leeg voor de zekerheid
    playerSelector.innerHTML = "";

    // 2. Vul de dropdown met gouden styling-logica
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.text = player.bio.name.toUpperCase();
        option.style.color = "#D4AF37"; // Forceer goud per optie
        playerSelector.appendChild(option);
    });

    // 3. De Hoofd-update functie
    const updateMainProfile = (playerId) => {
        const player = players.find(p => p.id === playerId);
        if (!player) return;
        
        // Update visuele elementen
        document.getElementById('playerName').innerText = player.bio.name;
        document.getElementById('playerRole').innerText = `${player.bio.role} | ${player.sport.toUpperCase()}`;
        document.getElementById('playerPhoto').src = player.bio.photo;
        document.getElementById('playerStatus').innerText = player.status;
        document.getElementById('playerNumber').innerText = player.bio.number;

        // Teken de gouden radar chart
        updateRadarChart(player);
    };

    // Luister naar verandering
    playerSelector.addEventListener('change', (e) => {
        console.log("Nieuwe speler geselecteerd:", e.target.value);
        updateMainProfile(e.target.value);
    });

    // Start de eerste speler in de lijst
    updateMainProfile(players[0].id);
}
