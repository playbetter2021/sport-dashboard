import DataProvider from '../data_provider.js';

export const renderRankingTable = async (sport, metric) => {
    const rankingData = await DataProvider.getRanking(sport, metric);
    const tableBody = document.getElementById('rankingTable');
    
    tableBody.innerHTML = ''; // Maak tabel leeg

    rankingData.forEach((player, index) => {
        const row = `
            <tr class="border-b border-gray-700 hover:bg-gray-700 transition">
                <td class="py-3 px-2">${index + 1}. ${player.name}</td>
                <td class="py-3 px-2 text-gray-400">${player.role}</td>
                <td class="py-3 px-2 font-bold text-blue-400">${player.score}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
};
