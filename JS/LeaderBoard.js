document.addEventListener("DOMContentLoaded", () => {
    const scoreTag = document.getElementById('scores');

    const scoreArray = JSON.parse(localStorage.getItem('scores'));

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
});

console.log(localStorage.getItem('scores'));