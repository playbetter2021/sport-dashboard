const DataProvider = {
    async getAllPlayers() {
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`data/players.json?t=${timestamp}`);
            if (!response.ok) return [];
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
};
export default DataProvider;
