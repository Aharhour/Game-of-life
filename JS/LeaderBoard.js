// Update leaderboard met scores uit localStorage
function updateLeaderboard() {
    const placeTag = document.getElementById('place'); // Element voor plaatsnummers
    const namesTag = document.getElementById('names'); // Element voor namen
    const scoreTag = document.getElementById('scores'); // Element voor scores

    let scoreArray = [];

    try {
        // Verkrijg de gestructureerde gegevens uit localStorage
        scoreArray = JSON.parse(localStorage.getItem('scores') || '[]');
    } catch (e) {
        console.error('Fout bij het parsen van scores:', e);
        return;
    }

    // Sorteer de scores van hoog naar laag
    scoreArray.sort((a, b) => b.score - a.score);

    // Toon alleen de top 5 scores
    const topScores = scoreArray.slice(0, 5);

    // Leeg de bestaande inhoud van de tags
    placeTag.innerHTML = '';
    namesTag.innerHTML = '';
    scoreTag.innerHTML = '';

    // Voeg elke score, naam en plaats nummer toe aan de scoreboard
    topScores.forEach((entry, index) => {
        const placeItem = document.createElement('div');
        placeItem.textContent = index + 1; // Plaats nummer
        placeTag.appendChild(placeItem);

        const nameItem = document.createElement('div');
        nameItem.textContent = entry.name; // Naam van de speler
        namesTag.appendChild(nameItem);

        const scoreItem = document.createElement('div');
        scoreItem.textContent = entry.score; // Score van de speler
        scoreTag.appendChild(scoreItem);
    });
}

// Clear de leaderboard en verwijder scores uit localStorage
function clearLeaderboard() {
    localStorage.removeItem('scores');
    updateLeaderboard(); // Verwijder de leaderboard-inhoud en update de display
}

// Update de leaderboard bij het laden van de pagina
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();

    const clearLeaderboardButton = document.getElementById('clear-leaderboard');
    clearLeaderboardButton.addEventListener('click', clearLeaderboard);
});