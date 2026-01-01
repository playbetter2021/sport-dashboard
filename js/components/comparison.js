import DataProvider from '../data_provider.js';

export const renderComparison = async (player1Id, player2Id) => {
    const { p1, p2 } = await DataProvider.comparePlayers(player1Id, player2Id);
    const container = document.getElementById('comparisonContainer');

    if (!p1 || !p2) return;

    // We halen de metrics op uit de eerste speler (bijv. Snelheid, Techniek)
    const metrics = Object.keys(p1.stats);

    let html = `
        <div class="grid grid-cols-3 gap-4 text-center items-center">
            <div class="font-bold text-blue-400">${p1.bio.name}</div>
            <div class="text-gray-500 text-sm italic">vs</div>
            <div class="font-bold text-red-400">${p2.bio.name}</div>
        </div>
        <div class="mt-4 space-y-4">
    `;

    metrics.forEach(metric => {
        const val1 = p1.stats[metric];
        const val2 = p2.stats[metric];
        const p1Width = (val1 / (val1 + val2)) * 100;
        const p2Width = (val2 / (val1 + val2)) * 100;

        html += `
            <div>
                <div class="flex justify-between text-xs mb-1">
                    <span>${val1}</span>
                    <span class="uppercase font-semibold text-gray-400">${metric}</span>
                    <span>${val2}</span>
                </div>
                <div class="flex h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div class="bg-blue-500" style="width: ${p1Width}%"></div>
                    <div class="bg-red-500" style="width: ${p2Width}%"></div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
};
