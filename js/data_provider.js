const DataProvider = {
    async getAllPlayers() {
        try {
            // We gebruiken een relatief pad zonder slash aan het begin
            // zodat het werkt binnen de 'sport-dashboard' map op GitHub Pages
            const response = await fetch('data/players.json');
            
            if (!response.ok) {
                throw new Error(`Cloud Data niet bereikbaar: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Elite Data succesvol geladen:", data);
            return data;
        } catch (error) {
            console.error("Systeemfout bij laden data:", error);
            return [];
        }
    }
};

export default DataProvider;
