document.addEventListener("DOMContentLoaded", () => {
    // Get the element where the scores will be displayed
    const scoreTag = document.getElementById('scores');

    // Get the scores from localStorage and parse them from JSON
    const scorestring = localStorage.getItem('scores');
    const scoreArray = scorestring ? JSON.parse(scorestring) : [];

    // Check if the scoreArray is empty
    if (scoreArray.length === 0) {
        console.log('No scores available');
        return;
    }

    // Sort the scores in descending order
    scoreArray.sort((a, b) => b - a);

    // Get the top 5 scores
    const topScore = scoreArray.slice(0, 10); // Instead of using forEach, slice can extract the top 5 directly

    // Add each score to the DOM
    topScore.forEach(score => {
        const scoreItem = document.createElement('div');
        scoreItem.textContent = score;
        scoreTag.appendChild(scoreItem);
    });
});