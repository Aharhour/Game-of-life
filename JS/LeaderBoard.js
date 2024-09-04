document.addEventListener("DOMContentLoaded", () => {
    // Verkrijg het element waar de scores worden weergegeven
    const scoreTag = document.getElementById('scores');

    // Verkrijg de scores uit localStorage en parse ze van JSON
    const scoreArray = JSON.parse(localStorage.getItem('scores'));

    // Sorteer de scores in aflopende volgorde
    scoreArray.sort((a, b) => b - a);

    // Verkrijg de top 5 scores
    let topScore = [];

    scoreArray.forEach((score, index) => {
        if (index < 5) {
            topScore.push(score);
        }
    });

    // Voeg elke score toe aan de DOM
    topScore.forEach(score => {
        const scoreItem = document.createElement('div');
        scoreItem.textContent = score;
        scoreTag.appendChild(scoreItem);
    });
});