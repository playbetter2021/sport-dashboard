/**
 * js/data_provider.js
 * Verantwoordelijk voor communicatie met GitHub.
 */

const CONFIG = {
    // VUL HIER JOUW GEGEVENS IN:
    repoOwner: "playbetter2021",  // Bijv: "jan-jansen"
    repoName: "sport-dashboard",     // Bijv: "elite-pro-terminal"
    filePath: "data/players.json"   // Dit moet overeenkomen met de map in je repo
};

const DataProvider = {
    /**
     * Haalt alle spelers op van GitHub
     */
    async getAllPlayers() {
        try {
            // Cache-buster om zeker te weten dat we de nieuwste data krijgen
            const url = `https://raw.githubusercontent.com/${CONFIG.repoOwner}/${CONFIG.repoName}/main/${CONFIG.filePath}?t=${new Date().getTime()}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                // Als het bestand nog niet bestaat (eerste keer), return lege lijst
                if(response.status === 404) return [];
                throw new Error(`GitHub Fout: ${response.status}`);
            }
            
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error("Ophalen mislukt:", error);
            return []; // Voorkomt dat de hele app crasht
        }
    },

    /**
     * Update of maak een speler aan en sync naar GitHub
     */
    async updatePlayer(playerData, token) {
        if (!CONFIG.repoOwner || CONFIG.repoName === "JOUW_REPO_NAAM") {
            throw new Error("Pas eerst de CONFIG aan in js/data_provider.js!");
        }

        // 1. Haal de huidige data + SHA (versie ID) op via de API
        const apiUrl = `https://api.github.com/repos/${CONFIG.repoOwner}/${CONFIG.repoName}/contents/${CONFIG.filePath}`;
        
        let currentPlayers = [];
        let sha = null;

        try {
            const getResponse = await fetch(apiUrl, {
                headers: { 
                    "Authorization": `token ${token}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            if (getResponse.ok) {
                const fileData = await getResponse.json();
                sha = fileData.sha;
                // Decodeer de content van Base64 naar tekst naar JSON
                const content = new TextDecoder().decode(Uint8Array.from(atob(fileData.content), c => c.charCodeAt(0)));
                currentPlayers = JSON.parse(content);
            } else if (getResponse.status !== 404) {
                throw new Error("Kon bestand niet lezen van GitHub.");
            }
        } catch (e) {
            console.warn("Bestand bestaat waarschijnlijk nog niet, we maken een nieuwe.", e);
        }

        // 2. Update de lijst lokaal
        if (!Array.isArray(currentPlayers)) currentPlayers = [];
        
        const index = currentPlayers.findIndex(p => p.id === playerData.id);
        if (index !== -1) {
            currentPlayers[index] = playerData; // Update bestaande
        } else {
            currentPlayers.push(playerData); // Voeg nieuwe toe
        }

        // 3. Stuur terug naar GitHub (PUT request)
        // Encodeer naar Base64 (veilig voor speciale tekens)
        const updatedContent = btoa(unescape(encodeURIComponent(JSON.stringify(currentPlayers, null, 2))));

        const body = {
            message: `Update speler: ${playerData.bio.name}`,
            content: updatedContent
        };
        if (sha) body.sha = sha; // Vereist om te overschrijven

        const putResponse = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!putResponse.ok) {
            const err = await putResponse.json();
            throw new Error(`GitHub weigert opslaan: ${err.message}`);
        }

        return true;
    }
};

export default DataProvider;
