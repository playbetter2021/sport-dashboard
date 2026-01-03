const DataProvider = {
    async getAllPlayers() {
        try {
            // Timestamp voorkomt dat de browser de oude versie van de JSON laat zien
            const timestamp = new Date().getTime();
            const response = await fetch(`data/players.json?t=${timestamp}`);
            
            if (!response.ok) {
                console.error("Geen verbinding met players.json");
                return [];
            }
            
            return await response.json();
        } catch (error) {
            console.error("Kritieke fout:", error);
            return [];
        }
    }
};

export default DataProvider;
