// Variabelen om het aantal klikken en de timer bij te houden
let clickCount = 0;
let clickTimer = null;

// Functie die wordt aangeroepen bij een klik op een knop
function handleClick(event) {
    // Verkrijg het karakter-id van het aangeklikte element
    const character = event.target.getAttribute('id');
    clickCount++;

    if (clickTimer) {
        clearTimeout(clickTimer);
    }

    // Start een timer die de klikhandeling na een korte vertraging uitvoert
    clickTimer = setTimeout(function() {
        if (clickCount === 1) {
            // Enkele klik: verander het karakter
            ChangeCharacter(character);
        } else if (clickCount === 2) {
            // Dubbele klik: vraag bevestiging
            const confirmed = confirm(`Weet je zeker dat je ${character} wilt kiezen?`);
            if (confirmed) {
                selectCharacter(character); // Sla het geselecteerde karakter op en verander van pagina
            }
        }
        // Reset de klik-teller na de verwerking
        clickCount = 0;
    }, 300);
}

// Functie om het geselecteerde karakter op te slaan en naar een andere pagina te navigeren
function selectCharacter(character) {
    localStorage.setItem('selectedCharacter', character);
    window.location.href = 'index.html'; // Verander dit naar de pagina waar je naartoe wilt navigeren
}

// Functie om de afbeelding, naam en bio van het karakter te veranderen
function ChangeCharacter(character) {
    // Pas de afbeelding, naam en bio aan op basis van het gekozen karakter
    switch(character) {
        case "Geralt":
            document.getElementById("img").src = "images/gerald.png";
            document.getElementById("name").innerHTML = "Geralt of Rivia";
            document.getElementById("bio").innerHTML = "Geralt of Rivia is a wandering arcane warrior, known for his exceptional skill in both swordsmanship and sorcery. With a weathered demeanor and striking white hair, he roams the land as a seasoned monster hunter and mercenary. Geralt combines his mastery of combat with a deep understanding of ancient magic.";
            break;
        case "Triss":
            document.getElementById("img").src = "images/triss.png";
            document.getElementById("name").innerHTML = "Triss Merigold";
            document.getElementById("bio").innerHTML = "Triss Merigold is a formidable battlemage angel, renowned for her mastery of both arcane and celestial powers. With radiant wings that shimmer like the dawn and eyes that spark with magical intensity, she blends divine grace with unparalleled combat prowess.";
            break;
        case "Vesemir":
            document.getElementById("img").src = "images/vesemir.png";
            document.getElementById("name").innerHTML = "Vesemir Bodnia";
            document.getElementById("bio").innerHTML = "Vesemir Bodnia is one of the oldest and most experienced generals in the realm, born into a lineage renowned for its formidable warriors. His name is synonymous with wisdom and battle-hardened expertise. With a weathered face and eyes that have witnessed countless conflicts, Vesemir commands deep respect from both allies and adversaries.";
            break;
        case "Caesar":
            document.getElementById("img").src = "images/caesar.png";
            document.getElementById("name").innerHTML = "Caesar Czar";
            document.getElementById("bio").innerHTML = "Caesar Czar, a wolf mutant warrior, stands as a towering figure in both stature and influence. His sleek, silvery fur and piercing yellow eyes command respect and fear. As a formidable leader, Caesar combines his exceptional combat skills with a keen strategic mind, orchestrating battles with precision and foresight.";
            break;
        case "Yennefer":
            document.getElementById("img").src = "images/yennefer.png";
            document.getElementById("name").innerHTML = "Yennefer Vengerberg";
            document.getElementById("bio").innerHTML = "Yennefer of Vengerberg is a powerful and enigmatic sorceress, renowned for her extraordinary magical prowess and compelling charisma. With strikingly blond hair and her piercing green eyes, she commands both awe and intrigue. Yennefer’s mastery of arcane arts allows her to manipulate elements, weave intricate spells, and influence the course of events with a mere thought. ";
            break;
    }
}