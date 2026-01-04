/**
 * Elite Pro Data Provider
 * Verantwoordelijk voor het ophalen en opslaan van POP-dossiers via GitHub API.
 */

const CONFIG = {
    repoOwner: "playbetter2021", // Vul hier je eigen gebruikersnaam in
    repoName: "sport-dashboard",             // Vul hier de naam van je repository in
    filePath: "data/players.json"
};

const DataProvider = {
    /**
     * Haalt alle spelers op uit de JSON file
     */
    async getAllPlayers() {
        try {
            const cacheBuster = new Date().getTime();
            const response = await fetch(`${CONFIG.filePath}?t=${cacheBuster}`);
            
            if (!response.ok) {
                console.error("Fout bij laden van players.json:", response.status);
                return [];
            }
            
            const players = await response.json();
            return Array.isArray(players) ? players : [];
        } catch (error) {
            console.error("Kritieke fout in DataProvider.getAllPlayers:", error);
            return [];
        }
    },

    /**
     * Update een bestaande speler of voegt een nieuwe speler toe en synchroniseert met GitHub
     */
    async updatePlayer(updatedPlayer, token) {
        try {
            // 1. Haal de huidige lijst op
            let players = await this.getAllPlayers();
            
            // 2. Zoek of speler al bestaat
            const index = players.findIndex(p => p.id === updatedPlayer.id);
            
            if (index !== -1) {
                // Bestaande speler bijwerken
                players[index] = updatedPlayer;
            } else {
                // Nieuwe speler toevoegen
                players.push(updatedPlayer);
            }

            // 3. GitHub API: Haal de SHA van het huidige bestand op (vereist voor overschrijven)
            const getUrl = `https://api.github.com/repos/${CONFIG.repoOwner}/${CONFIG.repoName}/contents/${CONFIG.filePath}`;
            const fileDataResponse = await fetch(getUrl, {
                headers: { "Authorization": `token ${token}` }
            });

            if (!fileDataResponse.ok) {
                throw new Error("Kon bestand-info niet ophalen van GitHub. Controleer je token en repo instellingen.");
            }

            const fileData = await fileDataResponse.json();
            const sha = fileData.sha;

            // 4. Update het bestand op GitHub
            const content = btoa(unescape(encodeURIComponent(JSON.stringify(players, null, 2))));
            const updateResponse = await fetch(getUrl, {
                method: "PUT",
                headers: {
                    "Authorization": `token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: `Update speler: ${updatedPlayer.bio.name}`,
                    content: content,
                    sha: sha
                })
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(`GitHub Sync fout: ${errorData.message}`);
            }

            return true;
        } catch (error) {
            console.error("Sync fout:", error);
            throw error;
        }
    }
};

export default DataProvider;
