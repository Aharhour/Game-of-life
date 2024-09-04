// Wacht tot de volledige DOM is geladen voordat de code wordt uitgevoerd
document.addEventListener('DOMContentLoaded', () => {
    // Verkrijg de avatar en het dropdownmenu op basis van hun id's
    const avatar = document.getElementById('avatar');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Voeg een klik-eventlistener toe aan de avatar
    avatar.addEventListener('click', () => {
        // Wissel de weergave van het dropdownmenu tussen 'block' en 'none'
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Voeg een klik-eventlistener toe aan het window
    window.addEventListener('click', (event) => {
        // Als er op iets anders dan de avatar wordt geklikt, verberg het dropdownmenu
        if (!event.target.matches('#avatar')) {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            }
        }
    });
});

// Functie om de avatar bij te werken op basis van het geselecteerde karakter
function updateAvatar() {
    // Een map van karakternamen naar avatarafbeeldingen
    const avatarMap = {
        'Geralt': 'images/gerald-avatar.png',
        'Triss': 'images/triss-avatar.png',
        'Vesemir': 'images/vesemir-avatar.png',
        'Caesar': 'images/caesar-avatar.png',
        'Yennefer': 'images/yennefer-avatar.png'
    };

    // Verkrijg het geselecteerde karakter uit localStorage
    const selectedCharacter = localStorage.getItem('selectedCharacter');
    if (selectedCharacter && avatarMap[selectedCharacter]) {
        // Update de src van de avatar met de corresponderende afbeelding
        document.getElementById('avatar').src = avatarMap[selectedCharacter];
    }
}

// Voer de updateAvatar functie uit wanneer de pagina is geladen
window.onload = updateAvatar;