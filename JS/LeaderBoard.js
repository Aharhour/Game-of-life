document.addEventListener("DOMContentLoaded", () => {
    const scoreTag = document.getElementById('scores');
    const scoreString = localStorage.getItem('scores');
    const scoreArray = scoreString ? JSON.parse(scoreString) : [];

    if (scoreArray.length == 0) {
        console.log('Score Array is empty');
    } else {
        scoreArray.sort((a, b) => b - a);

        let topScore = [];
        scoreArray.forEach((score, index) => {
            if (index < 5) {
                topScore.push(score);
            }
        });
    
        topScore.forEach(score => {
            const scoreItem = document.createElement('div');
            scoreItem.textContent = score;
            scoreTag.appendChild(scoreItem);
        });
    }
});