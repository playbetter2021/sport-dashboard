/**
 * Elite Pro Data Provider
 * Verantwoordelijk voor het ophalen van de meest recente spelersdata.
 */

const DataProvider = {
    async getAllPlayers() {
        try {
            // We voegen '?t=' met een uniek tijdstempel toe aan de URL.
            // Dit dwingt de browser om de cache te negeren en de 
            // allernieuwste versie van players.json van GitHub te halen.
            const timestamp = new Date().getTime();
            const response = await fetch(`data/players.json?t=${timestamp}`);
            
            if (!response.ok) {
                console.error("Cloud Database kon niet worden bereikt.");
                return [];
            }

            const data = await response.json();
            
            // Debugging: bekijk in de console of de data binnenkomt
            console.log("Elite Cloud Data succesvol geladen:", data);
            
            return data;
        } catch (error) {
            console.error("Kritieke fout bij het laden van data:", error);
            return [];
        }
    }
};

export default DataProvider;
