let clickCounts = {};

function ChangeCharacter(character) {
    if (!clickCounts[character]) {
        clickCounts[character] = 0;
    }
    
    clickCounts[character] += 1;

    if (clickCounts[character] === 2) {
        let isConfirmed = confirm(`Weet je zeker dat je ${character} wilt kiezen?`);
        if (isConfirmed) {
            localStorage.setItem('selectedCharacter', character);
            window.location.href = 'index.html';
        } else {
            alert("Je hebt de selectie geannuleerd.");
        }
        clickCounts[character] = 0;
    } else {
        switch(character) {
            case "Geralt":
                document.getElementById("img").src = "images/gerald.png";
                document.getElementById("name").innerHTML = "Geralt of Rivia";
                document.getElementById("bio").innerHTML = "Geralt of Rivia is a wandering arcane warrior, known for his unparalleled skill in both magic and combat. Unlike the traditional Witcher, Geralt is a unique figure who blends mystical prowess with a deep understanding of ancient lore, making him a rare and formidable presence in the world.";
                break;
            case "Triss":
                document.getElementById("img").src = "images/triss.png";
                document.getElementById("name").innerHTML = "Triss Merigold";
                document.getElementById("bio").innerHTML = "Triss Merigold is a formidable battlemage angel renowned for her exceptional magical combat skills and celestial grace. As a key figure in the realm of the angels, Triss combines her profound arcane knowledge with the divine prowess of an angel, making her a unique and powerful force on the battlefield.";
                break;
            case "Vesemir":
                document.getElementById("img").src = "images/vesemir.png";
                document.getElementById("name").innerHTML = "Vesemir Bodnia";
                document.getElementById("bio").innerHTML = "Vesemir Bodnia is one of the oldest and most experienced generals in the Gord army, known for his strategic brilliance and unwavering discipline. Born to a fierce warrior family, he rose through the ranks due to his exceptional battlefield prowess and leadership skills.";
                break;
            case "Caesar":
                document.getElementById("img").src = "images/caesar.png";
                document.getElementById("name").innerHTML = "Caesar Czar";
                document.getElementById("bio").innerHTML = "Caesar Czar is a formidable leader and cunning strategist, renowned for his ruthless tactics and relentless ambition. Rising to power through sheer force of will and a keen mind for warfare, he has become both feared and respected across the lands.";
                break;
            case "Yennefer":
                document.getElementById("img").src = "images/yennefer.png";
                document.getElementById("name").innerHTML = "Yennefer of Vengerberg";
                document.getElementById("bio").innerHTML = "Yennefer of Vengerberg is a powerful and enigmatic sorceress known for her formidable magical abilities and complex personality. Originating from the city of Vengerberg, Yennefer has established herself as one of the most skilled and influential magic users in the world.";
                break;
        }
    }
}
