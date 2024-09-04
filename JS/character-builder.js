// Variabelen om het aantal klikken en de timer bij te houden
let clickCount = 0;
let clickTimer = null;

// Functie die wordt aangeroepen bij een klik op een knop
function handleClick(event) {
    // Verkrijg het karakter-id van het aangeklikte element
    const character = event.target.getAttribute('id');

    // Verhoog het aantal klikken
    clickCount++;

    // Als er al een timer actief is, stop deze
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
    }, 300); // Wacht 300 milliseconden om te zien of er een tweede klik is
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
            document.getElementById("bio").innerHTML = "Geralt of Rivia is a wandering arcane warrior...";
            break;
        case "Triss":
            document.getElementById("img").src = "images/triss.png";
            document.getElementById("name").innerHTML = "Triss Merigold";
            document.getElementById("bio").innerHTML = "Triss Merigold is a formidable battlemage angel...";
            break;
        case "Vesemir":
            document.getElementById("img").src = "images/vesemir.png";
            document.getElementById("name").innerHTML = "Vesemir Bodnia";
            document.getElementById("bio").innerHTML = "Vesemir Bodnia is one of the oldest and most experienced generals...";
            break;
        case "Caesar":
            document.getElementById("img").src = "images/caesar.png";
            document.getElementById("name").innerHTML = "Caesar Czar";
            document.getElementById("bio").innerHTML = "Caesar Czar is a formidable leader and cunning strategist...";
            break;
        case "Yennefer":
            document.getElementById("img").src = "images/yennefer.png";
            document.getElementById("name").innerHTML = "Yennefer of Vengerberg";
            document.getElementById("bio").innerHTML = "Yennefer of Vengerberg is a powerful and enigmatic sorceress...";
            break;
    }
}