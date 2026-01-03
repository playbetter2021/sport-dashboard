/**
 * Elite Pro Data Provider
 * Verantwoordelijk voor het ophalen van de volledige POP-dossiers.
 */
const DataProvider = {
    async getAllPlayers() {
        try {
            // Voeg een unieke timestamp toe om browser-caching te voorkomen
            const cacheBuster = new Date().getTime();
            const response = await fetch(`data/players.json?t=${cacheBuster}`);
            
            if (!response.ok) {
                console.error("Fout bij laden van players.json: Status", response.status);
                return [];
            }
            
            const players = await response.json();
            
            // Controleer of de data een array is
            if (!Array.isArray(players)) {
                console.warn("Data formaat is geen array, controleer players.json");
                return [];
            }

            return players;
        } catch (error) {
            console.error("Kritieke fout in DataProvider:", error);
            return [];
        }
    }
};

export default DataProvider;
