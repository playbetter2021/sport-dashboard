/**
 * DataProvider Module
 * Fungeert als de 'Database Engine' voor het Flat-File systeem.
 */

const DataProvider = {
    // 1. Haal alle spelers op uit de JSON database
    async getAllPlayers() {
        try {
            const response = await fetch('./data/players.json');
            if (!response.ok) throw new Error('Database niet bereikbaar');
            return await response.json();
        } catch (error) {
            console.error("Fout bij laden spelers:", error);
            return [];
        }
    },

    // 2. Filter spelers op sport of label (bijv. 'talent' of 'voetbal')
    async getPlayersByFilter(filterType, value) {
        const all = await this.getAllPlayers();
        return all.filter(player => {
            if (filterType === 'sport') return player.sport === value;
            if (filterType === 'label') return player.bio.label === value;
            return true;
        });
    },

    // 3. Ranking Logica: Sorteer spelers op een specifieke vaardigheid
    async getRanking(sport, metric) {
        const players = await this.getPlayersByFilter('sport', sport);
        return players
            .map(p => ({
                id: p.id,
                name: p.bio.name,
                score: p.stats[metric] || 0,
                role: p.bio.role
            }))
            .sort((a, b) => b.score - a.score);
    },

    // 4. Historische data voor grafieken (Ontwikkeling over tijd)
    async getPlayerHistory(playerId) {
        const players = await this.getAllPlayers();
        const player = players.find(p => p.id === playerId);
        return player ? player.history : [];
    },

    // 5. Vergelijking tussen twee spelers
    async comparePlayers(player1Id, player2Id) {
        const players = await this.getAllPlayers();
        const p1 = players.find(p => p.id === player1Id);
        const p2 = players.find(p => p.id === player2Id);
        return { p1, p2 };
    }
};

export default DataProvider;
